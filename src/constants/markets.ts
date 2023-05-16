import BitcoinLogo from '../assets/images/tokens/bitcoin-logo.png'
import EthereumLogo from '../assets/images/tokens/ethereum-logo.png'
import LinkLogo from '../assets/images/tokens/link-logo.png'
import AvaxLogo from '../assets/images/tokens/avax-logo.png'
import SolanaLogo from '../assets/images/tokens/solana-logo.png'
import ApeLogo from '../assets/images/tokens/ape-logo.png'
import MaticLogo from '../assets/images/tokens/matic-logo.png'
import BaycLogo from '../assets/images/tokens/bayc-logo.png'
import AzukiLogo from '../assets/images/tokens/azuki-logo.png'
import PudgyLogo from '../assets/images/tokens/pudgy-logo.png'
import PunkLogo from '../assets/images/tokens/punk-logo.png'
import MiladyLogo from '../assets/images/tokens/milady-logo.avif'
import MaycLogo from '../assets/images/tokens/mayc-logo.png'



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

export const marketNameFromDescription = (description: string | undefined, address: string = '') => {
  if (!description) {
    description = address
  }
  if (address === '0xb31d222c23104cbc2c04df77941f1f2c478133dd') {
    return 'BAYC / WETH'
  } else if (address === '0x35e1d28ad9d8a80cff5bbf163a735c54eb6c1342') {
    return 'AZUKI / WETH'
  } else if (address === "0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e") {
    return 'PUNKS / WETH'
  } else if (address === "0xce45c64911bd0a088daabd73ee1bc09ae98cd84b") {
    return 'MAYC / WETH'
  } else if (address === "0xccd645835ca0033f0c1106e7b24f288e59e867e8") {
    return 'MILADY / WETH'
  } else if (address === "0x8c7dc90243fc7984583339da8df0a5d57ec491db") {
    return 'PUDGY PENGUINS / WETH'
  } else {
    return MARKET_NAME_FROM_DESCRIPTION[description]
  }
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
  BAYC: BaycLogo,
  MATIC: MaticLogo,
  AZUKI: AzukiLogo,
  PUDGY: PudgyLogo,
  PUNKS: PunkLogo,
  MILADY: MiladyLogo,
  MAYC: MaycLogo,
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
