import { Token } from '@uniswap/sdk-core';
import { OVL_ADDRESS } from './addresses';
import { SupportedChainId } from './chains';

export const OVL: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, OVL_ADDRESS[1], 18, 'OVL', 'Overlay'),
  [SupportedChainId.KOVAN]: new Token(SupportedChainId.KOVAN, OVL_ADDRESS[42], 18, 'OVL', 'Overlay'),
}