import {createAction} from '@reduxjs/toolkit'

export const typeInput = createAction<{typedValue: string | undefined}>('build/typeInput')
