import { addTransaction } from '../state/transactions/actions';
import { useMemo } from "react";
import { useTransactionAdder } from "../state/transactions/hooks";
import { useActiveWeb3React } from "./web3";
import { Percent } from "@uniswap/sdk-core";
import { OVLCollateral } from '@overlay-market/overlay-v1-sdk';
import { OVL_MARKET_ADDRESS, OVL_COLLATERAL_ADDRESS } from '../constants/addresses';
import { utils } from 'ethers';

enum BuildCallbackState {
  INVALID,
  LOADING,
  VALID
};

function useBuildCallArguments(
  collateral: any,
  leverage: any,
  isLong: boolean,
  slippageTolerance: number,
  deadline: number,
  chainId: any
) {
  const buildData = OVLCollateral.buildParameters({
    collateral: utils.parseUnits(collateral),
    leverage: Number(leverage),
    isLong: isLong,
    market: OVL_MARKET_ADDRESS[chainId],
    slippageTolerance: slippageTolerance,
    deadline: deadline
  });

  return useMemo(() => {
    const txn: {to: string; data: string; value: string } = {
      to: OVL_COLLATERAL_ADDRESS[chainId],
      data: buildData,
      value: utils.parseEther('0').toHexString()
    }

    return {
      buildData: buildData,
      txn: txn
    }
  }, [buildData, chainId])
}

export function useBuildCallback(
  buildData: any, // position to build
  allowedSlippage: Percent,
): { state: BuildCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { account, chainId, library } = useActiveWeb3React();

  const addTransaction = useTransactionAdder();

  const { buildData: calldata, txn: txn} = useBuildCallArguments(
    buildData.inputValue,
    buildData.leverageValue,
    buildData.positionSide,
    buildData.slippageValue,
    buildData.txnDeadline,
    chainId
  )

  // return useMemo(() => {
  //   if (!buildData || !library || !account || !chainId) {
  //     return { state: BuildCallbackState.INVALID, callback: null, error: 'Missing Dependencies' };
  //   }

  //   return {
  //     state: BuildCallbackState.VALID,
  //     callback: async function onBuild(): Promise<string> {
        
  //       return library
  //                 .getSigner()
  //                 .estimateGas(txn)
                  
  //     },
  //     error: null,
  //   }
  // }, [])
};
