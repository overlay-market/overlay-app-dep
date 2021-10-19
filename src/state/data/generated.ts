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
  address: Scalars['String'];
  balanceOVL: BalanceOvl;
  balances: Array<Balance>;
  id: Scalars['ID'];
};


export type AccountBalancesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Balance_Filter>;
};

export type Account_Filter = {
  address?: Maybe<Scalars['String']>;
  address_contains?: Maybe<Scalars['String']>;
  address_ends_with?: Maybe<Scalars['String']>;
  address_gt?: Maybe<Scalars['String']>;
  address_gte?: Maybe<Scalars['String']>;
  address_in?: Maybe<Array<Scalars['String']>>;
  address_lt?: Maybe<Scalars['String']>;
  address_lte?: Maybe<Scalars['String']>;
  address_not?: Maybe<Scalars['String']>;
  address_not_contains?: Maybe<Scalars['String']>;
  address_not_ends_with?: Maybe<Scalars['String']>;
  address_not_in?: Maybe<Array<Scalars['String']>>;
  address_not_starts_with?: Maybe<Scalars['String']>;
  address_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum Account_OrderBy {
  Address = 'address',
  BalanceOvl = 'balanceOVL',
  Balances = 'balances',
  Id = 'id'
}

export type Balance = {
  __typename?: 'Balance';
  account: Account;
  id: Scalars['ID'];
  position: Scalars['BigInt'];
  shares: Scalars['BigInt'];
};

export type BalanceOvl = {
  __typename?: 'BalanceOVL';
  account: Account;
  balance: Scalars['BigInt'];
  id: Scalars['ID'];
  locked: Scalars['BigInt'];
};

export type BalanceOvl_Filter = {
  account?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_ends_with?: Maybe<Scalars['String']>;
  account_gt?: Maybe<Scalars['String']>;
  account_gte?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_lt?: Maybe<Scalars['String']>;
  account_lte?: Maybe<Scalars['String']>;
  account_not?: Maybe<Scalars['String']>;
  account_not_contains?: Maybe<Scalars['String']>;
  account_not_ends_with?: Maybe<Scalars['String']>;
  account_not_in?: Maybe<Array<Scalars['String']>>;
  account_not_starts_with?: Maybe<Scalars['String']>;
  account_starts_with?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['BigInt']>;
  balance_gt?: Maybe<Scalars['BigInt']>;
  balance_gte?: Maybe<Scalars['BigInt']>;
  balance_in?: Maybe<Array<Scalars['BigInt']>>;
  balance_lt?: Maybe<Scalars['BigInt']>;
  balance_lte?: Maybe<Scalars['BigInt']>;
  balance_not?: Maybe<Scalars['BigInt']>;
  balance_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  locked?: Maybe<Scalars['BigInt']>;
  locked_gt?: Maybe<Scalars['BigInt']>;
  locked_gte?: Maybe<Scalars['BigInt']>;
  locked_in?: Maybe<Array<Scalars['BigInt']>>;
  locked_lt?: Maybe<Scalars['BigInt']>;
  locked_lte?: Maybe<Scalars['BigInt']>;
  locked_not?: Maybe<Scalars['BigInt']>;
  locked_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum BalanceOvl_OrderBy {
  Account = 'account',
  Balance = 'balance',
  Id = 'id',
  Locked = 'locked'
}

export type Balance_Filter = {
  account?: Maybe<Scalars['String']>;
  account_contains?: Maybe<Scalars['String']>;
  account_ends_with?: Maybe<Scalars['String']>;
  account_gt?: Maybe<Scalars['String']>;
  account_gte?: Maybe<Scalars['String']>;
  account_in?: Maybe<Array<Scalars['String']>>;
  account_lt?: Maybe<Scalars['String']>;
  account_lte?: Maybe<Scalars['String']>;
  account_not?: Maybe<Scalars['String']>;
  account_not_contains?: Maybe<Scalars['String']>;
  account_not_ends_with?: Maybe<Scalars['String']>;
  account_not_in?: Maybe<Array<Scalars['String']>>;
  account_not_starts_with?: Maybe<Scalars['String']>;
  account_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  position?: Maybe<Scalars['BigInt']>;
  position_gt?: Maybe<Scalars['BigInt']>;
  position_gte?: Maybe<Scalars['BigInt']>;
  position_in?: Maybe<Array<Scalars['BigInt']>>;
  position_lt?: Maybe<Scalars['BigInt']>;
  position_lte?: Maybe<Scalars['BigInt']>;
  position_not?: Maybe<Scalars['BigInt']>;
  position_not_in?: Maybe<Array<Scalars['BigInt']>>;
  shares?: Maybe<Scalars['BigInt']>;
  shares_gt?: Maybe<Scalars['BigInt']>;
  shares_gte?: Maybe<Scalars['BigInt']>;
  shares_in?: Maybe<Array<Scalars['BigInt']>>;
  shares_lt?: Maybe<Scalars['BigInt']>;
  shares_lte?: Maybe<Scalars['BigInt']>;
  shares_not?: Maybe<Scalars['BigInt']>;
  shares_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Balance_OrderBy {
  Account = 'account',
  Id = 'id',
  Position = 'position',
  Shares = 'shares'
}

export type Block_Height = {
  hash?: Maybe<Scalars['Bytes']>;
  number?: Maybe<Scalars['Int']>;
};

export type CollateralManager = {
  __typename?: 'CollateralManager';
  address: Scalars['String'];
  id: Scalars['ID'];
  positions: Array<Position>;
};


export type CollateralManagerPositionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Position_Filter>;
};

export type CollateralManager_Filter = {
  address?: Maybe<Scalars['String']>;
  address_contains?: Maybe<Scalars['String']>;
  address_ends_with?: Maybe<Scalars['String']>;
  address_gt?: Maybe<Scalars['String']>;
  address_gte?: Maybe<Scalars['String']>;
  address_in?: Maybe<Array<Scalars['String']>>;
  address_lt?: Maybe<Scalars['String']>;
  address_lte?: Maybe<Scalars['String']>;
  address_not?: Maybe<Scalars['String']>;
  address_not_contains?: Maybe<Scalars['String']>;
  address_not_ends_with?: Maybe<Scalars['String']>;
  address_not_in?: Maybe<Array<Scalars['String']>>;
  address_not_starts_with?: Maybe<Scalars['String']>;
  address_starts_with?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum CollateralManager_OrderBy {
  Address = 'address',
  Id = 'id',
  Positions = 'positions'
}

export type Market = {
  __typename?: 'Market';
  base: Scalars['Bytes'];
  baseName: Scalars['String'];
  baseSymbol: Scalars['String'];
  compoundingPeriod: Scalars['BigInt'];
  created: Scalars['BigInt'];
  currentPrice: PricePoint;
  feed: Scalars['Bytes'];
  id: Scalars['ID'];
  oiCap: Scalars['BigInt'];
  oiLong: Scalars['BigInt'];
  oiLongQueued: Scalars['BigInt'];
  oiLongShares: Scalars['BigInt'];
  oiShort: Scalars['BigInt'];
  oiShortQueued: Scalars['BigInt'];
  oiShortShares: Scalars['BigInt'];
  positions: Array<Position>;
  prices: Array<PricePoint>;
  quote: Scalars['Bytes'];
  quoteName: Scalars['String'];
  quoteSymbol: Scalars['String'];
  updatePeriod: Scalars['BigInt'];
};


export type MarketPositionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Position_Filter>;
};


export type MarketPricesArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PricePoint_Filter>;
};

export type MarketManifest = {
  __typename?: 'MarketManifest';
  compoundings: Array<Scalars['BigInt']>;
  id: Scalars['ID'];
  markets: Array<Scalars['String']>;
  updates: Array<Scalars['BigInt']>;
};

export type MarketManifest_Filter = {
  compoundings?: Maybe<Array<Scalars['BigInt']>>;
  compoundings_contains?: Maybe<Array<Scalars['BigInt']>>;
  compoundings_not?: Maybe<Array<Scalars['BigInt']>>;
  compoundings_not_contains?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  markets?: Maybe<Array<Scalars['String']>>;
  markets_contains?: Maybe<Array<Scalars['String']>>;
  markets_not?: Maybe<Array<Scalars['String']>>;
  markets_not_contains?: Maybe<Array<Scalars['String']>>;
  updates?: Maybe<Array<Scalars['BigInt']>>;
  updates_contains?: Maybe<Array<Scalars['BigInt']>>;
  updates_not?: Maybe<Array<Scalars['BigInt']>>;
  updates_not_contains?: Maybe<Array<Scalars['BigInt']>>;
};

export enum MarketManifest_OrderBy {
  Compoundings = 'compoundings',
  Id = 'id',
  Markets = 'markets',
  Updates = 'updates'
}

export type MarketMonitor = {
  __typename?: 'MarketMonitor';
  id: Scalars['ID'];
  positions: Array<Position>;
};


export type MarketMonitorPositionsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Position_Filter>;
};

export type MarketMonitor_Filter = {
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  positions?: Maybe<Array<Scalars['String']>>;
  positions_contains?: Maybe<Array<Scalars['String']>>;
  positions_not?: Maybe<Array<Scalars['String']>>;
  positions_not_contains?: Maybe<Array<Scalars['String']>>;
};

export enum MarketMonitor_OrderBy {
  Id = 'id',
  Positions = 'positions'
}

export type Market_Filter = {
  base?: Maybe<Scalars['Bytes']>;
  baseName?: Maybe<Scalars['String']>;
  baseName_contains?: Maybe<Scalars['String']>;
  baseName_ends_with?: Maybe<Scalars['String']>;
  baseName_gt?: Maybe<Scalars['String']>;
  baseName_gte?: Maybe<Scalars['String']>;
  baseName_in?: Maybe<Array<Scalars['String']>>;
  baseName_lt?: Maybe<Scalars['String']>;
  baseName_lte?: Maybe<Scalars['String']>;
  baseName_not?: Maybe<Scalars['String']>;
  baseName_not_contains?: Maybe<Scalars['String']>;
  baseName_not_ends_with?: Maybe<Scalars['String']>;
  baseName_not_in?: Maybe<Array<Scalars['String']>>;
  baseName_not_starts_with?: Maybe<Scalars['String']>;
  baseName_starts_with?: Maybe<Scalars['String']>;
  baseSymbol?: Maybe<Scalars['String']>;
  baseSymbol_contains?: Maybe<Scalars['String']>;
  baseSymbol_ends_with?: Maybe<Scalars['String']>;
  baseSymbol_gt?: Maybe<Scalars['String']>;
  baseSymbol_gte?: Maybe<Scalars['String']>;
  baseSymbol_in?: Maybe<Array<Scalars['String']>>;
  baseSymbol_lt?: Maybe<Scalars['String']>;
  baseSymbol_lte?: Maybe<Scalars['String']>;
  baseSymbol_not?: Maybe<Scalars['String']>;
  baseSymbol_not_contains?: Maybe<Scalars['String']>;
  baseSymbol_not_ends_with?: Maybe<Scalars['String']>;
  baseSymbol_not_in?: Maybe<Array<Scalars['String']>>;
  baseSymbol_not_starts_with?: Maybe<Scalars['String']>;
  baseSymbol_starts_with?: Maybe<Scalars['String']>;
  base_contains?: Maybe<Scalars['Bytes']>;
  base_in?: Maybe<Array<Scalars['Bytes']>>;
  base_not?: Maybe<Scalars['Bytes']>;
  base_not_contains?: Maybe<Scalars['Bytes']>;
  base_not_in?: Maybe<Array<Scalars['Bytes']>>;
  compoundingPeriod?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_gt?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_gte?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_in?: Maybe<Array<Scalars['BigInt']>>;
  compoundingPeriod_lt?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_lte?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_not?: Maybe<Scalars['BigInt']>;
  compoundingPeriod_not_in?: Maybe<Array<Scalars['BigInt']>>;
  created?: Maybe<Scalars['BigInt']>;
  created_gt?: Maybe<Scalars['BigInt']>;
  created_gte?: Maybe<Scalars['BigInt']>;
  created_in?: Maybe<Array<Scalars['BigInt']>>;
  created_lt?: Maybe<Scalars['BigInt']>;
  created_lte?: Maybe<Scalars['BigInt']>;
  created_not?: Maybe<Scalars['BigInt']>;
  created_not_in?: Maybe<Array<Scalars['BigInt']>>;
  currentPrice?: Maybe<Scalars['String']>;
  currentPrice_contains?: Maybe<Scalars['String']>;
  currentPrice_ends_with?: Maybe<Scalars['String']>;
  currentPrice_gt?: Maybe<Scalars['String']>;
  currentPrice_gte?: Maybe<Scalars['String']>;
  currentPrice_in?: Maybe<Array<Scalars['String']>>;
  currentPrice_lt?: Maybe<Scalars['String']>;
  currentPrice_lte?: Maybe<Scalars['String']>;
  currentPrice_not?: Maybe<Scalars['String']>;
  currentPrice_not_contains?: Maybe<Scalars['String']>;
  currentPrice_not_ends_with?: Maybe<Scalars['String']>;
  currentPrice_not_in?: Maybe<Array<Scalars['String']>>;
  currentPrice_not_starts_with?: Maybe<Scalars['String']>;
  currentPrice_starts_with?: Maybe<Scalars['String']>;
  feed?: Maybe<Scalars['Bytes']>;
  feed_contains?: Maybe<Scalars['Bytes']>;
  feed_in?: Maybe<Array<Scalars['Bytes']>>;
  feed_not?: Maybe<Scalars['Bytes']>;
  feed_not_contains?: Maybe<Scalars['Bytes']>;
  feed_not_in?: Maybe<Array<Scalars['Bytes']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  oiCap?: Maybe<Scalars['BigInt']>;
  oiCap_gt?: Maybe<Scalars['BigInt']>;
  oiCap_gte?: Maybe<Scalars['BigInt']>;
  oiCap_in?: Maybe<Array<Scalars['BigInt']>>;
  oiCap_lt?: Maybe<Scalars['BigInt']>;
  oiCap_lte?: Maybe<Scalars['BigInt']>;
  oiCap_not?: Maybe<Scalars['BigInt']>;
  oiCap_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLong?: Maybe<Scalars['BigInt']>;
  oiLongQueued?: Maybe<Scalars['BigInt']>;
  oiLongQueued_gt?: Maybe<Scalars['BigInt']>;
  oiLongQueued_gte?: Maybe<Scalars['BigInt']>;
  oiLongQueued_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLongQueued_lt?: Maybe<Scalars['BigInt']>;
  oiLongQueued_lte?: Maybe<Scalars['BigInt']>;
  oiLongQueued_not?: Maybe<Scalars['BigInt']>;
  oiLongQueued_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLongShares?: Maybe<Scalars['BigInt']>;
  oiLongShares_gt?: Maybe<Scalars['BigInt']>;
  oiLongShares_gte?: Maybe<Scalars['BigInt']>;
  oiLongShares_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLongShares_lt?: Maybe<Scalars['BigInt']>;
  oiLongShares_lte?: Maybe<Scalars['BigInt']>;
  oiLongShares_not?: Maybe<Scalars['BigInt']>;
  oiLongShares_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLong_gt?: Maybe<Scalars['BigInt']>;
  oiLong_gte?: Maybe<Scalars['BigInt']>;
  oiLong_in?: Maybe<Array<Scalars['BigInt']>>;
  oiLong_lt?: Maybe<Scalars['BigInt']>;
  oiLong_lte?: Maybe<Scalars['BigInt']>;
  oiLong_not?: Maybe<Scalars['BigInt']>;
  oiLong_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShort?: Maybe<Scalars['BigInt']>;
  oiShortQueued?: Maybe<Scalars['BigInt']>;
  oiShortQueued_gt?: Maybe<Scalars['BigInt']>;
  oiShortQueued_gte?: Maybe<Scalars['BigInt']>;
  oiShortQueued_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShortQueued_lt?: Maybe<Scalars['BigInt']>;
  oiShortQueued_lte?: Maybe<Scalars['BigInt']>;
  oiShortQueued_not?: Maybe<Scalars['BigInt']>;
  oiShortQueued_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShortShares?: Maybe<Scalars['BigInt']>;
  oiShortShares_gt?: Maybe<Scalars['BigInt']>;
  oiShortShares_gte?: Maybe<Scalars['BigInt']>;
  oiShortShares_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShortShares_lt?: Maybe<Scalars['BigInt']>;
  oiShortShares_lte?: Maybe<Scalars['BigInt']>;
  oiShortShares_not?: Maybe<Scalars['BigInt']>;
  oiShortShares_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShort_gt?: Maybe<Scalars['BigInt']>;
  oiShort_gte?: Maybe<Scalars['BigInt']>;
  oiShort_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShort_lt?: Maybe<Scalars['BigInt']>;
  oiShort_lte?: Maybe<Scalars['BigInt']>;
  oiShort_not?: Maybe<Scalars['BigInt']>;
  oiShort_not_in?: Maybe<Array<Scalars['BigInt']>>;
  quote?: Maybe<Scalars['Bytes']>;
  quoteName?: Maybe<Scalars['String']>;
  quoteName_contains?: Maybe<Scalars['String']>;
  quoteName_ends_with?: Maybe<Scalars['String']>;
  quoteName_gt?: Maybe<Scalars['String']>;
  quoteName_gte?: Maybe<Scalars['String']>;
  quoteName_in?: Maybe<Array<Scalars['String']>>;
  quoteName_lt?: Maybe<Scalars['String']>;
  quoteName_lte?: Maybe<Scalars['String']>;
  quoteName_not?: Maybe<Scalars['String']>;
  quoteName_not_contains?: Maybe<Scalars['String']>;
  quoteName_not_ends_with?: Maybe<Scalars['String']>;
  quoteName_not_in?: Maybe<Array<Scalars['String']>>;
  quoteName_not_starts_with?: Maybe<Scalars['String']>;
  quoteName_starts_with?: Maybe<Scalars['String']>;
  quoteSymbol?: Maybe<Scalars['String']>;
  quoteSymbol_contains?: Maybe<Scalars['String']>;
  quoteSymbol_ends_with?: Maybe<Scalars['String']>;
  quoteSymbol_gt?: Maybe<Scalars['String']>;
  quoteSymbol_gte?: Maybe<Scalars['String']>;
  quoteSymbol_in?: Maybe<Array<Scalars['String']>>;
  quoteSymbol_lt?: Maybe<Scalars['String']>;
  quoteSymbol_lte?: Maybe<Scalars['String']>;
  quoteSymbol_not?: Maybe<Scalars['String']>;
  quoteSymbol_not_contains?: Maybe<Scalars['String']>;
  quoteSymbol_not_ends_with?: Maybe<Scalars['String']>;
  quoteSymbol_not_in?: Maybe<Array<Scalars['String']>>;
  quoteSymbol_not_starts_with?: Maybe<Scalars['String']>;
  quoteSymbol_starts_with?: Maybe<Scalars['String']>;
  quote_contains?: Maybe<Scalars['Bytes']>;
  quote_in?: Maybe<Array<Scalars['Bytes']>>;
  quote_not?: Maybe<Scalars['Bytes']>;
  quote_not_contains?: Maybe<Scalars['Bytes']>;
  quote_not_in?: Maybe<Array<Scalars['Bytes']>>;
  updatePeriod?: Maybe<Scalars['BigInt']>;
  updatePeriod_gt?: Maybe<Scalars['BigInt']>;
  updatePeriod_gte?: Maybe<Scalars['BigInt']>;
  updatePeriod_in?: Maybe<Array<Scalars['BigInt']>>;
  updatePeriod_lt?: Maybe<Scalars['BigInt']>;
  updatePeriod_lte?: Maybe<Scalars['BigInt']>;
  updatePeriod_not?: Maybe<Scalars['BigInt']>;
  updatePeriod_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Market_OrderBy {
  Base = 'base',
  BaseName = 'baseName',
  BaseSymbol = 'baseSymbol',
  CompoundingPeriod = 'compoundingPeriod',
  Created = 'created',
  CurrentPrice = 'currentPrice',
  Feed = 'feed',
  Id = 'id',
  OiCap = 'oiCap',
  OiLong = 'oiLong',
  OiLongQueued = 'oiLongQueued',
  OiLongShares = 'oiLongShares',
  OiShort = 'oiShort',
  OiShortQueued = 'oiShortQueued',
  OiShortShares = 'oiShortShares',
  Positions = 'positions',
  Prices = 'prices',
  Quote = 'quote',
  QuoteName = 'quoteName',
  QuoteSymbol = 'quoteSymbol',
  UpdatePeriod = 'updatePeriod'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Position = {
  __typename?: 'Position';
  collateralManager: CollateralManager;
  compounding: Scalars['BigInt'];
  cost: Scalars['BigInt'];
  debt: Scalars['BigInt'];
  id: Scalars['ID'];
  isLong: Scalars['Boolean'];
  leverage: Scalars['BigInt'];
  liquidationPrice: Scalars['BigDecimal'];
  market: Market;
  number: Scalars['BigInt'];
  oiShares: Scalars['BigInt'];
  pricePoint: PricePoint;
  totalSupply: Scalars['BigInt'];
};

export type Position_Filter = {
  collateralManager?: Maybe<Scalars['String']>;
  collateralManager_contains?: Maybe<Scalars['String']>;
  collateralManager_ends_with?: Maybe<Scalars['String']>;
  collateralManager_gt?: Maybe<Scalars['String']>;
  collateralManager_gte?: Maybe<Scalars['String']>;
  collateralManager_in?: Maybe<Array<Scalars['String']>>;
  collateralManager_lt?: Maybe<Scalars['String']>;
  collateralManager_lte?: Maybe<Scalars['String']>;
  collateralManager_not?: Maybe<Scalars['String']>;
  collateralManager_not_contains?: Maybe<Scalars['String']>;
  collateralManager_not_ends_with?: Maybe<Scalars['String']>;
  collateralManager_not_in?: Maybe<Array<Scalars['String']>>;
  collateralManager_not_starts_with?: Maybe<Scalars['String']>;
  collateralManager_starts_with?: Maybe<Scalars['String']>;
  compounding?: Maybe<Scalars['BigInt']>;
  compounding_gt?: Maybe<Scalars['BigInt']>;
  compounding_gte?: Maybe<Scalars['BigInt']>;
  compounding_in?: Maybe<Array<Scalars['BigInt']>>;
  compounding_lt?: Maybe<Scalars['BigInt']>;
  compounding_lte?: Maybe<Scalars['BigInt']>;
  compounding_not?: Maybe<Scalars['BigInt']>;
  compounding_not_in?: Maybe<Array<Scalars['BigInt']>>;
  cost?: Maybe<Scalars['BigInt']>;
  cost_gt?: Maybe<Scalars['BigInt']>;
  cost_gte?: Maybe<Scalars['BigInt']>;
  cost_in?: Maybe<Array<Scalars['BigInt']>>;
  cost_lt?: Maybe<Scalars['BigInt']>;
  cost_lte?: Maybe<Scalars['BigInt']>;
  cost_not?: Maybe<Scalars['BigInt']>;
  cost_not_in?: Maybe<Array<Scalars['BigInt']>>;
  debt?: Maybe<Scalars['BigInt']>;
  debt_gt?: Maybe<Scalars['BigInt']>;
  debt_gte?: Maybe<Scalars['BigInt']>;
  debt_in?: Maybe<Array<Scalars['BigInt']>>;
  debt_lt?: Maybe<Scalars['BigInt']>;
  debt_lte?: Maybe<Scalars['BigInt']>;
  debt_not?: Maybe<Scalars['BigInt']>;
  debt_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  isLong?: Maybe<Scalars['Boolean']>;
  isLong_in?: Maybe<Array<Scalars['Boolean']>>;
  isLong_not?: Maybe<Scalars['Boolean']>;
  isLong_not_in?: Maybe<Array<Scalars['Boolean']>>;
  leverage?: Maybe<Scalars['BigInt']>;
  leverage_gt?: Maybe<Scalars['BigInt']>;
  leverage_gte?: Maybe<Scalars['BigInt']>;
  leverage_in?: Maybe<Array<Scalars['BigInt']>>;
  leverage_lt?: Maybe<Scalars['BigInt']>;
  leverage_lte?: Maybe<Scalars['BigInt']>;
  leverage_not?: Maybe<Scalars['BigInt']>;
  leverage_not_in?: Maybe<Array<Scalars['BigInt']>>;
  liquidationPrice?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_gt?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_gte?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_in?: Maybe<Array<Scalars['BigDecimal']>>;
  liquidationPrice_lt?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_lte?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_not?: Maybe<Scalars['BigDecimal']>;
  liquidationPrice_not_in?: Maybe<Array<Scalars['BigDecimal']>>;
  market?: Maybe<Scalars['String']>;
  market_contains?: Maybe<Scalars['String']>;
  market_ends_with?: Maybe<Scalars['String']>;
  market_gt?: Maybe<Scalars['String']>;
  market_gte?: Maybe<Scalars['String']>;
  market_in?: Maybe<Array<Scalars['String']>>;
  market_lt?: Maybe<Scalars['String']>;
  market_lte?: Maybe<Scalars['String']>;
  market_not?: Maybe<Scalars['String']>;
  market_not_contains?: Maybe<Scalars['String']>;
  market_not_ends_with?: Maybe<Scalars['String']>;
  market_not_in?: Maybe<Array<Scalars['String']>>;
  market_not_starts_with?: Maybe<Scalars['String']>;
  market_starts_with?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['BigInt']>;
  number_gt?: Maybe<Scalars['BigInt']>;
  number_gte?: Maybe<Scalars['BigInt']>;
  number_in?: Maybe<Array<Scalars['BigInt']>>;
  number_lt?: Maybe<Scalars['BigInt']>;
  number_lte?: Maybe<Scalars['BigInt']>;
  number_not?: Maybe<Scalars['BigInt']>;
  number_not_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShares?: Maybe<Scalars['BigInt']>;
  oiShares_gt?: Maybe<Scalars['BigInt']>;
  oiShares_gte?: Maybe<Scalars['BigInt']>;
  oiShares_in?: Maybe<Array<Scalars['BigInt']>>;
  oiShares_lt?: Maybe<Scalars['BigInt']>;
  oiShares_lte?: Maybe<Scalars['BigInt']>;
  oiShares_not?: Maybe<Scalars['BigInt']>;
  oiShares_not_in?: Maybe<Array<Scalars['BigInt']>>;
  pricePoint?: Maybe<Scalars['String']>;
  pricePoint_contains?: Maybe<Scalars['String']>;
  pricePoint_ends_with?: Maybe<Scalars['String']>;
  pricePoint_gt?: Maybe<Scalars['String']>;
  pricePoint_gte?: Maybe<Scalars['String']>;
  pricePoint_in?: Maybe<Array<Scalars['String']>>;
  pricePoint_lt?: Maybe<Scalars['String']>;
  pricePoint_lte?: Maybe<Scalars['String']>;
  pricePoint_not?: Maybe<Scalars['String']>;
  pricePoint_not_contains?: Maybe<Scalars['String']>;
  pricePoint_not_ends_with?: Maybe<Scalars['String']>;
  pricePoint_not_in?: Maybe<Array<Scalars['String']>>;
  pricePoint_not_starts_with?: Maybe<Scalars['String']>;
  pricePoint_starts_with?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['BigInt']>;
  totalSupply_gt?: Maybe<Scalars['BigInt']>;
  totalSupply_gte?: Maybe<Scalars['BigInt']>;
  totalSupply_in?: Maybe<Array<Scalars['BigInt']>>;
  totalSupply_lt?: Maybe<Scalars['BigInt']>;
  totalSupply_lte?: Maybe<Scalars['BigInt']>;
  totalSupply_not?: Maybe<Scalars['BigInt']>;
  totalSupply_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum Position_OrderBy {
  CollateralManager = 'collateralManager',
  Compounding = 'compounding',
  Cost = 'cost',
  Debt = 'debt',
  Id = 'id',
  IsLong = 'isLong',
  Leverage = 'leverage',
  LiquidationPrice = 'liquidationPrice',
  Market = 'market',
  Number = 'number',
  OiShares = 'oiShares',
  PricePoint = 'pricePoint',
  TotalSupply = 'totalSupply'
}

export type PricePoint = {
  __typename?: 'PricePoint';
  ask: Scalars['BigInt'];
  bid: Scalars['BigInt'];
  id: Scalars['ID'];
  index: Scalars['BigInt'];
  market: Market;
  number: Scalars['BigInt'];
};

export type PricePointCount = {
  __typename?: 'PricePointCount';
  count: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type PricePointCount_Filter = {
  count?: Maybe<Scalars['BigInt']>;
  count_gt?: Maybe<Scalars['BigInt']>;
  count_gte?: Maybe<Scalars['BigInt']>;
  count_in?: Maybe<Array<Scalars['BigInt']>>;
  count_lt?: Maybe<Scalars['BigInt']>;
  count_lte?: Maybe<Scalars['BigInt']>;
  count_not?: Maybe<Scalars['BigInt']>;
  count_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
};

export enum PricePointCount_OrderBy {
  Count = 'count',
  Id = 'id'
}

export type PricePoint_Filter = {
  ask?: Maybe<Scalars['BigInt']>;
  ask_gt?: Maybe<Scalars['BigInt']>;
  ask_gte?: Maybe<Scalars['BigInt']>;
  ask_in?: Maybe<Array<Scalars['BigInt']>>;
  ask_lt?: Maybe<Scalars['BigInt']>;
  ask_lte?: Maybe<Scalars['BigInt']>;
  ask_not?: Maybe<Scalars['BigInt']>;
  ask_not_in?: Maybe<Array<Scalars['BigInt']>>;
  bid?: Maybe<Scalars['BigInt']>;
  bid_gt?: Maybe<Scalars['BigInt']>;
  bid_gte?: Maybe<Scalars['BigInt']>;
  bid_in?: Maybe<Array<Scalars['BigInt']>>;
  bid_lt?: Maybe<Scalars['BigInt']>;
  bid_lte?: Maybe<Scalars['BigInt']>;
  bid_not?: Maybe<Scalars['BigInt']>;
  bid_not_in?: Maybe<Array<Scalars['BigInt']>>;
  id?: Maybe<Scalars['ID']>;
  id_gt?: Maybe<Scalars['ID']>;
  id_gte?: Maybe<Scalars['ID']>;
  id_in?: Maybe<Array<Scalars['ID']>>;
  id_lt?: Maybe<Scalars['ID']>;
  id_lte?: Maybe<Scalars['ID']>;
  id_not?: Maybe<Scalars['ID']>;
  id_not_in?: Maybe<Array<Scalars['ID']>>;
  index?: Maybe<Scalars['BigInt']>;
  index_gt?: Maybe<Scalars['BigInt']>;
  index_gte?: Maybe<Scalars['BigInt']>;
  index_in?: Maybe<Array<Scalars['BigInt']>>;
  index_lt?: Maybe<Scalars['BigInt']>;
  index_lte?: Maybe<Scalars['BigInt']>;
  index_not?: Maybe<Scalars['BigInt']>;
  index_not_in?: Maybe<Array<Scalars['BigInt']>>;
  market?: Maybe<Scalars['String']>;
  market_contains?: Maybe<Scalars['String']>;
  market_ends_with?: Maybe<Scalars['String']>;
  market_gt?: Maybe<Scalars['String']>;
  market_gte?: Maybe<Scalars['String']>;
  market_in?: Maybe<Array<Scalars['String']>>;
  market_lt?: Maybe<Scalars['String']>;
  market_lte?: Maybe<Scalars['String']>;
  market_not?: Maybe<Scalars['String']>;
  market_not_contains?: Maybe<Scalars['String']>;
  market_not_ends_with?: Maybe<Scalars['String']>;
  market_not_in?: Maybe<Array<Scalars['String']>>;
  market_not_starts_with?: Maybe<Scalars['String']>;
  market_starts_with?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['BigInt']>;
  number_gt?: Maybe<Scalars['BigInt']>;
  number_gte?: Maybe<Scalars['BigInt']>;
  number_in?: Maybe<Array<Scalars['BigInt']>>;
  number_lt?: Maybe<Scalars['BigInt']>;
  number_lte?: Maybe<Scalars['BigInt']>;
  number_not?: Maybe<Scalars['BigInt']>;
  number_not_in?: Maybe<Array<Scalars['BigInt']>>;
};

export enum PricePoint_OrderBy {
  Ask = 'ask',
  Bid = 'bid',
  Id = 'id',
  Index = 'index',
  Market = 'market',
  Number = 'number'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  balance?: Maybe<Balance>;
  balanceOVL?: Maybe<BalanceOvl>;
  balanceOVLs: Array<BalanceOvl>;
  balances: Array<Balance>;
  collateralManager?: Maybe<CollateralManager>;
  collateralManagers: Array<CollateralManager>;
  market?: Maybe<Market>;
  marketManifest?: Maybe<MarketManifest>;
  marketManifests: Array<MarketManifest>;
  marketMonitor?: Maybe<MarketMonitor>;
  marketMonitors: Array<MarketMonitor>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  pricePoint?: Maybe<PricePoint>;
  pricePointCount?: Maybe<PricePointCount>;
  pricePointCounts: Array<PricePointCount>;
  pricePoints: Array<PricePoint>;
};


export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryAccountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Account_Filter>;
};


export type QueryBalanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBalanceOvlArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryBalanceOvLsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<BalanceOvl_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BalanceOvl_Filter>;
};


export type QueryBalancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Balance_Filter>;
};


export type QueryCollateralManagerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryCollateralManagersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralManager_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CollateralManager_Filter>;
};


export type QueryMarketArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryMarketManifestArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryMarketManifestsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MarketManifest_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<MarketManifest_Filter>;
};


export type QueryMarketMonitorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryMarketMonitorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MarketMonitor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<MarketMonitor_Filter>;
};


export type QueryMarketsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Market_Filter>;
};


export type QueryPositionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPositionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Position_Filter>;
};


export type QueryPricePointArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPricePointCountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type QueryPricePointCountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PricePointCount_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PricePointCount_Filter>;
};


export type QueryPricePointsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PricePoint_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  balance?: Maybe<Balance>;
  balanceOVL?: Maybe<BalanceOvl>;
  balanceOVLs: Array<BalanceOvl>;
  balances: Array<Balance>;
  collateralManager?: Maybe<CollateralManager>;
  collateralManagers: Array<CollateralManager>;
  market?: Maybe<Market>;
  marketManifest?: Maybe<MarketManifest>;
  marketManifests: Array<MarketManifest>;
  marketMonitor?: Maybe<MarketMonitor>;
  marketMonitors: Array<MarketMonitor>;
  markets: Array<Market>;
  position?: Maybe<Position>;
  positions: Array<Position>;
  pricePoint?: Maybe<PricePoint>;
  pricePointCount?: Maybe<PricePointCount>;
  pricePointCounts: Array<PricePointCount>;
  pricePoints: Array<PricePoint>;
};


export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionAccountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Account_Filter>;
};


export type SubscriptionBalanceArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBalanceOvlArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionBalanceOvLsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<BalanceOvl_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BalanceOvl_Filter>;
};


export type SubscriptionBalancesArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Balance_Filter>;
};


export type SubscriptionCollateralManagerArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionCollateralManagersArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<CollateralManager_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CollateralManager_Filter>;
};


export type SubscriptionMarketArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionMarketManifestArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionMarketManifestsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MarketManifest_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<MarketManifest_Filter>;
};


export type SubscriptionMarketMonitorArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionMarketMonitorsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<MarketMonitor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<MarketMonitor_Filter>;
};


export type SubscriptionMarketsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Market_Filter>;
};


export type SubscriptionPositionArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPositionsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<Position_Filter>;
};


export type SubscriptionPricePointArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPricePointCountArgs = {
  block?: Maybe<Block_Height>;
  id: Scalars['ID'];
};


export type SubscriptionPricePointCountsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PricePointCount_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PricePointCount_Filter>;
};


export type SubscriptionPricePointsArgs = {
  block?: Maybe<Block_Height>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<PricePoint_Filter>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
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


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', balanceOVL: { __typename?: 'BalanceOVL', balance: any } } | null | undefined };


export const AccountDocument = `
    query account($account: ID!) {
  account(id: $account) {
    balanceOVL {
      balance
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    account: build.query<AccountQuery, AccountQueryVariables>({
      query: (variables) => ({ document: AccountDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useAccountQuery, useLazyAccountQuery } = injectedRtkApi;

