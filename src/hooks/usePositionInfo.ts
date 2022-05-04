import { useEffect, useState, useMemo } from "react";
import { useV1PeripheryContract } from "./useContract";
import { useBlockNumber } from "../state/application/hooks";
import { BigNumber } from "ethers";
import { useActiveWeb3React } from "./web3";
import { useSingleCallResult } from "../state/multicall/hooks";

export function usePositionInfo(
  marketAddress: string | undefined,
  positionId: string | number | undefined
  ): BigNumber | null {
  const contract = useV1PeripheryContract();
  const currentBlock = useBlockNumber();
  const { account } = useActiveWeb3React();
  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (!marketAddress || !positionId || !contract || !currentBlock || !account) return;

    console.log('marketAddress: ', marketAddress);
    console.log('positionId: ', positionId);
    console.log('account: ', account);
    (async () => {
      setValue(await contract.position(marketAddress, account, positionId));
    })();
  }, [positionId, currentBlock, account, contract, marketAddress]);
  return useMemo(() => {
    return value;
  }, [value]);
}
