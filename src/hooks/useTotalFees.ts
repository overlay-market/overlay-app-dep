import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {ethers, BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useOpenPositionsFromSubgraph} from '../state/build/hooks'

export function useTotalFees(account: string | null | undefined): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const [value, setValue] = useState<BigNumber>()
  const {data} = useOpenPositionsFromSubgraph(account, 1000, 0)

  useEffect(() => {
    let positions = data?.account?.positions
    if (!peripheryContract || !positions || !account || !blockNumber) return
    ;(async () => {
      try {
        let totalValue = ethers.constants.Zero
        for (let position of positions) {
          if (!position.market.id) continue
          let _value = await peripheryContract.tradingFee(position.market.id, account, position.positionId)
          totalValue = totalValue.add(_value)
        }
        setValue(totalValue)
      } catch (error) {
        console.error('market inside useTotalValueLocked: ', positions)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peripheryContract, JSON.stringify(data), blockNumber, account])

  return useMemo(() => {
    return value
  }, [value])
}
