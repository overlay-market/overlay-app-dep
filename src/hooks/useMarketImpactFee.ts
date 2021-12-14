import { Token, CurrencyAmount } from "@uniswap/sdk-core";
import { useMemo, useEffect, useState } from "react";
import { useBlockNumber } from "../state/application/hooks";
import { useMarketContract } from "./useContract";
import { utils, BigNumber } from "ethers";

export function useMarketImpactFee(
  marketAddress?: string | undefined,
  isLong?: boolean | undefined,
  oi?: BigNumber | undefined,
  oiCap?: BigNumber | undefined
) {
  const marketContract = useMarketContract('0x6f49162bC17EbA2B926f789522269A0e0F2A5884');
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
    return {
      lmbda,
      pressure
    }
  }, [pressure, lmbda]);
};