import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";
import { ConsoleView } from "react-device-detect";

export function useMaintenanceMargin(
  market?: string
): BigNumber | undefined {
  const collateralManagerContract = useCollateralManagerContract();
  const blockNumber = useBlockNumber();
  const [marginMaintenance, setMarginMaintenance] = useState<BigNumber>();

  useEffect(() => {
    if (!collateralManagerContract || !market) return;

    (async () => {
      try {
        setMarginMaintenance(await collateralManagerContract.marginMaintenance(market))
      }
      catch (error) {
        console.log('market inside usemm: ', market);
        console.error('error coming from usemm: ', error);
      }

    })();
  }, [collateralManagerContract, market]);

  return useMemo(() => {
    return marginMaintenance;
  }, [marginMaintenance]);
};