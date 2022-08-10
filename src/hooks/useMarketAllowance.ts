import {useMemo, useEffect, useState} from 'react'
import {useBlockNumber} from '../state/application/hooks'
import {useOvlTokenContract} from './useContract'
import {BigNumber} from 'ethers'

export function useMarketAllowance(
  market?: string,
  owner?: string,
): BigNumber | undefined {
  const contract = useOvlTokenContract()
  const currentBlock = useBlockNumber()
  const [allowance, setAllowance] = useState<BigNumber>()

  useEffect(() => {
    if (!market || !owner || !contract) {
      return
    }
    ;(async () => {
      setAllowance(await contract.allowance(owner, market))
    })()
  }, [market, owner, contract, currentBlock])

  return useMemo(() => {
    return allowance
  }, [allowance])
}
