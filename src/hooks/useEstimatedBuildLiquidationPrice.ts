import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";
import { utils, BigNumber } from "ethers";

export function useEstimatedBuildLiquidationPrice(
  marketAddress?: string,
  collateral?: any,
  leverage?: any,
  isLong?: any
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [estimatedLiquidationPrice, setEstimatedLiquidationPrice] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !collateral || collateral === '.' || !leverage || isLong === undefined || !account || !blockNumber) return;
    let formatCollateral = utils.parseUnits(collateral);
    let formatLeverage = utils.parseUnits(leverage);
    
    (async () => {
      try {
        setEstimatedLiquidationPrice(await peripheryContract.liquidationPriceEstimate(marketAddress, formatCollateral, formatLeverage, isLong))
      }
      catch (error) {
        console.error('error coming from useEstimatedBuildLiquidationPrice: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, collateral, leverage, isLong, blockNumber, account]);

  return useMemo(() => {
    return estimatedLiquidationPrice;
  }, [estimatedLiquidationPrice]);
};