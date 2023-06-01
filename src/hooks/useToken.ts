import {useMemo} from 'react'
import {useActiveWeb3React} from './web3'
import {arrayify} from '@ethersproject/bytes'
import {parseBytes32String} from '@ethersproject/strings'
import {useTokenContract, useBytes32TokenContract} from './useContract'
import {isAddress} from '../utils/web3'
import {Token, Currency} from '@uniswap/sdk-core'
import {NEVER_RELOAD, useSingleCallResult} from '../state/multicall/hooks'
import {ExtendedEther} from '../constants/tokens'
import {SupportedChainId} from '../constants/chains'

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token
export function useToken(tokenAddress?: string | null): Token | undefined | null {
  const {chainId} = useActiveWeb3React()

  const formattedAddress = isAddress(tokenAddress)

  const tokenContract = useTokenContract(formattedAddress ? formattedAddress : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(formattedAddress ? formattedAddress : undefined, false)

  const tokenName = useSingleCallResult(tokenContract ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(tokenContractBytes32, 'name', undefined, NEVER_RELOAD)
  const symbol = useSingleCallResult(tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (typeof tokenAddress !== 'string' || !chainId || !formattedAddress) return undefined
    if (tokenAddress === null) return null
    if (!chainId || !formattedAddress) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        formattedAddress,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token'),
      )
    }
    return undefined
  }, [
    formattedAddress,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    tokenAddress,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useCurrency(currencyId: string | null | undefined): Currency | null | undefined {
  const {chainId} = useActiveWeb3React()
  const isETH = currencyId?.toUpperCase() === 'ETH'
  const token = useToken(isETH ? undefined : currencyId)
  const extendedEther = useMemo(
    () =>
      chainId
        ? ExtendedEther.onChain(chainId)
        : // display mainnet when not connected
          ExtendedEther.onChain(SupportedChainId.MAINNET),
    [chainId],
  )
  // const weth = chainId ? WETH9_EXTENDED[chainId] : undefined

  if (currencyId === null || currencyId === undefined) return currencyId
  // if (weth?.address?.toUpperCase() === currencyId?.toUpperCase()) return weth
  return isETH ? extendedEther : token
}
