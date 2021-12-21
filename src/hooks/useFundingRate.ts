import { useMemo, useEffect, useState } from "react";
import { useMarketContract } from "./useContract";
import { BigNumber } from "ethers";
import { formatWeiToParsedNumber } from "../utils/formatWei";
import { useBlockNumber } from "../state/application/hooks";
import { formatDecimalToPercentage } from "../utils/formatDecimal";

export function useFundingRate(
  marketAddress?: string
): number | undefined {
  const marketContract = useMarketContract(marketAddress);
  const blockNumber = useBlockNumber();
  const [k, setK] = useState<BigNumber>();

  useEffect(() => {
    if (!marketContract || !blockNumber) return;

    (async () => {
      setK(await marketContract.k())
    })();
  }, [marketContract, blockNumber]);

  return useMemo(() => {
    return k ? formatDecimalToPercentage(formatWeiToParsedNumber(k, 18, 6)) : undefined;
  }, [k])
}