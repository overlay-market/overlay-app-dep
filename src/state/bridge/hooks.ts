import {useCallback} from 'react'
import {typeInput} from './actions'
import {AppState} from '../state'
import {useAppDispatch, useAppSelector} from '../hooks'

export function useBridgeState(): AppState['bridge'] {
  return useAppSelector(state => state.bridge)
}

export function useBridgeActionHandlers(): {
  onAmountInput: (typedValue: string | undefined) => void
} {
  const dispatch = useAppDispatch()

  const onAmountInput = useCallback(
    (typedValue: string | undefined) => {
      dispatch(typeInput({typedValue}))
    },
    [dispatch],
  )

  return {
    onAmountInput,
  }
}
