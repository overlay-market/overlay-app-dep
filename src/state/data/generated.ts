import { api } from './slice';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};




export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  positions: Array<Position>;
  builds: Array<Build>;
  unwinds: Array<Unwind>;
  liquidates: Array<Liquidate>;
};


export type AccountPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
};


export type AccountBuildsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Build_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Build_Filter>;
};


export type AccountUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Unwind_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Unwind_Filter>;
};


export type AccountLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Liquidate_Filter>;
};

export type Account_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  positions_?: Maybe<Position_Filter>;
  builds_?: Maybe<Build_Filter>;
  unwinds_?: Maybe<Unwind_Filter>;
  liquidates_?: Maybe<Liquidate_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Account_OrderBy {
  Id = 'id',
  Positions = 'positions',
  Builds = 'builds',
  Unwinds = 'unwinds',
  Liquidates = 'liquidates'
}



export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
  number_gte?: Maybe<Scalars['Int']>;
};

export type Build = {
  __typename?: 'Build';
  id: Scalars['ID'];
  owner: Account;
  positionId: Scalars['String'];
  currentOi: Scalars['BigInt'];
  currentDebt: Scalars['BigInt'];
  isLong: Scalars['Boolean'];
  price: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  value: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
};

export type Build_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_contains_nocase?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_contains_nocase?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_?: Maybe<Account_Filter>;
  positionId?: Maybe<Scalars['String']>;
  positionId_not?: Maybe<Scalars['String']>;
  positionId_gt?: Maybe<Scalars['String']>;
  positionId_lt?: Maybe<Scalars['String']>;
  positionId_gte?: Maybe<Scalars['String']>;
  positionId_lte?: Maybe<Scalars['String']>;
  positionId_in?: Maybe<Array<Scalars['String']>>;
  positionId_not_in?: Maybe<Array<Scalars['String']>>;
  positionId_contains?: Maybe<Scalars['String']>;
  positionId_contains_nocase?: Maybe<Scalars['String']>;
  positionId_not_contains?: Maybe<Scalars['String']>;
  positionId_not_contains_nocase?: Maybe<Scalars['String']>;
  positionId_starts_with?: Maybe<Scalars['String']>;
  positionId_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_starts_with?: Maybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_ends_with?: Maybe<Scalars['String']>;
  positionId_ends_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_ends_with?: Maybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: Maybe<Scalars['String']>;
  currentOi?: Maybe<Scalars['BigInt']>;
  currentOi_not?: Maybe<Scalars['BigInt']>;
  currentOi_gt?: Maybe<Scalars['BigInt']>;
  currentOi_lt?: Maybe<Scalars['BigInt']>;
  currentOi_gte?: Maybe<Scalars['BigInt']>;
  currentOi_lte?: Maybe<Scalars['BigInt']>;
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>;
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt?: Maybe<Scalars['BigInt']>;
  currentDebt_not?: Maybe<Scalars['BigInt']>;
  currentDebt_gt?: Maybe<Scalars['BigInt']>;
  currentDebt_lt?: Maybe<Scalars['BigInt']>;
  currentDebt_gte?: Maybe<Scalars['BigInt']>;
  currentDebt_lte?: Maybe<Scalars['BigInt']>;
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isLong?: Maybe<Scalars['Boolean']>;
  isLong_not?: Maybe<Scalars['Boolean']>;
  isLong_in?: Maybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_contains_nocase?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_contains_nocase?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_?: Maybe<Transaction_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Build_OrderBy {
  Id = 'id',
  Owner = 'owner',
  PositionId = 'positionId',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction'
}


export type Factory = {
  __typename?: 'Factory';
  id: Scalars['ID'];
  marketCount: Scalars['BigInt'];
  txCount: Scalars['BigInt'];
  totalVolumeOVL: Scalars['BigDecimal'];
  totalFeesOVL: Scalars['BigDecimal'];
  totalValueLockedOVL: Scalars['BigDecimal'];
  feeRecipient: Scalars['ID'];
  owner: Scalars['ID'];
  markets: Array<Market>;
};


export type FactoryMarketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
};

export type Factory_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  marketCount?: Maybe<Scalars['BigInt']>;
  marketCount_not?: Maybe<Scalars['BigInt']>;
  marketCount_gt?: Maybe<Scalars['BigInt']>;
  marketCount_lt?: Maybe<Scalars['BigInt']>;
  marketCount_gte?: Maybe<Scalars['BigInt']>;
  marketCount_lte?: Maybe<Scalars['BigInt']>;
  marketCount_in?: Maybe<Array<Scalars['BigInt']>>;
  marketCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount?: Maybe<Scalars['BigInt']>;
  txCount_not?: Maybe<Scalars['BigInt']>;
  txCount_gt?: Maybe<Scalars['BigInt']>;
  txCount_lt?: Maybe<Scalars['BigInt']>;
  txCount_gte?: Maybe<Scalars['BigInt']>;
  txCount_lte?: Maybe<Scalars['BigInt']>;
  txCount_in?: Maybe<Array<Scalars['BigInt']>>;
  txCount_not_in?: Maybe<Array<Scalars['BigInt']>>;
  totalVolumeOVL?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_not?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_gt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_lt?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_gte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_lte?: Maybe<Scalars['BigDecimal']>;
  totalVolumeOVL_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalVolumeOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalFeesOVL?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_not?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_gt?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_lt?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_gte?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_lte?: Maybe<Scalars['BigDecimal']>;
  totalFeesOVL_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalFeesOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalValueLockedOVL?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_not?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_gt?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_lt?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_gte?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_lte?: Maybe<Scalars['BigDecimal']>;
  totalValueLockedOVL_in?: Maybe<Array<Scalars['BigDecimal']>>;
  totalValueLockedOVL_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  feeRecipient?: Maybe<Scalars['ID']>;
  feeRecipient_not?: Maybe<Scalars['ID']>;
  feeRecipient_gt?: Maybe<Scalars['ID']>;
  feeRecipient_lt?: Maybe<Scalars['ID']>;
  feeRecipient_gte?: Maybe<Scalars['ID']>;
  feeRecipient_lte?: Maybe<Scalars['ID']>;
  feeRecipient_in?: Maybe<Array<Scalars['ID']>>;
  feeRecipient_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['ID']>;
  owner_not?: Maybe<Scalars['ID']>;
  owner_gt?: Maybe<Scalars['ID']>;
  owner_lt?: Maybe<Scalars['ID']>;
  owner_gte?: Maybe<Scalars['ID']>;
  owner_lte?: Maybe<Scalars['ID']>;
  owner_in?: Maybe<Array<Scalars['ID']>>;
  owner_not_in?: Maybe<Array<Scalars['ID']>>;
  markets_?: Maybe<Market_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Factory_OrderBy {
  Id = 'id',
  MarketCount = 'marketCount',
  TxCount = 'txCount',
  TotalVolumeOvl = 'totalVolumeOVL',
  TotalFeesOvl = 'totalFeesOVL',
  TotalValueLockedOvl = 'totalValueLockedOVL',
  FeeRecipient = 'feeRecipient',
  Owner = 'owner',
  Markets = 'markets'
}

export type Liquidate = {
  __typename?: 'Liquidate';
  id: Scalars['ID'];
  owner: Account;
  positionId: Scalars['String'];
  currentOi: Scalars['BigInt'];
  currentDebt: Scalars['BigInt'];
  isLong: Scalars['Boolean'];
  price: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  value: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
};

export type Liquidate_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_contains_nocase?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_contains_nocase?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_?: Maybe<Account_Filter>;
  positionId?: Maybe<Scalars['String']>;
  positionId_not?: Maybe<Scalars['String']>;
  positionId_gt?: Maybe<Scalars['String']>;
  positionId_lt?: Maybe<Scalars['String']>;
  positionId_gte?: Maybe<Scalars['String']>;
  positionId_lte?: Maybe<Scalars['String']>;
  positionId_in?: Maybe<Array<Scalars['String']>>;
  positionId_not_in?: Maybe<Array<Scalars['String']>>;
  positionId_contains?: Maybe<Scalars['String']>;
  positionId_contains_nocase?: Maybe<Scalars['String']>;
  positionId_not_contains?: Maybe<Scalars['String']>;
  positionId_not_contains_nocase?: Maybe<Scalars['String']>;
  positionId_starts_with?: Maybe<Scalars['String']>;
  positionId_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_starts_with?: Maybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_ends_with?: Maybe<Scalars['String']>;
  positionId_ends_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_ends_with?: Maybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: Maybe<Scalars['String']>;
  currentOi?: Maybe<Scalars['BigInt']>;
  currentOi_not?: Maybe<Scalars['BigInt']>;
  currentOi_gt?: Maybe<Scalars['BigInt']>;
  currentOi_lt?: Maybe<Scalars['BigInt']>;
  currentOi_gte?: Maybe<Scalars['BigInt']>;
  currentOi_lte?: Maybe<Scalars['BigInt']>;
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>;
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt?: Maybe<Scalars['BigInt']>;
  currentDebt_not?: Maybe<Scalars['BigInt']>;
  currentDebt_gt?: Maybe<Scalars['BigInt']>;
  currentDebt_lt?: Maybe<Scalars['BigInt']>;
  currentDebt_gte?: Maybe<Scalars['BigInt']>;
  currentDebt_lte?: Maybe<Scalars['BigInt']>;
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isLong?: Maybe<Scalars['Boolean']>;
  isLong_not?: Maybe<Scalars['Boolean']>;
  isLong_in?: Maybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_contains_nocase?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_contains_nocase?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_?: Maybe<Transaction_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Liquidate_OrderBy {
  Id = 'id',
  Owner = 'owner',
  PositionId = 'positionId',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction'
}

export type Market = {
  __typename?: 'Market';
  id: Scalars['ID'];
  feedAddress: Scalars['String'];
  factory: Factory;
  createdAtTimestamp: Scalars['BigInt'];
  createdAtBlockNumber: Scalars['BigInt'];
  k: Scalars['BigInt'];
  lmbda: Scalars['BigInt'];
  delta: Scalars['BigInt'];
  capPayoff: Scalars['BigInt'];
  capNotional: Scalars['BigInt'];
  capLeverage: Scalars['BigInt'];
  circuitBreakerWindow: Scalars['BigInt'];
  circuitBreakerMintTarget: Scalars['BigInt'];
  maintenanceMarginFraction: Scalars['BigInt'];
  maintenanceMarginBurnRate: Scalars['BigInt'];
  liquidationFeeRate: Scalars['BigInt'];
  tradingFeeRate: Scalars['BigInt'];
  minCollateral: Scalars['BigInt'];
  priceDriftUpperLimit: Scalars['BigInt'];
  averageBlockTime: Scalars['BigInt'];
  oiLong: Scalars['BigInt'];
  oiShort: Scalars['BigInt'];
  positions: Array<Position>;
  isShutdown: Scalars['Boolean'];
};


export type MarketPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
};

export type Market_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  feedAddress?: Maybe<Scalars['String']>;
  feedAddress_not?: Maybe<Scalars['String']>;
  feedAddress_gt?: Maybe<Scalars['String']>;
  feedAddress_lt?: Maybe<Scalars['String']>;
  feedAddress_gte?: Maybe<Scalars['String']>;
  feedAddress_lte?: Maybe<Scalars['String']>;
  feedAddress_in?: Maybe<Array<Scalars['String']>>;
  feedAddress_not_in?: Maybe<Array<Scalars['String']>>;
  feedAddress_contains?: Maybe<Scalars['String']>;
  feedAddress_contains_nocase?: Maybe<Scalars['String']>;
  feedAddress_not_contains?: Maybe<Scalars['String']>;
  feedAddress_not_contains_nocase?: Maybe<Scalars['String']>;
  feedAddress_starts_with?: Maybe<Scalars['String']>;
  feedAddress_starts_with_nocase?: Maybe<Scalars['String']>;
  feedAddress_not_starts_with?: Maybe<Scalars['String']>;
  feedAddress_not_starts_with_nocase?: Maybe<Scalars['String']>;
  feedAddress_ends_with?: Maybe<Scalars['String']>;
  feedAddress_ends_with_nocase?: Maybe<Scalars['String']>;
  feedAddress_not_ends_with?: Maybe<Scalars['String']>;
  feedAddress_not_ends_with_nocase?: Maybe<Scalars['String']>;
  factory?: Maybe<Scalars['String']>;
  factory_not?: Maybe<Scalars['String']>;
  factory_gt?: Maybe<Scalars['String']>;
  factory_lt?: Maybe<Scalars['String']>;
  factory_gte?: Maybe<Scalars['String']>;
  factory_lte?: Maybe<Scalars['String']>;
  factory_in?: Maybe<Array<Scalars['String']>>;
  factory_not_in?: Maybe<Array<Scalars['String']>>;
  factory_contains?: Maybe<Scalars['String']>;
  factory_contains_nocase?: Maybe<Scalars['String']>;
  factory_not_contains?: Maybe<Scalars['String']>;
  factory_not_contains_nocase?: Maybe<Scalars['String']>;
  factory_starts_with?: Maybe<Scalars['String']>;
  factory_starts_with_nocase?: Maybe<Scalars['String']>;
  factory_not_starts_with?: Maybe<Scalars['String']>;
  factory_not_starts_with_nocase?: Maybe<Scalars['String']>;
  factory_ends_with?: Maybe<Scalars['String']>;
  factory_ends_with_nocase?: Maybe<Scalars['String']>;
  factory_not_ends_with?: Maybe<Scalars['String']>;
  factory_not_ends_with_nocase?: Maybe<Scalars['String']>;
  factory_?: Maybe<Factory_Filter>;
  createdAtTimestamp?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  k?: Maybe<Scalars['BigInt']>;
  k_not?: Maybe<Scalars['BigInt']>;
  k_gt?: Maybe<Scalars['BigInt']>;
  k_lt?: Maybe<Scalars['BigInt']>;
  k_gte?: Maybe<Scalars['BigInt']>;
  k_lte?: Maybe<Scalars['BigInt']>;
  k_in?: Maybe<Array<Scalars['BigInt']>>;
  k_not_in?: Maybe<Array<Scalars['BigInt']>>;
  lmbda?: Maybe<Scalars['BigInt']>;
  lmbda_not?: Maybe<Scalars['BigInt']>;
  lmbda_gt?: Maybe<Scalars['BigInt']>;
  lmbda_lt?: Maybe<Scalars['BigInt']>;
  lmbda_gte?: Maybe<Scalars['BigInt']>;
  lmbda_lte?: Maybe<Scalars['BigInt']>;
  lmbda_in?: Maybe<Array<Scalars['BigInt']>>;
  lmbda_not_in?: Maybe<Array<Scalars['BigInt']>>;
  delta?: Maybe<Scalars['BigInt']>;
  delta_not?: Maybe<Scalars['BigInt']>;
  delta_gt?: Maybe<Scalars['BigInt']>;
  delta_lt?: Maybe<Scalars['BigInt']>;
  delta_gte?: Maybe<Scalars['BigInt']>;
  delta_lte?: Maybe<Scalars['BigInt']>;
  delta_in?: Maybe<Array<Scalars['BigInt']>>;
  delta_not_in?: Maybe<Array<Scalars['BigInt']>>;
  capPayoff?: Maybe<Scalars['BigInt']>;
  capPayoff_not?: Maybe<Scalars['BigInt']>;
  capPayoff_gt?: Maybe<Scalars['BigInt']>;
  capPayoff_lt?: Maybe<Scalars['BigInt']>;
  capPayoff_gte?: Maybe<Scalars['BigInt']>;
  capPayoff_lte?: Maybe<Scalars['BigInt']>;
  capPayoff_in?: Maybe<Array<Scalars['BigInt']>>;
  capPayoff_not_in?: Maybe<Array<Scalars['BigInt']>>;
  capNotional?: Maybe<Scalars['BigInt']>;
  capNotional_not?: Maybe<Scalars['BigInt']>;
  capNotional_gt?: Maybe<Scalars['BigInt']>;
  capNotional_lt?: Maybe<Scalars['BigInt']>;
  capNotional_gte?: Maybe<Scalars['BigInt']>;
  capNotional_lte?: Maybe<Scalars['BigInt']>;
  capNotional_in?: Maybe<Array<Scalars['BigInt']>>;
  capNotional_not_in?: Maybe<Array<Scalars['BigInt']>>;
  capLeverage?: Maybe<Scalars['BigInt']>;
  capLeverage_not?: Maybe<Scalars['BigInt']>;
  capLeverage_gt?: Maybe<Scalars['BigInt']>;
  capLeverage_lt?: Maybe<Scalars['BigInt']>;
  capLeverage_gte?: Maybe<Scalars['BigInt']>;
  capLeverage_lte?: Maybe<Scalars['BigInt']>;
  capLeverage_in?: Maybe<Array<Scalars['BigInt']>>;
  capLeverage_not_in?: Maybe<Array<Scalars['BigInt']>>;
  circuitBreakerWindow?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_not?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_gt?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_lt?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_gte?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_lte?: Maybe<Scalars['BigInt']>;
  circuitBreakerWindow_in?: Maybe<Array<Scalars['BigInt']>>;
  circuitBreakerWindow_not_in?: Maybe<Array<Scalars['BigInt']>>;
  circuitBreakerMintTarget?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_not?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_gt?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_lt?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_gte?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_lte?: Maybe<Scalars['BigInt']>;
  circuitBreakerMintTarget_in?: Maybe<Array<Scalars['BigInt']>>;
  circuitBreakerMintTarget_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maintenanceMarginFraction?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_not?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_gt?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_lt?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_gte?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_lte?: Maybe<Scalars['BigInt']>;
  maintenanceMarginFraction_in?: Maybe<Array<Scalars['BigInt']>>;
  maintenanceMarginFraction_not_in?: Maybe<Array<Scalars['BigInt']>>;
  maintenanceMarginBurnRate?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_not?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_gt?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_lt?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_gte?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_lte?: Maybe<Scalars['BigInt']>;
  maintenanceMarginBurnRate_in?: Maybe<Array<Scalars['BigInt']>>;
  maintenanceMarginBurnRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidationFeeRate?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_not?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_gt?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_lt?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_gte?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_lte?: Maybe<Scalars['BigInt']>;
  liquidationFeeRate_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidationFeeRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  tradingFeeRate?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_not?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_gt?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_lt?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_gte?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_lte?: Maybe<Scalars['BigInt']>;
  tradingFeeRate_in?: Maybe<Array<Scalars['BigInt']>>;
  tradingFeeRate_not_in?: Maybe<Array<Scalars['BigInt']>>;
  minCollateral?: Maybe<Scalars['BigInt']>;
  minCollateral_not?: Maybe<Scalars['BigInt']>;
  minCollateral_gt?: Maybe<Scalars['BigInt']>;
  minCollateral_lt?: Maybe<Scalars['BigInt']>;
  minCollateral_gte?: Maybe<Scalars['BigInt']>;
  minCollateral_lte?: Maybe<Scalars['BigInt']>;
  minCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  minCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  priceDriftUpperLimit?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_not?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_gt?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_lt?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_gte?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_lte?: Maybe<Scalars['BigInt']>;
  priceDriftUpperLimit_in?: Maybe<Array<Scalars['BigInt']>>;
  priceDriftUpperLimit_not_in?: Maybe<Array<Scalars['BigInt']>>;
  averageBlockTime?: Maybe<Scalars['BigInt']>;
  averageBlockTime_not?: Maybe<Scalars['BigInt']>;
  averageBlockTime_gt?: Maybe<Scalars['BigInt']>;
  averageBlockTime_lt?: Maybe<Scalars['BigInt']>;
  averageBlockTime_gte?: Maybe<Scalars['BigInt']>;
  averageBlockTime_lte?: Maybe<Scalars['BigInt']>;
  averageBlockTime_in?: Maybe<Array<Scalars['BigInt']>>;
  averageBlockTime_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLong?: Maybe<Scalars['BigInt']>;
  oiLong_not?: Maybe<Scalars['BigInt']>;
  oiLong_gt?: Maybe<Scalars['BigInt']>;
  oiLong_lt?: Maybe<Scalars['BigInt']>;
  oiLong_gte?: Maybe<Scalars['BigInt']>;
  oiLong_lte?: Maybe<Scalars['BigInt']>;
  oiLong_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLong_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShort?: Maybe<Scalars['BigInt']>;
  oiShort_not?: Maybe<Scalars['BigInt']>;
  oiShort_gt?: Maybe<Scalars['BigInt']>;
  oiShort_lt?: Maybe<Scalars['BigInt']>;
  oiShort_gte?: Maybe<Scalars['BigInt']>;
  oiShort_lte?: Maybe<Scalars['BigInt']>;
  oiShort_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShort_not_in?: Maybe<Array<Scalars['BigInt']>>;
  positions_?: Maybe<Position_Filter>;
  isShutdown?: Maybe<Scalars['Boolean']>;
  isShutdown_not?: Maybe<Scalars['Boolean']>;
  isShutdown_in?: Maybe<Array<Scalars['Boolean']>>;
  isShutdown_not_in?: Maybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Market_OrderBy {
  Id = 'id',
  FeedAddress = 'feedAddress',
  Factory = 'factory',
  CreatedAtTimestamp = 'createdAtTimestamp',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  K = 'k',
  Lmbda = 'lmbda',
  Delta = 'delta',
  CapPayoff = 'capPayoff',
  CapNotional = 'capNotional',
  CapLeverage = 'capLeverage',
  CircuitBreakerWindow = 'circuitBreakerWindow',
  CircuitBreakerMintTarget = 'circuitBreakerMintTarget',
  MaintenanceMarginFraction = 'maintenanceMarginFraction',
  MaintenanceMarginBurnRate = 'maintenanceMarginBurnRate',
  LiquidationFeeRate = 'liquidationFeeRate',
  TradingFeeRate = 'tradingFeeRate',
  MinCollateral = 'minCollateral',
  PriceDriftUpperLimit = 'priceDriftUpperLimit',
  AverageBlockTime = 'averageBlockTime',
  OiLong = 'oiLong',
  OiShort = 'oiShort',
  Positions = 'positions',
  IsShutdown = 'isShutdown'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID'];
  positionId: Scalars['String'];
  owner: Account;
  market: Market;
  initialOi: Scalars['BigInt'];
  initialDebt: Scalars['BigInt'];
  initialCollateral: Scalars['BigInt'];
  initialNotional: Scalars['BigInt'];
  leverage: Scalars['BigDecimal'];
  isLong: Scalars['Boolean'];
  entryPrice: Scalars['BigInt'];
  isLiquidated: Scalars['Boolean'];
  currentOi: Scalars['BigInt'];
  currentDebt: Scalars['BigInt'];
  mint: Scalars['BigInt'];
  createdAtTimestamp: Scalars['BigInt'];
  createdAtBlockNumber: Scalars['BigInt'];
  transaction: Transaction;
};

export type Position_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  positionId?: Maybe<Scalars['String']>;
  positionId_not?: Maybe<Scalars['String']>;
  positionId_gt?: Maybe<Scalars['String']>;
  positionId_lt?: Maybe<Scalars['String']>;
  positionId_gte?: Maybe<Scalars['String']>;
  positionId_lte?: Maybe<Scalars['String']>;
  positionId_in?: Maybe<Array<Scalars['String']>>;
  positionId_not_in?: Maybe<Array<Scalars['String']>>;
  positionId_contains?: Maybe<Scalars['String']>;
  positionId_contains_nocase?: Maybe<Scalars['String']>;
  positionId_not_contains?: Maybe<Scalars['String']>;
  positionId_not_contains_nocase?: Maybe<Scalars['String']>;
  positionId_starts_with?: Maybe<Scalars['String']>;
  positionId_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_starts_with?: Maybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_ends_with?: Maybe<Scalars['String']>;
  positionId_ends_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_ends_with?: Maybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: Maybe<Scalars['String']>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_contains_nocase?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_contains_nocase?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_?: Maybe<Account_Filter>;
  market?: Maybe<Scalars['String']>;
  market_not?: Maybe<Scalars['String']>;
  market_gt?: Maybe<Scalars['String']>;
  market_lt?: Maybe<Scalars['String']>;
  market_gte?: Maybe<Scalars['String']>;
  market_lte?: Maybe<Scalars['String']>;
  market_in?: Maybe<Array<Scalars['String']>>;
  market_not_in?: Maybe<Array<Scalars['String']>>;
  market_contains?: Maybe<Scalars['String']>;
  market_contains_nocase?: Maybe<Scalars['String']>;
  market_not_contains?: Maybe<Scalars['String']>;
  market_not_contains_nocase?: Maybe<Scalars['String']>;
  market_starts_with?: Maybe<Scalars['String']>;
  market_starts_with_nocase?: Maybe<Scalars['String']>;
  market_not_starts_with?: Maybe<Scalars['String']>;
  market_not_starts_with_nocase?: Maybe<Scalars['String']>;
  market_ends_with?: Maybe<Scalars['String']>;
  market_ends_with_nocase?: Maybe<Scalars['String']>;
  market_not_ends_with?: Maybe<Scalars['String']>;
  market_not_ends_with_nocase?: Maybe<Scalars['String']>;
  market_?: Maybe<Market_Filter>;
  initialOi?: Maybe<Scalars['BigInt']>;
  initialOi_not?: Maybe<Scalars['BigInt']>;
  initialOi_gt?: Maybe<Scalars['BigInt']>;
  initialOi_lt?: Maybe<Scalars['BigInt']>;
  initialOi_gte?: Maybe<Scalars['BigInt']>;
  initialOi_lte?: Maybe<Scalars['BigInt']>;
  initialOi_in?: Maybe<Array<Scalars['BigInt']>>;
  initialOi_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initialDebt?: Maybe<Scalars['BigInt']>;
  initialDebt_not?: Maybe<Scalars['BigInt']>;
  initialDebt_gt?: Maybe<Scalars['BigInt']>;
  initialDebt_lt?: Maybe<Scalars['BigInt']>;
  initialDebt_gte?: Maybe<Scalars['BigInt']>;
  initialDebt_lte?: Maybe<Scalars['BigInt']>;
  initialDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  initialDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initialCollateral?: Maybe<Scalars['BigInt']>;
  initialCollateral_not?: Maybe<Scalars['BigInt']>;
  initialCollateral_gt?: Maybe<Scalars['BigInt']>;
  initialCollateral_lt?: Maybe<Scalars['BigInt']>;
  initialCollateral_gte?: Maybe<Scalars['BigInt']>;
  initialCollateral_lte?: Maybe<Scalars['BigInt']>;
  initialCollateral_in?: Maybe<Array<Scalars['BigInt']>>;
  initialCollateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  initialNotional?: Maybe<Scalars['BigInt']>;
  initialNotional_not?: Maybe<Scalars['BigInt']>;
  initialNotional_gt?: Maybe<Scalars['BigInt']>;
  initialNotional_lt?: Maybe<Scalars['BigInt']>;
  initialNotional_gte?: Maybe<Scalars['BigInt']>;
  initialNotional_lte?: Maybe<Scalars['BigInt']>;
  initialNotional_in?: Maybe<Array<Scalars['BigInt']>>;
  initialNotional_not_in?: Maybe<Array<Scalars['BigInt']>>;
  leverage?: Maybe<Scalars['BigDecimal']>;
  leverage_not?: Maybe<Scalars['BigDecimal']>;
  leverage_gt?: Maybe<Scalars['BigDecimal']>;
  leverage_lt?: Maybe<Scalars['BigDecimal']>;
  leverage_gte?: Maybe<Scalars['BigDecimal']>;
  leverage_lte?: Maybe<Scalars['BigDecimal']>;
  leverage_in?: Maybe<Array<Scalars['BigDecimal']>>;
  leverage_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  isLong?: Maybe<Scalars['Boolean']>;
  isLong_not?: Maybe<Scalars['Boolean']>;
  isLong_in?: Maybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>;
  entryPrice?: Maybe<Scalars['BigInt']>;
  entryPrice_not?: Maybe<Scalars['BigInt']>;
  entryPrice_gt?: Maybe<Scalars['BigInt']>;
  entryPrice_lt?: Maybe<Scalars['BigInt']>;
  entryPrice_gte?: Maybe<Scalars['BigInt']>;
  entryPrice_lte?: Maybe<Scalars['BigInt']>;
  entryPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  entryPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isLiquidated?: Maybe<Scalars['Boolean']>;
  isLiquidated_not?: Maybe<Scalars['Boolean']>;
  isLiquidated_in?: Maybe<Array<Scalars['Boolean']>>;
  isLiquidated_not_in?: Maybe<Array<Scalars['Boolean']>>;
  currentOi?: Maybe<Scalars['BigInt']>;
  currentOi_not?: Maybe<Scalars['BigInt']>;
  currentOi_gt?: Maybe<Scalars['BigInt']>;
  currentOi_lt?: Maybe<Scalars['BigInt']>;
  currentOi_gte?: Maybe<Scalars['BigInt']>;
  currentOi_lte?: Maybe<Scalars['BigInt']>;
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>;
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt?: Maybe<Scalars['BigInt']>;
  currentDebt_not?: Maybe<Scalars['BigInt']>;
  currentDebt_gt?: Maybe<Scalars['BigInt']>;
  currentDebt_lt?: Maybe<Scalars['BigInt']>;
  currentDebt_gte?: Maybe<Scalars['BigInt']>;
  currentDebt_lte?: Maybe<Scalars['BigInt']>;
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  mint?: Maybe<Scalars['BigInt']>;
  mint_not?: Maybe<Scalars['BigInt']>;
  mint_gt?: Maybe<Scalars['BigInt']>;
  mint_lt?: Maybe<Scalars['BigInt']>;
  mint_gte?: Maybe<Scalars['BigInt']>;
  mint_lte?: Maybe<Scalars['BigInt']>;
  mint_in?: Maybe<Array<Scalars['BigInt']>>;
  mint_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_not?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_lt?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_gte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_lte?: Maybe<Scalars['BigInt']>;
  createdAtTimestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtTimestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_not?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_lt?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_gte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_lte?: Maybe<Scalars['BigInt']>;
  createdAtBlockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  createdAtBlockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_contains_nocase?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_contains_nocase?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_?: Maybe<Transaction_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Position_OrderBy {
  Id = 'id',
  PositionId = 'positionId',
  Owner = 'owner',
  Market = 'market',
  InitialOi = 'initialOi',
  InitialDebt = 'initialDebt',
  InitialCollateral = 'initialCollateral',
  InitialNotional = 'initialNotional',
  Leverage = 'leverage',
  IsLong = 'isLong',
  EntryPrice = 'entryPrice',
  IsLiquidated = 'isLiquidated',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  Mint = 'mint',
  CreatedAtTimestamp = 'createdAtTimestamp',
  CreatedAtBlockNumber = 'createdAtBlockNumber',
  Transaction = 'transaction'
}

export type Query = {
  __typename?: 'Query';
  factory?: Maybe<Factory>;
  factories: Array<Factory>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  build?: Maybe<Build>;
  builds: Array<Build>;
  unwind?: Maybe<Unwind>;
  unwinds: Array<Unwind>;
  liquidate?: Maybe<Liquidate>;
  liquidates: Array<Liquidate>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryFactoryArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFactoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Factory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Factory_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMarketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transaction_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBuildArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBuildsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Build_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Build_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnwindArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Unwind_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Unwind_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Liquidate_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Account_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Subscription = {
  __typename?: 'Subscription';
  factory?: Maybe<Factory>;
  factories: Array<Factory>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  build?: Maybe<Build>;
  builds: Array<Build>;
  unwind?: Maybe<Unwind>;
  unwinds: Array<Unwind>;
  liquidate?: Maybe<Liquidate>;
  liquidates: Array<Liquidate>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionFactoryArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFactoriesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Factory_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Factory_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMarketsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPositionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransactionsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Transaction_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Transaction_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBuildArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBuildsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Build_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Build_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnwindArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Unwind_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Unwind_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidateArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Liquidate_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountArgs = {
  id: Scalars['ID'];
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Account_Filter>;
  block?: Maybe<Block_Height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  blockNumber: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  gasLimit: Scalars['BigInt'];
  gasPrice: Scalars['BigInt'];
  builds: Array<Build>;
  unwinds: Array<Unwind>;
  liquidates: Array<Liquidate>;
};


export type TransactionBuildsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Build_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Build_Filter>;
};


export type TransactionUnwindsArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Unwind_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Unwind_Filter>;
};


export type TransactionLiquidatesArgs = {
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Liquidate_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Liquidate_Filter>;
};

export type Transaction_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  blockNumber?: Maybe<Scalars['BigInt']>;
  blockNumber_not?: Maybe<Scalars['BigInt']>;
  blockNumber_gt?: Maybe<Scalars['BigInt']>;
  blockNumber_lt?: Maybe<Scalars['BigInt']>;
  blockNumber_gte?: Maybe<Scalars['BigInt']>;
  blockNumber_lte?: Maybe<Scalars['BigInt']>;
  blockNumber_in?: Maybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasLimit?: Maybe<Scalars['BigInt']>;
  gasLimit_not?: Maybe<Scalars['BigInt']>;
  gasLimit_gt?: Maybe<Scalars['BigInt']>;
  gasLimit_lt?: Maybe<Scalars['BigInt']>;
  gasLimit_gte?: Maybe<Scalars['BigInt']>;
  gasLimit_lte?: Maybe<Scalars['BigInt']>;
  gasLimit_in?: Maybe<Array<Scalars['BigInt']>>;
  gasLimit_not_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice?: Maybe<Scalars['BigInt']>;
  gasPrice_not?: Maybe<Scalars['BigInt']>;
  gasPrice_gt?: Maybe<Scalars['BigInt']>;
  gasPrice_lt?: Maybe<Scalars['BigInt']>;
  gasPrice_gte?: Maybe<Scalars['BigInt']>;
  gasPrice_lte?: Maybe<Scalars['BigInt']>;
  gasPrice_in?: Maybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: Maybe<Array<Scalars['BigInt']>>;
  builds_?: Maybe<Build_Filter>;
  unwinds_?: Maybe<Unwind_Filter>;
  liquidates_?: Maybe<Liquidate_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Transaction_OrderBy {
  Id = 'id',
  BlockNumber = 'blockNumber',
  Timestamp = 'timestamp',
  GasLimit = 'gasLimit',
  GasPrice = 'gasPrice',
  Builds = 'builds',
  Unwinds = 'unwinds',
  Liquidates = 'liquidates'
}

export type Unwind = {
  __typename?: 'Unwind';
  id: Scalars['ID'];
  owner: Account;
  positionId: Scalars['String'];
  currentOi: Scalars['BigInt'];
  currentDebt: Scalars['BigInt'];
  isLong: Scalars['Boolean'];
  price: Scalars['BigInt'];
  collateral: Scalars['BigInt'];
  value: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Transaction;
};

export type Unwind_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_lt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  owner?: Maybe<Scalars['String']>;
  owner_not?: Maybe<Scalars['String']>;
  owner_gt?: Maybe<Scalars['String']>;
  owner_lt?: Maybe<Scalars['String']>;
  owner_gte?: Maybe<Scalars['String']>;
  owner_lte?: Maybe<Scalars['String']>;
  owner_in?: Maybe<Array<Scalars['String']>>;
  owner_not_in?: Maybe<Array<Scalars['String']>>;
  owner_contains?: Maybe<Scalars['String']>;
  owner_contains_nocase?: Maybe<Scalars['String']>;
  owner_not_contains?: Maybe<Scalars['String']>;
  owner_not_contains_nocase?: Maybe<Scalars['String']>;
  owner_starts_with?: Maybe<Scalars['String']>;
  owner_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_not_starts_with?: Maybe<Scalars['String']>;
  owner_not_starts_with_nocase?: Maybe<Scalars['String']>;
  owner_ends_with?: Maybe<Scalars['String']>;
  owner_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_not_ends_with?: Maybe<Scalars['String']>;
  owner_not_ends_with_nocase?: Maybe<Scalars['String']>;
  owner_?: Maybe<Account_Filter>;
  positionId?: Maybe<Scalars['String']>;
  positionId_not?: Maybe<Scalars['String']>;
  positionId_gt?: Maybe<Scalars['String']>;
  positionId_lt?: Maybe<Scalars['String']>;
  positionId_gte?: Maybe<Scalars['String']>;
  positionId_lte?: Maybe<Scalars['String']>;
  positionId_in?: Maybe<Array<Scalars['String']>>;
  positionId_not_in?: Maybe<Array<Scalars['String']>>;
  positionId_contains?: Maybe<Scalars['String']>;
  positionId_contains_nocase?: Maybe<Scalars['String']>;
  positionId_not_contains?: Maybe<Scalars['String']>;
  positionId_not_contains_nocase?: Maybe<Scalars['String']>;
  positionId_starts_with?: Maybe<Scalars['String']>;
  positionId_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_starts_with?: Maybe<Scalars['String']>;
  positionId_not_starts_with_nocase?: Maybe<Scalars['String']>;
  positionId_ends_with?: Maybe<Scalars['String']>;
  positionId_ends_with_nocase?: Maybe<Scalars['String']>;
  positionId_not_ends_with?: Maybe<Scalars['String']>;
  positionId_not_ends_with_nocase?: Maybe<Scalars['String']>;
  currentOi?: Maybe<Scalars['BigInt']>;
  currentOi_not?: Maybe<Scalars['BigInt']>;
  currentOi_gt?: Maybe<Scalars['BigInt']>;
  currentOi_lt?: Maybe<Scalars['BigInt']>;
  currentOi_gte?: Maybe<Scalars['BigInt']>;
  currentOi_lte?: Maybe<Scalars['BigInt']>;
  currentOi_in?: Maybe<Array<Scalars['BigInt']>>;
  currentOi_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt?: Maybe<Scalars['BigInt']>;
  currentDebt_not?: Maybe<Scalars['BigInt']>;
  currentDebt_gt?: Maybe<Scalars['BigInt']>;
  currentDebt_lt?: Maybe<Scalars['BigInt']>;
  currentDebt_gte?: Maybe<Scalars['BigInt']>;
  currentDebt_lte?: Maybe<Scalars['BigInt']>;
  currentDebt_in?: Maybe<Array<Scalars['BigInt']>>;
  currentDebt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  isLong?: Maybe<Scalars['Boolean']>;
  isLong_not?: Maybe<Scalars['Boolean']>;
  isLong_in?: Maybe<Array<Scalars['Boolean']>>;
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>;
  price?: Maybe<Scalars['BigInt']>;
  price_not?: Maybe<Scalars['BigInt']>;
  price_gt?: Maybe<Scalars['BigInt']>;
  price_lt?: Maybe<Scalars['BigInt']>;
  price_gte?: Maybe<Scalars['BigInt']>;
  price_lte?: Maybe<Scalars['BigInt']>;
  price_in?: Maybe<Array<Scalars['BigInt']>>;
  price_not_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral?: Maybe<Scalars['BigInt']>;
  collateral_not?: Maybe<Scalars['BigInt']>;
  collateral_gt?: Maybe<Scalars['BigInt']>;
  collateral_lt?: Maybe<Scalars['BigInt']>;
  collateral_gte?: Maybe<Scalars['BigInt']>;
  collateral_lte?: Maybe<Scalars['BigInt']>;
  collateral_in?: Maybe<Array<Scalars['BigInt']>>;
  collateral_not_in?: Maybe<Array<Scalars['BigInt']>>;
  value?: Maybe<Scalars['BigInt']>;
  value_not?: Maybe<Scalars['BigInt']>;
  value_gt?: Maybe<Scalars['BigInt']>;
  value_lt?: Maybe<Scalars['BigInt']>;
  value_gte?: Maybe<Scalars['BigInt']>;
  value_lte?: Maybe<Scalars['BigInt']>;
  value_in?: Maybe<Array<Scalars['BigInt']>>;
  value_not_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp?: Maybe<Scalars['BigInt']>;
  timestamp_not?: Maybe<Scalars['BigInt']>;
  timestamp_gt?: Maybe<Scalars['BigInt']>;
  timestamp_lt?: Maybe<Scalars['BigInt']>;
  timestamp_gte?: Maybe<Scalars['BigInt']>;
  timestamp_lte?: Maybe<Scalars['BigInt']>;
  timestamp_in?: Maybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: Maybe<Array<Scalars['BigInt']>>;
  transaction?: Maybe<Scalars['String']>;
  transaction_not?: Maybe<Scalars['String']>;
  transaction_gt?: Maybe<Scalars['String']>;
  transaction_lt?: Maybe<Scalars['String']>;
  transaction_gte?: Maybe<Scalars['String']>;
  transaction_lte?: Maybe<Scalars['String']>;
  transaction_in?: Maybe<Array<Scalars['String']>>;
  transaction_not_in?: Maybe<Array<Scalars['String']>>;
  transaction_contains?: Maybe<Scalars['String']>;
  transaction_contains_nocase?: Maybe<Scalars['String']>;
  transaction_not_contains?: Maybe<Scalars['String']>;
  transaction_not_contains_nocase?: Maybe<Scalars['String']>;
  transaction_starts_with?: Maybe<Scalars['String']>;
  transaction_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_starts_with?: Maybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: Maybe<Scalars['String']>;
  transaction_ends_with?: Maybe<Scalars['String']>;
  transaction_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_not_ends_with?: Maybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: Maybe<Scalars['String']>;
  transaction_?: Maybe<Transaction_Filter>;
  /** Filter for the block changed event. */
  _change_block?: Maybe<BlockChangedFilter>;
};

export enum Unwind_OrderBy {
  Id = 'id',
  Owner = 'owner',
  PositionId = 'positionId',
  CurrentOi = 'currentOi',
  CurrentDebt = 'currentDebt',
  IsLong = 'isLong',
  Price = 'price',
  Collateral = 'collateral',
  Value = 'value',
  Timestamp = 'timestamp',
  Transaction = 'transaction'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type AccountQueryVariables = Exact<{
  account: Scalars['ID'];
}>;


export type AccountQuery = (
  { __typename?: 'Query' }
  & { account?: Maybe<(
    { __typename?: 'Account' }
    & { positions: Array<(
      { __typename?: 'Position' }
      & Pick<Position, 'id' | 'positionId' | 'initialOi' | 'initialDebt' | 'initialCollateral' | 'initialNotional' | 'leverage' | 'isLong' | 'entryPrice' | 'isLiquidated' | 'currentOi' | 'currentDebt' | 'mint' | 'createdAtTimestamp' | 'createdAtBlockNumber'>
      & { market: (
        { __typename?: 'Market' }
        & Pick<Market, 'id' | 'feedAddress'>
      ) }
    )>, builds: Array<(
      { __typename?: 'Build' }
      & Pick<Build, 'id'>
    )>, unwinds: Array<(
      { __typename?: 'Unwind' }
      & Pick<Unwind, 'id'>
    )>, liquidates: Array<(
      { __typename?: 'Liquidate' }
      & Pick<Liquidate, 'id'>
    )> }
  )> }
);

export type MarketQueryVariables = Exact<{
  market: Scalars['ID'];
}>;


export type MarketQuery = (
  { __typename?: 'Query' }
  & { market?: Maybe<(
    { __typename?: 'Market' }
    & Pick<Market, 'id' | 'feedAddress' | 'k' | 'lmbda' | 'delta' | 'capPayoff' | 'capNotional' | 'capLeverage' | 'circuitBreakerWindow' | 'circuitBreakerMintTarget' | 'maintenanceMarginFraction' | 'maintenanceMarginBurnRate' | 'liquidationFeeRate' | 'tradingFeeRate' | 'minCollateral' | 'priceDriftUpperLimit' | 'averageBlockTime' | 'isShutdown'>
    & { factory: (
      { __typename?: 'Factory' }
      & Pick<Factory, 'id'>
    ) }
  )> }
);

export type MarketsQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketsQuery = (
  { __typename?: 'Query' }
  & { markets: Array<(
    { __typename?: 'Market' }
    & Pick<Market, 'id' | 'feedAddress' | 'capNotional'>
    & { positions: Array<(
      { __typename?: 'Position' }
      & Pick<Position, 'id'>
    )> }
  )> }
);

export type PositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsQuery = (
  { __typename?: 'Query' }
  & { positions: Array<(
    { __typename?: 'Position' }
    & Pick<Position, 'id' | 'positionId' | 'isLiquidated'>
    & { owner: (
      { __typename?: 'Account' }
      & Pick<Account, 'id'>
    ), market: (
      { __typename?: 'Market' }
      & Pick<Market, 'id'>
    ) }
  )> }
);


export const AccountDocument = `
    query account($account: ID!) {
  account(id: $account) {
    positions {
      id
      positionId
      market {
        id
        feedAddress
      }
      initialOi
      initialDebt
      initialCollateral
      initialNotional
      leverage
      isLong
      entryPrice
      isLiquidated
      currentOi
      currentDebt
      mint
      createdAtTimestamp
      createdAtBlockNumber
    }
    builds {
      id
    }
    unwinds {
      id
    }
    liquidates {
      id
    }
  }
}
    `;
export const MarketDocument = `
    query market($market: ID!) {
  market(id: $market) {
    id
    feedAddress
    factory {
      id
    }
    k
    lmbda
    delta
    capPayoff
    capNotional
    capLeverage
    circuitBreakerWindow
    circuitBreakerMintTarget
    maintenanceMarginFraction
    maintenanceMarginBurnRate
    liquidationFeeRate
    tradingFeeRate
    minCollateral
    priceDriftUpperLimit
    averageBlockTime
    isShutdown
  }
}
    `;
export const MarketsDocument = `
    query markets {
  markets(where: {isShutdown: true}) {
    id
    feedAddress
    capNotional
    positions {
      id
    }
  }
}
    `;
export const PositionsDocument = `
    query positions {
  positions {
    id
    positionId
    owner {
      id
    }
    market {
      id
    }
    isLiquidated
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    account: build.query<AccountQuery, AccountQueryVariables>({
      query: (variables) => ({ document: AccountDocument, variables })
    }),
    market: build.query<MarketQuery, MarketQueryVariables>({
      query: (variables) => ({ document: MarketDocument, variables })
    }),
    markets: build.query<MarketsQuery, MarketsQueryVariables | void>({
      query: (variables) => ({ document: MarketsDocument, variables })
    }),
    positions: build.query<PositionsQuery, PositionsQueryVariables | void>({
      query: (variables) => ({ document: PositionsDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAccountQuery, useLazyAccountQuery, useMarketQuery, useLazyMarketQuery, useMarketsQuery, useLazyMarketsQuery, usePositionsQuery, useLazyPositionsQuery } = injectedRtkApi;

