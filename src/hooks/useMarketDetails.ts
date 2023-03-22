import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useMultipleContractSingleData} from '../state/multicall/hooks'
import {useMarketBaseAmounts} from './useMarketBaseAmount'
import {useMarketQuoteAmounts} from './useMarketQuoteAmounts'
import {MarketData} from '../state/markets/hooks'
import {Result} from '../state/multicall/hooks'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import CHAINLINK_FEED_ABI from '../constants/abis/OverlayV1ChainlinkFeed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)
const CHAINLINK_FEED_INTERFACE = new Interface(CHAINLINK_FEED_ABI)

export enum FeedType {
  CHAINLINK = 'Chainlink',
  UNISWAP = 'Uniswap',
  NFTPERP = 'NFTPerp',
}

export interface AdditionalMarketData extends MarketData {
  decimals: number | undefined
  description: Result | string | undefined
  type: FeedType | undefined
}

/**
 * Returns Decimal property of market (agnostic to Chainlink or Uniswap)
 * Returns Description property of market (name)
 * Returns what feed type market is using (Chainlink, Uniswap, NFTPerp, etc)
 * @param markets: array of MarketData type pulled from subgraph
 */
export function useMarketDetails(markets: MarketData[] | null | undefined): AdditionalMarketData[] {
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
      console.log('Contract call returned invalid data format')
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
              ...market,
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
              ...market,
              decimals: uniswapDecimals,
              description: `${baseToken} / ${quoteToken}`,
              type: FeedType.UNISWAP,
            }
          } else {
            return {
              ...market,
              decimals: undefined,
              description: undefined,
              type: undefined,
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
