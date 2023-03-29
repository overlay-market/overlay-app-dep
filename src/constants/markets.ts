import BitcoinLogo from '../assets/images/tokens/bitcoin-logo.png'
import EthereumLogo from '../assets/images/tokens/ethereum-logo.png'
import LinkLogo from '../assets/images/tokens/link-logo.png'
import AvaxLogo from '../assets/images/tokens/avax-logo.png'
import SolanaLogo from '../assets/images/tokens/solana-logo.png'
import ApeLogo from '../assets/images/tokens/ape-logo.png'

export type DescriptionNameMap = {[description: string]: string}
export const MARKET_NAME_FROM_DESCRIPTION: DescriptionNameMap = {
  'Azuki Floor Price': 'Azuki/ WETH',
  'BAYC Floor Price': 'BAYC / WETH',
  'LINK / USD': 'LINK / USD',
  'WBTC / USD': 'WBTC / USD',
  'APE / USD': 'APE / USD',
  'SOL / USD': 'SOL / USD',
  'AVAX / USD': 'AVAX / USD',
  'MATIC / USD': 'MATIC / USD',
  'MCap1000 Feed': 'MCap1000',
  price: 'BAYC / WETH',
}

export type MarketNameAddressMap = {[marketAddress: string]: string}
export const MARKET_NAME_FROM_ADDRESS: MarketNameAddressMap = {
  '0xb31d222c23104cbc2c04df77941f1f2c478133dd': 'BAYC / WETH',
}

export type MarketLogoMap = {[marketBaseToken: string]: string}
export const MARKET_LOGO_FROM_BASE: MarketLogoMap = {
  WBTC: BitcoinLogo,
  BTC: BitcoinLogo,
  WETH: EthereumLogo,
  ETH: EthereumLogo,
  LINK: LinkLogo,
  AVAX: AvaxLogo,
  SOL: SolanaLogo,
  APE: ApeLogo,
  BAYC: ApeLogo,
}

export type CurrencyMap = {[marketQuoteToken: string]: string}
export const PRICE_CURRENCY_FROM_QUOTE: CurrencyMap = {
  USD: '$',
  USDC: '$',
  DAI: '$',
  ETH: 'Ξ',
  WETH: 'Ξ',
  AETH: 'Ξ',
}
