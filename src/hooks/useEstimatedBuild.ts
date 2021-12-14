import { utils, BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";
import { useMemo, useEffect, useState } from "react";
import { useMarketContract } from "./useContract";

export function useEstimatedBuild() {
  const marketContract = useMarketContract('0x6f49162bC17EbA2B926f789522269A0e0F2A5884');
  const currentBlock = useBlockNumber();
  const [estimatedBuild, setEstimatedBuild] = useState();

  useEffect(() => {
    if (!marketContract || !currentBlock) return;

    (async () => {
      setEstimatedBuild(await marketContract.enterOI( true, utils.parseUnits('5'), utils.parseUnits('1') ))
    })();
  }, [marketContract, currentBlock]);

  return useMemo(() => {
    return estimatedBuild;
  }, [estimatedBuild]);
};