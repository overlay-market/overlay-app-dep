import React, {useMemo} from 'react'
import styled from 'styled-components'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import {useCurrentWalletPositions, useCurrentWalletUnwinds} from '../../state/build/hooks'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {useMarketDetails, AdditionalMarketData} from '../../hooks/useMarketDetails'
import {useCurrentMarketState, MarketStateResults} from '../../hooks/useCurrentMarketState'
import {Position} from './Position'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const openPositionsColumns = [
  "Market", 
  "Size", 
  "Position", 
  "Entry Price", 
  "Current Price", 
  "Liquidation Price", 
  "Created", 
  "Unrealized PnL"
]

const closedPositionsColumns = [
  "Market", 
  "Size", 
  "Position", 
  "Entry Price", 
  "Exit Price", 
  "Closed", 
  "Created", 
  "PnL"
]
const positionColumns = {
  open: openPositionsColumns,
  closed: closedPositionsColumns,
  liquidated: closedPositionsColumns
}

interface PositionsTableProps {
  title: string
  children?: React.ReactNode
  marginTop?: string
  isLoading: boolean
  isUninitialized: boolean
  positionStatus: keyof typeof positionColumns
  initialCollateral?: string
}

const PositionsTable = ({title, children, marginTop, isLoading, isUninitialized, positionStatus}: PositionsTableProps) => {
  const {account} = useActiveWeb3React()

  return (
    <Container>
      <TableContainer component={Paper}>
        <TEXT.BoldStandardBody mt={marginTop} mb="16px">
          {title}
        </TEXT.BoldStandardBody>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              {positionColumns[positionStatus].map((column: string) => {
                  return <StyledHeaderCell>
                  <TEXT.Supplemental>
                    <Trans>{column}</Trans>
                  </TEXT.Supplemental>
                </StyledHeaderCell>
                })
              }
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </StyledTable>
      </TableContainer>

      {!account ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">No wallet connected. </TEXT.StandardBody>
        </FlexRow>
      ) : isUninitialized ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">Fetching positions...</TEXT.StandardBody>
        </FlexRow>
      ) : !children ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">You have no {positionStatus} positions.</TEXT.StandardBody>
        </FlexRow>
      ) : null}
    </Container>
  )
}

const Positions = () => {
  const {account, active, chainId} = useActiveWeb3React()
  // const account = '0x8a007aa8efba8f6342ff2689b887de567865c611'
  const {isLoading: isPositionsLoading, isFetching, isUninitialized, positions} = useCurrentWalletPositions(account)
  const {isLoading: isUnwindsLoading, isFetching: isUnwindsFetching, isUninitialized: isUnwindsUninitialized, unwinds} = useCurrentWalletUnwinds(account)

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

  const openPositions: any[] | [] = useMemo(() => {
    if (!positions) return []
    return positions
      .filter(position => !position.isLiquidated)
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

  const liquidated: any[] | [] = useMemo(() => {
    if (!positions) return []
    return positions
      .filter(position => position.isLiquidated)
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

  const sortedPositions = useMemo(() => {
    const open: any[] = []
    const closed: any[] = []
    if (!openPositions)
      return {
        open,
        closed,
      }

    for (const position of openPositions) {
      if (position.hasOwnProperty('currentOi') && position.currentOi !== '0') {
        open.push(position)
      } else {
        if (unwinds) {
          position.exitPrice = unwinds.filter(unwind => unwind.position.id === position.id)[0]?.price ?? null
        }
        closed.push(position)
      }
    }

    return {open, closed}
  }, [openPositions])

  const {open, closed} = sortedPositions

  return (
    <PageContainer>
      <PositionsTable 
        title="Open Positions" 
        marginTop="50px" 
        isLoading={isPositionsLoading} 
        isUninitialized={isUninitialized} 
        positionStatus='open'
      >
        {open.length > 0
          ? open.map(position => (
              <Position
                id={position.id}
                positionId={position.positionId}
                marketName={position.marketName}
                marketAddress={position.marketAddress}
                leverage={position.leverage}
                createdTimestamp={position.createdAtTimestamp}
                isLong={position.isLong}
                entryPrice={position.entryPrice}
                priceCurrency={position.priceCurrency}
                currentMidPrice={position.parsedMid}
                decimals={position.decimals}
                isClosed={false}
                isLiquidated={position.isLiquidated}
                initialCollateral={position.initialCollateral}
              />
            ))
          : null}
      </PositionsTable>
      <PositionsTable 
        title="Closed Positions" 
        marginTop="100px" 
        isLoading={isPositionsLoading} 
        isUninitialized={isUninitialized} 
        positionStatus='closed'
      >
        {closed.length > 0
          ? closed.map(position => (
              <Position
                id={position.id}
                positionId={position.positionId}
                marketName={position.marketName}
                marketAddress={position.marketAddress}
                leverage={position.leverage}
                createdTimestamp={position.createdAtTimestamp}
                isLong={position.isLong}
                entryPrice={position.entryPrice}
                exitPrice={position.exitPrice}
                priceCurrency={position.priceCurrency}
                currentMidPrice={position.parsedMid}
                decimals={position.decimals}
                isClosed={true}
                isLiquidated={position.isLiquidated}
                initialCollateral={position.initialCollateral}
              />
            ))
          : null}
      </PositionsTable>
      <PositionsTable 
        title="Liquidated Positions" 
        marginTop="100px" 
        isLoading={isPositionsLoading} 
        isUninitialized={isUninitialized} 
        positionStatus='liquidated'
      >
        {liquidated.length > 0
          ? liquidated.map(position => (
              <Position
                id={position.id}
                positionId={position.positionId}
                marketName={position.marketName}
                marketAddress={position.marketAddress}
                leverage={position.leverage}
                createdTimestamp={position.createdAtTimestamp}
                isLong={position.isLong}
                entryPrice={position.entryPrice}
                priceCurrency={position.priceCurrency}
                currentMidPrice={position.parsedMid}
                decimals={position.decimals}
                isClosed={false}
                isLiquidated={position.isLiquidated}
                initialCollateral={position.initialCollateral}
              />
            ))
          : null}
      </PositionsTable>
    </PageContainer>
  )
}

export default Positions
