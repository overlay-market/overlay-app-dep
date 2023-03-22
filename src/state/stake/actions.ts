import {createAction} from '@reduxjs/toolkit'

export const typeInput = createAction<{typedValue: string | undefined}>('stake/typeInput')
export const selectAction = createAction<{isStake: boolean}>('stake/selectAction')
export const resetStakeState = createAction<void>('stake/resetStakeState')
