import { utils, BigNumberish } from "ethers";

export function formatWeiToParsedString(wei: BigNumberish | string | undefined, decimals: number) {
  let parsedWei;

  if (wei) {
    parsedWei = utils.formatUnits(wei, 18);
    return Number(parsedWei).toFixed(decimals);
  } else {
    return undefined;
  }
};

export function formatWeiToParsedNumber(wei: BigNumberish | string | undefined, decimals: number, round?: number) {
  let parsedWei;

  if (wei) {
    parsedWei = utils.formatUnits(wei, 18);
    return Number(Number(Number(parsedWei).toFixed(decimals)).toFixed(round));
  } else {
    return undefined;
  }
};

