import { TransactionType } from "./../state/transactions/actions";
import { BigNumber } from "@ethersproject/bignumber";
import Big from 'big.js';
import { TransactionResponse } from "@ethersproject/providers";
import { useMemo, useEffect } from "react";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useActiveWeb3React } from "./web3";
import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import {
  OVL_MARKET_ADDRESS,
  OVL_COLLATERAL_ADDRESS,
} from "../constants/addresses";
import { utils } from "ethers";
import isZero from "../utils/isZero";
import { calculateGasMargin } from "../utils/calculateGasMargin";

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
  chainId: any | undefined
) {
  let calldata: any;

  if (!buildData) calldata = undefined;
  else {

    calldata = OVLCollateral.buildParameters({
      collateral: utils.parseUnits(buildData.inputValue),
      leverage: Number(buildData.leverageValue),
      isLong: true,
      market: OVL_MARKET_ADDRESS[chainId],
      minOI: 1,
      deadline: 1
    });

  }

  return useMemo(() => {
    const txn: { address: string; calldata: string; value: string } = {
      address: OVL_COLLATERAL_ADDRESS[chainId],
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
  }, [calldata, chainId]);

}

export function useBuildCallback(
  buildData: any // position to build
): {
  state: BuildCallbackState;
  callback: null | (() => Promise<string>);
  error: string | null;
} {
  const { account, chainId, library } = useActiveWeb3React();

  const addTransaction = useTransactionAdder();

  const buildCalls = useBuildCallArguments(buildData, chainId);

  console.log('buildCalls: ', buildCalls);

  return useMemo(() => {

    console.log("start of use memo")

    if (!buildData || !library || !account || !chainId) {
      return {
        state: BuildCallbackState.INVALID,
        callback: null,
        error: "Missing Dependencies",
      };
    }

    console.log("has everything")

    return {
      state: BuildCallbackState.VALID,
      callback: async function onBuild(): Promise<string> {

        OVLCollateral.sanity()

        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")
        console.log("start of on build")


        const estimatedCalls: BuildCallEstimate[] = await Promise.all(
          buildCalls.map((call) => {

            console.log("mapping build calls")

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
                console.log("gas estimate")
                return {
                  call,
                  gasEstimate,
                };
              })
              .catch((gasError) => {

                console.log("gas error")

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

                    console.log("ERROR", callError)

                    console.debug("Call threw error", call, callError);

                    return { call, error: new Error(callError) };

                  });
              });
          })
        );

        console.log("estimated calls", estimatedCalls)

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | BuildCallEstimate | undefined =
          estimatedCalls.find(
            (el, ix, list): el is SuccessfulCall =>
              "gasEstimate" in el &&
              (ix === list.length - 1 || "gasEstimate" in list[ix + 1])
          );

        console.log("best call option", bestCallOption)

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          console.log("....... !best call option")
          const errorCalls = estimatedCalls.filter(
            (call): call is FailedCall => "error" in call
          );

          console.log("error calls", errorCalls)

          if (errorCalls.length > 0)
            throw "ERROR " + errorCalls[errorCalls.length - 1].error;
          const firstNoErrorCall = estimatedCalls.find<BuildCallEstimate>(
            (call): call is BuildCallEstimate => !("error" in call)
          );
          if (!firstNoErrorCall)
            throw new Error(
              "Unexpected error. Could not estimate gas for the swap."
            );
          bestCallOption = firstNoErrorCall;
        }

        console.log("2. best call option", bestCallOption)

        const {
          call: { address, calldata, value },
        } = bestCallOption;

        console.log("call...", address, calldata, value)

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

            console.log(".then from sent transaction", response);

            addTransaction(response, {
              type: TransactionType.BUILD_OVL_POSITION,
              market: OVL_MARKET_ADDRESS[chainId],
              collateral: buildData.collateral,
              isLong: buildData.isLong,
              leverage: buildData.leverage,
            });

            return response.hash;

          })
          .catch(error => {

            console.log(".catch from send transaction", error)

            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
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
  }, [buildData, library, account, chainId, buildCalls, addTransaction]);
}
