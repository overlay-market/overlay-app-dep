import {useLayerZeroBridgeContract} from './useContract'
import {useSingleContractMultipleData, useSingleCallResult} from '../state/multicall/hooks'
import {useActiveWeb3React} from './web3'

interface useBridgeTokenCallbackProps {
  destinationChainId: number
  amount: any
}

/**
 * Returns callback function that will execute bridging tokens from one chain to another
 * @param
 */
export function useBridgeTokenCallback({destinationChainId, amount}: useBridgeTokenCallbackProps) {}
