import { createReducer } from "@reduxjs/toolkit";
import { typeInput } from "./actions";

export interface UnwindState {
  readonly typedValue: string
};

export const initialState: UnwindState = {
  typedValue: ""
};

export default createReducer<UnwindState>(initialState, (builder) =>
  builder
    .addCase(
      typeInput, 
      (state, { payload: { typedValue} }) => {
        state.typedValue = typedValue;
      }
    )
);