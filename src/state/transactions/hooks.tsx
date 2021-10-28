import { TransactionResponse } from '@ethersproject/providers';
import { useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addTransaction, TransactionInfo, TransactionType } from './actions';
import { useActiveWeb3React } from '../../hooks/web3';
import { TransactionDetails } from './reducer';

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): (
  response: TransactionResponse,
  info: TransactionInfo
) => void {
  const { chainId, account } = useActiveWeb3React();
  const dispatch = useAppDispatch();

  return useCallback(
    (
      response: TransactionResponse,
      info: TransactionInfo
    ) => {
      if (!account) return
      if (!chainId) return

      const { hash } = response
      if (!hash) {
        throw Error('No transaction hash found.')
      }
      dispatch(addTransaction({ hash, from: account, info, chainId }))
    },
    [dispatch, chainId, account]
  );
};

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React();

  const state = useAppSelector((state) => state.transactions);

  return chainId ? state[chainId] ?? {} : {};
};

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions();

  if (!transactionHash || !transactions[transactionHash]) return false;

  return !transactions[transactionHash].receipt;
};

export function useAllPendingTransactions(): { [txHash: string]: TransactionDetails } {

  const txns = useAllTransactions()

  const accu: { [txHash: string]: TransactionDetails; } = {}

  for (const hash in txns) if (!!txns[hash].receipt) accu[hash] = txns[hash]

  return accu

}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
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
          if (tx.info.type !== TransactionType.APPROVAL) return false
          return tx.info.spender === spender && tx.info.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress]
  )
};

// watch for submissions to claim
// return null if not done loading, return undefined if not found
// export function useUserHasSubmittedClaim(account?: string): {
//   claimSubmitted: boolean
//   claimTxn: TransactionDetails | undefined
// } {
//   const allTransactions = useAllTransactions();

//   // get the txn if it has been submitted
//   const claimTxn = useMemo(() => {
//     const txnIndex = Object.keys(allTransactions).find((hash) => {
//       const tx = allTransactions[hash]
//       return tx.info.type === TransactionType.CLAIM && tx.info.recipient === account
//     })
//     return txnIndex && allTransactions[txnIndex] ? allTransactions[txnIndex] : undefined
//   }, [account, allTransactions])

//   return { claimSubmitted: Boolean(claimTxn), claimTxn };
// };
