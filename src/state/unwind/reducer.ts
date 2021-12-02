import { createReducer } from "@reduxjs/toolkit";
import { typeInput, selectPositionId } from "./actions";

export interface UnwindState {
  readonly typedValue: string
  readonly selectedPositionId: string
};

export const initialState: UnwindState = {
  typedValue: "",
  selectedPositionId: ""
};

export default createReducer<UnwindState>(initialState, (builder) =>
  builder
    .addCase(
      typeInput, 
      (state, { payload: { typedValue} }) => {
        state.typedValue = typedValue;
      })
    .addCase(
      selectPositionId,
      (state, { payload: { selectedPositionId } }) => {
        state.selectedPositionId = selectedPositionId;
      })
);