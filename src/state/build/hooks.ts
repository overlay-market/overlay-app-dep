import { useCallback, useMemo, useEffect } from "react";
import { parseUnits } from '@ethersproject/units';
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import JSBI from 'jsbi';
import { BigNumberish } from "ethers";
import { 
  DefaultTxnSettings,
  typeInput, 
  selectLeverage, 
  selectPositionSide, 
  setSlippage,
  setTxnDeadline,
  resetBuildState } from "./actions";
import { AppState } from "../state";
import { useActiveWeb3React } from "../../hooks/web3";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useAccountQuery, usePositionsQuery } from "../data/generated";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export function useBuildState(): AppState['build'] {
  return useAppSelector((state) => state.build);
}

export function useBuildActionHandlers(): {
  onAmountInput: (typedValue: string | undefined) => void;
  onSelectLeverage: (selectedLeverage: string) => void;
  onSelectPositionSide: (isLong: boolean) => void;
  onSetSlippage: (setSlippageValue: DefaultTxnSettings | string) => void;
  onSetTxnDeadline: ( txnDeadline: DefaultTxnSettings | string) => void;
  onResetBuildState: () => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (typedValue: string | undefined) => {
      dispatch(typeInput({ typedValue }))
    },
    [dispatch]
  );

  const onSelectLeverage = useCallback(
    (selectedLeverage: string) => {
      dispatch(selectLeverage({ selectedLeverage }))
    },
    [dispatch]
  );

  const onSelectPositionSide = useCallback(
    (isLong: boolean) => {
      dispatch(selectPositionSide({ isLong }))
    },
    [dispatch]
  );

  const onSetSlippage = useCallback(
    (setSlippageValue: DefaultTxnSettings | string) => {
      dispatch(setSlippage({ setSlippageValue }))
    },
    [dispatch]
  )

  const onSetTxnDeadline = useCallback(
    (txnDeadline: DefaultTxnSettings | string) => {
      dispatch(setTxnDeadline({ txnDeadline }))
    },
    [dispatch]
  )

  const onResetBuildState = useCallback(
    () => {
      dispatch(resetBuildState())
    },
    [dispatch]
  )

  return {
    onAmountInput,
    onSelectLeverage,
    onSelectPositionSide,
    onSetSlippage,
    onSetTxnDeadline,
    onResetBuildState
  }
};

export function useDerivedBuildInfo(): {
  buildData: object | undefined
  inputError?: string
  parsedAmount?: string
}{
  const { account } = useActiveWeb3React();

  const { 
    typedValue,
    selectedLeverage,
    isLong,
    setSlippageValue,
    txnDeadline
  } = useBuildState();

  let buildData: object | undefined;

  // if any inputs missing, will not allow buildCallback to be created
  if (typedValue === '' || typedValue === '.' || isLong === null || isLong === undefined) {
    buildData = undefined;
  } else {
    buildData = {
      typedValue,
      selectedLeverage,
      isLong,
      setSlippageValue,
      txnDeadline
    }
  }

  let inputError: string | undefined;
  if (!account) {
    inputError = `Connect Wallet`
  }

  if (typedValue === '' || typedValue === '.') {
    inputError = `Input Collateral Amount`
  }

  if (!selectedLeverage) {
    inputError = `Select Leverage Amount`
  }

  if (isLong === null) {
    inputError = `Select Long or Short Position`
  }

  return {
    buildData,
    inputError,
    parsedAmount: typedValue
  }
}

// try to parse a user entered amount for a given token
export function tryParseAmount<T extends Currency>(value?: string, currency?: T): CurrencyAmount<T> | undefined {
  if (!value || !currency) {
    return undefined;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== '0') {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return undefined;
}

export function useIsTxnSettingsAuto() : boolean {
  const { setSlippageValue, txnDeadline } = useAppSelector(((state) => state.build));

  if (setSlippageValue === DefaultTxnSettings.DEFAULT_SLIPPAGE && txnDeadline === DefaultTxnSettings.DEFAULT_DEADLINE) return true;
  else return false;
};

//@ts-ignore
export function useTxnSettingsManager(): [boolean, (default_slippage: DefaultTxnSettings | string, default_deadline: DefaultTxnSettings | string) => any] {
  const dispatch = useAppDispatch();
  const isAuto = useIsTxnSettingsAuto();

  const toggleSetTxnSettingsAuto = useCallback(
    (default_slippage: DefaultTxnSettings | string, default_deadline: DefaultTxnSettings | string) => {
      dispatch(setSlippage({ setSlippageValue: default_slippage }))
      dispatch(setTxnDeadline({ txnDeadline: default_deadline }))
    },
      [dispatch]
  )

  return [isAuto, toggleSetTxnSettingsAuto];
};

export function useWalletPositionsFromSubgraph(address: string | undefined | null) {
  const accountAddress = address ? address.toLowerCase() : undefined;

  return useAccountQuery(accountAddress ? { account: accountAddress } : skipToken, {
    pollingInterval: 12000, 
    refetchOnMountOrArgChange: true, 
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: false
  })
}

interface PositionMarketData {
  id: string
  feedAddress: string
}
interface PositionData {
  id: string
  positionId: string
  market: PositionMarketData
  isLong: boolean
  leverage: string
  isLiquidated: boolean
  
}

export function useCurrentWalletPositions(
  address: string | undefined | null
):{
  isLoading: boolean
  isFetching: boolean
  isUninitialized: boolean
  isError: boolean
  error: unknown
  positions: PositionData[] | undefined
} {
  const walletPositionsData = useWalletPositionsFromSubgraph(address ? address : undefined)

  return {
    isLoading: walletPositionsData.isLoading,
    isFetching: walletPositionsData.isFetching,
    isUninitialized: walletPositionsData.isUninitialized,
    isError: walletPositionsData.isError,
    error: walletPositionsData.error,
    positions: walletPositionsData.data?.account?.positions
  }
}

export function useQuerySubgraphAccountPositions(
  address: string | null | undefined,
  blockNumber?: number | undefined
) {
  const accountAddress = address ? address.toLowerCase() : "";

  // polling interval in ms
  // 1 s = 1000ms
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data,
    isFetching,
    refetch
  } = useAccountQuery({ account: accountAddress }, { 
    pollingInterval: 12000, 
    refetchOnMountOrArgChange: true, 
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: false
  })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      positions: data?.account?.positions,
      isFetching,
      refetch
    } 
  }, [isLoading, isError, error, isUninitialized, data, refetch, isFetching])
};


export function useAllPositions() {
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = usePositionsQuery({}, { pollingInterval: 12000 })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      positions: data?.positions
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};