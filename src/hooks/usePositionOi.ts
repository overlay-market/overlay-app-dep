import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'
import {BigNumber, ethers} from 'ethers'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

interface oiResult {
  formattedOi: number | undefined
  rawOi: BigNumber | undefined
}

export function usePositionOi(
  marketAddress?: string,
  positionId?: string | number,
  baseTokenDecimals?: number | undefined,
  quoteTokenDecimals?: number | undefined,
  decimals?: any,
): oiResult {
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
        console.error('market inside usePositionOi: ', marketAddress)
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
    if (!parsedOi) {
      return {
        formattedOi: undefined,
        rawOi: undefined,
      }
    }
    if (decimals) {
      return {
        formattedOi: formatBigNumberUsingDecimalsToNumber(oi, 18, 4),
        rawOi: oi,
      }
    }
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number') {
      return {
        formattedOi: undefined,
        rawOi: undefined,
      }
    }
    if (marketTokensDecimalsDifference === 0) {
      return {
        formattedOi: formatBigNumberUsingDecimalsToNumber(oi, baseTokenDecimals, 4),
        rawOi: oi,
      }
    }
    return {
      formattedOi: formatBigNumberUsingDecimalsToNumber(parsedOi, marketTokensDecimalsDifference, 4),
      rawOi: oi,
    }

    // eslint-disable-next-line
  }, [parsedOi, marketTokensDecimalsDifference, oi, baseTokenDecimals])
}
