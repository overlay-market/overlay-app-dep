import {useMemo} from 'react'
import {useLayerZeroBridgeContract} from './useContract'
import {useSingleCallResult} from '../state/multicall/hooks'
import {useActiveWeb3React} from './web3'
import {TransactionType} from './../state/transactions/actions'
import {TransactionResponse} from '@ethersproject/providers'
import {useTransactionAdder} from '../state/transactions/hooks'
import {useAddPopup} from '../state/application/hooks'
import {currentTimeParsed} from '../utils/currentTime'
import {calculateGasMargin} from '../utils/calculateGasMargin'
import {BigNumber, utils, BigNumberish} from 'ethers'
import isZero from '../utils/isZero'

interface BridgeTokenCall {
  address: string
  calldata: string
  value: string
}

interface BridgeTokenCallEstimate {
  call: BridgeTokenCall
}

interface SuccessfulCall extends BridgeTokenCallEstimate {
  call: BridgeTokenCall
  gasEstimate: BigNumber
}

interface FailedCall extends BridgeTokenCallEstimate {
  call: BridgeTokenCall
  error: Error
}

enum BridgeTokenCallbackState {
  INVALID,
  LOADING,
  VALID,
}
// interface useBridgeTokenCallbackProps {
//   layerZeroContractAddress: string
//   destinationChainId: number
//   amount: any
// }

function useBridgeTokenArguments(
  layerZeroContractAddress: string | undefined,
  destinationChainId: number,
  amount: string | undefined,
) {
  let calldata: any
  const layerZeroContract = useLayerZeroBridgeContract()
  if (!destinationChainId || !amount || !layerZeroContract) calldata = undefined
  else {
    calldata = layerZeroContract.interface.encodeFunctionData('bridgeToken', [
      destinationChainId,
      utils.parseUnits(amount),
    ])
  }

  const estimatedFees = useSingleCallResult(layerZeroContract)

  return useMemo(() => {
    if (
      !layerZeroContractAddress ||
      !destinationChainId ||
      !amount ||
      !layerZeroContract ||
      !calldata
    ) {
      console.log('right here')
      return []
    }

    const txn: {address: string; calldata: string; value: string} = {
      address: layerZeroContractAddress,
      calldata: calldata,
      // value: '0x0',
      value: '0x2d30e0a3b2ef8',
    }

    return [
      {
        // address: txn.address,
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ]
  }, [destinationChainId, amount, calldata, layerZeroContractAddress, layerZeroContract])
}

/**
 * Returns callback function that will execute bridging tokens from one chain to another
 * @param
 */
export function useBridgeTokenCallback(
  layerZeroContractAddress: string,
  destinationChainId: number,
  amount: string,
) {
  console.log('destinationChainId:', destinationChainId)
  const addTransaction = useTransactionAdder()
  const addPopup = useAddPopup()
  const currentTimeForId = currentTimeParsed()
  const {account, chainId, library} = useActiveWeb3React()
  const bridgeTokenCalls = useBridgeTokenArguments(
    layerZeroContractAddress,
    destinationChainId,
    amount,
  )

  return useMemo(() => {
    if (!account || !library || !chainId || !bridgeTokenCalls) {
      return {
        state: BridgeTokenCallbackState.INVALID,
        callback: null,
        error: 'Missing Dependencies',
      }
    }

    return {
      state: BridgeTokenCallbackState.VALID,
      callback: async function onBridgeToken(): Promise<string> {
        const estimatedCalls: BridgeTokenCallEstimate[] = await Promise.all(
          bridgeTokenCalls.map(call => {
            const {address, calldata, value} = call

            const tx = {
              from: account,
              to: address,
              data: calldata,
              value: value,
            }

            console.log('tx: ', tx)
            return library
              .estimateGas(tx)
              .then(gasEstimate => {
                return {call, gasEstimate}
              })
              .catch(gasError => {
                console.debug('Gas estimate failed, trying eth_call to extract error', call)

                console.log('gasError: ', gasError)

                return library
                  .call(tx)
                  .then(result => {
                    console.debug(
                      'Unexpected successful call after failed estimate gas',
                      call,
                      gasError,
                      result,
                    )

                    const error = 'Unexpected issue with estimating the gas. ' + 'Please try again.'

                    console.log('gasError from call: ', gasError)
                    return {
                      error: new Error(error),
                      call,
                    }
                  })
                  .catch(callError => {
                    console.log('callError: ', callError.error)

                    addPopup(
                      {
                        txn: {
                          hash: currentTimeForId,
                          success: false,
                          info: callError.error,
                        },
                      },
                      currentTimeForId,
                    )

                    console.debug('Call threw error', call, callError)

                    return {call, error: new Error(callError)}
                  })
              })
          }),
        )

        // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
        let bestCallOption: SuccessfulCall | BridgeTokenCallEstimate | undefined =
          estimatedCalls.find(
            (el, ix, list): el is SuccessfulCall =>
              'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
          )

        // check if any calls errored with a recognizable error
        if (!bestCallOption) {
          const errorCalls = estimatedCalls.filter((call): call is FailedCall => 'error' in call)

          if (errorCalls.length > 0) throw 'ERROR ' + errorCalls[errorCalls.length - 1].error
          const firstNoErrorCall = estimatedCalls.find<BridgeTokenCallEstimate>(
            (call): call is BridgeTokenCallEstimate => !('error' in call),
          )
          if (!firstNoErrorCall)
            throw new Error('Unexpected error. Could not estimate gas for the build.')
          bestCallOption = firstNoErrorCall
        }

        const {
          call: {address, calldata, value},
        } = bestCallOption

        console.log('bestCallOption: ', bestCallOption)

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: address,
            data: calldata,
            // let the wallet try if we can't estimate the gas
            ...('gasEstimate' in bestCallOption
              ? {gasLimit: calculateGasMargin(bestCallOption.gasEstimate)}
              : {}),
            ...(value && !isZero(value) ? {value} : {}),
          })
          .then((response: TransactionResponse) => {
            addTransaction(response, {
              type: TransactionType.BRIDGE_OVL,
              amount: amount,
            })

            return response.hash
          })
          .catch(error => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
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
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`BridgeToken failed`, error, address, calldata, value)

              throw new Error(`BridgeToken failed: ${error}`)
            }
          })
      },
      error: null,
    }
  }, [
    account,
    addPopup,
    addTransaction,
    amount,
    bridgeTokenCalls,
    chainId,
    currentTimeForId,
    library,
  ])
}
