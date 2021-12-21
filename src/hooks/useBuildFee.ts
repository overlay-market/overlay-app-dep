import { BigNumber } from 'ethers';
import { useEffect, useState, useMemo } from "react";
import { useMothershipContract } from "./useContract";
import { useBlockNumber } from '../state/application/hooks';

export function useBuildFee(): BigNumber | null{
  const mothershipContract = useMothershipContract();
  const currentBlock = useBlockNumber();
  const [fee, setFee] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (!mothershipContract || !currentBlock) return;


    (async () => {
      setFee(await mothershipContract.fee());
    })()
  }
  , [currentBlock, mothershipContract]);

  return useMemo(() => {
    return fee;
  }, [fee])
}