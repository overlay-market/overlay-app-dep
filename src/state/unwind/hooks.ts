import { useCallback } from "react";
import { AppState } from "../state";
import { useAppSelector, useAppDispatch } from "../hooks";
import { typeInput, selectPositionId, resetUnwindState, setSlippage, setTxnDeadline } from './actions';
import { DefaultTxnSettings } from "./actions";
import { useActiveWeb3React } from "../../hooks/web3";

export function useUnwindState(): AppState['unwind'] {
  return useAppSelector((state) => state.unwind);
};

export function useUnwindActionHandlers(): {
  onAmountInput: (typedValue: string) => void;
  onSelectPositionId: (selectedPositionId: number | null) => void;
  onSetSlippage: (setSlippageValue: DefaultTxnSettings | string) => void;
  onSetTxnDeadline: ( txnDeadline: DefaultTxnSettings | string) => void;
  onResetUnwindState: () => void;
} {
  const dispatch = useAppDispatch();

  const onAmountInput = useCallback(
    (typedValue: string) => {
      dispatch(typeInput({ typedValue }))
    }, [dispatch]
  );

  const onSelectPositionId = useCallback(
    (selectedPositionId: number | null) => {
      dispatch(selectPositionId({ selectedPositionId }))
    }, [dispatch]
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

  const onResetUnwindState = useCallback(
    () => {
      dispatch(resetUnwindState())
    },
    [dispatch]
  )


  return {
    onAmountInput,
    onSelectPositionId,
    onSetSlippage,
    onSetTxnDeadline,
    onResetUnwindState
  }
};

export function useDerivedUnwindInfo(): {
  unwindData: object | undefined
  inputError?: string
  parsedAmount?: string
} {
  const { account } = useActiveWeb3React();

  const { typedValue, setSlippageValue, txnDeadline } = useUnwindState();

  let unwindData: object | undefined;

  if (typedValue === '' || typedValue === '.') unwindData = undefined;
  else {
    unwindData = {
      setSlippageValue,
      txnDeadline
    };
  }

  let inputError: string | undefined;

  if (!account) {
    inputError = `Connect Wallet`;
  }

  if (typedValue === '' || typedValue === '.') {
    inputError = `Input Unwind Amount`;
  }

  return {
    unwindData,
    inputError,
    parsedAmount: typedValue
  }
}