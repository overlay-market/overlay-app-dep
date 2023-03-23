import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {formatBigNumberUsingDecimalsToNumber, formatWeiToParsedNumber} from '../utils/formatWei'
import {ethers} from 'ethers'

/**
 * Returns open interest for input market address
 * @param marketAddress address of market to query for
 */
export function useMarketOi(marketAddress?: string, baseTokenDecimals?: any, quoteTokenDecimals?: any): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [ois, setOis] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setOis(await peripheryContract.ois(marketAddress))
      } catch (error) {
        console.error('error from useMarketOi hook: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return ois
  }, [ois])
}
