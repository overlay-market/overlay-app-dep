import { useMemo } from "react";
// import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import { utils } from "ethers";
import { OVL_COLLATERAL_ADDRESS } from "../constants/addresses";
import { BigNumber } from "@ethersproject/bignumber";
import { useActiveWeb3React } from "./web3";
import { useTransactionAdder } from "../state/transactions/hooks";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { TransactionResponse } from "@ethersproject/providers";
import isZero from "../utils/isZero";
import { TransactionType } from "./../state/transactions/actions";
import { useAddPopup } from "../state/application/hooks";
import { currentTimeParsed } from "../utils/currentTime";
import { useMarketContract } from "./useContract";
interface UnwindCall {
  address: string;
  calldata: string;
  value: string;
}

interface UnwindCallEstimate {
  call: UnwindCall;
}

interface SuccessfulCall extends UnwindCallEstimate {
  call: UnwindCall;
  gasEstimate: BigNumber;
}

interface FailedCall extends UnwindCallEstimate {
  call: UnwindCall;
  error: Error;
}

enum UnwindCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useUnwindCallArguments(
  marketAddress: string | undefined,
  unwindValue: string,
  positionCurrentValue: BigNumber | undefined,
  positionId: string | null,
  isLong: boolean | undefined,
  prices: any | undefined
) {
  let calldata: any;

  const { account, chainId } = useActiveWeb3React();
  const marketContract = useMarketContract(marketAddress);

  console.log('positionId: ', positionId === null);

  if (!marketContract || unwindValue === "" || unwindValue === "." || positionCurrentValue === undefined || positionId === null || !account || isLong === undefined || prices === undefined) calldata = undefined;
  else {
    // OI has units of OVL / (quoteCurrency / baseCurrency) = OVL * baseCurrency / quoteCurrency
    // let unwindValueBigNumber = utils.parseUnits(unwindValue);
    // let parsedUnwindValue = unwindValueBigNumber.toString();
    // let parsedCurrentValue = positionCurrentValue.toString();
    // let fraction = Number(parsedUnwindValue) / Number(parsedCurrentValue);

    let fraction = Number(unwindValue) / 100;
    // console.log('unwindValueBigNumber: ',unwindValue.toString() )
    // console.log('denominator: ',positionCurrentValue.toString() )
    console.log('positionId: ', BigNumber.from(positionId));
    console.log('fraction: ',  utils.parseUnits(fraction.toString()));
    // console.log('positionId: ', positionId);

    calldata = marketContract.interface.encodeFunctionData("unwind", [
      BigNumber.from(positionId),
      utils.parseUnits(fraction.toString()),
      isLong ? utils.parseUnits('0') : utils.parseUnits('10000000')
    ]
    )
  }

  return useMemo(() => {
    if (!marketAddress || unwindValue === "" || !positionCurrentValue || !positionId || !account || !chainId) return [];

    const txn: { address: string; calldata: string; value: string } = {
      address: marketAddress,
      calldata: calldata,
      value: utils.parseEther("0").toHexString(),
    };

    return [
      {
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ];
  }, [calldata, chainId, account, marketAddress, positionCurrentValue, positionId, unwindValue]);
};

export function useUnwindCallback(
  marketAddress: string | undefined,
  unwindValue: string,
  positionCurrentValue: BigNumber | undefined,
  positionId: string | null,
  isLong: boolean | undefined,
  prices: any| undefined
) : {
  state: UnwindCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();
  const addPopup = useAddPopup();
  const currentTimeForId = currentTimeParsed();
  const addTransaction = useTransactionAdder();
  const unwindCalls = useUnwindCallArguments(marketAddress, unwindValue, positionCurrentValue, positionId, isLong, prices);

  return useMemo(() => {
    if (!unwindValue || unwindValue === '.' || positionId === null || !library || !account || !chainId) {
      return {
        state: UnwindCallbackState.INVALID,
        callback: null,
        error: "Missing Dependencies",
      };
    }

    return {
      state: UnwindCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {
        const estimatedCalls: UnwindCallEstimate[] = await Promise.all(
          unwindCalls.map((call) => {
            const { address, calldata, value } = call;

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            };

            return library
              .estimateGas(tx)
              .then((gasEstimate) => {
                return {
                  call,
                  gasEstimate,
                };
              })
              .catch((gasError) => {
                console.debug(
                  "Gas estimate failed, trying eth_call to extract error",
                  call
                );

                return library
                  .call(tx)
                  .then((result) => {
                    console.debug(
                      "Unexpected successful call after failed estimate gas",
                      call,
                      gasError,
                      result
                    );
                    return {
                      call,
                      error: new Error(
                        "Unexpected issue with estimating the gas. Please try again."
                      ),
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
        let bestCallOption: SuccessfulCall | UnwindCallEstimate | undefined =
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
            throw errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find<UnwindCallEstimate>(
            (call): call is UnwindCallEstimate => !("error" in call)
          );
          if (!firstNoErrorCall)
            throw new Error(
              "Unexpected error. Could not estimate gas for unwinding position."
            );
          bestCallOption = firstNoErrorCall;
        }

        const {
          call: { address, calldata, value },
        } = bestCallOption;

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
                type: TransactionType.UNWIND_OVL_POSITION,
                positionId: positionId.toString(),
                shares: unwindValue
              }
            );

            return response.hash;
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            console.log('error from useUnwindCallback: ', error);
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
              console.error(`Unwind failed`, error, address, calldata, value);
              throw new Error(`Unwind failed: ${error}`);
            }
          });
      },
      error: null,
    };
  }, [unwindValue, positionId, library, account, chainId, unwindCalls, addTransaction, addPopup, currentTimeForId]);
}
