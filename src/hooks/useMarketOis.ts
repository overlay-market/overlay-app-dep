import {useEffect, useState, useMemo} from 'react'
import {useV1PeripheryContract} from './useContract'
import {useSingleContractMultipleData} from '../state/multicall/hooks'
import {useBlockNumber} from '../state/application/hooks'
import {useActiveWeb3React} from './web3'
import {
  formatBigNumberUsingDecimalsToNumber,
  formatWeiToParsedNumber,
  formatWeiToParsedString,
} from '../utils/formatWei'
import {BigNumber, ethers} from 'ethers'

/**
 * Returns open interest for input market address
 * @param marketAddress address of market to query for
 */
export function useMarketOi(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {account} = useActiveWeb3React()
  const [ois, setOis] = useState()

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return
    ;(async () => {
      try {
        setOis(await peripheryContract.ois(marketAddress))
      } catch (error) {
        console.log('market inside useMarketOis: ', marketAddress)
      }
    })()
  }, [peripheryContract, marketAddress, blockNumber, account])

  return useMemo(() => {
    return ois
  }, [ois])
}

/**
 * Returns open interests for input market addresses
 * @param calldata marketAddresses to query for
 */
export function useMarketOis(calldata?: any, baseTokensAmounts?: any, quoteTokensAmounts?: any) {
  const peripheryContract = useV1PeripheryContract()
  const blockNumber = useBlockNumber()
  const {chainId} = useActiveWeb3React()
  const oisResult = useSingleContractMultipleData(peripheryContract, 'ois', calldata)

  return useMemo(() => {
    return oisResult.map((market, index) => {
      if (!chainId || !blockNumber || !market) return null
      if (!baseTokensAmounts[index] || !quoteTokensAmounts[index]) return null

      let baseTokenQuoteTokenDecimalDifference = 0

      if (baseTokensAmounts[index] > quoteTokensAmounts[index]) {
        baseTokenQuoteTokenDecimalDifference = baseTokensAmounts[index] - quoteTokensAmounts[index]
      }

      const marketOi = market?.result && market.result

      // temporarily divide all oi by 1e18 to account for fixed point library calculations in solidity
      const _oiLong = marketOi?.oiLong_ ? marketOi.oiLong_.div(ethers.constants.WeiPerEther) : null

      const _oiShort = marketOi?.oiShort_
        ? marketOi.oiShort_.div(ethers.constants.WeiPerEther)
        : null

      return {
        oiLong: _oiLong
          ? formatBigNumberUsingDecimalsToNumber(_oiLong, baseTokenQuoteTokenDecimalDifference, 4)
          : undefined,
        oiShort: _oiShort
          ? formatBigNumberUsingDecimalsToNumber(_oiShort, baseTokenQuoteTokenDecimalDifference, 4)
          : undefined,
      }
    })
  }, [oisResult, blockNumber, chainId, baseTokensAmounts, quoteTokensAmounts])
}
