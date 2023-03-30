import {useMemo, useState, useEffect} from 'react'
import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {DoubleProgressBar} from '../../components/ProgressBar/ProgressBar'
import {useHistory} from 'react-router-dom'
import {Icon} from '../../components/Icon/Icon'
import {AlertCircle} from 'react-feather'

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
  oracleLogo: string | undefined
  marketLogo: string | undefined
  priceCurrency: string | undefined
}

const MarketsRow = ({
  index,
  marketId,
  marketName,
  midPrice,
  oiLong,
  oiShort,
  capOi,
  dailyFundingRate,
  annualFundingRate,
  oracleLogo,
  marketLogo,
  priceCurrency,
}: MarketsRowProps) => {
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

  const isFundingRatePositive = useMemo(() => {
    return Math.sign(Number(dailyFundingRate)) > 0
  }, [dailyFundingRate])

  return (
    <StyledTableRow hover={true} onClick={handleNavigate}>
      <StyledTableCellThin component="th" scope="row" id="marketIndex">
        {index}
      </StyledTableCellThin>

      <StyledTableCellThin component="th" scope="row" id="marketName">
        <FlexRow>
          <Icon size={20}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle />}</Icon>
          <TEXT.BoldSmallBody ml="8px">{marketName}</TEXT.BoldSmallBody>
        </FlexRow>
      </StyledTableCellThin>

      <StyledTableCellThin align="left" id="marketPrice">
        <TEXT.BoldNumber>{priceCurrency + Number(midPrice).toLocaleString()}</TEXT.BoldNumber>
      </StyledTableCellThin>

      <StyledTableCellThin align="left" id="market7DayChange">
        -
      </StyledTableCellThin>

      <StyledTableCellThin align="left" id="marketFundingRate">
        <TEXT.BoldNumber color={isFundingRatePositive ? '#FF648A' : '#5FD0AB'}>{dailyFundingRate}%</TEXT.BoldNumber>
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

      <StyledTableCellThin align="left" id="marketFeedLogo">
        <Icon size={20}>
          <img src={oracleLogo} alt="Market Feed Logo" />
        </Icon>
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

export default MarketsRow
