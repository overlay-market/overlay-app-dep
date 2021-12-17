import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { BigNumber } from "ethers";
import { formatWeiToParsedNumber } from "../utils/formatWei";

// for longs:
// liq_price = (entryPrice / OI) * (MM * OI(0) + D)

// for short:
// liq_price = ( entryPrice / OI ) * ( 2 * OI - D - MM * OI(0) )

// OI = current open interest
// MM = marginMaintenance
// D = current debt
// OI(0) = open interest at entry

export function useLiquidationPrice(
  market?: any,
  isLong?: boolean,
  entryBidPrice?: any,
  entryAskPrice?: any,
  debt?: any,
  entryOi?: any,
  currentOi?: any
) {
  const collateralManagerContract = useCollateralManagerContract();
  const [marginMaintenance, setMarginMaintenance] = useState<BigNumber>();

  useEffect(() => {
    if (!collateralManagerContract || !market) return;

    (async () => {
      setMarginMaintenance(await collateralManagerContract.marginMaintenance(market))
    })();
  }, [collateralManagerContract, market]);

  return useMemo(() => {
    if (!marginMaintenance && isLong !== undefined && !entryBidPrice && !entryAskPrice && !debt && !entryOi && !currentOi) return;

    const parsedMarginMaintenance = marginMaintenance && formatWeiToParsedNumber(marginMaintenance, 18, 10);

    let liquidationPrice = 
    parsedMarginMaintenance ? (
      isLong ? ( (entryAskPrice / currentOi) * (parsedMarginMaintenance * entryOi + debt) ) 
      : ( (entryBidPrice / currentOi) * (2 * currentOi - debt - parsedMarginMaintenance + currentOi) )
    ) : undefined;

    return liquidationPrice;

  }, [marginMaintenance, isLong, entryBidPrice, entryAskPrice, debt, entryOi, currentOi]);
}