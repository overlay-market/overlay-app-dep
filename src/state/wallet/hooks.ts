import {
  Currency,
  CurrencyAmount,
  JSBI,
  Token,
  TokenAmount,
} from "@sushiswap/sdk";
import { useMemo } from "react";
import { useActiveWeb3React } from "../../hooks/web3";

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
 export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount | undefined;
} {
  const multicallContract = useMulticallContract();

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  );

  const results = useSingleContractMultipleData(
    multicallContract,
    "getEthBalance",
    addresses.map((address) => [address])
  );

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>(
        (memo, address, i) => {
          const value = results?.[i]?.result?.[0];
          if (value)
            memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()));
          return memo;
        },
        {}
      ),
    [addresses, results]
  );
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const { chainId } = useActiveWeb3React();
  const tokens = useMemo(
    () =>
      currencies?.filter(
        (currency): currency is Token => currency instanceof Token
      ) ?? [],
    [currencies]
  );

  const tokenBalances = useTokenBalances(account, tokens);
  const containsETH: boolean = useMemo(
    () =>
      currencies?.some(
        (currency) => currency === Currency.getNativeCurrency(chainId)
      ) ?? false,
    [currencies]
  );
  const ethBalance = useETHBalances(containsETH ? [account] : []);

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined;
        if (currency instanceof Token) return tokenBalances[currency.address];
        if (currency === Currency.getNativeCurrency(chainId))
          return ethBalance[account];
        return undefined;
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  );
}

export function useCurrencyBalance(
  account?: string,
  currency?: Currency
): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0];
}