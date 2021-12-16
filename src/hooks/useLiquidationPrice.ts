import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { BigNumber } from "ethers";

// for longs:
// liq_price = (entryPrice / OI) * (MM * OI(0) + D)

// for short:
// liq_price = ( entryPrice / OI ) * ( 2 * OI - D - MM * OI(0) )

// OI = current open interest
// MM = marginMaintenance
// D = current debt
// OI(0) = open interest at entry

export function useLiquidationPrice(
  collateralManager?: any,
  market?: any,
  isLong?: boolean,
  entryPrice?: any,
  debt?: any,
  entryOi?: any,
) {
  const collateralManagerContract = useCollateralManagerContract();
  const [marginMaintenance, setMarginMaintenance] = useState();

  useEffect(() => {
    if (!collateralManagerContract || !market) return;

    (async () => {
      setMarginMaintenance(await collateralManagerContract.marginMaintenance(market))
    })();
  }, [collateralManagerContract, market])

  return useMemo(() => {
    return marginMaintenance;
  }, [marginMaintenance]);
}