import { Token, CurrencyAmount } from '@uniswap/sdk-core';
import { useMemo, useEffect, useState } from 'react';
import { useSingleCallResult } from '../state/multicall/hooks';
import { useTokenContract } from './useContract';
import { utils, BigNumber } from 'ethers';

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): BigNumber | undefined {
  const contract = useTokenContract(token?.address, false);
  const [allowance, setAllowance] = useState<BigNumber>();

  useEffect(() => {
    if(!spender || !token || !contract) {
      return
    }

    (async () => {
      setAllowance(await contract.allowance(owner, spender));
    })();
  }, [contract, owner, spender, token])

  return allowance;
};
