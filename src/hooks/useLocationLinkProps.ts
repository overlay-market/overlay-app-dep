import useParsedQueryString from './useParsedQueryString'
import {stringify} from 'qs'
import {useLocation} from 'react-router-dom'
import {LocationDescriptor} from 'history'
import {SupportedLocale} from '../constants/locales'
import {useMemo} from 'react'

export function useLocationLinkProps(locale: SupportedLocale | null): {
  to?: LocationDescriptor
  onClick?: () => void
} {
  const location = useLocation()
  const qs = useParsedQueryString()

  return useMemo(
    () =>
      !locale
        ? {}
        : {
            to: {
              ...location,
              search: stringify({...qs, lng: locale}),
            },
          },
    [location, qs, locale],
  )
}
