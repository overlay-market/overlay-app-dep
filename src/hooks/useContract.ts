import { useMemo } from "react";
import { useActiveWeb3React } from "./web3";
import { Contract } from "@ethersproject/contracts";
import { getContract } from "../utils/contract";
import { MULTICALL2_ADDRESS } from "../constants/addresses";
import { V1_FACTORY_ADDRESS } from "../constants/addresses";
import OVL_V1_FACTORY_ABI from "../constants/abis/OVL_V1_Factory.json";
import MULTICALL2_ABI from '../constants/multicall/multicall2.json';


// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
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
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useMulticall2Contract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && MULTICALL2_ADDRESS[chainId], MULTICALL2_ABI, false);
}

export function useOVLFactoryContract() {
  const { chainId } = useActiveWeb3React();
  return useContract(chainId && V1_FACTORY_ADDRESS[chainId], OVL_V1_FACTORY_ABI, false);
}