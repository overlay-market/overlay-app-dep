import {ChainId} from '@sushiswap/sdk'

export type AddressMap = {[chainId: number]: string}
export type IdMap = {[chainId: number]: number}

// @dev: check addresses below to ensure they arent testing addresses
export const LAYER_ZERO_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x72e0Ab15AA457B1d2639f9411eA395A94FA57dfa', //testing
  [ChainId.ARBITRUM]: '0x54dE374CE5e07C2F5a469f9bABA60D40eA142357', //testing
}

export const LAYER_ZERO_ENDPOINT_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675', //testing
  [ChainId.ARBITRUM]: '0x3c2269811836af69497e5f486a85d7316753cf62', //testing
}

export const LAYER_ZERO_DESTINATION_ID: IdMap = {
  [ChainId.MAINNET]: 101,
  [ChainId.ARBITRUM]: 110,
}
