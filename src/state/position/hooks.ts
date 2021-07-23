import { useCallback } from "react";
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import { PositionSide, amountInput, leverageInput, positionSideInput } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../state";

export function usePositionState(): AppState['position'] {
  return useAppSelector((state) => state.position);
}

export function usePositionActionHandlers(): {
  onAmountInput: (inputValue: CurrencyAmount<Currency> | string | undefined) => void;
  onLeverageInput: (leverageValue: number) => void;
  onPositionSideInput: (positionSide: PositionSide) => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (inputValue: CurrencyAmount<Currency> | string | undefined) => {
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
}