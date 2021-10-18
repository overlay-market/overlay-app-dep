import { createAction } from '@reduxjs/toolkit';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';

export enum PositionSide { 
  LONG = 'LONG',
  SHORT = 'SHORT',
};

export enum DefaultTxnSettings { 
  DEFAULT_SLIPPAGE = '0.3',
  DEFAULT_DEADLINE = '30'
};

export const amountInput = createAction<{ inputValue: string | undefined }>('positions/amountInput');
export const leverageInput = createAction<{ leverageValue: number }>('positions/leverageInput');
export const positionSideInput = createAction<{ positionSide: PositionSide}>('positions/positionSideInput');
export const slippageInput = createAction<{ slippageValue: DefaultTxnSettings | string | undefined }>('positions/slippageInput');
export const txnDeadlineInput = createAction<{ txnDeadline: DefaultTxnSettings | string | undefined }>('positions/txnDeadlineInput');