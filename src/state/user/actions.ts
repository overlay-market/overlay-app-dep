import {createAction} from '@reduxjs/toolkit'
import {SupportedLocale} from '../../constants/locales'

export const updateUserDarkMode = createAction<{userDarkMode: boolean}>('user/updateUserDarkMode')
export const updateMatchesDarkMode = createAction<{matchesDarkMode: boolean}>(
  'user/updateMatchesDarkMode',
)
export const updateUserLocale = createAction<{userLocale: SupportedLocale}>('user/updateUserLocale')
export const updateHideClosedPositions = createAction<{userHideClosedPositions: boolean}>(
  'user/hideClosedPositions',
)
