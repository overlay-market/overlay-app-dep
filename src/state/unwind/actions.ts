import {createAction} from '@reduxjs/toolkit'

export enum DefaultTxnSettings {
  DEFAULT_SLIPPAGE = '1',
  DEFAULT_DEADLINE = '30',
}

export const typeInput = createAction<{typedValue: string}>('unwind/typeInput')
export const selectPositionId = createAction<{selectedPositionId: number | null}>('unwind/selectPositionId')
export const setSlippage = createAction<{setSlippageValue: DefaultTxnSettings | string}>('positions/setSlippage')
export const setTxnDeadline = createAction<{txnDeadline: DefaultTxnSettings | string}>('positions/setTxnDeadline')
export const resetUnwindState = createAction<void>('unwind/resetUnwindState')
