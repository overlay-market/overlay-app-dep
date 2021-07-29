
import { createReducer } from '@reduxjs/toolkit';
import { CurrencyAmount, Currency } from '@uniswap/sdk-core';
import { PositionSide, amountInput, leverageInput, positionSideInput } from './actions';
import { OVL } from '../../constants/tokens';

export interface PositionState {
  readonly inputValue: string | undefined
  readonly leverageValue: number
  readonly positionSide: PositionSide | undefined
  readonly inputCurrency: string | undefined
};

const initialState: PositionState = {
  inputValue: undefined,
  leverageValue: 1,
  positionSide: undefined,
  inputCurrency: OVL[1].address
};

export default createReducer<PositionState>(initialState, (builder) =>
  builder
    .addCase(
      amountInput,
      (state, { payload: { inputValue } }) => {
        state.inputValue = inputValue;
      }
    )
    .addCase(
      leverageInput,
      (state, { payload: {leverageValue} }) => {
        state.leverageValue = leverageValue;
      }
    )
    .addCase(
      positionSideInput,
      (state, { payload: {positionSide}}) => {
        state.positionSide = positionSide;
      }
    )
)