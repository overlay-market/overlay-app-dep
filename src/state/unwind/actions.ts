import { createAction } from '@reduxjs/toolkit';

export const typeInput = createAction<{ typedValue: string }>('unwind/typeInput');
export const selectPositionId = createAction<{ selectedPositionId: number | null }>('unwind/selectPositionId');
export const resetUnwindState = createAction<void>('unwind/resetUnwindState');