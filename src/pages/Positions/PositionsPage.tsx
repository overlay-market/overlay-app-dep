import React, {useMemo} from 'react'
import styled from 'styled-components'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow, StyledTableRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {useCurrentWalletPositions} from '../../state/build/hooks'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {useMarketDetails, AdditionalMarketData} from '../../hooks/useMarketDetails'
import {useCurrentMarketState, MarketStateResults} from '../../hooks/useCurrentMarketState'
import Loader from '../../components/Loaders/Loaders'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
interface PositionsTableProps {
  title: string
  children?: React.ReactNode
  marginTop?: string
  isLoading?: boolean
}

const PositionsTable = ({title, children, marginTop, isLoading}: PositionsTableProps) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <TEXT.BoldStandardBody mt={marginTop} mb="16px">
          {title}
        </TEXT.BoldStandardBody>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Market</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Size</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Created</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Position</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Entry Price</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>Liq. Price</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <TEXT.Supplemental>
                  <Trans>PnL</Trans>
                </TEXT.Supplemental>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
        </StyledTable>
      </TableContainer>
      {isLoading && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}

      {!isLoading && !children && (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">You have no closed positions.</TEXT.StandardBody>
        </FlexRow>
      )}
    </Container>
  )
}

const Positions = () => {
  const {account, active} = useActiveWeb3React()
  const {isLoading: isPositionsLoading, isFetching, positions} = useCurrentWalletPositions(account)

  const {markets, isLoading: isMarketsLoading, refetch} = useTotalMarketsData()
  const marketDetails: AdditionalMarketData[] = useMarketDetails(markets)
  const {loading, error, markets: marketsData}: MarketStateResults = useCurrentMarketState(marketDetails)

  const marketIdMap = useMemo(() => {
    const result: any = {}
    if (marketsData.length === 0) return result
    marketsData.forEach(market => {
      result[market.marketAddress] = market
    })
    return result
  }, [marketsData])

  const openPositions = useMemo(() => {
    if (!positions) return []
    return positions
      .filter(position => !position.isClosed)
      .map(filteredPosition => {
        const marketAddress = filteredPosition.market.id
        const marketState = marketIdMap[marketAddress]
        return {
          ...marketState,
          ...filteredPosition,
          id: filteredPosition.id,
        }
      })
  }, [positions, marketIdMap])

  console.log('marketsData: ', marketsData)
  console.log('openPositions: ', openPositions)

  return (
    <PageContainer>
      <PositionsTable title="Open Positions" marginTop="50px" isLoading={isPositionsLoading}></PositionsTable>
      <PositionsTable title="Closed Positions" marginTop="200px" isLoading={isPositionsLoading}></PositionsTable>
    </PageContainer>
  )
}

export default Positions
