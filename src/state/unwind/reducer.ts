import {createReducer} from '@reduxjs/toolkit'
import {DefaultTxnSettings, typeInput, selectPositionId, resetUnwindState, setSlippage, setTxnDeadline} from './actions'

export interface UnwindState {
  readonly typedValue: string
  readonly selectedPositionId: number | null
  readonly setSlippageValue: DefaultTxnSettings | string
  readonly txnDeadline: DefaultTxnSettings | string
}

export const initialState: UnwindState = {
  typedValue: '',
  selectedPositionId: null,
  setSlippageValue: '1',
  txnDeadline: '30',
}

export default createReducer<UnwindState>(initialState, builder =>
  builder
    .addCase(typeInput, (state, {payload: {typedValue}}) => {
      state.typedValue = typedValue
    })
    .addCase(selectPositionId, (state, {payload: {selectedPositionId}}) => {
      state.selectedPositionId = selectedPositionId
    })
    .addCase(resetUnwindState, state => {
      state.typedValue = ''
      state.selectedPositionId = null
      state.setSlippageValue = initialState.setSlippageValue
      state.txnDeadline = initialState.txnDeadline
    })
    .addCase(setSlippage, (state, action) => {
      state.setSlippageValue = action.payload.setSlippageValue
    })
    .addCase(setTxnDeadline, (state, {payload: {txnDeadline}}) => {
      state.txnDeadline = txnDeadline
    }),
)
