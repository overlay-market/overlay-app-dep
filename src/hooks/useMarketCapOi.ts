import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToNumber} from '../utils/formatWei'
import {ethers} from 'ethers'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'

/**
 * Returns cap oi for input market address
 * @param marketAddress address of market to query cap oi
 */
export function useMarketCapOi(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [capOi, setCapOi] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setCapOi(await peripheryContract.capOi(marketAddress))
      } catch (error) {
        console.log('market inside useMarketCapOi: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return capOi
  }, [capOi])
}

/**
 * Returns cap ois associated with input market addresses array
 * @param marketAddresses markets to query cap ois of
 */
export function useMarketCapOis(
  marketAddresses?: any,
  baseTokensAmounts?: any,
  quoteTokensAmounts?: any,
) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()

  const capOisResult = useSingleContractMultipleData(peripheryContract, 'capOi', marketAddresses)

  return useMemo(() => {
    return capOisResult.map((market, index) => {
      if (!chainId || !blockNumber || !market) return null
      if (!baseTokensAmounts[index] || !quoteTokensAmounts[index]) return null

      const sigFigs = 2
      let baseTokenQuoteTokenDecimalDifference = 0

      if (baseTokensAmounts[index] > quoteTokensAmounts[index]) {
        baseTokenQuoteTokenDecimalDifference = baseTokensAmounts[index] - quoteTokensAmounts[index]
      }

      const marketCapOi = market?.result && market.result[0]

      // if base token / quote token decimal difference is 0
      // then parse big number from ether to wei
      // else format value using decimal difference
      if (baseTokenQuoteTokenDecimalDifference === 0) {
        return formatWeiToParsedNumber(marketCapOi, 18, sigFigs)
      } else {
        const _capOi = marketCapOi ? marketCapOi.div(ethers.constants.WeiPerEther) : null

        return _capOi
          ? formatBigNumberUsingDecimalsToNumber(
              _capOi,
              baseTokenQuoteTokenDecimalDifference,
              sigFigs,
            )
          : undefined
      }
    })
  }, [capOisResult, blockNumber, chainId, baseTokensAmounts, quoteTokensAmounts])
}
