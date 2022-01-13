import { ChainId } from "@sushiswap/sdk";
import { createAction } from "@reduxjs/toolkit";

export interface SerializableTransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  blockHash: string;
  transactionHash: string;
  blockNumber: number;
  status?: number;
}

export enum TransactionType {
  APPROVAL = 0,
  BUILD_OVL_POSITION = 1,
  UNWIND_OVL_POSITION = 2,
  LIQUIDATE_OVL_POSITION = 3,
}

export interface BaseTransactionInfo {
  type: TransactionType;
}

export interface ApproveTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.APPROVAL;
  tokenAddress: string;
  spender: string;
}

export interface BuildOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.BUILD_OVL_POSITION;
  market: string;
  collateral: string;
  leverage: string;
  isLong: boolean;
}

export interface UnwindOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.UNWIND_OVL_POSITION;
  positionId: string;
  shares: string;
}

export interface LiquidateOVLTransactionInfo extends BaseTransactionInfo {
  type: TransactionType.LIQUIDATE_OVL_POSITION;
  positionId: string;
}

export type TransactionInfo =
  | ApproveTransactionInfo
  | BuildOVLTransactionInfo
  | UnwindOVLTransactionInfo
  | LiquidateOVLTransactionInfo;

export const addTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  from: string;
  info: TransactionInfo;
  error: string;
}>("transactions/addTransaction");

export const clearAllTransactions = createAction<{
  chainId: ChainId;
}>("transactions/clearAllTransactions");

export const finalizeTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  receipt: SerializableTransactionReceipt;
}>("transactions/finalizeTransaction");

export const checkedTransaction = createAction<{
  chainId: ChainId;
  hash: string;
  blockNumber: number;
}>("transactions/checkedTransaction");
