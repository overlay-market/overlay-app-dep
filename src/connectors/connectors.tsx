import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains';

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.KOVAN
];

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

// export const walletconnect = new WalletConnectConnector({
//   supportedChainIds: SUPPORTED_CHAIN_IDS,
//   rpc: NETWORK_URLS,
//   bridge: WALLETCONNECT_BRIDGE_URL,
//   qrcode: true,
//   pollingInterval: 15000,
// });