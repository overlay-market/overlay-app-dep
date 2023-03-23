import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

export function usePositionCollateral(marketAddress?: string, positionId?: string | number): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [collateral, setCollateral] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setCollateral(await peripheryContract.collateral(marketAddress, account, positionId))
      } catch (error) {
        console.log('market inside usePositionCollateral: ', marketAddress)
        console.error('error coming from usePositionCollateral: ', error)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return collateral
  }, [collateral])
}
