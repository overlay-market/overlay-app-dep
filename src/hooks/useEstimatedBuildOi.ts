import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";
import { utils } from "ethers";

export function useEstimatedBuildOi(
  marketAddress?: string,
  collateral?: any,
  leverage?: any,
  isLong?: any
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [estimatedOi, setEstimatedOi] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !collateral || collateral === '.' || !leverage || isLong === undefined || !account || !blockNumber) return;
    let formatCollateral = utils.parseUnits(collateral);
    let formatLeverage = utils.parseUnits(leverage);

    (async () => {
      try {
        setEstimatedOi(await peripheryContract.oiEstimate(marketAddress, formatCollateral, formatLeverage, isLong))
      }
      catch (error) {
        console.error('error coming from useEstimatedBuildOi: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, collateral, leverage, isLong, blockNumber, account]);

  return useMemo(() => {
    if (!collateral || collateral === '.') return 0;
    return estimatedOi;
  }, [estimatedOi, collateral]);
};