import { useCallback, useMemo } from "react";
import { parseUnits } from '@ethersproject/units';
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import JSBI from 'jsbi';
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

export function usePositionState(): AppState['position'] {
  return useAppSelector((state) => state.position);
}

export function usePositionActionHandlers(): {
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
  } = usePositionState();

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
  const { setSlippageValue, txnDeadline } = useAppSelector(((state) => state.position));

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

export function useAccountPositions(
  address: string | null | undefined
) {
  let accountAddress = address ? address.toLowerCase() : "";

  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAccountQuery({ account: accountAddress }, { pollingInterval: 15000 })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      positions: data?.account?.positions
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};
