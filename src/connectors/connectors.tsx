import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains';

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.KOVAN
]

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
})