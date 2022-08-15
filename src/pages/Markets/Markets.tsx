import {useMemo} from 'react'
import styled from 'styled-components/macro'
import {NavLink, useHistory} from 'react-router-dom'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {TEXT} from '../../theme/theme'
import {useAllMarkets} from '../../state/markets/hooks'
import {formatFundingRateToDaily, formatFundingRateToAnnual} from '../../utils/formatWei'
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

const Markets = () => {
  const history = useHistory()
  const {markets} = useAllMarkets()

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`)
  }

  const calldata = useMemo(
    () => ({
      marketAddresses: !markets ? [] : markets.markets.map(market => [market.id]),
      feedAddresses: !markets ? [] : markets.markets.map(market => market.feedAddress),
    }),
    [markets],
  )

  const {baseTokens, quoteTokens} = useMarketNames(calldata.feedAddresses)
  const prices = useMarketMidPrices(calldata.marketAddresses)
  const fundingRates = useFundingRates(calldata.marketAddresses)
  const ois = useMarketOis(calldata.marketAddresses)
  const capOis = useMarketCapOis(calldata.marketAddresses)

  return (
    <PageContainer>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans>Market</Trans>
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
            {markets?.markets.map((market, index) => (
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
                  {prices[index] ? prices[index] : <Loader stroke="white" size="12px" />}
                  {/* &nbsp; */}
                  {/* {quoteTokens[index] === 'loading' ? <Loader stroke="white" size="12px" /> : quoteTokens[index]} per {baseTokens[index] === 'loading' ? <Loader stroke="white" size="12px" /> : baseTokens[index]} */}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={'left'}>
                    <TEXT.SmallBody>
                      {ois[index]?.oiLong || ois[index]?.oiLong === 0 ? (
                        ois[index]?.oiLong
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                      &nbsp;/&nbsp;
                      {capOis[index] || capOis[index] === 0 ? (
                        capOis[index]
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={ois[index]?.oiLong}
                      max={capOis[index]}
                      color={'#10DCB1'}
                      // width={'88px'}
                      margin={'0'}
                    />
                  </FlexColumn>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={'left'}>
                    <TEXT.SmallBody>
                      {ois[index]?.oiShort || ois[index]?.oiShort === 0 ? (
                        ois[index]?.oiShort
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                      &nbsp;/&nbsp;
                      {capOis[index] || capOis[index] === 0 ? (
                        capOis[index]
                      ) : (
                        <Loader stroke="white" size="12px" />
                      )}
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={ois[index]?.oiShort}
                      max={capOis[index]}
                      color={'#DC1F4E'}
                      // width={'88px'}
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
