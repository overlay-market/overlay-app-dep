import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function useMarketOis(
  marketAddress?: string,
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [ois, setOis] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return;

    (async () => {
      try {
        setOis(await peripheryContract.ois(marketAddress))
      }
      catch (error) {
        console.log('market inside useMarketOis: ', marketAddress);
        console.error('error coming from useMarketOis: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, blockNumber, account]);

  return useMemo(() => {
    return ois;
  }, [ois]);
};