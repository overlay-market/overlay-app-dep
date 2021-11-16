import { useMemo } from "react";
import { OVLCollateral } from "@overlay-market/overlay-v1-sdk";
import { utils } from "ethers";
import { OVL_COLLATERAL_ADDRESS } from "../constants/addresses";

function useUnwindCallArguments(
  positionId: any | undefined,
  shares: any | undefined,
  chainId: any | undefined
) {
  let calldata: any;

  if (!positionId || !shares) {
    calldata = undefined;
  } else {
    calldata = OVLCollateral.unwindParameters({
      positionId: positionId,
      shares: utils.parseUnits(shares),
    });
  }

  return useMemo(() => {
    const txn: { address: string; calldata: string; value: string } = {
      address: OVL_COLLATERAL_ADDRESS[chainId],
      calldata: calldata,
      value: utils.parseEther("0").toHexString(),
    };

    return [
      {
        address: txn.address,
        calldata: calldata,
        value: txn.value,
      },
    ];
  }, [calldata, chainId]);
};


