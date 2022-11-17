import {CallState, Result} from './../state/multicall/hooks'
import {useMemo, useEffect} from 'react'
import {BigNumber} from 'ethers'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'

interface MarketStateDetails {
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

function useMarketStateFromAddresses(marketAddresses: string[] | undefined): UseMarketStateResults {
  const peripheryContract = useV1PeripheryContract()
  const inputs = useMemo(
    () => (marketAddresses ? marketAddresses.map(marketAddress => [marketAddress]) : []),
    [marketAddresses],
  )
  const results = useSingleContractMultipleData(peripheryContract, 'marketState', inputs)

  const loading = useMemo(() => results.some(({loading}) => loading), [results])
  const error = useMemo(() => results.some(({error}) => error), [results])

  const markets = useMemo(() => {
    if (!loading && !error && marketAddresses) {
      return results.map((call, index) => {
        const marketAddress = marketAddresses[index]
        const result = call.result as Result

        return {
          marketAddress,
          bid: result.bid,
          ask: result.ask,
          mid: result.mid,
          volumeBid: result.volumeBid,
          volumeAsk: result.volumeAsk,
          oiLong: result.oiLong,
          oiShort: result.oiShort,
          capOi: result.capOi,
          circuitBreakerLevel: result.circuitBreakerLevel,
          fundingRate: result.fundingRate,
        }
      })
    }
    return undefined
  }, [loading, error, results, marketAddresses])

  return {
    loading,
    error,
    markets: markets?.map((market, index) => ({...market, marketAddress: inputs[index][0]})),
  }
}
