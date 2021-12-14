import { Token, CurrencyAmount } from "@uniswap/sdk-core";
import { useMemo, useEffect, useState } from "react";
import { useBlockNumber } from "../state/application/hooks";
import { useMarketContract } from "./useContract";
import { utils, BigNumber } from "ethers";
import { formatWeiToParsedNumber } from "../utils/formatWei";

export function useMarketImpactFee(
  marketAddress?: string | undefined,
  isLong?: boolean | undefined,
  oi?: BigNumber | undefined,
  oiCap?: BigNumber | undefined
){
  const marketContract = useMarketContract(marketAddress);
  const [lmbda, setLmbda] = useState<BigNumber>();
  const [pressure, setPressure] = useState<BigNumber>();

  useEffect(() => {
    if (!marketContract || isLong === undefined || !oi || !oiCap) return;

    (async () => {
      setPressure(await marketContract.pressure(isLong, oi, oiCap))
    })();
  }, [marketContract, isLong, oi, oiCap]);

  useEffect(() => {
    if (!marketContract) return;

    (async () => {
      setLmbda(await marketContract.lmbda())
    })();
  }, [marketContract]);

  return useMemo(() => {
    const parsedLmbda = lmbda ? formatWeiToParsedNumber(lmbda, 18, 18) : undefined;
    const parsedPressure = pressure ? formatWeiToParsedNumber(pressure, 18, 18) : undefined;
    const exponent = parsedLmbda && parsedPressure ? (-1 * parsedLmbda * parsedPressure) : undefined;

    const impactFee = exponent ? (1 - Math.E ** exponent) : undefined;

    return {
      lmbda,
      pressure,
      impactFee
    }
  }, [pressure, lmbda]);
};