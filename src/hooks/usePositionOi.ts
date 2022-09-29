import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'
import {BigNumber, ethers} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

export function usePositionOi(
  marketAddress?: string,
  positionId?: string | number,
  baseTokenDecimals?: number | undefined,
  quoteTokenDecimals?: number | undefined,
): number | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [oi, setOi] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return
    ;(async () => {
      try {
        setOi(await peripheryContract.oi(marketAddress, account, positionId))
      } catch (error) {
        console.log('market inside usePositionOi: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, positionId, blockNumber, account])

  const marketTokensDecimalsDifference = useMemo(() => {
    if (!baseTokenDecimals && typeof baseTokenDecimals !== 'number') return undefined
    if (!quoteTokenDecimals && typeof quoteTokenDecimals !== 'number') return undefined
    const difference = baseTokenDecimals - quoteTokenDecimals
    return difference
  }, [baseTokenDecimals, quoteTokenDecimals])

  const parsedOi = useMemo(() => {
    if (!oi && !ethers.BigNumber.isBigNumber(oi)) return null
    return oi.div(ethers.constants.WeiPerEther)
  }, [oi])

  return useMemo(() => {
    console.log('parsedOi: ', parsedOi)
    if (!parsedOi) return undefined
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number') {
      return undefined
    } else {
      return formatBigNumberUsingDecimalsToNumber(parsedOi, marketTokensDecimalsDifference, 2)
    }
  }, [parsedOi, marketTokensDecimalsDifference])
}

export function usePositionOis(positionsCallData?: any) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()

  const callResult = useSingleContractMultipleData(peripheryContract, 'oi', positionsCallData)

  return useMemo(() => {
    return callResult.map(position => {
      const {loading, error, result} = position
      if (!chainId || !blockNumber || loading) return 'loading'
      if (error) console.error('Error from usePositionOis')
      const value = result && result[0]
      return formatWeiToParsedNumber(value, 18, 4)
    })
  }, [callResult, blockNumber, chainId])
}
