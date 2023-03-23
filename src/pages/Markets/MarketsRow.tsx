import {useMemo} from 'react'
import {StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {DoubleProgressBar} from '../../components/ProgressBar/ProgressBar'

type MarketsRowProps = {
  marketId: string
  marketName: string | undefined
  midPrice: string | number | undefined
  oiLong: string | number | undefined
  oiShort: string | number | undefined
  // totalCurrentOi: string | number | undefined
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
  // totalCurrentOi,
  capOi,
  dailyFundingRate,
  annualFundingRate,
}: MarketsRowProps) => {
  // console.log('marketName: ', marketName)
  const currentTotalOi = useMemo(() => {
    return typeof oiLong === 'undefined' || typeof oiShort === 'undefined' ? Number(oiLong) + Number(oiShort) : undefined
  }, [oiShort, oiLong])

  return (
    <StyledTableRow hover={true}>
      <StyledTableCellThin component="th" scope="row">
        {marketName}
      </StyledTableCellThin>
      <StyledTableCellThin align="left">{midPrice}</StyledTableCellThin>
      <StyledTableCellThin align="left">
        <FlexRow>
          <TEXT.SmallBody mr="auto"></TEXT.SmallBody>
          <TEXT.SmallBody></TEXT.SmallBody>
        </FlexRow>
        <DoubleProgressBar leftBarValue={Number(oiShort)} rightBarValue={Number(oiLong)} maxValue={currentTotalOi} />
      </StyledTableCellThin>
      <StyledTableCellThin align="right">
        {dailyFundingRate}% ({annualFundingRate}%)
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default MarketsRow
