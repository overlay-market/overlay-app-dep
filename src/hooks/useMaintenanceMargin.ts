import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";

export function useMaintenanceMargin(
  market?: any
): BigNumber | undefined {
  const collateralManagerContract = useCollateralManagerContract();
  const blockNumber = useBlockNumber();
  const [marginMaintenance, setMarginMaintenance] = useState<BigNumber>();

  useEffect(() => {
    if (!collateralManagerContract || !market) return;

    (async () => {
      setMarginMaintenance(await collateralManagerContract.marginMaintenance(market))
    })();
  }, [collateralManagerContract, market]);

  return useMemo(() => {
    return marginMaintenance;
  }, [marginMaintenance]);
};