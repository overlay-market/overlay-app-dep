import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {BigNumber} from 'ethers'
import {useMultipleContractSingleData} from '../state/multicall/hooks'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)

export function useMarketBaseAmounts(feedAddresses: (string | undefined)[]): number[] {
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
