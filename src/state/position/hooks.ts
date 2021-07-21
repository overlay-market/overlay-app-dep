import { useCallback } from "react";
import { PositionSide, amountInput, leverageInput, positionSideInput } from "./actions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AppState } from "../state";

export function usePositionState(): AppState['position'] {
  return useAppSelector((state) => state.position);
}

export function usePositionActionHandlers(): {
  onAmountInput: (inputValue: string) => void;
  onLeverageInput: (leverageValue: number) => void;
  onPositionSideInput: (positionSide: PositionSide) => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (inputValue: string) => {
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