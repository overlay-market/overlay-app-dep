import {useMemo, useState, useEffect} from 'react'
import styled from 'styled-components'
import {StyledTableCellThin, StyledTableRow} from '../../components/Table/Table'
import {FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {ProgressBar} from '../../components/ProgressBar/ProgressBar'
import {useHistory} from 'react-router-dom'
import {Icon} from '../../components/Icon/Icon'
import {AlertCircle} from 'react-feather'
import {MarketChartData} from '../../constants/markets'
import Chart7dCoin from './Chart7dCoin'
import Chart7dNft from './Chart7dNft'

export const MarketsStyledTableRow = styled(StyledTableRow)`
  height: unset;

  #marketFundingRate,
  #marketOi,
  #marketFeedLogo,
  #market7dChart {
    display: none;
  }

  th,
  td {
    padding: 24px 8px;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    height: 69px;
    
    #marketFundingRate,
    #market7dChart {
      display: table-cell;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    #marketOi,
    #marketFeedLogo {
      display: table-cell;
    }
  `}
`

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
  marketChartData: MarketChartData | undefined
  hide7dChart: boolean
}

const MarketsRow = ({
  index,
  marketId,
  marketName,
  midPrice = '',
  oiLong,
  oiShort,
  capOi,
  dailyFundingRate,
  annualFundingRate,
  oracleLogo,
  marketLogo,
  priceCurrency = '',
  marketChartData,
  hide7dChart,
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
    return Number.isFinite(short) && Number.isFinite(total) && total > 0 ? ((short / total) * 100).toFixed(2) : defaultZero
  }, [short, total])

  const longPercentageOfTotalOi = useMemo(() => {
    return Number.isFinite(long) && Number.isFinite(total) && total > 0 ? ((long / total) * 100).toFixed(2) : defaultZero
  }, [long, total])

  function handleNavigate() {
    history.push(`/markets/${marketId}`)
  }

  const isFundingRatePositive = useMemo(() => {
    return Math.sign(Number(dailyFundingRate)) > 0
  }, [dailyFundingRate])

  return (
    <MarketsStyledTableRow hover={true} onClick={handleNavigate}>
      <StyledTableCellThin component="th" scope="row" id="marketIndex">
        {index}
      </StyledTableCellThin>

      <StyledTableCellThin component="th" scope="row" id="marketName">
        <FlexRow>
          <Icon size={20}>{marketLogo ? <img src={marketLogo} alt="Market Feed Logo" /> : <AlertCircle size={20} />}</Icon>
          <TEXT.BoldSmallBody ml="8px">{marketName}</TEXT.BoldSmallBody>
        </FlexRow>
      </StyledTableCellThin>

      <StyledTableCellThin align="left" id="marketPrice">
        <TEXT.BoldNumber>
          {priceCurrency}
          {Number(midPrice) < 100000 ? Number(midPrice).toLocaleString() : Math.floor(Number(midPrice)).toLocaleString()}
        </TEXT.BoldNumber>
      </StyledTableCellThin>

      {/* <StyledTableCellThin align="left" id="market7DayChange">
        -
      </StyledTableCellThin> */}

      <StyledTableCellThin align="left" id="marketFundingRate">
        <TEXT.BoldNumber color={isFundingRatePositive ? '#FF648A' : '#5FD0AB'}>{dailyFundingRate}%</TEXT.BoldNumber>
      </StyledTableCellThin>

      <StyledTableCellThin align="left" id="marketOi">
        <FlexRow>
          <TEXT.BoldNumber mr="auto" color="#FF648A">
            {shortPercentageOfTotalOi}%
          </TEXT.BoldNumber>
          <TEXT.BoldNumber color="#5FD0AB">{longPercentageOfTotalOi}%</TEXT.BoldNumber>
        </FlexRow>
        <ProgressBar reverse={false} split={false} max={total} value={short} width={'100%'} margin={'0'} color={'#FF648A'} />
      </StyledTableCellThin>

      <StyledTableCellThin id="marketFeedLogo">
        <Icon size={20} margin="auto">
          <img src={oracleLogo} alt="Market Feed Logo" />
        </Icon>
      </StyledTableCellThin>

      {/* 7D chart */}
      {!hide7dChart && (
        <StyledTableCellThin id="market7dChart" align="center">
          {marketChartData && marketChartData.isNft && <Chart7dNft marketChartData={marketChartData!!} />}
          {marketChartData && !marketChartData.isNft && <Chart7dCoin marketChartData={marketChartData!!} />}
        </StyledTableCellThin>
      )}
    </MarketsStyledTableRow>
  )
}

export default MarketsRow
