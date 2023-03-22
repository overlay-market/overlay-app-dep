import {useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {useSingleCallResult} from '../state/multicall/hooks'

export function useFractionOfCapOi(market: any, oi: any) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()
  const callResult = useSingleCallResult(peripheryContract, 'fractionOfCapOi', [market, oi])

  return useMemo(() => {
    if (!chainId || !blockNumber || !callResult) return null
    return callResult?.result && callResult.result[0]
  }, [callResult, blockNumber, chainId])
}
