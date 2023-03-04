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
  TESTING_A = 'testing-a',
  TESTING_B = 'testing-b',
}

export type ClaimMap = {[claimId: string]: string}

export const MERKLE_DISTIBUTOR_ADDRESSES: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]: '0xe00a6444686988C809bEa59bC8a18EA298a6A0a1',
  [ClaimId.OVERLAY]: '0x36D6136b9e0372Fe9dE42BD21311890bFb523246',
  [ClaimId.GEARBOX]: '',
  [ClaimId.SENSE_FINANCE]: '',
  [ClaimId.NFT_PERP]: '',
  [ClaimId.AMBIRE_WALLET]: '',
  [ClaimId.ELEMENT_FINANCE]: '',
  [ClaimId.GMX]: '',
  [ClaimId.COW_SWAP]: '',
  [ClaimId.ARBITRUM]: '',
  [ClaimId.TESTING_A]: '0xB5Fd24fB1C311b78626032F6734911c13Ab86E30',
  [ClaimId.TESTING_B]: '0xDC33c6E189cA5EB0aa684A85770582d49B60df60',
}

export const MERKLE_PROOFS: ClaimMap = {
  [ClaimId.BEACON_HOLDERS]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/DegenScore/src/treeInfo.json',
  [ClaimId.OVERLAY]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/OVL/src/treeInfo.json',
  [ClaimId.GEARBOX]: '',
  [ClaimId.SENSE_FINANCE]: '',
  [ClaimId.NFT_PERP]: '',
  [ClaimId.AMBIRE_WALLET]: '',
  [ClaimId.ELEMENT_FINANCE]: '',
  [ClaimId.GMX]: '',
  [ClaimId.COW_SWAP]: '',
  [ClaimId.ARBITRUM]: '',
  [ClaimId.TESTING_A]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/ovl-test/src/treeInfo.json',
  [ClaimId.TESTING_B]:
    'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/ovl-test/src/treeInfo.json',
}
