import { useOVLFactoryContract } from "../../hooks/useContract";
import { useSingleCallResult, useSingleContractMultipleData } from "../multicall/hooks";

export function useTotalMarkets() {
  const ovlFactoryContract = useOVLFactoryContract();

  // temporary calling allMarkets
  // 1 market live currently
  // update when more markets live
  const results = useSingleCallResult(
    ovlFactoryContract,
    "allMarkets",
    [0]
  );
  
  
  return results;
};

export function useActiveMarkets(
  addresses?: []
) {
  const ovlFactoryContract = useOVLFactoryContract();
  
  const results = useSingleCallResult(
    ovlFactoryContract,
    "isMarket",
    [addresses]
  )

  console.log('results in useActiveMarkets: ', results);
};
