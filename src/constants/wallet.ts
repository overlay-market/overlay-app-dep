import { AbstractConnector } from '@web3-react/abstract-connector';
import { injected } from '../connectors/connectors';
import METAMASK_ICON from '../assets/images/metamask.png';
import WALLET_CONNECT_ICON from '../assets/images/walletconnect.svg';

interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconURL: string
  description: string
  href: string | null
  primary?: true
  mobile?: true
  mobileOnly?: true
};

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconURL: 'empty',
    description: 'Injected web3 provider.',
    href: null,
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconURL: METAMASK_ICON,
    description: 'Easy-to-use browser extension.',
    href: null,
  },
  // WALLET_CONNECT: {
  //   connector: walletconnect,
  //   name: 'WalletConnect',
  //   iconURL: WALLETCONNECT_ICON,
  //   description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  //   href: null,
  //   color: '#4196FC',
  //   mobile: true,
  // }
};
