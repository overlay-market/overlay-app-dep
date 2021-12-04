import { utils, BigNumberish } from "ethers";

export function formatWeiToParsedString(wei: BigNumberish | string, decimals: number) {
  let parsedWei = utils.formatUnits(wei, 18);

  return Number(parsedWei).toFixed(decimals)
}