import {useMemo, useState, useEffect} from 'react'
import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {DoubleProgressBar} from '../../components/ProgressBar/ProgressBar'
import {useHistory} from 'react-router-dom'
import {Icon} from '../../components/Icon/Icon'

type MarketsRowProps = {
  index: number
  marketId: string
  marketName: string | undefined
  midPrice: string | number | undefined
  oiLong: string | number | undefined
  oiShort: string | number | undefined
  capOi: string | number | undefined
  dailyFundingRate: string | number | undefined
  annualFundingRate: string | number | undefined
}

const MarketsRow = ({index, marketId, marketName, midPrice, oiLong, oiShort, capOi, dailyFundingRate, annualFundingRate}: MarketsRowProps) => {
  const [long, setLong] = useState<number>(0)
  const [short, setShort] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  let history = useHistory()

  useEffect(() => {
    if (oiLong !== undefined) setLong(Number(oiLong))
    if (oiShort !== undefined) setShort(Number(oiShort))
  }, [oiLong, oiShort])

  useEffect(() => setTotal(long + short), [long, short])

  const defaultZero = '00.00'

  const shortPercentageOfTotalOi = useMemo(() => {
    return Number.isFinite(short) && Number.isFinite(total) && total > short ? ((short / total) * 100).toFixed(2) : defaultZero
  }, [short, total])

  const longPercentageOfTotalOi = useMemo(() => {
    return Number.isFinite(long) && Number.isFinite(total) && total > long ? ((long / total) * 100).toFixed(2) : defaultZero
  }, [long, total])

  function handleNavigate() {
    history.push(`/markets/${marketId}`)
  }

  return (
    <StyledTableRow hover={true} onClick={handleNavigate}>
      <StyledTableCellThin component="th" scope="row" id="marketIndex">
        {index}
      </StyledTableCellThin>
      <StyledTableCellThin component="th" scope="row" id="marketName">
        {marketName}
      </StyledTableCellThin>
      <StyledTableCellThin align="left" id="marketPrice">
        {Number(midPrice).toLocaleString()}
      </StyledTableCellThin>
      <StyledTableCellThin align="left" id="market7DayChange">
        -
      </StyledTableCellThin>
      <StyledTableCellThin align="right" id="marketFundingRate">
        {dailyFundingRate}% ({annualFundingRate}%)
      </StyledTableCellThin>
      <StyledTableCellThin align="left" id="marketOi">
        <FlexRow>
          <TEXT.SmallBody mr="auto" color="#FF648A">
            {shortPercentageOfTotalOi}%
          </TEXT.SmallBody>
          <TEXT.SmallBody color="#5FD0AB">{longPercentageOfTotalOi}%</TEXT.SmallBody>
        </FlexRow>
        <DoubleProgressBar leftBarValue={short} rightBarValue={long} maxValue={total} />
      </StyledTableCellThin>
      <StyledTableCellThin align="right" id="marketFeedLogo">
        {/* <Icon></Icon> */}
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default MarketsRow
