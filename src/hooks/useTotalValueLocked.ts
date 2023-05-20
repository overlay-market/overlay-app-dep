import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import { ethers, BigNumber} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

export function useTotalValueLocked(positions: Array<{ marketAddress?: string, positionId?: string | number }>): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [value, setValue] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || positions.length <= 0 || !account || !blockNumber) return
    ;(async () => {
      try {
        const totalValue = await positions.reduce(async (accumulatorPromise, position) => {
          await accumulatorPromise;
          if (!position.marketAddress) return accumulatorPromise;

          const _value = await peripheryContract.value(position.marketAddress, account, position.positionId);
          return Promise.resolve(accumulatorPromise.then((accumulator) => accumulator.add(_value)));
        }, Promise.resolve(ethers.constants.Zero));

        setValue(totalValue);
      } catch (error) {
        console.error('market inside useTotalValueLocked: ', positions)
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peripheryContract, JSON.stringify(positions), blockNumber, account])

  return useMemo(() => {
    return value
  }, [value])
}
