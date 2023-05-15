import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useActiveWeb3React} from './web3'
import {formatWeiToParsedNumber} from '../utils/formatWei'

export function usePositionTradingFee(marketAddress?: string, positionId?: string | number): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [value, setValue] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setValue(await peripheryContract.tradingFee(marketAddress, account, positionId))
      } catch (error) {
        console.error('market inside tradigFee: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return value
  }, [value])
}
