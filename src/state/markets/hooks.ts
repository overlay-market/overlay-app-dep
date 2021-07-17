import { useOVLFactoryContract } from "../../hooks/useContract";
import { useSingleCallResult } from "../multicall/hooks";

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