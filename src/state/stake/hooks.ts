import { useCallback, useMemo } from "react";
import {
  typeInput,
  selectAction,
  resetStakeState
} from "./actions";
import { AppState } from "../state";
import { useAppSelector, useAppDispatch } from './../hooks';

// export function useStakeState(): AppState['stake'] {
//   return useAppSelector((state) => state.stake);
// };

export function useStakeActionHandlers(): {
  onAmountInput: (typedValue: string | undefined) => void;
  onSelectAction: (isStake: boolean) => void;
  onResetStakeState: () => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (typedValue: string | undefined) => {
      dispatch(typeInput({ typedValue }))
    },
    [dispatch]
  );

  const onSelectAction = useCallback(
    (isStake: boolean) => {
      dispatch(selectAction({ isStake }))
    }, 
    [dispatch]
  );

  const onResetStakeState = useCallback(
    () => {
      dispatch(resetStakeState())
    },
    [dispatch]
  )

  return {
    onAmountInput,
    onSelectAction,
    onResetStakeState
  }
};