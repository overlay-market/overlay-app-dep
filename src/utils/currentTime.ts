export function currentTimeParsed(): string {
  const currentTime = new Date()
  // @ts-ignore
  return Date.parse(currentTime).toString()
}

export function currentTimeUnix(): string {
  const currentTime = new Date()
  const unixTimestamp = Math.floor(currentTime.getTime() / 1000).toString()
  return unixTimestamp
}

export function daysAgoTimeUnix(days: number): string {
  const currentDate = new Date()
  const sevenDaysAgo = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000)
  const timestamp = Math.floor(sevenDaysAgo.getTime() / 1000).toString()
  return timestamp
}
