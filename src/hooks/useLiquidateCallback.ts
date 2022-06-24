import { useMemo } from 'react';
import { utils } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
// import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import { useActiveWeb3React } from "./web3";
import { TransactionType } from "./../state/transactions/actions";
import { TransactionResponse } from "@ethersproject/providers";
import { useTransactionAdder } from "../state/transactions/hooks";
import isZero from "../utils/isZero";
import { calculateGasMargin } from "../utils/calculateGasMargin";
import { useMarketContract } from "./useContract";
import { useAddPopup } from "../state/application/hooks";
import { currentTimeParsed } from "../utils/currentTime";
interface LiquidateCall {
  address: string;
  calldata: string;
  value: string;
}

interface LiquidateCallEstimate {
  call: LiquidateCall;
}

interface SuccessfulCall extends LiquidateCallEstimate {
  call: LiquidateCall;
  gasEstimate: BigNumber;
}

interface FailedCall extends LiquidateCallEstimate {
  call: LiquidateCall;
  error: Error;
}

enum LiquidateCallbackState {
  INVALID,
  LOADING,
  VALID,
}

function useLiquidateCallArguments(
  marketAddress?: string,
  ownerAddress?: string,
  positionId?: string, 
  chainId?: any
) {
  let calldata: any;
  const marketContract = useMarketContract(marketAddress);

  if (!ownerAddress || !positionId || !marketContract) calldata = undefined;
  else {
    calldata = marketContract.interface.encodeFunctionData("liquidate", [
      ownerAddress,
      positionId
    ])
  }

  return useMemo(() => {
    if (!ownerAddress || !marketAddress || !positionId || !chainId) return [];

    const txn: { address: string; calldata: string; value: string } = {
      address: marketAddress,
      calldata: calldata,
      value: '0x0',
    };

    return [
      {
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ];
  }, [calldata, chainId, marketAddress, ownerAddress, positionId]);
}

export function useLiquidateCallback(marketAddress?: string, ownerAddress?: string, positionId?: string) : {
  state: LiquidateCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();
  const addPopup = useAddPopup();
  const liquidateCalls = useLiquidateCallArguments(marketAddress, ownerAddress, positionId, chainId);
  const currentTimeForId = currentTimeParsed();

  return useMemo(() => {

    if (!positionId || !library || !account || !chainId) {

      return {
        state: LiquidateCallbackState.INVALID,
        callback: null,
        error: "Missing Dependencies",
      };

    }

    return {
      state: LiquidateCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {

        const estimatedCalls: LiquidateCallEstimate[] = await Promise.all(

          liquidateCalls.map((call) => {

            const { address, calldata, value } = call;

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            };

            return library
              .estimateGas(tx)
              .then((gasEstimate) => { return { call, gasEstimate } })
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

                    addPopup(
                      {
                        txn: {
                          hash: currentTimeForId,
                          success: false,
                          info: callError.error
                        },
                      },
                      currentTimeForId
                    )
                    
                    console.debug("Call threw error", call, callError);

                    return { call, error: new Error(callError) };

                  });
              });
          })
        );

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | LiquidateCallEstimate | undefined =
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
          const firstNoErrorCall = estimatedCalls.find<LiquidateCallEstimate>(
            (call): call is LiquidateCallEstimate => !("error" in call)
          );
          if (!firstNoErrorCall)
            throw new Error(
              "Unexpected error. Could not estimate gas for the swap."
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

            addTransaction(response, {
              type: TransactionType.LIQUIDATE_OVL_POSITION,
              positionId: positionId
            });

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
              console.error(`Swap failed`, error, address, calldata, value);

              throw new Error(`Swap failed: ${error}`);
            }
          });
      },
      error: null,
    };
  }, [positionId, library, account, chainId, liquidateCalls, addTransaction, addPopup, currentTimeForId]);
}
