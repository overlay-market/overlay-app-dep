export function formatDecimalToPercentage(decimal?: number | string) {
  const number = typeof decimal === 'string' ? Number(decimal) : decimal
  return number ? number * 100 : undefined
}

export function formatDecimalPlaces(places: number, value?: string | number): string | undefined {
  const isNum: boolean | undefined = value ? typeof value === 'number' : undefined
  const formatString = isNum !== undefined && isNum ? value?.toString() : value

  return value ? Number(formatString).toFixed(places) : undefined
}
