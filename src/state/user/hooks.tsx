import {useCallback} from 'react'
import {shallowEqual} from 'react-redux'
import {
  updateUserLocale,
  updateUserDarkMode,
  updateUserTermsOfServiceStatus,
  UserTermsOfServiceStatus,
} from './actions'
import {useAppSelector, useAppDispatch} from '../hooks'
import {SupportedLocale} from '../../constants/locales'

export function useIsDarkMode(): boolean {
  const {userDarkMode, matchesDarkMode} = useAppSelector(
    ({user: {matchesDarkMode, userDarkMode}}) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual,
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({userDarkMode: !darkMode}))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useUserTermsOfServiceStatus(): UserTermsOfServiceStatus {
  return useAppSelector(state => state.user.userTermsOfServiceStatus)
}

export function useUserTermsOfServiceStatusManager() {
  const dispatch = useAppDispatch()
  const status = useUserTermsOfServiceStatus()

  const setStatus = useCallback(
    (newStatus: UserTermsOfServiceStatus) => {
      dispatch(updateUserTermsOfServiceStatus({userTermsOfServiceStatus: newStatus}))
    },
    [dispatch],
  )

  return [status, setStatus]
}

export function useUserLocale(): SupportedLocale | null {
  return useAppSelector(state => state.user.userLocale)
}

export function useUserLocaleManager(): [
  SupportedLocale | null,
  (newLocale: SupportedLocale) => void,
] {
  const dispatch = useAppDispatch()
  const locale = useUserLocale()

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale({userLocale: newLocale}))
    },
    [dispatch],
  )

  return [locale, setLocale]
}
