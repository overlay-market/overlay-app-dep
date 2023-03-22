import {createReducer} from '@reduxjs/toolkit'
import {typeInput, selectAction, resetStakeState} from './actions'

export interface StakeState {
  readonly typedValue: string | undefined
  readonly isStake: boolean | undefined
}

export const initialState: StakeState = {
  typedValue: '',
  isStake: true,
}

export default createReducer<StakeState>(initialState, builder =>
  builder
    .addCase(typeInput, (state, {payload: {typedValue}}) => {
      state.typedValue = typedValue
    })
    .addCase(selectAction, (state, {payload: {isStake}}) => {
      state.isStake = isStake
    })
    .addCase(resetStakeState, state => {
      state.typedValue = initialState.typedValue
      state.isStake = initialState.isStake
    }),
)
