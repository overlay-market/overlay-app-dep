import {useMemo, useEffect} from 'react'
import styled from 'styled-components/macro'
import {NavLink, useHistory} from 'react-router-dom'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {TEXT} from '../../theme/theme'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {
  formatFundingRateToDaily,
  formatFundingRateToAnnual,
  formatBigNumberUsingDecimalsToString,
} from '../../utils/formatWei'
import {PageContainer} from '../../components/Container/Container'
import {ProgressBar, DoubleProgressBar} from '../../components/ProgressBar/ProgressBar'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {
  StyledTable,
  StyledHeaderCell,
  StyledTableCellThin,
  StyledTableRow,
  StyledTableHeaderRow,
} from '../../components/Table/Table'
import Loader from '../../components/Loaders/Loaders'
import {useMarketNames} from '../../hooks/useMarketName'
import {useMarketMidPrices} from '../../hooks/useMarketPrices'
import {useFundingRates} from '../../hooks/useFundingRates'
import {useMarketOis} from '../../hooks/useMarketOis'
import {useMarketCapOis} from '../../hooks/useMarketCapOi'
import {useMarketBaseAmounts} from '../../hooks/useMarketBaseAmount'
import {useMarketQuoteAmounts} from '../../hooks/useMarketQuoteAmounts'
import {useMarketStateFromAddresses} from '../../hooks/useMarketState'
import {isAddress} from '../../utils/web3'
import {BigNumberish, BigNumber} from 'ethers'

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

type MarketRowProps = {
  marketId: string
  baseToken: string
  quoteToken: string
  quoteAmount: number
  midPrice: BigNumber
  oiLong: number
  oiShort: number
  capOi: number
  fundingRate: BigNumber
}

const MarketRow = ({
  marketId,
  baseToken,
  quoteToken,
  quoteAmount,
  midPrice,
  oiLong,
  oiShort,
  capOi,
  fundingRate,
}: MarketRowProps) => {
  const LOADING_STATE = 'loading'

  const marketAttributes = useMemo(
    () => ({
      marketId,
      baseToken: baseToken === LOADING_STATE ? <Loader stroke="white" size="12px" /> : baseToken,
      quoteToken: quoteToken === LOADING_STATE ? <Loader stroke="white" size="12px" /> : quoteToken,
      midPrice:
        midPrice && quoteAmount ? (
          formatBigNumberUsingDecimalsToString(midPrice, quoteAmount, 4)
        ) : (
          <Loader stroke="white" size="12px" />
        ),
      oiLong,
      oiShort,
      capOi,
      dailyFundingRate: fundingRate ? (
        formatFundingRateToDaily(fundingRate, 18, 2)
      ) : (
        <Loader stroke="white" size="12px" />
      ),
      annualFundingRate: fundingRate ? (
        formatFundingRateToAnnual(fundingRate, 18, 2)
      ) : (
        <Loader stroke="white" size="12px" />
      ),
    }),
    [marketId, baseToken, quoteToken, quoteAmount, midPrice, oiLong, oiShort, capOi, fundingRate],
  )
  return (
    <StyledTableRow>
      <StyledTableCellThin component="th" scope="row">
        {marketAttributes.baseToken} / {marketAttributes.quoteToken}
      </StyledTableCellThin>
      <StyledTableCellThin align="left">{marketAttributes.midPrice}</StyledTableCellThin>
      <StyledTableCellThin align="left">
        <FlexRow>
          <TEXT.SmallBody mr="auto">{oiShort}</TEXT.SmallBody>
          <TEXT.SmallBody>{oiLong}</TEXT.SmallBody>
        </FlexRow>
        <DoubleProgressBar leftBarValue={oiShort} rightBarValue={oiLong} maxValue={capOi} />
      </StyledTableCellThin>
    </StyledTableRow>
  )
}

// @TO-DO: create our Markets sub-view components
// add: TableHeader component
// add: MarketRow component, calldata prop to call hooks from MarketRow
const Markets = () => {
  const history = useHistory()
  const {markets, isLoading, refetch} = useTotalMarketsData()

  // force refetch when page refreshes
  useEffect(() => {
    refetch()
  }, [isLoading, refetch])

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`)
  }

  const calldata = useMemo(
    () => ({
      marketAddresses: !markets ? [] : markets.map((market: any) => [market.id]),
      feedAddresses: !markets ? [] : markets.map((market: any) => market.feedAddress),
      marketIds: !markets ? [] : markets.map((market: any) => market.id),
    }),
    [markets],
  )
  const {baseTokens, quoteTokens} = useMarketNames(calldata.feedAddresses)
  const prices = useMarketMidPrices(calldata.marketAddresses)
  const baseAmounts = useMarketBaseAmounts(calldata.feedAddresses)
  const quoteAmounts = useMarketQuoteAmounts(calldata.feedAddresses)

  const tokenPairDecimals = useMemo(
    () => ({
      baseTokens:
        baseAmounts.length === 0 ? null : baseAmounts.map((tokenDecimals: any) => tokenDecimals),
      quoteTokens:
        quoteAmounts.length === 0 ? null : quoteAmounts.map((tokenDecimals: any) => tokenDecimals),
    }),
    [baseAmounts, quoteAmounts],
  )

  const fundingRates = useFundingRates(calldata.marketAddresses)
  const ois = useMarketOis(
    calldata.marketAddresses,
    tokenPairDecimals.baseTokens,
    tokenPairDecimals.quoteTokens,
  )
  const capOis = useMarketCapOis(
    calldata.marketAddresses,
    tokenPairDecimals.baseTokens,
    tokenPairDecimals.quoteTokens,
  )

  const marketStates = useMarketStateFromAddresses(calldata.marketIds)

  return (
    <PageContainer>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans> Market </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> Price </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> OI: Short | Long </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> OI Cap </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> Funding Rate </Trans>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          <TableBody>
            {markets?.map((market: any, index: any) => (
              <StyledTableRow
                onClick={() => redirectToMarket(market.id)}
                hover={true}
                key={index.toString()}
              >
                <StyledTableCellThin component="th" scope="row">
                  {baseTokens[index] === 'loading' ? (
                    <Loader stroke="white" size="12px" />
                  ) : (
                    baseTokens[index]
                  )}
                  /
                  {quoteTokens[index] === 'loading' ? (
                    <Loader stroke="white" size="12px" />
                  ) : (
                    quoteTokens[index]
                  )}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  {prices[index] !== null && quoteAmounts[index] !== undefined ? (
                    formatBigNumberUsingDecimalsToString(prices[index], quoteAmounts[index], 4)
                  ) : (
                    <Loader stroke="white" size="12px" />
                  )}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexRow>
                    <TEXT.SmallBody mr="auto">
                      {ois[index]?.oiShort || ois[index]?.oiShort === 0 ? (
                        ois[index]?.oiShort
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                    </TEXT.SmallBody>
                    <TEXT.SmallBody>
                      {ois[index]?.oiLong || ois[index]?.oiLong === 0 ? (
                        ois[index]?.oiLong
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}{' '}
                    </TEXT.SmallBody>
                  </FlexRow>
                  <DoubleProgressBar
                    leftBarValue={ois[index]?.oiShort}
                    rightBarValue={ois[index]?.oiLong}
                    maxValue={capOis[index]}
                  />
                </StyledTableCellThin>

                <StyledTableCellThin component="th" scope="row">
                  {capOis[index] || capOis[index] === 0 ? (
                    capOis[index]
                  ) : (
                    <Loader stroke="white" size="12px" />
                  )}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexRow>
                    <TEXT.AdjustableSize color={'#f2f2f2'} mr={'3px'}>
                      {fundingRates[index] ? (
                        `${formatFundingRateToDaily(
                          fundingRates[index],
                          18,
                          2,
                        )}% (${formatFundingRateToAnnual(fundingRates[index], 18, 2)}%)`
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                    </TEXT.AdjustableSize>
                  </FlexRow>
                </StyledTableCellThin>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </PageContainer>
  )
}

export default Markets
