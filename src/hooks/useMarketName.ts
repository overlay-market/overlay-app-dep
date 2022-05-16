import { useMemo, useState, useEffect } from 'react';
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json';
import { useSingleContractMultipleData, useSingleCallResult } from '../state/multicall/hooks';
import { useUniswapV3Feed, useTokenContract } from './useContract';
import ERC20_INTERFACE from '../constants/abis/erc20';

export function useMarketName(feedAddress?: string) {
  const uniswapV3FeedContract = useUniswapV3Feed(feedAddress);

  const baseTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketBaseToken')
  const quoteTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketQuoteToken')

  const baseTokenAddress = baseTokenAddressResult.result?.[0];
  const quoteTokenAddress = quoteTokenAddressResult.result?.[0];

  const baseTokenContract = useTokenContract(baseTokenAddress);
  const quoteTokenContract = useTokenContract(quoteTokenAddress);

  const baseTokenSymbolResult = useSingleCallResult(baseTokenContract, 'symbol');
  const quoteTokenSymbolResult = useSingleCallResult(quoteTokenContract, 'symbol');

  return {
    baseToken: baseTokenSymbolResult.result?.[0] ?? 'loading',
    quoteToken: quoteTokenSymbolResult.result?.[0] ?? 'loading'
  }
}