export function currentTimeParsed(): string {
  const currentTime = new Date()
  // @ts-ignore
  return Date.parse(currentTime).toString()
}

export function currentTimeUnix(): string {
  const currentTime = new Date()
  const unixTimestamp = Math.floor(currentTime.getTime() / 1000)
  return unixTimestamp.toString()
}
