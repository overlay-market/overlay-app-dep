import { useEffect, useState, useMemo } from "react";
import { useCollateralManagerContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { BigNumber } from "ethers";

export function usePositionValue(positionId: string | null): BigNumber | null {
  const collateralManagerContract = useCollateralManagerContract();
  const currentBlock = useBlockNumber();
  const [value, setValue] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (!positionId || !currentBlock || !collateralManagerContract) return;

    (async () => {
      setValue(await collateralManagerContract.value(positionId));
    })();
  }, [positionId, currentBlock, collateralManagerContract]);
  return useMemo(() => {
    return value;
  }, [value]);
}
