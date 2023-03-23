import {utils, BigNumberish} from 'ethers'

export function formatWeiToParsedString(wei: BigNumberish | string | undefined, decimals: number) {
  let parsedWei

  if (wei) {
    parsedWei = utils.formatUnits(wei, 18)
    return Number(parsedWei).toFixed(decimals)
  } else {
    return undefined
  }
}

export function formatWeiToParsedNumber(wei: BigNumberish | string | undefined, decimals: number | undefined, round?: number) {
  let parsedWei

  if (wei) {
    parsedWei = utils.formatUnits(wei, 18)
    return Number(Number(Number(parsedWei).toFixed(decimals)).toFixed(round))
  } else {
    return undefined
  }
}

export function formatBigNumberUsingDecimalsToString(bignumber: BigNumberish | string | undefined, decimals: number | undefined, sigFigs?: number) {
  let parsedBigNumber

  if (!decimals && decimals !== 0) return undefined

  if (bignumber) {
    parsedBigNumber = utils.formatUnits(bignumber, decimals)
    return Number(parsedBigNumber).toFixed(sigFigs)
  } else {
    return undefined
  }
}

export function formatBigNumberUsingDecimalsToNumber(bignumber: BigNumberish | string | undefined, decimals: number | undefined, sigFigs?: number) {
  let parsedBigNumber

  if (!decimals && decimals !== 0) return undefined

  if (bignumber) {
    parsedBigNumber = utils.formatUnits(bignumber, decimals)
    return Number(Number(parsedBigNumber).toFixed(sigFigs))
  } else {
    return undefined
  }
}

export function formatFundingRateToDaily(wei: BigNumberish | string | undefined, decimals: number, round: number) {
  let roundedDailyPercentage

  if (wei) {
    let rate = formatWeiToParsedNumber(wei, decimals, 10)
    let dailyRate = rate && rate * 86400
    let dailyPercentage = dailyRate && dailyRate * 100
    roundedDailyPercentage = dailyPercentage?.toFixed(round)
  }

  return roundedDailyPercentage
}

export function formatFundingRateToAnnual(wei: BigNumberish | string | undefined, decimals: number, round: number) {
  let roundedAnnualPercentage

  if (wei) {
    let rate = formatWeiToParsedNumber(wei, decimals, 10)
    let dailyRate = rate && rate * 86400
    let annualPercentage = dailyRate && dailyRate * 100 * 365
    roundedAnnualPercentage = annualPercentage?.toFixed(round)
  }

  return roundedAnnualPercentage
}
