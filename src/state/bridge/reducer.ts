import {createReducer} from '@reduxjs/toolkit'
import {typeInput} from './actions'

export interface BridgeState {
  readonly typedValue: string | undefined
}

export const initialState: BridgeState = {
  typedValue: '',
}

export default createReducer<BridgeState>(initialState, builder =>
  builder.addCase(typeInput, (state, {payload: {typedValue}}) => {
    state.typedValue = typedValue
  }),
)
