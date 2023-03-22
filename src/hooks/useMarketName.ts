import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useSingleCallResult, useMultipleContractSingleData} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useChainlinkFeedContract, useTokenContract} from './useContract'
import {useMarketBaseAmounts} from './useMarketBaseAmount'
import {useMarketQuoteAmounts} from './useMarketQuoteAmounts'
import {MarketData} from '../state/markets/hooks'
import {Result} from '../state/multicall/hooks'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import CHAINLINK_FEED_ABI from '../constants/abis/OverlayV1ChainlinkFeed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

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

enum FeedType {
  CHAINLINK = 'Chainlink',
  UNISWAP = 'Uniswap',
  NFTPERP = 'NFTPerp',
}

/**
 * Returns Decimal property of market (agnostic to Chainlink or Uniswap)
 * Returns Description property of market (name)
 * Returns what feed type market is using (Chainlink, Uniswap, NFTPerp, etc)
 * @param markets: array of MarketData type pulled from subgraph
 */
export function useMarketDetails(markets: MarketData[] | null | undefined) {
  const inputs = useMemo(() => {
    let marketAddresses: any = []
    let feedAddresses: any = []
    markets &&
      markets.forEach((market, index) => {
        marketAddresses[index] = market.id
        feedAddresses[index] = market.feedAddress
      })
    return {
      marketAddresses,
      feedAddresses,
    }
  }, [markets])

  const chainlinkDecimals = useMultipleContractSingleData(inputs.feedAddresses, CHAINLINK_FEED_INTERFACE, 'decimals')
  const chainlinkDescriptions = useMultipleContractSingleData(inputs.feedAddresses, CHAINLINK_FEED_INTERFACE, 'description')
  const uniswapBaseTokenAddresses = useMultipleContractSingleData(inputs.feedAddresses, UNI_V3_FEED_INTERFACE, 'marketBaseToken')
  const uniswapQuoteTokenAddresses = useMultipleContractSingleData(inputs.feedAddresses, UNI_V3_FEED_INTERFACE, 'marketQuoteToken')

  const uniswapTokenAddresses = useMemo(() => {
    let baseTokens: any = []
    let quoteTokens: any = []
    if (
      (Array.isArray(uniswapBaseTokenAddresses) && uniswapBaseTokenAddresses.length === 0) ||
      (Array.isArray(uniswapQuoteTokenAddresses) && uniswapQuoteTokenAddresses.length === 0)
    ) {
      return {
        baseTokens,
        quoteTokens,
      }
    }
    uniswapBaseTokenAddresses.forEach((token, index) => {
      baseTokens[index] = uniswapBaseTokenAddresses[index].result
      quoteTokens[index] = uniswapQuoteTokenAddresses[index].result
    })
    return {
      baseTokens,
      quoteTokens,
    }
  }, [uniswapBaseTokenAddresses, uniswapQuoteTokenAddresses])

  const uniswapBaseTokenSymbols = useMultipleContractSingleData(uniswapTokenAddresses.baseTokens, ERC20_INTERFACE, 'symbol')
  const uniswapQuoteTokenSymbols = useMultipleContractSingleData(uniswapTokenAddresses.quoteTokens, ERC20_INTERFACE, 'symbol')
  const uniswapBaseTokenDecimalAmounts = useMarketBaseAmounts(inputs.feedAddresses)
  const uniswapQuoteTokenDecimalAmounts = useMarketQuoteAmounts(inputs.feedAddresses)

  return useMemo(() => {
    return markets
      ? markets.map((market, index) => {
          const isChainlink: boolean = Boolean(Array.isArray(chainlinkDecimals) && chainlinkDecimals.length > 0 && chainlinkDecimals[index].result)
          const isUniswap: boolean = Boolean(
            Array.isArray(uniswapBaseTokenAddresses) && uniswapBaseTokenAddresses.length > 0 && uniswapBaseTokenAddresses[index].result,
          )

          if (isChainlink) {
            return {
              // decimals: chainlinkDecimals[index].result,
              decimals: 18, //temporarily hardcode all chainlink markets for 18 decimals until v2
              description: chainlinkDescriptions[index].result,
              type: FeedType.CHAINLINK,
            }
          } else if (isUniswap) {
            const baseToken = uniswapBaseTokenSymbols[index].result
            const quoteToken = uniswapQuoteTokenSymbols[index].result
            const baseTokenDecimalAmount: number = uniswapBaseTokenDecimalAmounts[index]
            const quoteTokenDecimalAmount: number = uniswapQuoteTokenDecimalAmounts[index]
            const uniswapDecimals = baseTokenDecimalAmount - quoteTokenDecimalAmount
            return {
              decimals: uniswapDecimals,
              description: `${baseToken} / ${quoteToken}`,
              type: FeedType.UNISWAP,
            }
          }
        })
      : []
  }, [
    markets,
    chainlinkDecimals,
    chainlinkDescriptions,
    uniswapBaseTokenDecimalAmounts,
    uniswapBaseTokenSymbols,
    uniswapQuoteTokenDecimalAmounts,
    uniswapBaseTokenAddresses,
    uniswapQuoteTokenSymbols,
  ])
}

export function useMarketNames(feedAddresses: any) {
  const decimals = useMultipleContractSingleData(feedAddresses, CHAINLINK_FEED_INTERFACE, 'decimals')

  const descriptions = useMultipleContractSingleData(feedAddresses, CHAINLINK_FEED_INTERFACE, 'description')

  const baseTokens = useMultipleContractSingleData(feedAddresses, UNI_V3_FEED_INTERFACE, 'marketBaseToken')
  const quoteTokens = useMultipleContractSingleData(feedAddresses, UNI_V3_FEED_INTERFACE, 'marketQuoteToken')

  const descriptionsResult = useMemo(() => {
    if (descriptions.length === 0) return []
    return descriptions.map(market => {
      const marketDescription = market?.result && market.result[0]
      return marketDescription
    })
  }, [descriptions])

  const decimalsResult = useMemo(() => {
    if (decimals.length === 0) return []
    return decimals.map(market => {
      const marketDecimal = market?.result && market.result[0]
      return marketDecimal
    })
  }, [decimals])

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

  const baseTokenSymbols = useMultipleContractSingleData(baseTokenAddresses, ERC20_INTERFACE, 'symbol')
  const quoteTokenSymbols = useMultipleContractSingleData(quoteTokenAddresses, ERC20_INTERFACE, 'symbol')

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
    decimals: decimalsResult,
    descriptions: descriptionsResult,
    baseTokens: marketBaseTokenSymbols,
    quoteTokens: marketQuoteTokenSymbols,
  }
}
