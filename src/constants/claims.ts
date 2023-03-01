export enum ClaimId {
  BEACON_HOLDERS = 'beacon-holders',
  OVERLAY = 'overlay',
  GEARBOX = 'gearbox',
  SENSE_FINANCE = 'sense-finance',
  NFT_PERP = 'nft-perp',
  AMBIRE_WALLET = 'ambire-wallet',
  ELEMENT_FINANCE = 'element-finance',
  GMX = 'gmx',
  COW_SWAP = 'cow-swap',
  ARBITRUM = 'arbitrum',
}

export type ClaimMap = {[claimId: string]: string}

export const MERKLE_DISTIBUTOR_ADDRESSES: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]: '0xe00a6444686988C809bEa59bC8a18EA298a6A0a1',
  [ClaimId.OVERLAY]: '',
  [ClaimId.GEARBOX]: '',
  [ClaimId.SENSE_FINANCE]: '',
  [ClaimId.NFT_PERP]: '',
  [ClaimId.AMBIRE_WALLET]: '',
  [ClaimId.ELEMENT_FINANCE]: '',
  [ClaimId.GMX]: '',
  [ClaimId.COW_SWAP]: '',
  [ClaimId.ARBITRUM]: '',
}

export const MERKLE_PROOFS: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/DegenScore/src/treeInfo.json',
  [ClaimId.OVERLAY]: '',
  [ClaimId.GEARBOX]: '',
  [ClaimId.SENSE_FINANCE]: '',
  [ClaimId.NFT_PERP]: '',
  [ClaimId.AMBIRE_WALLET]: '',
  [ClaimId.ELEMENT_FINANCE]: '',
  [ClaimId.GMX]: '',
  [ClaimId.COW_SWAP]: '',
  [ClaimId.ARBITRUM]: '',
}
