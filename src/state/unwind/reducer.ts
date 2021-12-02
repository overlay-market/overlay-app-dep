import { createReducer } from "@reduxjs/toolkit";
import { typeInput, selectPositionId, resetUnwindState } from "./actions";

export interface UnwindState {
  readonly typedValue: string
  readonly selectedPositionId: number | null
};

export const initialState: UnwindState = {
  typedValue: "",
  selectedPositionId: null
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
    .addCase(
      resetUnwindState,
      (state) => {
          state.typedValue = "";
          state.selectedPositionId = null;
      })
);