import { createAction } from "@reduxjs/toolkit";

export const updateMarkets = createAction<{ 
  marketsData: object | undefined
}>('/markets/updateMarkets');