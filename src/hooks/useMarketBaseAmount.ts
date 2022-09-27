import {useEffect, useState, useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {
  useSingleCallResult,
  useMultipleContractSingleData,
  CallState,
} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useTokenContract} from './useContract'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)

export function useMarketBaseAmounts(feedAddresses: (string | undefined)[]): CallState[] {
  const callResult = useMultipleContractSingleData(
    feedAddresses,
    UNI_V3_FEED_INTERFACE,
    'marketBaseAmount',
  )

  return useMemo(() => {
    if (callResult.length === 0) return []

    return callResult
  }, [callResult])
}
