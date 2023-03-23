type MarketsRowProps = {
  marketId: string
  marketName: string
  midPrice: string | number | undefined
  oiLong: string | number | undefined
  oiShort: string | number | undefined
  capOi: string | number | undefined
  dailyFundingRate: string | number | undefined
  annualFundingRate: string | number | undefined
}

const MarketsRow = ({marketId, marketName, midPrice, oiLong, oiShort, capOi, dailyFundingRate, annualFundingRate}: MarketsRowProps) => {}

export default MarketsRow
