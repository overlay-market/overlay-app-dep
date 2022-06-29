import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useSingleContractMultipleData } from "../state/multicall/hooks";
import { formatWeiToParsedNumber } from "../utils/formatWei";
import { BigNumber } from "ethers";
import { useBlockNumber } from "../state/application/hooks";
import { useActiveWeb3React } from "./web3";

export function usePositionOi(
  marketAddress?: string,
  positionId?: string | number
): BigNumber | undefined {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [oi, setOi] = useState<BigNumber>();

  useEffect(() => {
    if (!peripheryContract || !marketAddress || !account || !blockNumber) return;

    (async () => {
      try {
        setOi(await peripheryContract.oi(marketAddress, account, positionId))
      }
      catch (error) {
        console.log('market inside usePositionOi: ', marketAddress);
      }

    })();
  }, [peripheryContract, marketAddress, positionId, blockNumber, account]);

  return useMemo(() => {
    return oi;
  }, [oi]);
};

export function usePositionOis(positionsCallData?: any) {
  const peripheryContract = useV1PeripheryContract();
  const blockNumber = useBlockNumber();
  const { chainId } = useActiveWeb3React();

  const callResult = useSingleContractMultipleData(peripheryContract, 'oi', positionsCallData);

  return useMemo(() => {
    return callResult.map((position) => {
      if (!chainId || !blockNumber || !position) return null;

      let oi = position?.result && position.result[0];
      return formatWeiToParsedNumber(oi, 18, 4);
    })
  }, [callResult, blockNumber, chainId])

}