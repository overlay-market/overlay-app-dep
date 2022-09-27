import {useEffect, useState, useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {BigNumber} from 'ethers'
import {
  useSingleCallResult,
  useMultipleContractSingleData,
  CallState,
} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useTokenContract} from './useContract'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)

export function useMarketBaseAmounts(
  feedAddresses: (string | undefined)[],
): (BigNumber | undefined)[] {
  const callResult = useMultipleContractSingleData(
    feedAddresses,
    UNI_V3_FEED_INTERFACE,
    'marketBaseAmount',
  )

  return useMemo(() => {
    if (callResult.length === 0) return []

    return callResult.map(market => {
      const baseAmount = market.result?.[0]
      // convert baseAmount into decimal places of token
      if (BigNumber.isBigNumber(baseAmount)) return baseAmount.toString().length - 1
      else return market.result?.[0]
    })
  }, [callResult])
}
