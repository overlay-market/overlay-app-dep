import {useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useMultipleContractSingleData} from '../state/multicall/hooks'
import {useMarketBaseAmounts} from './useMarketBaseAmount'
import {useMarketQuoteAmounts} from './useMarketQuoteAmounts'
import {MarketData} from '../state/markets/hooks'
import {FeedType, ORACLE_LOGO} from '../constants/oracles'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import CHAINLINK_FEED_ABI from '../constants/abis/OverlayV1ChainlinkFeed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI)
const CHAINLINK_FEED_INTERFACE = new Interface(CHAINLINK_FEED_ABI)

export interface AdditionalMarketData extends MarketData {
  decimals: number | undefined
  decimalsDifference: number | undefined
  description: string | undefined
  type: FeedType | undefined
  oracleLogo: string | undefined
}

/**
 * Returns Decimal property of market (agnostic to Chainlink or Uniswap)
 * Returns Description property of market (name)
 * Returns what feed type market is using (Chainlink, Uniswap, NFTPerp, etc)
 * @param markets: array of MarketData type pulled from subgraph
 */
export function useMarketDetails(markets: MarketData[] | null | undefined): AdditionalMarketData[] {
  const inputs = useMemo(() => {
    return markets ? markets.map((market, index) => market.feedAddress) : []
  }, [markets])

  const chainlinkDecimals = useMultipleContractSingleData(inputs, CHAINLINK_FEED_INTERFACE, 'decimals')
  const chainlinkDescriptions = useMultipleContractSingleData(inputs, CHAINLINK_FEED_INTERFACE, 'description')

  const uniswapBaseTokenAddresses = useMultipleContractSingleData(inputs, UNI_V3_FEED_INTERFACE, 'marketBaseToken')
  const uniswapQuoteTokenAddresses = useMultipleContractSingleData(inputs, UNI_V3_FEED_INTERFACE, 'marketQuoteToken')

  const uniswapBaseTokens = useMemo(() => {
    let result = uniswapBaseTokenAddresses
    return Array.isArray(result) && result.length > 0
      ? result.map((token, index) => {
          const address: string = token?.result?.[0]
          return address
        })
      : []
  }, [uniswapBaseTokenAddresses])

  const uniswapQuoteTokens = useMemo(() => {
    let result = uniswapQuoteTokenAddresses
    return Array.isArray(result) && result.length > 0
      ? result.map((token, index) => {
          const address: string = token?.result?.[0]
          return address
        })
      : []
  }, [uniswapQuoteTokenAddresses])

  const uniswapBaseTokenSymbols = useMultipleContractSingleData(uniswapBaseTokens, ERC20_INTERFACE, 'symbol')
  const uniswapQuoteTokenSymbols = useMultipleContractSingleData(uniswapQuoteTokens, ERC20_INTERFACE, 'symbol')

  const uniswapBaseTokenDecimalAmounts = useMarketBaseAmounts(inputs)
  const uniswapQuoteTokenDecimalAmounts = useMarketQuoteAmounts(inputs)

  return useMemo(() => {
    return markets
      ? markets.map((market, index) => {
          const isChainlink: boolean = Boolean(Array.isArray(chainlinkDecimals) && chainlinkDecimals.length > 0 && chainlinkDecimals[index].result)
          const isUniswap: boolean = Boolean(
            Array.isArray(uniswapBaseTokenAddresses) && uniswapBaseTokenAddresses.length > 0 && uniswapBaseTokenAddresses[index].result,
          )

          // temporarily hardcode nftperp markets until we add identifier on smart contracts
          if (market.id === '0xb31d222c23104cbc2c04df77941f1f2c478133dd') {
            console.log('market.id: ', market.id)
            return {
              ...market,
              decimalsDifference: undefined,
              decimals: 18, //temporarily hardcode all nftperp markets for 18 decimals until v2
              description: String(chainlinkDescriptions[index].result),
              type: FeedType.NFTPERP,
              oracleLogo: ORACLE_LOGO[FeedType.NFTPERP],
            }
          } else if (isChainlink) {
            return {
              ...market,
              decimalsDifference: undefined,
              decimals: 18, //temporarily hardcode all chainlink markets for 18 decimals until v2
              description: String(chainlinkDescriptions[index].result),
              type: FeedType.CHAINLINK,
              oracleLogo: ORACLE_LOGO[FeedType.CHAINLINK],
            }
          } else if (isUniswap) {
            const baseToken = String(uniswapBaseTokenSymbols[index].result)
            const quoteToken = String(uniswapQuoteTokenSymbols[index].result)
            const baseTokenDecimalAmount: number = uniswapBaseTokenDecimalAmounts[index]
            const quoteTokenDecimalAmount: number = uniswapQuoteTokenDecimalAmounts[index]
            const uniswapDecimalsDifference = baseTokenDecimalAmount - quoteTokenDecimalAmount
            return {
              ...market,
              decimals: quoteTokenDecimalAmount,
              decimalsDifference: uniswapDecimalsDifference,
              description: `${baseToken} / ${quoteToken}`,
              type: FeedType.UNISWAP,
              oracleLogo: ORACLE_LOGO[FeedType.UNISWAP],
            }
          } else {
            return {
              ...market,
              decimals: undefined,
              decimalsDifference: undefined,
              description: undefined,
              type: undefined,
              oracleLogo: undefined,
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
