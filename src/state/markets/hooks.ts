import { useMemo } from "react";
import { useOVLFactoryContract, useMarketContract } from "../../hooks/useContract";
import { useSingleCallResult, useSingleContractMultipleData } from "../multicall/hooks";
import { useAllMarketsQuery } from "../data/enhanced";

export function useAllMarkets() {
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAllMarketsQuery({});

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      data
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])
};

export function useTotalMarkets() {
  const ovlFactoryContract = useOVLFactoryContract();

  // temporary calling allMarkets
  // 1 market live currently
  // update when more markets live
  const results = useSingleCallResult(
    ovlFactoryContract,
    "allMarkets",
    [0]
  );

  let marketList = results.result;
  if (!Array.isArray(marketList)) {
    // temp hardcode begin state
    marketList = ['0x018184E4F0D1760778F53e7675c578Ee3Fe2e778'];
  }

  return useActiveMarkets(marketList);
};

export function useActiveMarkets(
  addresses?: any
) {
  const ovlFactoryContract = useOVLFactoryContract();
  const results = useSingleContractMultipleData(
    ovlFactoryContract,
    "isMarket",
    [addresses]
  )

  return useMemo(
    () =>
      addresses?.reduce((memo:any, address:any, i:any) => {
        const isTrue = results?.[i];
        if (isTrue) {
          memo.push(address);
        }
        return memo;
      }, []),
      [addresses, results]
  )
  
  // return results;
};

export function useMarketData() {
  const marketContract = useMarketContract('0x018184E4F0D1760778F53e7675c578Ee3Fe2e778');

  const results = useSingleCallResult(
    marketContract,
    'lastPrice',
  )

  return results;
}
