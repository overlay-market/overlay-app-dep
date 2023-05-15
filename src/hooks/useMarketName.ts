import {Interface} from '@ethersproject/abi'
import {useSingleCallResult} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useChainlinkFeedContract, useTokenContract} from './useContract'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import CHAINLINK_FEED_ABI from '../constants/abis/OverlayV1ChainlinkFeed.json'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)
const CHAINLINK_FEED_INTERFACE = new Interface(CHAINLINK_FEED_ABI)

//@dev: need to add in displaying market name based on Chainlink feeds
export function useMarketName(feedAddress?: string) {
  const uniswapV3FeedContract = useUniswapV3FeedContract(feedAddress)
  const chainlinkFeedContract = useChainlinkFeedContract(feedAddress)

  const decimalsResult = useSingleCallResult(chainlinkFeedContract, 'decimals')
  const descriptionResult = useSingleCallResult(chainlinkFeedContract, 'description')

  const baseTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketBaseToken')
  const quoteTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketQuoteToken')

  const decimals = decimalsResult.result?.[0]
  const description = descriptionResult.result?.[0]
  const baseTokenAddress = baseTokenAddressResult.result?.[0]
  const quoteTokenAddress = quoteTokenAddressResult.result?.[0]

  const baseTokenContract = useTokenContract(baseTokenAddress)
  const quoteTokenContract = useTokenContract(quoteTokenAddress)

  const baseTokenSymbolResult = useSingleCallResult(baseTokenContract, 'symbol')
  const quoteTokenSymbolResult = useSingleCallResult(quoteTokenContract, 'symbol')

  return {
    decimals: decimals ? 18 : undefined,
    description: description ?? undefined,
    baseToken: baseTokenSymbolResult.result?.[0] ?? 'loading',
    quoteToken: quoteTokenSymbolResult.result?.[0] ?? 'loading',
    baseTokenAddress: baseTokenAddress && baseTokenAddress.toLowerCase(),
    quoteTokenAddress: quoteTokenAddress && quoteTokenAddress.toLowerCase(),
  }
}
