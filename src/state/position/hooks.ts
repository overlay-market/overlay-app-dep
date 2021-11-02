import { useCallback } from "react";
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import { 
  PositionSide, 
  amountInput, 
  leverageInput, 
  positionSideInput, 
  slippageInput,
  txnDeadlineInput,
  DefaultTxnSettings } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../state";
import { Token } from "@uniswap/sdk-core";
import { useActiveWeb3React } from "../../hooks/web3";
import { parseUnits } from '@ethersproject/units';
import JSBI from 'jsbi';

export function usePositionState(): AppState['position'] {
  return useAppSelector((state) => state.position);
}

export function usePositionActionHandlers(): {
  onAmountInput: (inputValue: string | undefined) => void;
  onLeverageInput: (leverageValue: number) => void;
  onPositionSideInput: (positionSide: PositionSide) => void;
  onSlippageInput: (slippageValue: DefaultTxnSettings | string | undefined) => void;
  onTxnDeadlineInput: ( txnDeadline: DefaultTxnSettings | string | undefined) => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (inputValue: string | undefined) => {
      dispatch(amountInput({inputValue}))
    },
    [dispatch]
  );

  const onLeverageInput = useCallback(
    (leverageValue: number) => {
      dispatch(leverageInput({leverageValue}))
    },
    [dispatch]
  );

  const onPositionSideInput = useCallback(
    (positionSide: PositionSide) => {
      dispatch(positionSideInput({positionSide}))
    },
    [dispatch]
  );

  const onSlippageInput = useCallback(
    (slippageValue: DefaultTxnSettings | string | undefined) => {
      dispatch(slippageInput({slippageValue}))
    },
    [dispatch]
  )

  const onTxnDeadlineInput = useCallback(
    (txnDeadline: DefaultTxnSettings | string | undefined) => {
      dispatch(txnDeadlineInput({txnDeadline}))
    },
    [dispatch]
  )

  return {
    onAmountInput,
    onLeverageInput,
    onPositionSideInput,
    onSlippageInput,
    onTxnDeadlineInput
  }
};

export function useDerivedBuildInfo(
  typedValue: string | undefined,
  inputToken: Token | undefined
) {
  const { account } = useActiveWeb3React();

  const { 
    inputValue,
    leverageValue,
    positionSide,
    slippageValue,
    txnDeadline
  } = usePositionState();

  const parsedInput: CurrencyAmount<Token> | undefined = tryParseAmount(typedValue, inputToken);

  const parsedAmount =
    parsedInput && parsedInput.quotient
      ? parsedInput
      : undefined;

  let error: string | undefined;

  if (!account) {
    error = 'Connect Wallet';
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount';
  }

  return {
    parsedAmount,
    error,
    inputValue,
    leverageValue,
    positionSide,
    slippageValue,
    txnDeadline
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
  const { slippageValue, txnDeadline } = useAppSelector(((state) => state.position));

  if (slippageValue === DefaultTxnSettings.DEFAULT_SLIPPAGE && txnDeadline === DefaultTxnSettings.DEFAULT_DEADLINE) return true;
  else return false;
};

//@ts-ignore
export function useTxnSettingsManager(): [boolean, (default_slippage: DefaultTxnSettings | string | undefined, default_deadline: DefaultTxnSettings | string | undefined) => any] {
  const dispatch = useAppDispatch();
  const isAuto = useIsTxnSettingsAuto();

  const toggleSetTxnSettingsAuto = useCallback(
    (default_slippage: DefaultTxnSettings | string | undefined, default_deadline: DefaultTxnSettings | string | undefined) => {
      dispatch(slippageInput({ slippageValue: default_slippage }))
      dispatch(txnDeadlineInput({ txnDeadline: default_deadline }))
    },
      [dispatch]
  )

  return [isAuto, toggleSetTxnSettingsAuto];
};