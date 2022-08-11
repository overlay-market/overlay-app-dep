import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useActiveWeb3React} from './web3'
import {formatWeiToParsedNumber} from '../utils/formatWei'

export function usePositionValue(
  marketAddress?: string,
  positionId?: string | number,
): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [value, setValue] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setValue(await peripheryContract.value(marketAddress, account, positionId))
      } catch (error) {
        console.log('market inside usePositionValue: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return value
  }, [value])
}

export function usePositionValues(calldata: any[]) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()
  const callResult = useSingleContractMultipleData(peripheryContract, 'value', calldata)
  return useMemo(() => {
    return callResult.map(position => {
      const {loading, error, result} = position
      if (!chainId || !blockNumber || loading) return 'loading'
      if (error) console.error('Error from usePositionValues')
      const value = result && result[0]
      return formatWeiToParsedNumber(value, 18, 4)
    })
  }, [callResult, blockNumber, chainId])
}
