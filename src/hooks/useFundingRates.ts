import { useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useSingleContractMultipleData } from "../state/multicall/hooks";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

/**
 * Returns funding rates associated with input market addresses
 * @param marketAddresses array of market addresses to query funding rates for
 */
export function useFundingRates(marketAddresses: any) {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();

  const fundingRatesResult = useSingleContractMultipleData(peripheryContract, 'fundingRate', marketAddresses);

  return useMemo(() => {
    return fundingRatesResult.map((market) => {
      if (!chainId || !blockNumber || !market) return null;

      let marketFundingRate = market?.result && market.result[0];
      return marketFundingRate;
    })
  }, [fundingRatesResult, blockNumber, chainId])
}