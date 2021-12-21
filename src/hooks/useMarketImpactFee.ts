import { useMemo, useEffect, useState } from "react";
import { useBlockNumber } from "../state/application/hooks";
import { useMarketContract } from "./useContract";
import { BigNumber } from "ethers";
import { formatWeiToParsedNumber } from "../utils/formatWei";

export function useMarketImpactFee(
  marketAddress?: string | undefined,
  isLong?: boolean | undefined,
  oi?: BigNumber | undefined,
  oiCap?: BigNumber | undefined
){
  const marketContract = useMarketContract(marketAddress);
  const blockNumber = useBlockNumber();
  const [lmbda, setLmbda] = useState<BigNumber>();
  const [pressure, setPressure] = useState<BigNumber>();
  const [pbnj, setPbnj] = useState<BigNumber>();

  useEffect(() => {
    if (!marketContract || isLong === undefined || !oi || !oiCap || !blockNumber) return;

    (async () => {
      setPressure(await marketContract.pressure(isLong, oi, oiCap))
    })();
  }, [marketContract, isLong, oi, oiCap, blockNumber]);

  useEffect(() => {
    if (!marketContract || !blockNumber) return;

    (async () => {
      setLmbda(await marketContract.lmbda())
    })();
  }, [marketContract, blockNumber]);

  useEffect(() => {
    if (!marketContract || !blockNumber) return;

    (async () => {
      setPbnj(await marketContract.pbnj())
    })();
  }, [marketContract, blockNumber])

  return useMemo(() => {
    const parsedLmbda = lmbda ? formatWeiToParsedNumber(lmbda, 18, 18) : undefined;
    const parsedPressure = pressure ? formatWeiToParsedNumber(pressure, 18, 18) : undefined;
    const exponent = parsedLmbda && parsedPressure ? (-1 * parsedLmbda * parsedPressure) : undefined;

    const impactFee = exponent ? (1 - Math.E ** exponent) : undefined;

    return {
      lmbda,
      pressure,
      impactFee,
      pbnj
    }
  }, [pressure, lmbda, pbnj]);
};