import { BigNumber } from 'ethers';
import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { useBlockNumber } from '../state/application/hooks';

export function useBuildFees() {
  const collateralManagerContract = useCollateralManagerContract();
  const currentBlock = useBlockNumber();
  const [fees, setFees] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (!collateralManagerContract || !currentBlock) return;

    (async () => {
      setFees(await collateralManagerContract.fees());
    })()
  }
  , [currentBlock, collateralManagerContract]);

  return useMemo(() => {
    return fees;
  }, [fees])
}