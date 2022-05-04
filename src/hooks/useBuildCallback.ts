import { useMemo } from "react";
import { utils } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
// import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import { useActiveWeb3React } from "./web3";
import { TransactionType } from "./../state/transactions/actions";
import { TransactionResponse } from "@ethersproject/providers";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useMarketContract } from "./useContract";
import { OVL_MARKET_ADDRESS } from "../constants/addresses";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { useAddPopup } from "../state/application/hooks";
import { currentTimeParsed } from "../utils/currentTime";
import isZero from "../utils/isZero";
import { AbiCoder } from "@ethersproject/abi";

interface BuildCall {
  address: string;
  calldata: string;
  value: string;
}

interface BuildCallEstimate {
  call: BuildCall;
}

interface SuccessfulCall extends BuildCallEstimate {
  call: BuildCall;
  gasEstimate: BigNumber;
}

interface FailedCall extends BuildCallEstimate {
  call: BuildCall;
  error: Error;
}

enum BuildCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useBuildCallArguments(
  buildData: any | undefined,
  marketAddress: any | undefined,
  price: BigNumber | undefined
) {
  let calldata: any;

  const { account, chainId } = useActiveWeb3React();
  const marketContract = useMarketContract(marketAddress);

  if (!buildData || typeof buildData.setSlippageValue !== 'string' || !marketContract || !price) calldata = undefined;
  else {
    let increasePercentage = Number(buildData.setSlippageValue) + 100;
    let decreasePercentage = 100 - Number(buildData.setSlippageValue);
    let increaseNumerator = BigNumber.from(increasePercentage).toHexString()
    let decreaseNumerator = BigNumber.from(decreasePercentage).toHexString()
    let base = BigNumber.from(100).toHexString()

    console.log('short: ', price.mul(decreaseNumerator).div(base))
    console.log('long: ', price.mul(increaseNumerator).div(base))

    calldata = marketContract.interface.encodeFunctionData("build", [
      utils.parseUnits(buildData.typedValue),
      utils.parseUnits(buildData.selectedLeverage),
      buildData.isLong,
      // utils.parseUnits(buildData.setSlippageValue),
      buildData.isLong ? price.mul(increaseNumerator).div(base) : price.mul(decreaseNumerator).div(base)
      // Number(buildData.typedValue),
      // Number(buildData.selectedLeverage),
      // buildData.isLong,
      // Number(buildData.setSlippageValue)
      // BigInt("2000000000000000000"),
      // BigInt("1000000000000000000"),
      // true,
      // BigInt("2031184299945301600"),
    ]
    )
  }

  return useMemo(() => {
    if (!buildData || !marketAddress || !chainId || !account || !marketContract || !calldata) return []

    const txn: { address: string; calldata: string; value: string } = {
      address: marketAddress,
      calldata: calldata,
      value: '0x0',
    };

    return [
      {
        // address: txn.address,
        address: '0xc3073c0bc1b4baf24fdc170ef4d3cb0e5c4b2ed2',
        calldata: calldata,
        value: txn.value,
      },
    ];
  }, [calldata, marketAddress, chainId, account, buildData, marketContract]);

}

export function useBuildCallback(
  buildData: any, // position to build
  marketAddress: any | undefined | null,
  price: any,
  inputError: string | undefined
): {
  state: BuildCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const currentTimeForId = currentTimeParsed();
  const buildCalls = useBuildCallArguments(buildData, marketAddress, price);

  console.log('buildCalls: ', buildCalls);
  
  return useMemo(() => {

    if (!buildData || !library || !account || !chainId || !marketAddress || inputError) {
      console.log('inputError: ', inputError);
      return {
        state: BuildCallbackState.INVALID,
        callback: null,
        error: "Missing Dependencies",
      };

    }

    return {
      state: BuildCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {
        const estimatedCalls: BuildCallEstimate[] = await Promise.all(
          buildCalls.map((call) => {
            const { address, calldata, value } = call;

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            };

            console.log('tx: ', tx);
            return library
              .estimateGas(tx)
              .then((gasEstimate) => { return { call, gasEstimate } })
              .catch((gasError) => {

                console.debug(
                  "Gas estimate failed, trying eth_call to extract error",
                  call
                );
                
                console.log('gasError: ', gasError);

                return library
                  .call(tx)
                  .then((result) => {

                    console.debug(
                      "Unexpected successful call after failed estimate gas",
                      call, gasError, result
                    );

                    const error = "Unexpected issue with estimating the gas. "
                     + "Please try again."

                    return {
                      error: new Error(error),
                      call,
                    };

                  })
                  .catch((callError) => {

                    console.debug("Call threw error", call, callError);

                    return { call, error: new Error(callError) };

                  });
              });
          })
        );

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | BuildCallEstimate | undefined =
          estimatedCalls.find(
            (el, ix, list): el is SuccessfulCall =>
              "gasEstimate" in el &&
              (ix === list.length - 1 || "gasEstimate" in list[ix + 1])
          );

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter(
            (call): call is FailedCall => "error" in call
          );

          if (errorCalls.length > 0)
            throw "ERROR " + errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find<BuildCallEstimate>(
            (call): call is BuildCallEstimate => !("error" in call)
          );
          if (!firstNoErrorCall)
            throw new Error(
              "Unexpected error. Could not estimate gas for the build."
            );
          bestCallOption = firstNoErrorCall;
        }

        const {
          call: { address, calldata, value },
        } = bestCallOption;

        console.log('bestCallOption: ', bestCallOption);

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...("gasEstimate" in bestCallOption
              ? { gasLimit: calculateGasMargin(bestCallOption.gasEstimate) }
              : {}),
            ...(value && !isZero(value) ? { value } : {}),
          })
          .then((response: TransactionResponse) => {

            addTransaction(
              response, 
              {
                type: TransactionType.BUILD_OVL_POSITION,
                market: marketAddress,
                collateral: buildData.typedValue,
                isLong: buildData.isLong,
                leverage: buildData.selectedLeverage
              }
            );

            return response.hash;

          })
          .catch(error => {

            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              addPopup(
                {
                  txn: {
                    hash: currentTimeForId,
                    success: false,
                    info: error
                  },
                },
                currentTimeForId
              )
              throw new Error("Transaction rejected.");
            } else {
              
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Build failed`, error, address, calldata, value);

              throw new Error(`Build failed: ${error}`);
            }
          });
      },
      error: null,
    };
  }, [buildData, marketAddress, library, account, chainId, buildCalls, addTransaction, addPopup, currentTimeForId]);
}
