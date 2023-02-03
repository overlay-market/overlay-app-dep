import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useSingleCallResult, useMultipleContractSingleData} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useChainlinkFeedContract, useTokenContract} from './useContract'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import CHAINLINK_FEED_ABI from '../constants/abis/OverlayV1ChainlinkFeed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

//@dev: need to add in displaying market name based on Chainlink feeds
export function useMarketName(feedAddress?: string) {
  //keep constant here until we abstract function to determine feed type
  const GOERLI_CHAINLINK_FEED = '0x5c8AECf465e49C157725E7CAba047504bC90801C'

  const uniswapV3FeedContract = useUniswapV3FeedContract(feedAddress)
  const chainlinkFeedContract = useChainlinkFeedContract(feedAddress)

  const decimalsResult = useSingleCallResult(chainlinkFeedContract, 'decimals')

  const baseTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketBaseToken')
  const quoteTokenAddressResult = useSingleCallResult(uniswapV3FeedContract, 'marketQuoteToken')

  const decimals = decimalsResult.result?.[0]
  const baseTokenAddress = baseTokenAddressResult.result?.[0]
  const quoteTokenAddress = quoteTokenAddressResult.result?.[0]

  const baseTokenContract = useTokenContract(baseTokenAddress)
  const quoteTokenContract = useTokenContract(quoteTokenAddress)

  const baseTokenSymbolResult = useSingleCallResult(baseTokenContract, 'symbol')
  const quoteTokenSymbolResult = useSingleCallResult(quoteTokenContract, 'symbol')

  return {
    decimals: decimals ?? undefined,
    baseToken: baseTokenSymbolResult.result?.[0] ?? 'loading',
    quoteToken: quoteTokenSymbolResult.result?.[0] ?? 'loading',
    baseTokenAddress: baseTokenAddress && baseTokenAddress.toLowerCase(),
    quoteTokenAddress: quoteTokenAddress && quoteTokenAddress.toLowerCase(),
  }
}
const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)

export function useMarketNames(feedAddresses: any) {
  const baseTokens = useMultipleContractSingleData(
    feedAddresses,
    UNI_V3_FEED_INTERFACE,
    'marketBaseToken',
  )
  const quoteTokens = useMultipleContractSingleData(
    feedAddresses,
    UNI_V3_FEED_INTERFACE,
    'marketQuoteToken',
  )

  const baseTokenAddresses = useMemo(() => {
    if (baseTokens.length === 0) return []
    return baseTokens.map(token => {
      const address = token?.result && token.result[0]
      return address
    })
  }, [baseTokens])

  const quoteTokenAddresses = useMemo(() => {
    if (quoteTokens.length === 0) return []

    return quoteTokens.map(token => {
      const address = token?.result && token.result[0]
      return address
    })
  }, [quoteTokens])

  const baseTokenSymbols = useMultipleContractSingleData(
    baseTokenAddresses,
    ERC20_INTERFACE,
    'symbol',
  )
  const quoteTokenSymbols = useMultipleContractSingleData(
    quoteTokenAddresses,
    ERC20_INTERFACE,
    'symbol',
  )

  const marketBaseTokenSymbols = useMemo(() => {
    return baseTokenSymbols.map((token, index) => {
      if (token.loading === true || token === undefined) return 'loading'
      if (token?.result === undefined) return 'loading'
      return token?.result
    })
  }, [baseTokenSymbols])

  const marketQuoteTokenSymbols = useMemo(() => {
    return quoteTokenSymbols.map((token, index) => {
      if (token.loading === true || token === undefined) return 'loading'
      if (token?.result === undefined) return 'loading'
      return token?.result
    })
  }, [quoteTokenSymbols])

  return {
    baseTokens: marketBaseTokenSymbols,
    quoteTokens: marketQuoteTokenSymbols,
  }
}
