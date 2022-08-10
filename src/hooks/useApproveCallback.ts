import {MaxUint256} from '@ethersproject/constants'
import {TransactionResponse} from '@ethersproject/providers'
import {Token} from '@uniswap/sdk-core'
import {useCallback, useMemo} from 'react'
import {BigNumber, utils} from 'ethers'
import {useAddPopup} from '../state/application/hooks'
import {
  useTransactionAdder,
  useHasPendingApproval,
} from '../state/transactions/hooks'
import {TransactionType} from '../state/transactions/actions'
import {calculateGasMargin} from '../utils/calculateGasMargin'
import {useTokenContract} from './useContract'
import {useActiveWeb3React} from './web3'
import {useMarketAllowance} from './useMarketAllowance'
import {currentTimeParsed} from '../utils/currentTime'

export enum ApprovalState {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
  amountToApprove?: BigNumber | undefined,
  spender?: string,
  currencyToken?: Token,
): [ApprovalState, () => Promise<void>] {
  const {account} = useActiveWeb3React()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const currentAllowance = useMarketAllowance(spender, account ?? undefined)
  const pendingApproval = useHasPendingApproval(currencyToken?.address, spender)

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) return ApprovalState.UNKNOWN

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lt(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amountToApprove, currentAllowance, pendingApproval, spender])

  const tokenContract = useTokenContract(currencyToken?.address)
  const addTransaction = useTransactionAdder()

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily')
      return
    }

    if (!currencyToken) return console.error('no token')

    if (!tokenContract) return console.error('tokenContract is null')

    if (!amountToApprove) return console.error('missing amount to approve')

    if (!spender) return console.error('no spender')

    let useExact = false
    const estimatedGas = await tokenContract.estimateGas
      .approve(spender, MaxUint256)
      .catch(() => {
        // general fallback for tokens who restrict approval amounts
        useExact = true
        return tokenContract.estimateGas.approve(
          spender,
          utils.formatUnits(amountToApprove),
        )
      })

    return tokenContract
      .approve(
        spender,
        useExact ? utils.formatUnits(amountToApprove) : MaxUint256,
        {
          gasLimit: calculateGasMargin(estimatedGas),
        },
      )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          type: TransactionType.APPROVAL,
          tokenAddress: currencyToken.address,
          spender,
        })
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error)

        addPopup(
          {
            txn: {
              hash: currentTimeForId,
              success: false,
              info: error,
            },
          },
          currentTimeForId,
        )

        throw error
      })
  }, [
    approvalState,
    currencyToken,
    tokenContract,
    amountToApprove,
    spender,
    addTransaction,
    addPopup,
    currentTimeForId,
  ])

  return [approvalState, approve]
}
