import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { formatWeiToParsedNumber } from "../utils/formatWei";
import { useSingleContractMultipleData } from "../state/multicall/hooks";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

/**
 * Returns cap oi for input market address
 * @param marketAddress address of market to query cap oi
 */
export function useMarketCapOi(
  marketAddress?: string,
): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [capOi, setCapOi] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return;

    (async () => {
      try {
        setCapOi(await peripheryContract.capOi(marketAddress))
      }
      catch (error) {
        console.log('market inside useMarketCapOi: ', marketAddress);
        console.error('error coming from useMarketCapOi: ', error);
      }

    })();
  }, [peripheryContract, marketAddress, blockNumber, account]);

  return useMemo(() => {
    return capOi;
  }, [capOi]);
};

/**
 * Returns cap ois associated with input market addresses array
 * @param marketAddresses markets to query cap ois of
 */
export function useMarketCapOis(marketAddresses?: any) {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();

  const capOisResult = useSingleContractMultipleData(peripheryContract, 'capOi', marketAddresses);

  return useMemo(() => {
    return capOisResult.map((market) => {
      if (!chainId || !blockNumber || !market) return null;

      let marketCapOi = market?.result && market.result[0];
      return formatWeiToParsedNumber(marketCapOi, 18, 5);
    })
  }, [capOisResult, blockNumber, chainId])
}