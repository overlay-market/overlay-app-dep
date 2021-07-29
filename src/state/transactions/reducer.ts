import {
  SerializableTransactionReceipt,
  addTransaction,
} from './actions'

import { createReducer } from '@reduxjs/toolkit';

const now = () => new Date().getTime();

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
  claim?: { recipient: string }
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
  archer?: {
    deadline: number
    rawTransaction: string
    nonce: number
    ethTip: string
  }
};

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  };
};

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim, archer } }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.')
      }
      const txs = transactions[chainId] ?? {}
      txs[hash] = {
        hash,
        approval,
        summary,
        claim,
        from,
        addedTime: now(),
        archer,
      }
      transactions[chainId] = txs
    })
);
