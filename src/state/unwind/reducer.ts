import { createReducer } from "@reduxjs/toolkit";
import { typeInput, selectPositionId } from "./actions";

export interface UnwindState {
  readonly typedValue: string
  readonly selectedPositionId: string | undefined
};

export const initialState: UnwindState = {
  typedValue: "",
  selectedPositionId: undefined
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