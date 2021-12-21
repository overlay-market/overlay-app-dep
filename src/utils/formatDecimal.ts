

export function formatDecimalToPercentage(decimal?: number) {
  return decimal ? decimal * 100 : undefined;
};

export function formatDecimalPlaces(
  places: number, 
  value?: string
) : string | undefined {
  return value ? Number(value).toFixed(places) : undefined
};