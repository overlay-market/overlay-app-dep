import { useCallback } from "react";
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import { PositionSide, amountInput, leverageInput, positionSideInput } from "./actions";
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
  )

  return {
    onAmountInput,
    onLeverageInput,
    onPositionSideInput
  }
};

export function useDerivedUserInputs(
  typedValue: string | undefined,
  inputToken: Token | undefined
) : {
  parsedAmount?: CurrencyAmount<Token>,
  error?: string
} {
  const { account } = useActiveWeb3React();

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