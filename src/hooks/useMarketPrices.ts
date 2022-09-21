import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {formatWeiToParsedNumber} from '../utils/formatWei'

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
        console.log('market inside useMarketPrice: ', marketAddress)
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
export function useMarketMidPrices(marketAddresses?: any) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()

  const pricesResult = useSingleContractMultipleData(peripheryContract, 'mid', marketAddresses)

  return useMemo(() => {
    return pricesResult.map(market => {
      if (!chainId || !blockNumber || !market) return null
      const marketPrice = market?.result && market.result[0]
      return formatWeiToParsedNumber(marketPrice, 18, 18)
    })
  }, [pricesResult, blockNumber, chainId])
}
