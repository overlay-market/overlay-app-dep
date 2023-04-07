import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {formatWeiToParsedNumber} from '../utils/formatWei'

export function usePositionCost(marketAddress?: string, positionId?: string | number): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [cost, setCost] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setCost(await peripheryContract.cost(marketAddress, account, positionId))
      } catch (error) {
        console.log('market inside usePositionCost: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return cost
  }, [cost])
}
