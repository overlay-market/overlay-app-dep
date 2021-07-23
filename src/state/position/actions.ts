import { createAction } from '@reduxjs/toolkit';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';

export enum PositionSide { 
  LONG = 'LONG',
  SHORT = 'SHORT',
}
export const amountInput = createAction<{ inputValue: CurrencyAmount<Currency> | string | undefined }>('positions/amountInput');
export const leverageInput = createAction<{ leverageValue: number }>('positions/leverageInput');
export const positionSideInput = createAction<{ positionSide: PositionSide}>('positions/positionSideInput');