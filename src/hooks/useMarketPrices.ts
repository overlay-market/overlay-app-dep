import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

export function useMarketPrice(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [prices, setPrices] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setPrices(await peripheryContract.prices(marketAddress))
      } catch (error) {
        console.error('market inside useMarketPrice: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return prices
  }, [prices])
}

/**
 *
 * @param marketAddresses array of market addresses to query market mid prices for
 * @returns market mid prices associated with input market addresses
 */
export function useMarketMidPrices(marketAddresses?: string[][], blockNumber?: number | undefined) {
  const peripheryContract = useV1PeripheryContract()
  const [midPrices] = useState([])

  useEffect(() => {
    if (!peripheryContract || !marketAddresses || !blockNumber) return

    const getPrices = async (marketAddress: string) => {
      return await peripheryContract.mid(marketAddress, {blockTag: blockNumber})
    }

    const requestPromises = marketAddresses.map(marketAddress => {
      const request = getPrices(marketAddress[0]).then(result => {
        return result
      })
      return request
    })

    Promise.all(requestPromises).then(results => {
      console.log('Promise returned from useMarketMidPrice', results)
    })
  }, [peripheryContract, marketAddresses, blockNumber])

  return useMemo(() => {
    return midPrices
  }, [midPrices])
}
