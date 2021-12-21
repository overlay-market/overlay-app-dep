import { Token, CurrencyAmount } from "@uniswap/sdk-core";
import { useMemo, useEffect, useState } from "react";
import { useBlockNumber } from "../state/application/hooks";
import { useTokenContract } from "./useContract";
import { utils, BigNumber } from "ethers";

export function useTokenAllowance(
  token?: Token,
  owner?: string,
  spender?: string
): BigNumber | undefined {
  const contract = useTokenContract(token?.address, false);
  const currentBlock = useBlockNumber();
  const [allowance, setAllowance] = useState<BigNumber>();

  useEffect(() => {
    if (!spender || !token || !contract) {
      return;
    }

    (async () => {
      setAllowance(await contract.allowance(owner, spender));
    })();
  }, [contract, owner, spender, token, currentBlock]);

  return useMemo(() => {
    return allowance;
  }, [allowance]);
}
