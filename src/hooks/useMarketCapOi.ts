import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function useMarketCapOi(
  marketAddress?: string,
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [capOi, setCapOi] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return;

    (async () => {
      try {
        setCapOi(await peripheryContract.capOi(marketAddress))
      }
      catch (error) {
        console.log('market inside useMarketCapOi: ', marketAddress);
        console.error('error coming from useMarketCapOi: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, blockNumber, account]);

  return useMemo(() => {
    return capOi;
  }, [capOi]);
};