import {TransactionType} from './../transactions/actions'
import {useState, useEffect} from 'react'
import {TransactionResponse} from '@ethersproject/providers'
import {CurrencyAmount, Token} from '@uniswap/sdk-core'
import {useActiveWeb3React} from '../../hooks/web3'
import JSBI from 'jsbi'
import {useSingleCallResult} from '../multicall/hooks'
import {isAddress} from '../../utils/web3'
import {useContract} from '../../hooks/useContract'
import {calculateGasMargin} from '../../utils/calculateGasMargin'
import {useTransactionAdder} from '../transactions/hooks'
import {MERKLE_DISTRIBUTOR_ADDRESS} from './../../constants/addresses'
import MERKLE_DISTRIBUTOR_ABI from '../../constants/abis/MerkleDistributor.json'
import {BigNumberish} from 'ethers'

function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, true)
}

interface UserClaimData {
  address: string
  proof: string[]
  amount: BigNumberish
  index: number
}

let FETCH_CLAIM_FILE_PROMISE: any

export function fetchClaimFile() {
  return (
    FETCH_CLAIM_FILE_PROMISE ??
    (FETCH_CLAIM_FILE_PROMISE = fetch(
      'https://raw.githubusercontent.com/overlay-market/MerkleDistributor/main/src/testMerkleInfo.ts',
    )
      .then(response => {
        console.log('response: ', response.body)
      })
      .catch(error => {
        console.error('Failed to get claim file', error)
        FETCH_CLAIM_FILE_PROMISE = null
      }))
  )
}

export function useClaimCallback() {}
