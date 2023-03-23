import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {BigNumber, utils, ethers} from 'ethers'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'

interface oiResult {
  formattedOi: number | undefined
  rawOi: BigNumber | undefined
}

export function useEstimatedBuildOi(
  marketAddress?: string,
  collateral?: any,
  leverage?: any,
  isLong?: any,
  decimals?: number | undefined,
  baseTokenDecimals?: number | undefined,
  quoteTokenDecimals?: number | undefined,
): oiResult {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [estimatedOi, setEstimatedOi] = useState<BigNumber>()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !collateral || collateral === '.' || !leverage || isLong === undefined || !account || !blockNumber)
      return
    let formatCollateral = utils.parseUnits(collateral)
    let formatLeverage = utils.parseUnits(leverage)

    ;(async () => {
      try {
        setEstimatedOi(await peripheryContract.oiEstimate(marketAddress, formatCollateral, formatLeverage, isLong))
      } catch (error) {
        console.error('error coming from useEstimatedBuildOi: ', error)
      }
    })()
  }, [peripheryContract, marketAddress, collateral, leverage, isLong, blockNumber, account])

  const marketTokensDecimalsDifference = useMemo(() => {
    if (!baseTokenDecimals && typeof baseTokenDecimals !== 'number') return undefined
    if (!quoteTokenDecimals && typeof quoteTokenDecimals !== 'number') return undefined
    const difference = baseTokenDecimals - quoteTokenDecimals
    return difference
  }, [baseTokenDecimals, quoteTokenDecimals])

  const parsedOi = useMemo(() => {
    if (!estimatedOi && !ethers.BigNumber.isBigNumber(estimatedOi)) return null
    return estimatedOi.div(ethers.constants.WeiPerEther)
  }, [estimatedOi])

  return useMemo(() => {
    if (!collateral || collateral === '.' || !parsedOi) {
      return {
        formattedOi: undefined,
        rawOi: undefined,
      }
    }
    if (!marketTokensDecimalsDifference && typeof marketTokensDecimalsDifference !== 'number' && !decimals) {
      return {
        formattedOi: undefined,
        rawOi: undefined,
      }
    }
    if (decimals) {
      return {
        formattedOi: formatBigNumberUsingDecimalsToNumber(estimatedOi, decimals, 4),
        rawOi: estimatedOi,
      }
    }
    if (marketTokensDecimalsDifference === 0) {
      return {
        formattedOi: formatBigNumberUsingDecimalsToNumber(estimatedOi, baseTokenDecimals, 4),
        rawOi: estimatedOi,
      }
    }
    return {
      formattedOi: formatBigNumberUsingDecimalsToNumber(parsedOi, decimals ?? marketTokensDecimalsDifference, 4),
      rawOi: estimatedOi,
    }
  }, [estimatedOi, collateral, parsedOi, marketTokensDecimalsDifference, baseTokenDecimals, decimals])
}
