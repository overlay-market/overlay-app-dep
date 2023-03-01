export declare enum ClaimId {
  BEACON_HOLDERS = 'beacon-holders',
  OVERLAY_USERS = 'overlay',
  GEARBOX_USERS = 'gearbox',
  SENSE_FINANCE_USERS = 'sense-finance',
  NFT_PERP_USERS = 'nft-perp',
  AMBIRE_WALLET_USERS = 'ambire-wallet',
  ELEMENT_FINANCE_USERS = 'element-finance',
  GMX_USERS = 'gmx',
  COW_SWAP_USERS = 'cow-swap',
  ARBITRUM_USERS = 'arbitrum',
}

export type ClaimMap = {[claimId: string]: string}

export const MERKLE_DISTIBUTOR_ADDRESSES: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]: '0xe00a6444686988C809bEa59bC8a18EA298a6A0a1',
  [ClaimId.OVERLAY_USERS]: '',
  [ClaimId.GEARBOX_USERS]: '',
  [ClaimId.SENSE_FINANCE_USERS]: '',
  [ClaimId.NFT_PERP_USERS]: '',
  [ClaimId.AMBIRE_WALLET_USERS]: '',
  [ClaimId.ELEMENT_FINANCE_USERS]: '',
  [ClaimId.GMX_USERS]: '',
  [ClaimId.COW_SWAP_USERS]: '',
  [ClaimId.ARBITRUM_USERS]: '',
}

export const MERKLE_PROOFS: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/DegenScore/src/treeInfo.json',
  [ClaimId.OVERLAY_USERS]: '',
  [ClaimId.GEARBOX_USERS]: '',
  [ClaimId.SENSE_FINANCE_USERS]: '',
  [ClaimId.NFT_PERP_USERS]: '',
  [ClaimId.AMBIRE_WALLET_USERS]: '',
  [ClaimId.ELEMENT_FINANCE_USERS]: '',
  [ClaimId.GMX_USERS]: '',
  [ClaimId.COW_SWAP_USERS]: '',
  [ClaimId.ARBITRUM_USERS]: '',
}
