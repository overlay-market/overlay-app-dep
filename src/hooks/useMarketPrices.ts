import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useSingleContractMultipleData } from "../state/multicall/hooks";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function useMarketPrice(
  marketAddress?: string,
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [prices, setPrices] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return;

    (async () => {
      try {
        setPrices(await peripheryContract.prices(marketAddress))
      }
      catch (error) {
        console.log('market inside useMarketPrice: ', marketAddress);
        console.error('error coming from useMarketPrice: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, blockNumber, account]);

  return useMemo(() => {
    return prices;
  }, [prices]);
};

export function useMarketPrices(marketAddresses?: any) {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();

  const pricesResult = useSingleContractMultipleData(peripheryContract, 'mid', marketAddresses);

  return useMemo(() => {
    return pricesResult.map((market) => {
      if (!chainId || !blockNumber || !market) return null;

      let marketPrice = market?.result && market.result[0];
      return marketPrice;
    })
  }, [pricesResult, blockNumber, chainId])


}