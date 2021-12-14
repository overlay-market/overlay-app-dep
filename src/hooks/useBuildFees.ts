import { BigNumber } from 'ethers';
import { useEffect, useState, useMemo } from "react";
import { useMothershipContract } from "./useContract";
import { useBlockNumber } from '../state/application/hooks';

export function useBuildFees() {
  const mothershipContract = useMothershipContract();
  const currentBlock = useBlockNumber();
  const [fees, setFees] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (!mothershipContract || !currentBlock) return;


    (async () => {
      setFees(await mothershipContract.fee());
    })()
  }
  , [currentBlock, mothershipContract]);

  return useMemo(() => {
    return fees;
  }, [fees])
}