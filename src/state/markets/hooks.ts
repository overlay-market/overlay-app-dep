import {useMemo} from 'react'
import {AppState} from '../state'
import {useAppSelector} from '../hooks'
import {useMarketsQuery, useMarketQuery} from '../data/enhanced'

export function useMarketsState(): AppState['markets'] {
  return useAppSelector(state => state.markets)
}

export function useMarket(marketAddress?: string) {
  let address = marketAddress ? marketAddress : ''

  const {isLoading, isError, error, isUninitialized, data, refetch} = useMarketQuery(
    {market: address},
    {
      pollingInterval: 12000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  )

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      marketData: data,
      refetch,
    }
  }, [isLoading, isError, error, isUninitialized, data, refetch])
}

export function useAllMarkets() {
  const {isLoading, isError, error, isUninitialized, data, refetch} = useMarketsQuery(
    {},
    {
      pollingInterval: 12000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      skip: false,
    },
  )

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      markets: data,
      refetch,
    }
  }, [isLoading, isError, error, isUninitialized, data, refetch])
}
