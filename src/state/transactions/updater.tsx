import { ChainId } from '@sushiswap/sdk';
import { useActiveWeb3React } from '../../hooks/web3';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateBlockNumber } from '../application/actions';
import { useAddPopup, useBlockNumber } from '../application/hooks';
import { RetryOptions, RetryableError, retry } from '../../utils/retry';
import { checkedTransaction, finalizeTransaction, TransactionType } from './actions';


interface TxInterface {
  addedTime: number
  receipt?: Record<string, any>
  lastCheckedBlockNumber?: number
}

export function shouldCheck(lastBlockNumber: number, tx: TxInterface): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

const RETRY_OPTIONS_BY_CHAIN_ID: { [chainId: number]: RetryOptions } = {
  [ChainId.HARMONY]: { n: 10, minWait: 250, maxWait: 1000 },
  [ChainId.ARBITRUM]: { n: 10, minWait: 250, maxWait: 1000 },
}
const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 3, minWait: 1000, maxWait: 3000 }

export default function Updater(): null {
  const { chainId, library } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()

  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  // show popup on confirm
  const addPopup = useAddPopup()

  const getReceipt = useCallback(
    (hash: string) => {
      if (!library || !chainId) throw new Error('No library or chainId')
      const retryOptions = RETRY_OPTIONS_BY_CHAIN_ID[chainId] ?? DEFAULT_RETRY_OPTIONS
      return retry(
        () =>
          library.getTransactionReceipt(hash).then((receipt) => {
            if (receipt === null) {
              console.debug('Retrying for hash', hash)
              throw new RetryableError()
            }
            return receipt
          }),
        retryOptions
      )
    },
    [chainId, library]
  )

  useEffect(() => {
    
    if (!chainId || !library || !lastBlockNumber) return

    const cancels = Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .map((hash) => {
        const { promise, cancel } = getReceipt(hash)
        let transactionInfo = transactions[hash].info;

        promise
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              )

              if (transactionInfo.type === TransactionType.APPROVAL) {
                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.status === 1,
                      info: transactionInfo
                    },
                  },
                  hash
                )
              }

              if (transactionInfo.type === TransactionType.BUILD_OVL_POSITION) {
                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.status === 1,
                      info: transactionInfo
                    },
                  },
                  hash
                )
              }

              if (transactionInfo.type === TransactionType.UNWIND_OVL_POSITION) {
                addPopup(
                  {
                    txn: {
                      hash,
                      success: receipt.status === 2,
                      info: transactionInfo
                    },
                  },
                  hash
                )
              }


              // the receipt was fetched before the block, fast forward to that block to trigger balance updates
              if (receipt.blockNumber > lastBlockNumber) {
                dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }))
              }
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
            }
          })
          .catch((error) => {
            // if (!error.isCancelledError) {
            //   console.error(`Failed to check transaction hash: ${hash}`, error)
            // }
          })
        return cancel
      })

    return () => {
      cancels.forEach((cancel) => cancel())
    }
  }, [chainId, library, transactions, lastBlockNumber, dispatch, addPopup, getReceipt])

  return null
}
