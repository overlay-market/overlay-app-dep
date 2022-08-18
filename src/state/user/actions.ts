import {createAction} from '@reduxjs/toolkit'
import {SupportedLocale} from '../../constants/locales'

export enum UserTermsOfServiceStatus {
  NEW_USER = 'NEW_USER',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export const updateUserTermsOfServiceStatus = createAction<{
  userTermsOfServiceStatus: UserTermsOfServiceStatus
}>('user/updateUserTermsOfServiceStatus')
export const updateUserDarkMode = createAction<{userDarkMode: boolean}>('user/updateUserDarkMode')
export const updateMatchesDarkMode = createAction<{matchesDarkMode: boolean}>(
  'user/updateMatchesDarkMode',
)
export const updateUserLocale = createAction<{userLocale: SupportedLocale}>('user/updateUserLocale')
