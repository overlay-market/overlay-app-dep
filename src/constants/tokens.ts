import {Token, Ether, WETH9} from '@uniswap/sdk-core'
import {OVL_TOKEN_ADDRESS} from './addresses'
import {SupportedChainId} from './chains'
import {ContractAddresses} from './addresses'

export const OVL: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    OVL_TOKEN_ADDRESS[1],
    18,
    'OVL',
    'Overlay',
  ),
  [SupportedChainId.GÖRLI]: new Token(
    SupportedChainId.GÖRLI,
    OVL_TOKEN_ADDRESS[42],
    18,
    'OVL',
    'Overlay',
  ),
  [SupportedChainId.RINKEBY]: new Token(
    SupportedChainId.RINKEBY,
    OVL_TOKEN_ADDRESS[4],
    18,
    'OVL',
    'Overlay',
  ),
}

export const TOKEN_LABELS: {[tokenId in ContractAddresses | number]: string} = {
  [ContractAddresses.ETH_DAI]: 'ETH/DAI',
  [ContractAddresses.OVL_DAI]: 'OVL/DAI',
  [ContractAddresses.OVL_ETH]: 'OVL/ETH',
}
export class ExtendedEther extends Ether {
  // public get wrapped(): Token {
  //   if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]
  //   throw new Error('Unsupported chain ID')
  // }

  private static _cachedEther: {[chainId: number]: ExtendedEther} = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedEther[chainId] ?? (this._cachedEther[chainId] = new ExtendedEther(chainId))
  }
}
