import { number } from "@lingui/core/cjs/formats";


export function formatDecimalToPercentage(decimal?: number) {
  return decimal ? decimal * 100 : undefined;
};

export function formatDecimalPlaces(
  places: number, 
  value?: string | number
) : string | undefined {
  const isNum: boolean | undefined = value ? typeof value === 'number' : undefined;
  const formatString = isNum !== undefined && isNum ? value?.toString() : value;

  return value ? Number(formatString).toFixed(places) : undefined;
};