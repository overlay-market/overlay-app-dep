import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants/chains';
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.KOVAN
];

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

// mainnet only
// export const walletconnect = new WalletConnectConnector({
//   // rpc: RPC,
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
//   pollingInterval: 15000,
// })