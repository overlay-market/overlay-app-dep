import { useMemo, useCallback, useEffect } from "react";
import { AppState } from "../state";
import { useAppSelector } from "../hooks";
import { useMarketsQuery, useMarketQuery } from "../data/enhanced";
import { useSingleCallResult, useSingleContractMultipleData } from "../multicall/hooks";


export function useMarketsState(): AppState['markets'] {
  return useAppSelector((state) => state.markets)
};

export function useMarket(marketAddress?: string) {
  let address = marketAddress ? marketAddress : '';

  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useMarketQuery({ market: address }, { pollingInterval: 15000 })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      marketData: data
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
}

export function useAllMarkets() {
  const { 
    isLoading, 
    isError, 
    error, 
    isUninitialized, 
    data } = useMarketsQuery({}, { pollingInterval: 15000 });

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      markets: data
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};

