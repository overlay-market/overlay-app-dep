import { AppDispatch, AppState } from '../index'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TransactionDetails } from './reducer'
import { TransactionResponse } from '@ethersproject/providers'
import { addTransaction } from './actions'
import { useActiveWeb3React } from '../../hooks/web3'

export interface TransactionResponseLight {
  hash: string
}

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponseLight,
  customData?: {
    summary?: string
    approval?: { tokenAddress: string; spender: string }
    claim?: { recipient: string }
    archer?: {
      rawTransaction: string
      deadline: number
      nonce: number
      ethTip: string
    }
  }
) => void {
  const { chainId, account } = useActiveWeb3React();
  const dispatch = useAppDispatch()

  return useCallback(
    (
      response: TransactionResponseLight,
      {
        summary,
        approval,
        claim,
        archer,
      }: {
        summary?: string
        claim?: { recipient: string }
        approval?: { tokenAddress: string; spender: string }
        archer?: {
          rawTransaction: string
          deadline: number
          nonce: number
          ethTip: string
        }
      } = {}
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(
        addTransaction({
          hash,
          from: account,
          chainId,
          approval,
          summary,
          claim,
          archer,
        })
      )
    },
    [dispatch, chainId, account]
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React();

  const state = useAppSelector((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
};


// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions();
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          const approval = tx.approval
          if (!approval) return false
          return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress]
  );
};