import { createAction } from '@reduxjs/toolkit';

export enum PositionSide { 
  LONG = 'LONG',
  SHORT = 'SHORT',
};

export enum DefaultTxnSettings { 
  DEFAULT_SLIPPAGE = '1',
  DEFAULT_DEADLINE = '30'
};

export const typeInput = createAction<{ typedValue: string | undefined }>('build/typeInput');
export const selectLeverage = createAction<{ selectedLeverage: string }>('build/selectLeverage');
export const selectPositionSide = createAction<{ isLong: boolean }>('build/selectPositionSide');
export const setSlippage = createAction<{ setSlippageValue: DefaultTxnSettings | string }>('build/setSlippage');
export const setTxnDeadline = createAction<{ txnDeadline: DefaultTxnSettings | string  }>('build/setTxnDeadline');
export const resetBuildState = createAction<void>('build/resetBuildState');