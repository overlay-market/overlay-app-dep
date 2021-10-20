import { Token } from '@uniswap/sdk-core';
import { OVL_ADDRESS } from './addresses';
import { SupportedChainId } from './chains';
import { ContractAddresses } from './addresses';

export const OVL: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, OVL_ADDRESS[1], 18, 'OVL', 'Overlay'),
  [SupportedChainId.KOVAN]: new Token(SupportedChainId.KOVAN, OVL_ADDRESS[42], 18, 'OVL', 'Overlay'),
  [SupportedChainId.LOCALHOST]: new Token(SupportedChainId.LOCALHOST, OVL_ADDRESS[1337], 18, 'OVL', 'Overlay')
}

export const TOKEN_LABELS: { [tokenId in ContractAddresses | number]: string } = {
  [ContractAddresses.ETH_DAI]: 'ETH/DAI',
  [ContractAddresses.OVL_DAI]: 'OVL/DAI',
  [ContractAddresses.OVL_ETH]: 'OVL/ETH',
}
