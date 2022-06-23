import { createAction } from '@reduxjs/toolkit';

export enum PositionSide { 
  LONG = 'LONG',
  SHORT = 'SHORT',
};

export enum DefaultTxnSettings { 
  DEFAULT_SLIPPAGE = '1',
  DEFAULT_DEADLINE = '30'
};

export const typeInput = createAction<{ typedValue: string | undefined }>('positions/typeInput');
export const selectLeverage = createAction<{ selectedLeverage: string }>('positions/selectLeverage');
export const selectPositionSide = createAction<{ isLong: boolean }>('positions/selectPositionSide');
export const setSlippage = createAction<{ setSlippageValue: DefaultTxnSettings | string }>('positions/setSlippage');
export const setTxnDeadline = createAction<{ txnDeadline: DefaultTxnSettings | string  }>('positions/setTxnDeadline');
export const resetBuildState = createAction<void>('positions/resetBuildState');