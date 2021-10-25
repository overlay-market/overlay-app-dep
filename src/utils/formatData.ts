import JSBI from "jsbi";

export function formatAmount(value: string, exponent: number) {
  let numberified = parseInt(value);

  let denominator = 10 ** exponent;

  return (numberified / denominator).toFixed(2).toString();
}