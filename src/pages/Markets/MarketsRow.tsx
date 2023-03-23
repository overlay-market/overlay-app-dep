import {useMemo, useState, useEffect} from 'react'
import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {DoubleProgressBar} from '../../components/ProgressBar/ProgressBar'

type MarketsRowProps = {
  marketId: string
  marketName: string | undefined
  midPrice: string | number | undefined
  oiLong: string | number | undefined
  oiShort: string | number | undefined
  capOi: string | number | undefined
  dailyFundingRate: string | number | undefined
  annualFundingRate: string | number | undefined
}

const MarketsRow = ({
  marketId,
  marketName,
  midPrice,
  oiLong,
  oiShort,
  capOi,
  dailyFundingRate,
  annualFundingRate,
}: MarketsRowProps) => {
  const [long, setLong] = useState(0)
  const [short, setShort] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (oiLong !== undefined) setLong(Number(oiLong))
    if (oiShort !== undefined) setShort(Number(oiShort))
  }, [oiLong, oiShort])

  useEffect(() => setTotal(long + short), [long, short])

  const shortPercentageOfTotal = useMemo(() => ((short / total) * 100).toFixed(2), [short, total])
  const longPercentageOfTotal = useMemo(() => ((long / total) * 100).toFixed(2), [long, total])

  return (
    <StyledTableRow hover={true}>
      <StyledTableCellThin component="th" scope="row">
        {marketName}
      </StyledTableCellThin>
      <StyledTableCellThin align="left">{midPrice}</StyledTableCellThin>
      <StyledTableCellThin align="left">
        <FlexRow>
          <TEXT.SmallBody mr="auto">{shortPercentageOfTotal}%</TEXT.SmallBody>
          <TEXT.SmallBody>{longPercentageOfTotal}%</TEXT.SmallBody>
        </FlexRow>
        <DoubleProgressBar leftBarValue={short} rightBarValue={long} maxValue={total} />
      </StyledTableCellThin>
      <StyledTableCellThin align="right">
        {dailyFundingRate}% ({annualFundingRate}%)
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default MarketsRow
