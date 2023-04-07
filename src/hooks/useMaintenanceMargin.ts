import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

export function useMaintenanceMargin(marketAddress?: string, positionId?: string | number): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [maintenanceMargin, setMaintenanceMargin] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setMaintenanceMargin(await peripheryContract.maintenanceMargin(marketAddress, account, positionId))
      } catch (error) {
        console.error('market inside useMaintenanceMargin: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return maintenanceMargin
  }, [maintenanceMargin])
}
