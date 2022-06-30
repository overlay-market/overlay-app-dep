import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useSingleContractMultipleData } from "../state/multicall/hooks";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";
import { formatWeiToParsedNumber } from "../utils/formatWei";

/**
 * Returns open interest for input market address
 * @param marketAddress address of market to query for
 */
export function useMarketOi(marketAddress?: string): any | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [ois, setOis] = useState();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !blockNumber) return;

    (async () => {
      try {
        setOis(await peripheryContract.ois(marketAddress))
      }
      catch (error) {
        console.log('market inside useMarketOis: ', marketAddress);
      }

    })();
  }, [peripheryContract, marketAddress, blockNumber, account]);

  return useMemo(() => {
    return ois;
  }, [ois]);
};

/**
 * Returns open interests for input market addresses
 * @param marketAddresses marketAddresses to query for
 */
export function useMarketOis(marketAddresses?: any) {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();

  const oisResult = useSingleContractMultipleData(peripheryContract, 'ois', marketAddresses);

  return useMemo(() => {
    return oisResult.map((market) => {
      if (!chainId || !blockNumber || !market) return null;

      let marketOi = market?.result && market.result;
      return {
        oiLong: marketOi?.oiLong_ ? formatWeiToParsedNumber(marketOi.oiLong_, 18, 4) : undefined,
        oiShort: marketOi?.oiShort_ ? formatWeiToParsedNumber(marketOi.oiShort_, 18, 4) : undefined,
      };
    })
  }, [oisResult, blockNumber, chainId])

}