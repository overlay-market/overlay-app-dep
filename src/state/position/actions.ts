import { createAction } from '@reduxjs/toolkit';

export enum PositionSide { 
  LONG = 'LONG',
  SHORT = 'SHORT',
}
export const amountInput = createAction<{ inputValue: string }>('positions/amountInput');
export const leverageInput = createAction<{ leverageValue: number }>('positions/leverageInput');
export const positionSideInput = createAction<{ positionSide: PositionSide}>('positions/positionSideInput');