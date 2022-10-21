import {BigNumberish} from 'ethers'
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

interface MarketFactoryData {
  id: string
}

export interface MarketData {
  id: string
  feedAddress: string
  factory: MarketFactoryData
  k: string
  lmbda: string
  delta: string
  capPayoff: string
  capNotional: string
  capLeverage: string
  circuitBreakerWindow: string
  maintenanceMarginBurnRate: string
  maintenanceMarginFraction: string
  liquidationFeeRate: string
  tradingFeeRate: string
  minCollateral: string
  priceDriftUpperLimit: string
  isShutdown: boolean
}

export function useMarketData(marketAddress: string | undefined | null): {
  isLoading: boolean
  isFetching: boolean
  isUninitialized: boolean
  isError: boolean
  error: unknown
  market: MarketData | null | undefined
  refetch: () => void
} {
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

export function useTotalMarketsDataFromSubgraph() {
  return useMarketsQuery(
    {},
    {
      pollingInterval: 12000,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      skip: false,
    },
  )
}

export function useTotalMarketsData(): {
  isLoading: boolean
  isFetching: boolean
  isUninitialized: boolean
  isError: boolean
  error: unknown
  markets: MarketData[] | null | undefined
  refetch: () => void
} {
  const totalMarketsData = useTotalMarketsDataFromSubgraph()

  return {
    isLoading: totalMarketsData.isLoading,
    isFetching: totalMarketsData.isFetching,
    isUninitialized: totalMarketsData.isUninitialized,
    isError: totalMarketsData.isError,
    error: totalMarketsData.error,
    markets: totalMarketsData.data?.markets,
    refetch: totalMarketsData.refetch,
  }
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
