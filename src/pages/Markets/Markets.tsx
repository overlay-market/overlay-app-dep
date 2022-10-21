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
import {ProgressBar} from '../../components/ProgressBar/ProgressBar'
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
                <Trans> OI Long </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> OI Short </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans> Funding Rate </Trans>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          <TableBody>
            {/* <StyledTableRow hover={true}>
              <StyledTableCellThin component="th" scope="row"></StyledTableCellThin>

              <StyledTableCellThin align="left"></StyledTableCellThin>

              <StyledTableCellThin align="left">
                <FlexColumn align={'left'}>
                  <FlexRow flexWrap={'wrap'}>
                    <ProgressBar
                      reverse={true}
                      width={'50%'}
                      value={50}
                      max={100}
                      color={'#10DCB1'}
                      margin={'0'}
                    />
                    <ProgressBar width={'50%'} value={50} max={100} color={'red'} margin={'0'} />
                  </FlexRow>
                </FlexColumn>
              </StyledTableCellThin>

              <StyledTableCellThin align="left"></StyledTableCellThin>

              <StyledTableCellThin align="left"></StyledTableCellThin>
            </StyledTableRow> */}

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
                  <FlexColumn align={'left'}>
                    <FlexRow flexWrap={'wrap'}>
                      <TEXT.SmallBody>
                        {ois[index]?.oiLong || ois[index]?.oiLong === 0 ? (
                          ois[index]?.oiLong
                        ) : (
                          <Loader stroke="white" size="12px" />
                        )}{' '}
                        &nbsp;/&nbsp;
                      </TEXT.SmallBody>
                      <TEXT.SmallBody>
                        {capOis[index] || capOis[index] === 0 ? (
                          capOis[index]
                        ) : (
                          <Loader stroke="white" size="12px" />
                        )}
                      </TEXT.SmallBody>
                    </FlexRow>
                    <ProgressBar
                      value={ois[index]?.oiLong}
                      max={capOis[index]}
                      color={'#10DCB1'}
                      margin={'0'}
                    />
                  </FlexColumn>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={'left'}>
                    <FlexRow flexWrap={'wrap'}>
                      <TEXT.SmallBody>
                        {ois[index]?.oiShort || ois[index]?.oiShort === 0 ? (
                          ois[index]?.oiShort
                        ) : (
                          <Loader stroke="white" size="12px" />
                        )}
                        &nbsp;/&nbsp;
                      </TEXT.SmallBody>
                      <TEXT.SmallBody>
                        {capOis[index] || capOis[index] === 0 ? (
                          capOis[index]
                        ) : (
                          <Loader stroke="white" size="12px" />
                        )}
                      </TEXT.SmallBody>
                    </FlexRow>
                    <ProgressBar
                      value={ois[index]?.oiShort}
                      max={capOis[index]}
                      color={'#DC1F4E'}
                      margin={'0'}
                    />
                  </FlexColumn>
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
