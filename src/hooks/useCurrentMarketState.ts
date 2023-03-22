import {CallState, Result} from './../state/multicall/hooks'
import {useMemo, useEffect} from 'react'
import {BigNumber} from 'ethers'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {AdditionalMarketData} from './useMarketDetails'
import {formatBigNumber} from '../utils/formatBigNumber'

interface MarketStateDetails {
  marketAddress: string
  bid: BigNumber
  ask: BigNumber
  mid: BigNumber
  volumeBid: BigNumber
  volumeAsk: BigNumber
  oiLong: BigNumber
  oiShort: BigNumber
  capOi: BigNumber
  circuitBreakerLevel: BigNumber
  fundingRate: BigNumber
}

interface ParsedMarketStateDetails extends MarketStateDetails {
  parsedBid: number
  parsedAsk: number
  parsedMid: number
  parsedOiLong: number
  parsedOiShort: number
  parsedCapOi: number
  parsedFundingRate: number
}

interface UseMarketStateResults {
  loading: boolean
  error: boolean
  markets: MarketStateDetails[] | undefined
}

export function useCurrentMarketState(marketsData: AdditionalMarketData[] | undefined) {
  const peripheryContract = useV1PeripheryContract()
  const inputs = useMemo(() => (marketsData ? marketsData.map(market => [market.id]) : []), [marketsData])
  const results = useSingleContractMultipleData(peripheryContract, 'marketState', inputs)
  const loading = useMemo(() => results.some(({loading}) => loading), [results])
  const error = useMemo(() => results.some(({error}) => error), [results])

  const markets = useMemo(() => {
    if (!loading && !error && marketsData) {
      return results.map((call, index) => {
        const market = marketsData[index]
        const result = call.result as Result

        return {
          ...market,
          bid: result.state_.bid,
          ask: result.state_.ask,
          mid: result.state_.mid,
          volumeBid: result.state_.volumeBid,
          volumeAsk: result.state_.volumeAsk,
          oiLong: result.state_.oiLong,
          oiShort: result.state_.oiShort,
          capOi: result.state_.capOi,
          circuitBreakerLevel: result.state_.circuitBreakerLevel,
          fundingRate: result.state_.fundingRate,
        }
      })
    }
    return undefined
  }, [loading, error, results, marketsData])

  return {
    loading,
    error,
    markets: markets?.map((market, index) => ({...market, marketAddress: inputs[index][0]})),
  }
}
