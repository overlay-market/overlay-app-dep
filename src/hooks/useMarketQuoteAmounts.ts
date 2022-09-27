import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useMultipleContractSingleData} from '../state/multicall/hooks'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)

export function useMarketQuoteAmounts(feedAddresses: (string | undefined)[]): number[] {
  const callResult = useMultipleContractSingleData(
    feedAddresses,
    UNI_V3_FEED_INTERFACE,
    'marketQuoteToken',
  )

  const quoteTokens = useMemo(() => {
    if (callResult.length === 0) return []
    if (callResult[0].result?.[0] === 'undefined') return []
    return callResult.map(market => market.result?.[0])
  }, [callResult])

  const quoteTokenAmounts = useMultipleContractSingleData(quoteTokens, ERC20_INTERFACE, 'decimals')

  return useMemo(() => {
    if (quoteTokenAmounts.length === 0) return []
    return quoteTokenAmounts.map(market => {
      const decimals = market.result?.[0]
      return decimals
    })
  }, [quoteTokenAmounts])
}
