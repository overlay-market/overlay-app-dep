export type DescriptionNameMap = {[description: string]: string}
export type MarketNameAddressMap = {[marketAddress: string]: string}

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

export const MARKET_NAME_FROM_ADDRESS: MarketNameAddressMap = {
  '0xb31d222c23104cbc2c04df77941f1f2c478133dd': 'BAYC / WETH',
}
