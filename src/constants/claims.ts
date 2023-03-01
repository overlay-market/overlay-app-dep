export declare enum ClaimId {
  BEACON_HOLDERS = 1,
  OVERLAY_USERS = 2,
  GEARBOX_USERS = 3,
  SENSE_FINANCE_USERS = 4,
  NFT_PERP_USERS = 5,
  AMBIRE_WALLET_USERS = 6,
  ELEMENT_FINANCE_USERS = 7,
  GMX_USERS = 8,
  COW_SWAP_USERS = 9,
  ARBITRUM_USERS = 10,
}

export type ClaimMap = {[claimId: number]: string}

export const MERKLE_DISTIBUTOR_ADDRESSES: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]: '',
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
  [ClaimId.BEACON_HOLDERS]: '',
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
