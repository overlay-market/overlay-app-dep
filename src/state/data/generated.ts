import { api } from "./slice";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Account";
  id: Scalars["ID"];
  address: Scalars["String"];
  balances: Array<Balance>;
  balanceOVL: BalanceOvl;
};

export type AccountBalancesArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Balance_Filter>;
};

export type Account_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  address?: Maybe<Scalars["String"]>;
  address_not?: Maybe<Scalars["String"]>;
  address_gt?: Maybe<Scalars["String"]>;
  address_lt?: Maybe<Scalars["String"]>;
  address_gte?: Maybe<Scalars["String"]>;
  address_lte?: Maybe<Scalars["String"]>;
  address_in?: Maybe<Array<Scalars["String"]>>;
  address_not_in?: Maybe<Array<Scalars["String"]>>;
  address_contains?: Maybe<Scalars["String"]>;
  address_not_contains?: Maybe<Scalars["String"]>;
  address_starts_with?: Maybe<Scalars["String"]>;
  address_not_starts_with?: Maybe<Scalars["String"]>;
  address_ends_with?: Maybe<Scalars["String"]>;
  address_not_ends_with?: Maybe<Scalars["String"]>;
};

export enum Account_OrderBy {
  Id = "id",
  Address = "address",
  Balances = "balances",
  BalanceOvl = "balanceOVL",
}

export type Balance = {
  __typename?: "Balance";
  id: Scalars["ID"];
  account: Account;
  position: Scalars["BigInt"];
  shares: Scalars["BigInt"];
};

export type BalanceOvl = {
  __typename?: "BalanceOVL";
  id: Scalars["ID"];
  account: Account;
  balance: Scalars["BigInt"];
  locked: Scalars["BigInt"];
};

export type BalanceOvl_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  account?: Maybe<Scalars["String"]>;
  account_not?: Maybe<Scalars["String"]>;
  account_gt?: Maybe<Scalars["String"]>;
  account_lt?: Maybe<Scalars["String"]>;
  account_gte?: Maybe<Scalars["String"]>;
  account_lte?: Maybe<Scalars["String"]>;
  account_in?: Maybe<Array<Scalars["String"]>>;
  account_not_in?: Maybe<Array<Scalars["String"]>>;
  account_contains?: Maybe<Scalars["String"]>;
  account_not_contains?: Maybe<Scalars["String"]>;
  account_starts_with?: Maybe<Scalars["String"]>;
  account_not_starts_with?: Maybe<Scalars["String"]>;
  account_ends_with?: Maybe<Scalars["String"]>;
  account_not_ends_with?: Maybe<Scalars["String"]>;
  balance?: Maybe<Scalars["BigInt"]>;
  balance_not?: Maybe<Scalars["BigInt"]>;
  balance_gt?: Maybe<Scalars["BigInt"]>;
  balance_lt?: Maybe<Scalars["BigInt"]>;
  balance_gte?: Maybe<Scalars["BigInt"]>;
  balance_lte?: Maybe<Scalars["BigInt"]>;
  balance_in?: Maybe<Array<Scalars["BigInt"]>>;
  balance_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  locked?: Maybe<Scalars["BigInt"]>;
  locked_not?: Maybe<Scalars["BigInt"]>;
  locked_gt?: Maybe<Scalars["BigInt"]>;
  locked_lt?: Maybe<Scalars["BigInt"]>;
  locked_gte?: Maybe<Scalars["BigInt"]>;
  locked_lte?: Maybe<Scalars["BigInt"]>;
  locked_in?: Maybe<Array<Scalars["BigInt"]>>;
  locked_not_in?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum BalanceOvl_OrderBy {
  Id = "id",
  Account = "account",
  Balance = "balance",
  Locked = "locked",
}

export type Balance_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  account?: Maybe<Scalars["String"]>;
  account_not?: Maybe<Scalars["String"]>;
  account_gt?: Maybe<Scalars["String"]>;
  account_lt?: Maybe<Scalars["String"]>;
  account_gte?: Maybe<Scalars["String"]>;
  account_lte?: Maybe<Scalars["String"]>;
  account_in?: Maybe<Array<Scalars["String"]>>;
  account_not_in?: Maybe<Array<Scalars["String"]>>;
  account_contains?: Maybe<Scalars["String"]>;
  account_not_contains?: Maybe<Scalars["String"]>;
  account_starts_with?: Maybe<Scalars["String"]>;
  account_not_starts_with?: Maybe<Scalars["String"]>;
  account_ends_with?: Maybe<Scalars["String"]>;
  account_not_ends_with?: Maybe<Scalars["String"]>;
  position?: Maybe<Scalars["BigInt"]>;
  position_not?: Maybe<Scalars["BigInt"]>;
  position_gt?: Maybe<Scalars["BigInt"]>;
  position_lt?: Maybe<Scalars["BigInt"]>;
  position_gte?: Maybe<Scalars["BigInt"]>;
  position_lte?: Maybe<Scalars["BigInt"]>;
  position_in?: Maybe<Array<Scalars["BigInt"]>>;
  position_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  shares?: Maybe<Scalars["BigInt"]>;
  shares_not?: Maybe<Scalars["BigInt"]>;
  shares_gt?: Maybe<Scalars["BigInt"]>;
  shares_lt?: Maybe<Scalars["BigInt"]>;
  shares_gte?: Maybe<Scalars["BigInt"]>;
  shares_lte?: Maybe<Scalars["BigInt"]>;
  shares_in?: Maybe<Array<Scalars["BigInt"]>>;
  shares_not_in?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum Balance_OrderBy {
  Id = "id",
  Account = "account",
  Position = "position",
  Shares = "shares",
}

export type Block_Height = {
  hash?: Maybe<Scalars["Bytes"]>;
  number?: Maybe<Scalars["Int"]>;
};

export type CollateralManager = {
  __typename?: "CollateralManager";
  id: Scalars["ID"];
  address: Scalars["String"];
  positions: Array<Position>;
};

export type CollateralManagerPositionsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
};

export type CollateralManager_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  address?: Maybe<Scalars["String"]>;
  address_not?: Maybe<Scalars["String"]>;
  address_gt?: Maybe<Scalars["String"]>;
  address_lt?: Maybe<Scalars["String"]>;
  address_gte?: Maybe<Scalars["String"]>;
  address_lte?: Maybe<Scalars["String"]>;
  address_in?: Maybe<Array<Scalars["String"]>>;
  address_not_in?: Maybe<Array<Scalars["String"]>>;
  address_contains?: Maybe<Scalars["String"]>;
  address_not_contains?: Maybe<Scalars["String"]>;
  address_starts_with?: Maybe<Scalars["String"]>;
  address_not_starts_with?: Maybe<Scalars["String"]>;
  address_ends_with?: Maybe<Scalars["String"]>;
  address_not_ends_with?: Maybe<Scalars["String"]>;
};

export enum CollateralManager_OrderBy {
  Id = "id",
  Address = "address",
  Positions = "positions",
}

export type Market = {
  __typename?: "Market";
  id: Scalars["ID"];
  created: Scalars["BigInt"];
  feed: Scalars["Bytes"];
  base: Scalars["Bytes"];
  quote: Scalars["Bytes"];
  baseName: Scalars["String"];
  quoteName: Scalars["String"];
  baseSymbol: Scalars["String"];
  quoteSymbol: Scalars["String"];
  oiLong: Scalars["BigInt"];
  oiLongShares: Scalars["BigInt"];
  oiLongQueued: Scalars["BigInt"];
  oiShort: Scalars["BigInt"];
  oiShortShares: Scalars["BigInt"];
  oiShortQueued: Scalars["BigInt"];
  oiCap: Scalars["BigInt"];
  updatePeriod: Scalars["BigInt"];
  compoundingPeriod: Scalars["BigInt"];
  positions: Array<Position>;
  prices: Array<PricePoint>;
  currentPrice: PricePoint;
};

export type MarketPositionsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
};

export type MarketPricesArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PricePoint_Filter>;
};

export type MarketManifest = {
  __typename?: "MarketManifest";
  id: Scalars["ID"];
  markets: Array<Scalars["String"]>;
  compoundings: Array<Scalars["BigInt"]>;
  updates: Array<Scalars["BigInt"]>;
};

export type MarketManifest_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  markets?: Maybe<Array<Scalars["String"]>>;
  markets_not?: Maybe<Array<Scalars["String"]>>;
  markets_contains?: Maybe<Array<Scalars["String"]>>;
  markets_not_contains?: Maybe<Array<Scalars["String"]>>;
  compoundings?: Maybe<Array<Scalars["BigInt"]>>;
  compoundings_not?: Maybe<Array<Scalars["BigInt"]>>;
  compoundings_contains?: Maybe<Array<Scalars["BigInt"]>>;
  compoundings_not_contains?: Maybe<Array<Scalars["BigInt"]>>;
  updates?: Maybe<Array<Scalars["BigInt"]>>;
  updates_not?: Maybe<Array<Scalars["BigInt"]>>;
  updates_contains?: Maybe<Array<Scalars["BigInt"]>>;
  updates_not_contains?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum MarketManifest_OrderBy {
  Id = "id",
  Markets = "markets",
  Compoundings = "compoundings",
  Updates = "updates",
}

export type MarketMonitor = {
  __typename?: "MarketMonitor";
  id: Scalars["ID"];
  positions: Array<Position>;
};

export type MarketMonitorPositionsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
};

export type MarketMonitor_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  positions?: Maybe<Array<Scalars["String"]>>;
  positions_not?: Maybe<Array<Scalars["String"]>>;
  positions_contains?: Maybe<Array<Scalars["String"]>>;
  positions_not_contains?: Maybe<Array<Scalars["String"]>>;
};

export enum MarketMonitor_OrderBy {
  Id = "id",
  Positions = "positions",
}

export type Market_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  created?: Maybe<Scalars["BigInt"]>;
  created_not?: Maybe<Scalars["BigInt"]>;
  created_gt?: Maybe<Scalars["BigInt"]>;
  created_lt?: Maybe<Scalars["BigInt"]>;
  created_gte?: Maybe<Scalars["BigInt"]>;
  created_lte?: Maybe<Scalars["BigInt"]>;
  created_in?: Maybe<Array<Scalars["BigInt"]>>;
  created_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  feed?: Maybe<Scalars["Bytes"]>;
  feed_not?: Maybe<Scalars["Bytes"]>;
  feed_in?: Maybe<Array<Scalars["Bytes"]>>;
  feed_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  feed_contains?: Maybe<Scalars["Bytes"]>;
  feed_not_contains?: Maybe<Scalars["Bytes"]>;
  base?: Maybe<Scalars["Bytes"]>;
  base_not?: Maybe<Scalars["Bytes"]>;
  base_in?: Maybe<Array<Scalars["Bytes"]>>;
  base_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  base_contains?: Maybe<Scalars["Bytes"]>;
  base_not_contains?: Maybe<Scalars["Bytes"]>;
  quote?: Maybe<Scalars["Bytes"]>;
  quote_not?: Maybe<Scalars["Bytes"]>;
  quote_in?: Maybe<Array<Scalars["Bytes"]>>;
  quote_not_in?: Maybe<Array<Scalars["Bytes"]>>;
  quote_contains?: Maybe<Scalars["Bytes"]>;
  quote_not_contains?: Maybe<Scalars["Bytes"]>;
  baseName?: Maybe<Scalars["String"]>;
  baseName_not?: Maybe<Scalars["String"]>;
  baseName_gt?: Maybe<Scalars["String"]>;
  baseName_lt?: Maybe<Scalars["String"]>;
  baseName_gte?: Maybe<Scalars["String"]>;
  baseName_lte?: Maybe<Scalars["String"]>;
  baseName_in?: Maybe<Array<Scalars["String"]>>;
  baseName_not_in?: Maybe<Array<Scalars["String"]>>;
  baseName_contains?: Maybe<Scalars["String"]>;
  baseName_not_contains?: Maybe<Scalars["String"]>;
  baseName_starts_with?: Maybe<Scalars["String"]>;
  baseName_not_starts_with?: Maybe<Scalars["String"]>;
  baseName_ends_with?: Maybe<Scalars["String"]>;
  baseName_not_ends_with?: Maybe<Scalars["String"]>;
  quoteName?: Maybe<Scalars["String"]>;
  quoteName_not?: Maybe<Scalars["String"]>;
  quoteName_gt?: Maybe<Scalars["String"]>;
  quoteName_lt?: Maybe<Scalars["String"]>;
  quoteName_gte?: Maybe<Scalars["String"]>;
  quoteName_lte?: Maybe<Scalars["String"]>;
  quoteName_in?: Maybe<Array<Scalars["String"]>>;
  quoteName_not_in?: Maybe<Array<Scalars["String"]>>;
  quoteName_contains?: Maybe<Scalars["String"]>;
  quoteName_not_contains?: Maybe<Scalars["String"]>;
  quoteName_starts_with?: Maybe<Scalars["String"]>;
  quoteName_not_starts_with?: Maybe<Scalars["String"]>;
  quoteName_ends_with?: Maybe<Scalars["String"]>;
  quoteName_not_ends_with?: Maybe<Scalars["String"]>;
  baseSymbol?: Maybe<Scalars["String"]>;
  baseSymbol_not?: Maybe<Scalars["String"]>;
  baseSymbol_gt?: Maybe<Scalars["String"]>;
  baseSymbol_lt?: Maybe<Scalars["String"]>;
  baseSymbol_gte?: Maybe<Scalars["String"]>;
  baseSymbol_lte?: Maybe<Scalars["String"]>;
  baseSymbol_in?: Maybe<Array<Scalars["String"]>>;
  baseSymbol_not_in?: Maybe<Array<Scalars["String"]>>;
  baseSymbol_contains?: Maybe<Scalars["String"]>;
  baseSymbol_not_contains?: Maybe<Scalars["String"]>;
  baseSymbol_starts_with?: Maybe<Scalars["String"]>;
  baseSymbol_not_starts_with?: Maybe<Scalars["String"]>;
  baseSymbol_ends_with?: Maybe<Scalars["String"]>;
  baseSymbol_not_ends_with?: Maybe<Scalars["String"]>;
  quoteSymbol?: Maybe<Scalars["String"]>;
  quoteSymbol_not?: Maybe<Scalars["String"]>;
  quoteSymbol_gt?: Maybe<Scalars["String"]>;
  quoteSymbol_lt?: Maybe<Scalars["String"]>;
  quoteSymbol_gte?: Maybe<Scalars["String"]>;
  quoteSymbol_lte?: Maybe<Scalars["String"]>;
  quoteSymbol_in?: Maybe<Array<Scalars["String"]>>;
  quoteSymbol_not_in?: Maybe<Array<Scalars["String"]>>;
  quoteSymbol_contains?: Maybe<Scalars["String"]>;
  quoteSymbol_not_contains?: Maybe<Scalars["String"]>;
  quoteSymbol_starts_with?: Maybe<Scalars["String"]>;
  quoteSymbol_not_starts_with?: Maybe<Scalars["String"]>;
  quoteSymbol_ends_with?: Maybe<Scalars["String"]>;
  quoteSymbol_not_ends_with?: Maybe<Scalars["String"]>;
  oiLong?: Maybe<Scalars["BigInt"]>;
  oiLong_not?: Maybe<Scalars["BigInt"]>;
  oiLong_gt?: Maybe<Scalars["BigInt"]>;
  oiLong_lt?: Maybe<Scalars["BigInt"]>;
  oiLong_gte?: Maybe<Scalars["BigInt"]>;
  oiLong_lte?: Maybe<Scalars["BigInt"]>;
  oiLong_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiLong_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiLongShares?: Maybe<Scalars["BigInt"]>;
  oiLongShares_not?: Maybe<Scalars["BigInt"]>;
  oiLongShares_gt?: Maybe<Scalars["BigInt"]>;
  oiLongShares_lt?: Maybe<Scalars["BigInt"]>;
  oiLongShares_gte?: Maybe<Scalars["BigInt"]>;
  oiLongShares_lte?: Maybe<Scalars["BigInt"]>;
  oiLongShares_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiLongShares_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiLongQueued?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_not?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_gt?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_lt?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_gte?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_lte?: Maybe<Scalars["BigInt"]>;
  oiLongQueued_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiLongQueued_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShort?: Maybe<Scalars["BigInt"]>;
  oiShort_not?: Maybe<Scalars["BigInt"]>;
  oiShort_gt?: Maybe<Scalars["BigInt"]>;
  oiShort_lt?: Maybe<Scalars["BigInt"]>;
  oiShort_gte?: Maybe<Scalars["BigInt"]>;
  oiShort_lte?: Maybe<Scalars["BigInt"]>;
  oiShort_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShort_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShortShares?: Maybe<Scalars["BigInt"]>;
  oiShortShares_not?: Maybe<Scalars["BigInt"]>;
  oiShortShares_gt?: Maybe<Scalars["BigInt"]>;
  oiShortShares_lt?: Maybe<Scalars["BigInt"]>;
  oiShortShares_gte?: Maybe<Scalars["BigInt"]>;
  oiShortShares_lte?: Maybe<Scalars["BigInt"]>;
  oiShortShares_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShortShares_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShortQueued?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_not?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_gt?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_lt?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_gte?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_lte?: Maybe<Scalars["BigInt"]>;
  oiShortQueued_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShortQueued_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiCap?: Maybe<Scalars["BigInt"]>;
  oiCap_not?: Maybe<Scalars["BigInt"]>;
  oiCap_gt?: Maybe<Scalars["BigInt"]>;
  oiCap_lt?: Maybe<Scalars["BigInt"]>;
  oiCap_gte?: Maybe<Scalars["BigInt"]>;
  oiCap_lte?: Maybe<Scalars["BigInt"]>;
  oiCap_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiCap_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  updatePeriod?: Maybe<Scalars["BigInt"]>;
  updatePeriod_not?: Maybe<Scalars["BigInt"]>;
  updatePeriod_gt?: Maybe<Scalars["BigInt"]>;
  updatePeriod_lt?: Maybe<Scalars["BigInt"]>;
  updatePeriod_gte?: Maybe<Scalars["BigInt"]>;
  updatePeriod_lte?: Maybe<Scalars["BigInt"]>;
  updatePeriod_in?: Maybe<Array<Scalars["BigInt"]>>;
  updatePeriod_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  compoundingPeriod?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_not?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_gt?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_lt?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_gte?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_lte?: Maybe<Scalars["BigInt"]>;
  compoundingPeriod_in?: Maybe<Array<Scalars["BigInt"]>>;
  compoundingPeriod_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  currentPrice?: Maybe<Scalars["String"]>;
  currentPrice_not?: Maybe<Scalars["String"]>;
  currentPrice_gt?: Maybe<Scalars["String"]>;
  currentPrice_lt?: Maybe<Scalars["String"]>;
  currentPrice_gte?: Maybe<Scalars["String"]>;
  currentPrice_lte?: Maybe<Scalars["String"]>;
  currentPrice_in?: Maybe<Array<Scalars["String"]>>;
  currentPrice_not_in?: Maybe<Array<Scalars["String"]>>;
  currentPrice_contains?: Maybe<Scalars["String"]>;
  currentPrice_not_contains?: Maybe<Scalars["String"]>;
  currentPrice_starts_with?: Maybe<Scalars["String"]>;
  currentPrice_not_starts_with?: Maybe<Scalars["String"]>;
  currentPrice_ends_with?: Maybe<Scalars["String"]>;
  currentPrice_not_ends_with?: Maybe<Scalars["String"]>;
};

export enum Market_OrderBy {
  Id = "id",
  Created = "created",
  Feed = "feed",
  Base = "base",
  Quote = "quote",
  BaseName = "baseName",
  QuoteName = "quoteName",
  BaseSymbol = "baseSymbol",
  QuoteSymbol = "quoteSymbol",
  OiLong = "oiLong",
  OiLongShares = "oiLongShares",
  OiLongQueued = "oiLongQueued",
  OiShort = "oiShort",
  OiShortShares = "oiShortShares",
  OiShortQueued = "oiShortQueued",
  OiCap = "oiCap",
  UpdatePeriod = "updatePeriod",
  CompoundingPeriod = "compoundingPeriod",
  Positions = "positions",
  Prices = "prices",
  CurrentPrice = "currentPrice",
}

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type Position = {
  __typename?: "Position";
  id: Scalars["ID"];
  number: Scalars["BigInt"];
  collateralManager: CollateralManager;
  market: Market;
  isLong: Scalars["Boolean"];
  leverage: Scalars["BigInt"];
  pricePoint: PricePoint;
  oiShares: Scalars["BigInt"];
  debt: Scalars["BigInt"];
  cost: Scalars["BigInt"];
  compounding: Scalars["BigInt"];
  liquidationPrice: Scalars["BigDecimal"];
  totalSupply: Scalars["BigInt"];
};

export type Position_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  number?: Maybe<Scalars["BigInt"]>;
  number_not?: Maybe<Scalars["BigInt"]>;
  number_gt?: Maybe<Scalars["BigInt"]>;
  number_lt?: Maybe<Scalars["BigInt"]>;
  number_gte?: Maybe<Scalars["BigInt"]>;
  number_lte?: Maybe<Scalars["BigInt"]>;
  number_in?: Maybe<Array<Scalars["BigInt"]>>;
  number_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  collateralManager?: Maybe<Scalars["String"]>;
  collateralManager_not?: Maybe<Scalars["String"]>;
  collateralManager_gt?: Maybe<Scalars["String"]>;
  collateralManager_lt?: Maybe<Scalars["String"]>;
  collateralManager_gte?: Maybe<Scalars["String"]>;
  collateralManager_lte?: Maybe<Scalars["String"]>;
  collateralManager_in?: Maybe<Array<Scalars["String"]>>;
  collateralManager_not_in?: Maybe<Array<Scalars["String"]>>;
  collateralManager_contains?: Maybe<Scalars["String"]>;
  collateralManager_not_contains?: Maybe<Scalars["String"]>;
  collateralManager_starts_with?: Maybe<Scalars["String"]>;
  collateralManager_not_starts_with?: Maybe<Scalars["String"]>;
  collateralManager_ends_with?: Maybe<Scalars["String"]>;
  collateralManager_not_ends_with?: Maybe<Scalars["String"]>;
  market?: Maybe<Scalars["String"]>;
  market_not?: Maybe<Scalars["String"]>;
  market_gt?: Maybe<Scalars["String"]>;
  market_lt?: Maybe<Scalars["String"]>;
  market_gte?: Maybe<Scalars["String"]>;
  market_lte?: Maybe<Scalars["String"]>;
  market_in?: Maybe<Array<Scalars["String"]>>;
  market_not_in?: Maybe<Array<Scalars["String"]>>;
  market_contains?: Maybe<Scalars["String"]>;
  market_not_contains?: Maybe<Scalars["String"]>;
  market_starts_with?: Maybe<Scalars["String"]>;
  market_not_starts_with?: Maybe<Scalars["String"]>;
  market_ends_with?: Maybe<Scalars["String"]>;
  market_not_ends_with?: Maybe<Scalars["String"]>;
  isLong?: Maybe<Scalars["Boolean"]>;
  isLong_not?: Maybe<Scalars["Boolean"]>;
  isLong_in?: Maybe<Array<Scalars["Boolean"]>>;
  isLong_not_in?: Maybe<Array<Scalars["Boolean"]>>;
  leverage?: Maybe<Scalars["BigInt"]>;
  leverage_not?: Maybe<Scalars["BigInt"]>;
  leverage_gt?: Maybe<Scalars["BigInt"]>;
  leverage_lt?: Maybe<Scalars["BigInt"]>;
  leverage_gte?: Maybe<Scalars["BigInt"]>;
  leverage_lte?: Maybe<Scalars["BigInt"]>;
  leverage_in?: Maybe<Array<Scalars["BigInt"]>>;
  leverage_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  pricePoint?: Maybe<Scalars["String"]>;
  pricePoint_not?: Maybe<Scalars["String"]>;
  pricePoint_gt?: Maybe<Scalars["String"]>;
  pricePoint_lt?: Maybe<Scalars["String"]>;
  pricePoint_gte?: Maybe<Scalars["String"]>;
  pricePoint_lte?: Maybe<Scalars["String"]>;
  pricePoint_in?: Maybe<Array<Scalars["String"]>>;
  pricePoint_not_in?: Maybe<Array<Scalars["String"]>>;
  pricePoint_contains?: Maybe<Scalars["String"]>;
  pricePoint_not_contains?: Maybe<Scalars["String"]>;
  pricePoint_starts_with?: Maybe<Scalars["String"]>;
  pricePoint_not_starts_with?: Maybe<Scalars["String"]>;
  pricePoint_ends_with?: Maybe<Scalars["String"]>;
  pricePoint_not_ends_with?: Maybe<Scalars["String"]>;
  oiShares?: Maybe<Scalars["BigInt"]>;
  oiShares_not?: Maybe<Scalars["BigInt"]>;
  oiShares_gt?: Maybe<Scalars["BigInt"]>;
  oiShares_lt?: Maybe<Scalars["BigInt"]>;
  oiShares_gte?: Maybe<Scalars["BigInt"]>;
  oiShares_lte?: Maybe<Scalars["BigInt"]>;
  oiShares_in?: Maybe<Array<Scalars["BigInt"]>>;
  oiShares_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  debt?: Maybe<Scalars["BigInt"]>;
  debt_not?: Maybe<Scalars["BigInt"]>;
  debt_gt?: Maybe<Scalars["BigInt"]>;
  debt_lt?: Maybe<Scalars["BigInt"]>;
  debt_gte?: Maybe<Scalars["BigInt"]>;
  debt_lte?: Maybe<Scalars["BigInt"]>;
  debt_in?: Maybe<Array<Scalars["BigInt"]>>;
  debt_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  cost?: Maybe<Scalars["BigInt"]>;
  cost_not?: Maybe<Scalars["BigInt"]>;
  cost_gt?: Maybe<Scalars["BigInt"]>;
  cost_lt?: Maybe<Scalars["BigInt"]>;
  cost_gte?: Maybe<Scalars["BigInt"]>;
  cost_lte?: Maybe<Scalars["BigInt"]>;
  cost_in?: Maybe<Array<Scalars["BigInt"]>>;
  cost_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  compounding?: Maybe<Scalars["BigInt"]>;
  compounding_not?: Maybe<Scalars["BigInt"]>;
  compounding_gt?: Maybe<Scalars["BigInt"]>;
  compounding_lt?: Maybe<Scalars["BigInt"]>;
  compounding_gte?: Maybe<Scalars["BigInt"]>;
  compounding_lte?: Maybe<Scalars["BigInt"]>;
  compounding_in?: Maybe<Array<Scalars["BigInt"]>>;
  compounding_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  liquidationPrice?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_not?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_gt?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_lt?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_gte?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_lte?: Maybe<Scalars["BigDecimal"]>;
  liquidationPrice_in?: Maybe<Array<Scalars["BigDecimal"]>>;
  liquidationPrice_not_in?: Maybe<Array<Scalars["BigDecimal"]>>;
  totalSupply?: Maybe<Scalars["BigInt"]>;
  totalSupply_not?: Maybe<Scalars["BigInt"]>;
  totalSupply_gt?: Maybe<Scalars["BigInt"]>;
  totalSupply_lt?: Maybe<Scalars["BigInt"]>;
  totalSupply_gte?: Maybe<Scalars["BigInt"]>;
  totalSupply_lte?: Maybe<Scalars["BigInt"]>;
  totalSupply_in?: Maybe<Array<Scalars["BigInt"]>>;
  totalSupply_not_in?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum Position_OrderBy {
  Id = "id",
  Number = "number",
  CollateralManager = "collateralManager",
  Market = "market",
  IsLong = "isLong",
  Leverage = "leverage",
  PricePoint = "pricePoint",
  OiShares = "oiShares",
  Debt = "debt",
  Cost = "cost",
  Compounding = "compounding",
  LiquidationPrice = "liquidationPrice",
  TotalSupply = "totalSupply",
}

export type PricePoint = {
  __typename?: "PricePoint";
  id: Scalars["ID"];
  market: Market;
  number: Scalars["BigInt"];
  bid: Scalars["BigInt"];
  ask: Scalars["BigInt"];
  index: Scalars["BigInt"];
};

export type PricePointCount = {
  __typename?: "PricePointCount";
  id: Scalars["ID"];
  count: Scalars["BigInt"];
};

export type PricePointCount_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  count?: Maybe<Scalars["BigInt"]>;
  count_not?: Maybe<Scalars["BigInt"]>;
  count_gt?: Maybe<Scalars["BigInt"]>;
  count_lt?: Maybe<Scalars["BigInt"]>;
  count_gte?: Maybe<Scalars["BigInt"]>;
  count_lte?: Maybe<Scalars["BigInt"]>;
  count_in?: Maybe<Array<Scalars["BigInt"]>>;
  count_not_in?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum PricePointCount_OrderBy {
  Id = "id",
  Count = "count",
}

export type PricePoint_Filter = {
  id?: Maybe<Scalars["ID"]>;
  id_not?: Maybe<Scalars["ID"]>;
  id_gt?: Maybe<Scalars["ID"]>;
  id_lt?: Maybe<Scalars["ID"]>;
  id_gte?: Maybe<Scalars["ID"]>;
  id_lte?: Maybe<Scalars["ID"]>;
  id_in?: Maybe<Array<Scalars["ID"]>>;
  id_not_in?: Maybe<Array<Scalars["ID"]>>;
  market?: Maybe<Scalars["String"]>;
  market_not?: Maybe<Scalars["String"]>;
  market_gt?: Maybe<Scalars["String"]>;
  market_lt?: Maybe<Scalars["String"]>;
  market_gte?: Maybe<Scalars["String"]>;
  market_lte?: Maybe<Scalars["String"]>;
  market_in?: Maybe<Array<Scalars["String"]>>;
  market_not_in?: Maybe<Array<Scalars["String"]>>;
  market_contains?: Maybe<Scalars["String"]>;
  market_not_contains?: Maybe<Scalars["String"]>;
  market_starts_with?: Maybe<Scalars["String"]>;
  market_not_starts_with?: Maybe<Scalars["String"]>;
  market_ends_with?: Maybe<Scalars["String"]>;
  market_not_ends_with?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["BigInt"]>;
  number_not?: Maybe<Scalars["BigInt"]>;
  number_gt?: Maybe<Scalars["BigInt"]>;
  number_lt?: Maybe<Scalars["BigInt"]>;
  number_gte?: Maybe<Scalars["BigInt"]>;
  number_lte?: Maybe<Scalars["BigInt"]>;
  number_in?: Maybe<Array<Scalars["BigInt"]>>;
  number_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  bid?: Maybe<Scalars["BigInt"]>;
  bid_not?: Maybe<Scalars["BigInt"]>;
  bid_gt?: Maybe<Scalars["BigInt"]>;
  bid_lt?: Maybe<Scalars["BigInt"]>;
  bid_gte?: Maybe<Scalars["BigInt"]>;
  bid_lte?: Maybe<Scalars["BigInt"]>;
  bid_in?: Maybe<Array<Scalars["BigInt"]>>;
  bid_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  ask?: Maybe<Scalars["BigInt"]>;
  ask_not?: Maybe<Scalars["BigInt"]>;
  ask_gt?: Maybe<Scalars["BigInt"]>;
  ask_lt?: Maybe<Scalars["BigInt"]>;
  ask_gte?: Maybe<Scalars["BigInt"]>;
  ask_lte?: Maybe<Scalars["BigInt"]>;
  ask_in?: Maybe<Array<Scalars["BigInt"]>>;
  ask_not_in?: Maybe<Array<Scalars["BigInt"]>>;
  index?: Maybe<Scalars["BigInt"]>;
  index_not?: Maybe<Scalars["BigInt"]>;
  index_gt?: Maybe<Scalars["BigInt"]>;
  index_lt?: Maybe<Scalars["BigInt"]>;
  index_gte?: Maybe<Scalars["BigInt"]>;
  index_lte?: Maybe<Scalars["BigInt"]>;
  index_in?: Maybe<Array<Scalars["BigInt"]>>;
  index_not_in?: Maybe<Array<Scalars["BigInt"]>>;
};

export enum PricePoint_OrderBy {
  Id = "id",
  Market = "market",
  Number = "number",
  Bid = "bid",
  Ask = "ask",
  Index = "index",
}

export type Query = {
  __typename?: "Query";
  position?: Maybe<Position>;
  positions: Array<Position>;
  collateralManager?: Maybe<CollateralManager>;
  collateralManagers: Array<CollateralManager>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  pricePoint?: Maybe<PricePoint>;
  pricePoints: Array<PricePoint>;
  pricePointCount?: Maybe<PricePointCount>;
  pricePointCounts: Array<PricePointCount>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  balance?: Maybe<Balance>;
  balances: Array<Balance>;
  balanceOVL?: Maybe<BalanceOvl>;
  balanceOVLs: Array<BalanceOvl>;
  marketManifest?: Maybe<MarketManifest>;
  marketManifests: Array<MarketManifest>;
  marketMonitor?: Maybe<MarketMonitor>;
  marketMonitors: Array<MarketMonitor>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};

export type QueryPositionArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryPositionsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryCollateralManagerArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryCollateralManagersArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<CollateralManager_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralManager_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryAccountArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryAccountsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Account_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPricePointArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryPricePointsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PricePoint_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryPricePointCountArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryPricePointCountsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<PricePointCount_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PricePointCount_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryMarketArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryMarketsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryBalanceArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryBalancesArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Balance_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryBalanceOvlArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryBalanceOvLsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<BalanceOvl_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<BalanceOvl_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryMarketManifestArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryMarketManifestsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<MarketManifest_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MarketManifest_Filter>;
  block?: Maybe<Block_Height>;
};

export type QueryMarketMonitorArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type QueryMarketMonitorsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<MarketMonitor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MarketMonitor_Filter>;
  block?: Maybe<Block_Height>;
};

export type Query_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type Subscription = {
  __typename?: "Subscription";
  position?: Maybe<Position>;
  positions: Array<Position>;
  collateralManager?: Maybe<CollateralManager>;
  collateralManagers: Array<CollateralManager>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  pricePoint?: Maybe<PricePoint>;
  pricePoints: Array<PricePoint>;
  pricePointCount?: Maybe<PricePointCount>;
  pricePointCounts: Array<PricePointCount>;
  market?: Maybe<Market>;
  markets: Array<Market>;
  balance?: Maybe<Balance>;
  balances: Array<Balance>;
  balanceOVL?: Maybe<BalanceOvl>;
  balanceOVLs: Array<BalanceOvl>;
  marketManifest?: Maybe<MarketManifest>;
  marketManifests: Array<MarketManifest>;
  marketMonitor?: Maybe<MarketMonitor>;
  marketMonitors: Array<MarketMonitor>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};

export type SubscriptionPositionArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPositionsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Position_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Position_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionCollateralManagerArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionCollateralManagersArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<CollateralManager_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<CollateralManager_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionAccountArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionAccountsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Account_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Account_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPricePointArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPricePointsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<PricePoint_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PricePoint_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionPricePointCountArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionPricePointCountsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<PricePointCount_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<PricePointCount_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Market_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Market_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionBalanceArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionBalancesArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<Balance_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<Balance_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionBalanceOvlArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionBalanceOvLsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<BalanceOvl_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<BalanceOvl_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketManifestArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketManifestsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<MarketManifest_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MarketManifest_Filter>;
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketMonitorArgs = {
  id: Scalars["ID"];
  block?: Maybe<Block_Height>;
};

export type SubscriptionMarketMonitorsArgs = {
  skip?: Maybe<Scalars["Int"]>;
  first?: Maybe<Scalars["Int"]>;
  orderBy?: Maybe<MarketMonitor_OrderBy>;
  orderDirection?: Maybe<OrderDirection>;
  where?: Maybe<MarketMonitor_Filter>;
  block?: Maybe<Block_Height>;
};

export type Subscription_MetaArgs = {
  block?: Maybe<Block_Height>;
};

export type _Block_ = {
  __typename?: "_Block_";
  /** The hash of the block */
  hash?: Maybe<Scalars["Bytes"]>;
  /** The block number */
  number: Scalars["Int"];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars["String"];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars["Boolean"];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = "allow",
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = "deny",
}

export type AccountQueryVariables = Exact<{
  account: Scalars["ID"];
}>;

export type AccountQuery = { __typename?: "Query" } & {
  account?: Maybe<{ __typename?: "Account" } & Pick<Account, "id">>;
};

export type AppQueryVariables = Exact<{
  account: Scalars["ID"];
}>;

export type AppQuery = { __typename?: "Query" } & {
  markets: Array<
    { __typename?: "Market" } & Pick<
      Market,
      | "id"
      | "oiLong"
      | "oiLongShares"
      | "oiLongQueued"
      | "oiShort"
      | "oiShortShares"
      | "oiShortQueued"
      | "oiCap"
    >
  >;
  account?: Maybe<
    { __typename?: "Account" } & {
      balanceOVL: { __typename?: "BalanceOVL" } & Pick<BalanceOvl, "balance">;
      balances: Array<
        { __typename?: "Balance" } & Pick<Balance, "id" | "shares">
      >;
    }
  >;
};

export const AccountDocument = `
  query account($account: ID!) {
    account(id: $account) {
      id
      balanceOVL {
        balance
      }
      balances{
        id
        shares
      }
      
    }
}
    `;

export const AppDocument = `
  query app($account: ID!) {
    markets {
      id
      oiLong
      oiLongShares
      oiLongQueued
      oiShort
      oiShortShares
      oiShortQueued
      oiCap
    }
    account(id: $account) {
      balanceOVL {
        balance
      }
      balances {
        id
        shares
      }
    }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    account: build.query<AccountQuery, AccountQueryVariables>({
      query: (variables) => ({ document: AccountDocument, variables }),
    }),
    app: build.query<AppQuery, AppQueryVariables>({
      query: (variables) => ({ document: AppDocument, variables }),
    }),
  }),
});

export { injectedRtkApi as api };
export const {
  useAccountQuery,
  useLazyAccountQuery,
  useAppQuery,
  useLazyAppQuery,
} = injectedRtkApi;
