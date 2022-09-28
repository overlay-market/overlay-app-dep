import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {BigNumber} from 'ethers'
import {formatWeiToParsedNumber} from '../utils/formatWei'

// for longs:
// liq_price = (entryPrice / OI) * (MM * OI(0) + D)

// for short:
// liq_price = ( entryPrice / OI ) * ( 2 * OI - D - MM * OI(0) )

// OI = current open interest
// MM = marginMaintenance
// D = current debt
// OI(0) = open interest at entry

export function useLiquidationPrice(
  marketAddress?: string,
  positionId?: string | number,
): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [liquidationPrice, setLiquidationPrice] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setLiquidationPrice(
          await peripheryContract.liquidationPrice(marketAddress, account, positionId),
        )
      } catch (error) {
        console.log('market inside useLiquidationPrice: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  return useMemo(() => {
    return liquidationPrice
  }, [liquidationPrice])
}

export function useLiquidationPrices(calldata: any) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()
  const callResult = useSingleContractMultipleData(peripheryContract, 'liquidationPrice', calldata)
  return useMemo(() => {
    return callResult.map(position => {
      const {loading, error, result} = position
      if (!chainId || !blockNumber || loading) return 'loading'
      if (!loading && result === undefined) return 'Unwound'
      if (error) console.error('Error from useLiquidationPrices')
      const value = result && result[0]
      // return formatWeiToParsedNumber(value, 18, 4)
      return value
    })
  }, [callResult, blockNumber, chainId])
}
