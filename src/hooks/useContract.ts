import { useMemo } from "react";
import { useActiveWeb3React } from "./web3";
import { Contract } from "@ethersproject/contracts";
import { getContract } from "../utils/contract";
import { MULTICALL2_ADDRESS } from "../constants/addresses";
import { V1_FACTORY_ADDRESS } from "../constants/addresses";
import OVL_V1_FACTORY_ABI from "../constants/abis/OVL_V1_Factory.json";
import OVL_V1_MARKET_ABI from "../constants/abis/overlayv1_uniswapv3_market.json"
import MULTICALL2_ABI from '../constants/multicall/multicall2.json';
import { Erc20 as ERC20 } from "../constants/abis/types";
import ERC20_ABI from '../constants/abis/erc20.json';


// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]) as T;
};

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false);
};

export function useOVLFactoryContract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && V1_FACTORY_ADDRESS[chainId], OVL_V1_FACTORY_ABI, false);
};

export function useMarketContract(address: string | undefined) {
  return useContract(address, OVL_V1_MARKET_ABI, false);
};


export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<ERC20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
};