import ChainlinkOracleLogo from '../assets/images/oracle-type-chainlink.png'
import UniswapOracleLogo from '../assets/images/oracle-type-uniswap.png'
import NFTPerpOracleLogo from '../assets/images/oracle-type-nftperp.png'
import OverlayOracleLogo from '../assets/images/oracle-type-overlay.png'

export type OracleMap = {[feedType: string]: string}

export enum FeedType {
  CHAINLINK = 'Chainlink',
  UNISWAP = 'Uniswap',
  NFTPERP = 'NFTPerp',
  OVERLAY = 'Overlay',
}

export const ORACLE_LOGO: OracleMap = {
  [FeedType.CHAINLINK]: ChainlinkOracleLogo,
  [FeedType.UNISWAP]: UniswapOracleLogo,
  [FeedType.NFTPERP]: NFTPerpOracleLogo,
  [FeedType.OVERLAY]: OverlayOracleLogo,
}
