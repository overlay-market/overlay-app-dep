import BitcoinLogo from '../assets/images/tokens/bitcoin-logo.png'
import EthereumLogo from '../assets/images/tokens/ethereum-logo.png'
import LinkLogo from '../assets/images/tokens/link-logo.png'
import AvaxLogo from '../assets/images/tokens/avax-logo.png'
import SolanaLogo from '../assets/images/tokens/solana-logo.png'
import ApeLogo from '../assets/images/tokens/ape-logo.png'
import MaticLogo from '../assets/images/tokens/matic-logo.png'
import BaycLogo from '../assets/images/tokens/bayc-logo.png'
import AzukiLogo from '../assets/images/tokens/azuki-logo.png'
import PudgyLogo from '../assets/images/tokens/pudgy-logo.avif'
import PunkLogo from '../assets/images/tokens/punk-logo.png'
import MiladyLogo from '../assets/images/tokens/milady-logo.avif'
import MaycLogo from '../assets/images/tokens/mayc-logo.png'
import BlueChipLogo from '../assets/images/tokens/Blue-Chip-NFT-logo.png'
import CVIXLogo from '../assets/images/tokens/Crypto-VIX-logo.png'

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
  'CV Index': 'Crypto Volatility Index',
  'NFT Blue Chip Total Market Cap-USD': 'NFT Blue Chip Index / USD',
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
  } else if (address === '0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e') {
    return 'PUNKS / WETH'
  } else if (address === '0xce45c64911bd0a088daabd73ee1bc09ae98cd84b') {
    return 'MAYC / WETH'
  } else if (address === '0xccd645835ca0033f0c1106e7b24f288e59e867e8') {
    return 'MILADY / WETH'
  } else if (address === '0x8c7dc90243fc7984583339da8df0a5d57ec491db') {
    return 'PUDGIES / WETH'
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
  PUDGIES: PudgyLogo,
  PUNKS: PunkLogo,
  MILADY: MiladyLogo,
  MAYC: MaycLogo,
  NFT: BlueChipLogo,
  Crypto: CVIXLogo,
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

export type MarketChartData = {
  contractAddress: string
  isNft: boolean
  schemaName?: string
}
export const MarketChartMap: {[name: string]: MarketChartData} = {
  'MILADY / WETH': {
    contractAddress: '0x28d45Df0D075f229aDcbAfF59Bf90d39e80D875E',
    isNft: true,
  },
  'PUDGIES / WETH': {
    contractAddress: '0xaD7d8b1BEAF28225bBDD7F76D2604decFD0B6013',
    isNft: true,
  },
  'PUNKS / WETH': {
    contractAddress: '0xB504aC5a974c0856732E6DB14589A0A7CC2199e8',
    isNft: true,
  },
  'BAYC / WETH': {
    contractAddress: '0x604Ed62F5991d6a2C47b13B9E5d34cC1C5048e99',
    isNft: true,
  },
  'MAYC / WETH': {
    contractAddress: '0x6BcCA37F6DEAcB3cfCA095f08F6d72C65D01992B',
    isNft: true,
  },
  'AZUKI / WETH': {
    contractAddress: '0xaf588bca9175cC4d6e981Ade462f0Af40331cb2e',
    isNft: true,
  },
  'WBTC / USD': {
    contractAddress: '0xb20bd22d3d2e5a628523d37b3ded569598eb649b',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'LINK / USD': {
    contractAddress: '0x9b8ddcf800a7bfcdebad6d65514de59160a2c9cc',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'SOL / USD': {
    contractAddress: '0x8c4308f7cbd7fb829645853cd188500d7da8610a',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'APE / USD': {
    contractAddress: '0x076577765a3e66db410ecc1372d0b0db503a42c5',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'AVAX / USD': {
    contractAddress: '0x0fc3657899693648bba4dbd2d8b33b82e875105d',
    isNft: false,
    schemaName: 'ethereum-mainnet', // arbitrum not available
  },
  'MATIC / USD': {
    contractAddress: '0xa4a2b2000d447cc1086d15c077730008b0251ffd',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'Crypto Volatility Index': {
    contractAddress: '0xb58AFa4be9B13D896E81D5355C961D2c33172099'.toLowerCase(),
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
  'NFT Blue Chip Index / USD': {
    contractAddress: '0x1a8220ac22762f08be1cd17ee3b6ffffe96c921c',
    isNft: false,
    schemaName: 'ethereum-mainnet-arbitrum-1',
  },
}
