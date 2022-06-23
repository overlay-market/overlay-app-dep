import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function usePositionDebt(
  marketAddress?: string,
  positionId?: string | number
): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [debt, setDebt] = useState<BigNumber>();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return;

    (async () => {
      try {
        setDebt(await peripheryContract.debt(marketAddress, account, positionId))
      }
      catch (error) {
        console.log('market inside usePositionDebt: ', marketAddress);
      }

    })();
  }, [peripheryContract, marketAddress, positionId, blockNumber, account]);

  return useMemo(() => {
    return debt;
  }, [debt]);
};