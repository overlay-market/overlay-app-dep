export function currentTimeParsed(): string {
  const currentTime = new Date()
  // @ts-ignore
  return Date.parse(currentTime).toString()
}
