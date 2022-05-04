import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function usePositionOi(
  marketAddress?: string,
  positionId?: string | number
): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [oi, setOi] = useState<BigNumber>();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return;

    (async () => {
      try {
        setOi(await peripheryContract.oi(marketAddress, account, positionId))
      }
      catch (error) {
        console.log('market inside usePositionOi: ', marketAddress);
        console.error('error coming from usePositionOi: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, positionId, blockNumber, account]);

  return useMemo(() => {
    return oi;
  }, [oi]);
};