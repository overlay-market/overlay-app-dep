import {Token, Ether, WETH9} from '@uniswap/sdk-core'
import {OVL_TOKEN_ADDRESS, LL_TOKEN_ADDRESS} from './addresses'
import {SupportedChainId} from './chains'
import ETHEREUM_LOGO from '../assets/images/ethereum-logo.png'
import ARBITRUM_LOGO from '../assets/images/arbitrum-logo.png'

export const OVL: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, OVL_TOKEN_ADDRESS[1], 18, 'OVL', 'Overlay'),
  [SupportedChainId.GÖRLI]: new Token(SupportedChainId.GÖRLI, OVL_TOKEN_ADDRESS[5], 18, 'OVL', 'Overlay'),
  [SupportedChainId.RINKEBY]: new Token(SupportedChainId.RINKEBY, OVL_TOKEN_ADDRESS[4], 18, 'OVL', 'Overlay'),
  [SupportedChainId.ARBITRUM]: new Token(SupportedChainId.ARBITRUM, OVL_TOKEN_ADDRESS[42161], 18, 'OVL', 'Overlay'),
  [SupportedChainId.ARBITRUM_GÖRLI]: new Token(SupportedChainId.ARBITRUM_GÖRLI, OVL_TOKEN_ADDRESS[421613], 18, 'OVL', 'Overlay'),
}

export const NETWORK_LOGO: {[chainId: number]: string} = {
  [SupportedChainId.MAINNET]: ETHEREUM_LOGO,
  [SupportedChainId.ARBITRUM]: ARBITRUM_LOGO,
  [SupportedChainId.GÖRLI]: ETHEREUM_LOGO,
  [SupportedChainId.ARBITRUM_GÖRLI]: ARBITRUM_LOGO,
}

//@dev: remove LL Token addresses after bridge testing
export const LL: {[chainId: number]: Token} = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, LL_TOKEN_ADDRESS[1], 18, 'LL', 'lay'),
  [SupportedChainId.ARBITRUM]: new Token(SupportedChainId.ARBITRUM, LL_TOKEN_ADDRESS[42161], 18, 'LL', 'lay'),
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
