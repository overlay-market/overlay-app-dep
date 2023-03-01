import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'
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
    if (!parsedOi) {
      return {
        formattedOi: undefined,
        rawOi: undefined,
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
      formattedOi: formatBigNumberUsingDecimalsToNumber(
        parsedOi,
        marketTokensDecimalsDifference,
        4,
      ),
      rawOi: oi,
    }
  }, [parsedOi, marketTokensDecimalsDifference, oi, baseTokenDecimals])
}

export function usePositionOis(
  positionsCallData?: any,
  baseTokensAmounts?: any,
  quoteTokensAmounts?: any,
  decimals?: any,
) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()

  const callResult = useSingleContractMultipleData(peripheryContract, 'oi', positionsCallData)

  return useMemo(() => {
    return callResult.map((position, index) => {
      const {loading, error, result} = position
      if (!chainId || !blockNumber || loading) return null
      if (!baseTokensAmounts[index] || !quoteTokensAmounts[index]) return null
      if (error) console.error('Error from usePositionOis')

      const sigFigs = 4
      const oi = result?.oi_ ? result.oi_ : undefined
      // temporarily divide all oi by 1e18 to account for fixed point library calculations in solidity
      const parsedOi = oi ? oi.div(ethers.constants.WeiPerEther) : undefined

      let baseTokenQuoteTokenDecimalDifference = 0

      if (baseTokensAmounts[index] > quoteTokensAmounts[index]) {
        baseTokenQuoteTokenDecimalDifference = baseTokensAmounts[index] - quoteTokensAmounts[index]
      }

      // if base token and quote token have same decimals,
      // no need to format again using decimal differences
      if (baseTokenQuoteTokenDecimalDifference === 0) {
        return formatWeiToParsedNumber(oi, baseTokensAmounts[index], sigFigs)
      } else {
        return parsedOi
          ? formatBigNumberUsingDecimalsToNumber(
              parsedOi,
              baseTokenQuoteTokenDecimalDifference,
              sigFigs,
            )
          : undefined
      }
    })
  }, [callResult, blockNumber, chainId, baseTokensAmounts, quoteTokensAmounts])
}
