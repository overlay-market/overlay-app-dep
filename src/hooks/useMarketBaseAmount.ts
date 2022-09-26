import {useEffect, useState, useMemo} from 'react'
import {Interface} from '@ethersproject/abi'
import {useSingleCallResult, useMultipleContractSingleData} from '../state/multicall/hooks'
import {useUniswapV3FeedContract, useTokenContract} from './useContract'
import UNISWAP_V3_FEED_ABI from '../constants/abis/OverlayV1UniswapV3Feed.json'
import ERC20_INTERFACE from '../constants/abis/erc20'

export function useMarketBaseAmounts(feedAddresses?: string) {}
