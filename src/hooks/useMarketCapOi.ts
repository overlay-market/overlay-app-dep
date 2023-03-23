import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'
import {ethers} from 'ethers'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

/**
 * Returns cap oi for input market address
 * @param marketAddress address of market to query cap oi
 */
export function useMarketCapOi(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [capOi, setCapOi] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setCapOi(await peripheryContract.capOi(marketAddress))
      } catch (error) {
        console.log('market inside useMarketCapOi: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return capOi
  }, [capOi])
}
