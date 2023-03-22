import {createReducer} from '@reduxjs/toolkit'
import {updateMarkets} from './actions'

export interface MarketsState {
  readonly marketsData: object | undefined
}

export const initialState: MarketsState = {
  marketsData: [],
}

export default createReducer<MarketsState>(initialState, builder =>
  builder.addCase(updateMarkets, (state, {payload: {marketsData}}) => {
    state.marketsData = marketsData
  }),
)
