import {useMemo} from 'react'
import {AppState} from '../state'
import {useAppSelector} from '../hooks'
import {useMarketsQuery, useMarketQuery} from '../data/enhanced'
import {skipToken} from '@reduxjs/toolkit/dist/query'

export function useMarketsState(): AppState['markets'] {
  return useAppSelector(state => state.markets)
}

export function useMarketDataFromSubgraph(marketAddress: string | undefined | null) {
  const marketId: string = marketAddress ? marketAddress : ''

  return useMarketQuery(marketId ? {market: marketId} : skipToken, {
    pollingInterval: 12000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: false,
  })
}

export function useMarketData(marketAddress: string | undefined | null) {
  const marketData = useMarketDataFromSubgraph(marketAddress ? marketAddress : undefined)

  return {
    isLoading: marketData.isLoading,
    isFetching: marketData.isFetching,
    isUninitialized: marketData.isUninitialized,
    isError: marketData.isError,
    error: marketData.error,
    market: marketData.data?.market,
    refetch: marketData.refetch,
  }
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
