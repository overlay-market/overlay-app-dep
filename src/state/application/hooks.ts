import { useAppSelector } from '../hooks';
import { useActiveWeb3React } from '../../hooks/web3';
import { AppState } from '../state';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}
