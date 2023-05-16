import React from 'react'
import styled from 'styled-components/macro'
import {NavLink} from 'react-router-dom'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {PageContainer} from '../../components/Container/Container'
import {FlexRow} from '../../components/Container/Container'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {useMarketDetails, AdditionalMarketData} from '../../hooks/useMarketDetails'
import {useCurrentMarketState, MarketStateResults, ParsedMarketStateDetails} from '../../hooks/useCurrentMarketState'
import {InfoTip} from '../../components/InfoTip/InfoTip'
import {getCharactersBeforeSlash} from '../../utils/getCharactersBeforeSlash'
import {TEXT} from '../../theme/theme'
import MarketsRow from './MarketsRow'

const activeClassName = 'INACTIVE'

export const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  color: ${({theme}) => theme.text1};
  font-weight: 500;
  text-decoration: none;

  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`

const infoTipDescriptions = {
  openInterest: (
    <React.Fragment>
      <div>Open Interest (OI) refers to </div>
      <div>the total open positions on a given market.</div>
      <div>It is the sum of all OVL divided</div>
      <div>by the price of the market.</div>
      <br />
      <div>The OI Balance shows whether the</div>
      <div>long or the short side has more OI.</div>
    </React.Fragment>
  ),
  fundingRate: (
    <React.Fragment>
      <div>Funding Rate per Market</div>
      <br />
      <div>24 hour funding rate.</div>
      <div>The side with more OI pays the side </div>
      <div>with less.</div>
      <br />
      <div>Positive funding suggests bullish</div>
      <div>sentiment, longs pay shorts.</div>
      <div>Negative funding suggests bearish</div>
      <div>sentiment, shorts pay longs.</div>
    </React.Fragment>
  ),
}

const Markets = () => {
  const {markets, isLoading, refetch} = useTotalMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)
  const {loading, error, markets: marketsData}: MarketStateResults = useCurrentMarketState(marketDetails)
  console.log(marketsData)

  // list of hidden markets from Markets page
  const hiddenMarkets = [
    '0x909d893d5e7f250659fa56c2ca2920760eebb17f',
    '0x8c82c349e349ffd9403c3984cb1ad1b0f76f7d2e',
    '0xce45c64911bd0a088daabd73ee1bc09ae98cd84b',
    '0xccd645835ca0033f0c1106e7b24f288e59e867e8',
    '0x8c7dc90243fc7984583339da8df0a5d57ec491db'
  ]

  return (
    <PageContainer>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell width={1}>
                <TEXT.Supplemental>
                  <Trans>#</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
              <StyledHeaderCell width={25}>
                <TEXT.Supplemental>
                  <Trans>Market</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Price</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
              {/* <StyledHeaderCell>
                <Trans>
                  <TEXT.Supplemental>7d</TEXT.Supplemental>
                </Trans>
              </StyledHeaderCell> */}
              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Funding</Trans>
                  <InfoTip children={infoTipDescriptions.fundingRate} tipFor="Market Funding Rate" />
                </TEXT.Supplemental>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>OI Balance</Trans>
                  <InfoTip children={infoTipDescriptions.openInterest} tipFor="Market Open Interest" />
                </TEXT.Supplemental>
              </StyledHeaderCell>
              <StyledHeaderCell align="center">
                <TEXT.Supplemental>
                  <Trans>Oracle</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {marketsData.length > 0 &&
              marketsData
                ?.filter(market => !hiddenMarkets.includes(market.marketAddress.toLowerCase()))
                .map((market: ParsedMarketStateDetails, index: number) => (
                  <MarketsRow
                    key={market.marketAddress}
                    index={index + 1} //start count at 1
                    marketId={market.marketAddress}
                    marketName={market.marketName}
                    midPrice={market.parsedMid}
                    oiLong={market.parsedOiLong}
                    oiShort={market.parsedOiShort}
                    capOi={market.parsedCapOi}
                    dailyFundingRate={market.parsedDailyFundingRate}
                    annualFundingRate={market.parsedAnnualFundingRate}
                    oracleLogo={market.oracleLogo}
                    marketLogo={market.marketLogo}
                    priceCurrency={market.priceCurrency}
                  />
                ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {marketsData.length === 0 && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
    </PageContainer>
  )
}

export default Markets
