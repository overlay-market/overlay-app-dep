import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { AppState } from "../state";
import { typeInput, selectPositionId, resetUnwindState } from './actions';

export function useUnwindState(): AppState['unwind'] {
  return useAppSelector((state) => state.unwind);
};

export function useUnwindActionHandlers(): {
  onUserInput: (typedValue: string) => void;
  onSelectPositionId: (selectedPosition: number | null) => void;
  onResetUnwindState: () => void;
} {
  const dispatch = useAppDispatch();

  const onUserInput = useCallback(
    (typedValue: string) => {
      dispatch(typeInput({ typedValue }))
    }, [dispatch]
  );

  const onSelectPositionId = useCallback(
    (selectedPositionId: number | null) => {
      dispatch(selectPositionId({ selectedPositionId }))
    }, [dispatch]
  );

  const onResetUnwindState = useCallback(
    () => {
      dispatch(resetUnwindState())
    }, [dispatch]
  )

  return {
    onUserInput,
    onSelectPositionId,
    onResetUnwindState
  }
};