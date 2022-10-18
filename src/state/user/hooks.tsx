import {useCallback} from 'react'
import {shallowEqual} from 'react-redux'
import {updateUserLocale, updateUserDarkMode, updateHideClosedPositions} from './actions'
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

export function useUserHideClosedPositions(): [boolean, (newHideClosedPositions: boolean) => void] {
  const dispatch = useAppDispatch()

  const hideClosedPositions = useAppSelector(state => state.user.userHideClosedPositions)

  const setHideClosedPositions = useCallback(
    (newHideClosedPositions: boolean) => {
      dispatch(updateHideClosedPositions({userHideClosedPositions: newHideClosedPositions}))
    },
    [dispatch],
  )

  return [hideClosedPositions, setHideClosedPositions]
}
