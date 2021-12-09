import { createReducer } from "@reduxjs/toolkit";
import { CurrencyAmount, Currency } from "@uniswap/sdk-core";
import {
  DefaultTxnSettings,
  typeInput,
  selectLeverage,
  selectPositionSide,
  setSlippage,
  setTxnDeadline,
  resetBuildState
} from "./actions";
import { OVL_MARKET_ADDRESS } from "../../constants/addresses";
import { OVL } from "../../constants/tokens";

export interface PositionState {
  readonly typedValue: string | undefined;
  readonly selectedLeverage: number;
  readonly isLong: boolean | undefined;
  readonly inputCurrency: string | undefined;
  readonly setSlippageValue: DefaultTxnSettings | string;
  readonly txnDeadline: DefaultTxnSettings | string;
}

export const initialState: PositionState = {
  typedValue: "",
  selectedLeverage: 1,
  isLong: undefined,
  inputCurrency: OVL[1].address,
  setSlippageValue: "1",
  txnDeadline: "30",
};

export default createReducer<PositionState>(initialState, (builder) =>
  builder
    .addCase(typeInput, (state, { payload: { typedValue } }) => {
      state.typedValue = typedValue;
    })
    .addCase(selectLeverage, (state, { payload: { selectedLeverage } }) => {
      state.selectedLeverage = selectedLeverage;
    })
    .addCase(selectPositionSide, (state, { payload: { isLong } }) => {
      state.isLong = isLong;
    })
    .addCase(setSlippage, (state, action) => {
      state.setSlippageValue = action.payload.setSlippageValue;
    })
    .addCase(setTxnDeadline, (state, { payload: { txnDeadline } }) => {
      state.txnDeadline = txnDeadline;
    })
    .addCase(resetBuildState, (state) => {
      state.typedValue = initialState.typedValue;
      state.selectedLeverage = initialState.selectedLeverage;
      state.isLong = initialState.isLong;
      state.inputCurrency = initialState.inputCurrency;
      state.setSlippageValue = initialState.setSlippageValue;
      state.txnDeadline = initialState.txnDeadline;
    })
);
