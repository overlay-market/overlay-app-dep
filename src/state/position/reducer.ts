
import { createReducer } from '@reduxjs/toolkit';
import { CurrencyAmount, Currency } from '@uniswap/sdk-core';
import { 
  PositionSide, 
  amountInput, 
  leverageInput, 
  positionSideInput, 
  slippageInput,
  txnDeadlineInput,
  DefaultTxnSettings } from './actions';
import { OVL } from '../../constants/tokens';

export interface PositionState {
  readonly inputValue: string | undefined
  readonly leverageValue: number
  readonly positionSide: PositionSide | undefined
  readonly inputCurrency: string | undefined
  readonly slippageValue: DefaultTxnSettings | string | undefined
  readonly txnDeadline: DefaultTxnSettings | string | undefined
};

export const initialState: PositionState = {
  inputValue: undefined,
  leverageValue: 1,
  positionSide: undefined,
  inputCurrency: OVL[1].address,
  slippageValue: '0.3',
  txnDeadline: '30'
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
      (state, { payload: {positionSide} }) => {
        state.positionSide = positionSide;
      }
    )
    .addCase(slippageInput, (state,action) => {
      state.slippageValue = action.payload.slippageValue;
    })
    .addCase(
      txnDeadlineInput,
      (state, { payload: {txnDeadline} }) => {
        state.txnDeadline = txnDeadline;
      }
    )
)