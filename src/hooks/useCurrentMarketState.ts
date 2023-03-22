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

interface UseMarketStateResults {
  loading: boolean
  error: boolean
  markets: MarketStateDetails[] | undefined
}

export function useCurrentMarketState(marketsInput: AdditionalMarketData[] | undefined) {
  const peripheryContract = useV1PeripheryContract()
  const inputs = useMemo(() => (marketsInput ? marketsInput.map(market => [market.id]) : []), [marketsInput])
  const results = useSingleContractMultipleData(peripheryContract, 'marketState', inputs)

  const loading = useMemo(() => results.some(({loading}) => loading), [results])
  const error = useMemo(() => results.some(({error}) => error), [results])

  const markets = useMemo(() => {
    if (!loading && !error && marketsInput) {
      return results.map((call, index) => {
        const marketAddress = marketsInput[index]
        const result = call.result as Result

        console.log('test: ', formatBigNumber(result.state_.oiLong))

        return {
          marketAddress,
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
  }, [loading, error, results, marketsInput])

  return {
    loading,
    error,
    markets: markets?.map((market, index) => ({...market, marketAddress: inputs[index][0]})),
  }
}
