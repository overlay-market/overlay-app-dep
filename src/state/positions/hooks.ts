import { useCallback, useMemo } from "react";
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import { 
  PositionSide, 
  typeInput, 
  selectLeverage, 
  selectPositionSide, 
  setSlippage,
  setTxnDeadline,
  DefaultTxnSettings } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../state";
import { Token } from "@uniswap/sdk-core";
import { useActiveWeb3React } from "../../hooks/web3";
import { parseUnits } from '@ethersproject/units';
import JSBI from 'jsbi';
import { Trans } from '@lingui/macro';
import { useAccountQuery } from "../data/generated";

export function usePositionState(): AppState['position'] {
  return useAppSelector((state) => state.position);
}

export function usePositionActionHandlers(): {
  onAmountInput: (typedValue: string | undefined) => void;
  onSelectLeverage: (selectedLeverage: number) => void;
  onSelectPositionSide: (selectedPositionSide: PositionSide) => void;
  onSetSlippage: (setSlippageValue: DefaultTxnSettings | string | undefined) => void;
  onSetTxnDeadline: ( txnDeadline: DefaultTxnSettings | string | undefined) => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (typedValue: string | undefined) => {
      dispatch(typeInput({typedValue}))
    },
    [dispatch]
  );

  const onSelectLeverage = useCallback(
    (selectedLeverage: number) => {
      dispatch(selectLeverage({selectedLeverage}))
    },
    [dispatch]
  );

  const onSelectPositionSide = useCallback(
    (selectedPositionSide: PositionSide) => {
      dispatch(selectPositionSide({selectedPositionSide}))
    },
    [dispatch]
  );

  const onSetSlippage = useCallback(
    (setSlippageValue: DefaultTxnSettings | string | undefined) => {
      dispatch(setSlippage({setSlippageValue}))
    },
    [dispatch]
  )

  const onSetTxnDeadline = useCallback(
    (txnDeadline: DefaultTxnSettings | string | undefined) => {
      dispatch(setTxnDeadline({txnDeadline}))
    },
    [dispatch]
  )

  return {
    onAmountInput,
    onSelectLeverage,
    onSelectPositionSide,
    onSetSlippage,
    onSetTxnDeadline
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
    selectedPositionSide,
    setSlippageValue,
    txnDeadline
  } = usePositionState();

  let buildData: object | undefined;

  // if any inputs missing, will not allow buildCallback to be created
  if (!typedValue || !selectedLeverage || !selectedPositionSide) {
    buildData = undefined;
  } else {
    buildData = {
      typedValue,
      selectedLeverage,
      selectedPositionSide,
      setSlippageValue,
      txnDeadline
    }
  }

  let inputError: string | undefined;
  if (!account) {
    inputError = `Connect Wallet`
  }

  if (!typedValue) {
    inputError = `Input Collateral Amount`
  }

  if (!selectedLeverage) {
    inputError = `Select Leverage Amount`
  }

  if (!selectedPositionSide) {
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
export function useTxnSettingsManager(): [boolean, (default_slippage: DefaultTxnSettings | string | undefined, default_deadline: DefaultTxnSettings | string | undefined) => any] {
  const dispatch = useAppDispatch();
  const isAuto = useIsTxnSettingsAuto();

  const toggleSetTxnSettingsAuto = useCallback(
    (default_slippage: DefaultTxnSettings | string | undefined, default_deadline: DefaultTxnSettings | string | undefined) => {
      dispatch(setSlippage({ setSlippageValue: default_slippage }))
      dispatch(setTxnDeadline({ txnDeadline: default_deadline }))
    },
      [dispatch]
  )

  return [isAuto, toggleSetTxnSettingsAuto];
};

export function useAllPositions(
  address: string | null | undefined
) {
  let accountAddress = address ? address.toLowerCase() : "";

  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAccountQuery({ account: accountAddress }, { pollingInterval: 3000 })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      positions: data?.account?.balances
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};
