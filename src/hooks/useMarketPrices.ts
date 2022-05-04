import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function useMarketPrices(
  marketAddress?: string,
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [prices, setPrices] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return;

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