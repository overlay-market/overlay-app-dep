import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {ethers, BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useOpenPositionsFromSubgraph} from '../state/build/hooks'

export function useTotalValueLocked(account: string | null | undefined): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const [value, setValue] = useState<BigNumber>()
  const {data} = useOpenPositionsFromSubgraph(account, 1000, 0)
  useEffect(() => {
    let positions = data?.account?.positions
    if (!peripheryContract || !account || !blockNumber || !positions) return
    ;(async () => {
      try {
        const totalValue = await positions.reduce(async (accumulatorPromise: any, position) => {
          await accumulatorPromise
          if (!position.market.id) return accumulatorPromise

          const _value = await peripheryContract.value(position.market.id, account, position.positionId)
          return Promise.resolve(accumulatorPromise.then((accumulator: any) => accumulator.add(_value)))
        }, Promise.resolve(ethers.constants.Zero))

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
