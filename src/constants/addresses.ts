import { ChainId } from '@sushiswap/sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap';

type AddressMap = { [chainId: number]: string }

export enum ContractAddresses {
  ETH_DAI = 1, //at launch
  OVL_DAI = 2, //at launch
  OVL_ETH = 3, //at launch
};

// archived contract addresses
export const OVL_ADDRESS: AddressMap = constructSameAddressMap('0x04346e29fDef5dc5A7822793d9f00B5db73D6532');
export const OVL_COLLATERAL_ADDRESS: AddressMap = constructSameAddressMap('0xc3d73beec840d95b0b70c660a9b8be2996b0cc17')
export const OVL_MARKET_ADDRESS: AddressMap = constructSameAddressMap('0x6f49162bc17eba2b926f789522269a0e0f2a5884')
export const OVL_MOTHERSHIP_ADDRESS: AddressMap = constructSameAddressMap('0xE15Ed9eb485Ec1B95c6F853cB57901629b0f1CF2');

// v1-core contract addresses
export const V1_PERIPHERY_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x074a05BE87Df3A9ae72CfC863A06cae7E4BbceD5', // TO-DO: Change
  [ChainId.KOVAN]: '0x074a05BE87Df3A9ae72CfC863A06cae7E4BbceD5',
  [ChainId.RINKEBY]: '0x11495884878A38709959e1102Ba0e559BE826F4e'
};

export const OVL_TOKEN_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x04020e4ff78b629d79ccbd163fc6044af73588dc', // TO-DO: Change
  [ChainId.KOVAN]: '0x04020e4ff78b629d79ccbd163fc6044af73588dc',
  [ChainId.RINKEBY]: '0x82913654067F94b72AEFB10dBC69Ff4Db3F16176'
};

export const MULTICALL2_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ROPSTEN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.RINKEBY]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.GÖRLI]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.KOVAN]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  [ChainId.ARBITRUM]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [ChainId.ARBITRUM_TESTNET]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
  [ChainId.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.BSC]: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.OKEX_TESTNET]: '',
};