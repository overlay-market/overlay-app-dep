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

function useMerkleDistributorContract() {}

export function useClaimCallback() {}
