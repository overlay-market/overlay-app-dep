import React, {useMemo, useState} from 'react'
import {Play} from 'react-feather'
import styled from 'styled-components'
import {Button, Collapse, TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {FlexRow} from '../../components/Container/Container'
import {useCurrentWalletPositionsV2} from '../../state/build/hooks'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {useMarketDetails} from '../../hooks/useMarketDetails'
import {useCurrentMarketState} from '../../hooks/useCurrentMarketState'
import {OpenPosition} from './OpenPosition'
import {UnwindsTransactions} from './UnwindsTransactions'
import {LiquidatesTransactions} from './LiquidatesTransactions'
import {Overview} from './Overview'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const liquidatedColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Exit Price', 'Created', 'Liquidated']

const openPositionsColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Current Price', 'Liq. Price', 'Created', 'Unrealized PnL']

const closedPositionsColumns = ['Market', 'Size', 'Position', 'Entry Price', 'Exit Price', 'Created', 'Closed', 'PnL']
const positionColumns = {
  open: openPositionsColumns,
  closed: closedPositionsColumns,
  liquidated: liquidatedColumns,
}

interface PositionsTableProps {
  title: string
  children?: React.ReactNode
  marginTop?: string
  isLoading: boolean
  isUninitialized: boolean
  positionStatus: PositionStatus
  initialCollateral?: string
  // onClickColumn: {
  //   'Status': () => void
  // }
}

type PositionStatus = 'open' | 'closed' | 'liquidated'

export const positionStatuses: PositionStatus[] = ['open', 'closed', 'liquidated']

export const TriangleButton = styled(Button)`
  padding: 0 !important;
  padding-bottom: 2px !important;
  width: auto;
  min-width: 0 !important;
  margin-left: 8px !important;
`

interface RotatingTriangleProps {
  open: boolean
}

export const RotatingTriangle = styled(Play)<RotatingTriangleProps>`
  transform: ${props => (props.open ? 'rotate(270deg)' : 'rotate(90deg)')};
  transition: transform ease-out 0.25s;
`

const PositionsTable = ({title, children, marginTop, isLoading, isUninitialized, positionStatus}: PositionsTableProps) => {
  const {account} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <TEXT.BoldStandardBody mt={marginTop} mb="16px">
          {/* {`${positionStatus.charAt(0).toUpperCase() + positionStatus.slice(1)} ${title}`} */}
          {`${title}`}
          <TriangleButton onClick={handleToggle}>
            <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={open} />
          </TriangleButton>
        </TEXT.BoldStandardBody>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <StyledTable>
            <TableHead>
              <StyledTableHeaderRow>
                {/* <StyledHeaderChevron>
                </StyledHeaderChevron> */}
                {positionColumns[positionStatus].map((column: string) => {
                  return (
                    <StyledHeaderCell>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </StyledTable>
        </Collapse>
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
  // const [statusFilter, setStatusFilter] = useState<PositionStatus>('all')
  const {account} = useActiveWeb3React()
  // const {isLoading: isPositionsLoading, isFetching, isUninitialized, positions} = useCurrentWalletPositions(account)
  const {isLoading: isPositionsLoading, isUninitialized, positions} = useCurrentWalletPositionsV2(account)

  const {markets} = useTotalMarketsData()
  const marketDetails = useMarketDetails(markets)
  const {markets: marketsData} = useCurrentMarketState(marketDetails)

  const handledPositions = useMemo(() => {
    if (!positions) return []
    return positions.map(filteredPosition => {
      const marketAddress = filteredPosition.market.id
      const marketState = marketsData.filter(market => market.marketAddress === marketAddress)[0]

      const positionStatus = filteredPosition.isLiquidated
        ? positionStatuses[2]
        : filteredPosition.currentOi === '0'
        ? positionStatuses[1]
        : +filteredPosition.numberOfUniwnds > 0
        ? positionStatuses[0]
        : positionStatuses[0]

      return {
        ...marketState,
        ...filteredPosition,
        id: filteredPosition.id,
        positionStatus,
      }
    })
  }, [positions, marketsData])

  const openPositions = useMemo(() => {
    return handledPositions.filter(position => position.positionStatus === positionStatuses[0])
  }, [handledPositions])

  const unwindRows = useMemo(() => {
    let rows = []
    for (let position of handledPositions) {
      for (let unwind of position.unwinds) {
        let row = {
          ...unwind,
          position: position,
        }
        rows.push(row)
      }
    }
    return rows
  }, [handledPositions])

  const liquidatedRows = useMemo(() => {
    let rows = []
    for (let position of handledPositions) {
      for (let liquidated of position.liquidates) {
        let row = {
          ...liquidated,
          position: position,
        }
        rows.push(row)
      }
    }
    return rows
  }, [handledPositions])

  return (
    <PageContainer>
      <Overview marginTop="50px" openPositions={openPositions} unwinds={unwindRows} />
      <PositionsTable
        title="Open Positions"
        marginTop="50px"
        isLoading={isPositionsLoading}
        isUninitialized={isUninitialized}
        positionStatus={'open'}
        // onClickColumn={{Status: setNextStatusFilter}}
      >
        {openPositions && openPositions.length > 0
          ? openPositions.map(position => <OpenPosition position={position} columns={positionColumns['open']} />)
          : null}
      </PositionsTable>
      <PositionsTable
        title="Unwinds"
        marginTop="50px"
        isLoading={isPositionsLoading}
        isUninitialized={isUninitialized}
        positionStatus={'closed'}
        // onClickColumn={{Status: setNextStatusFilter}}
      >
        {unwindRows && unwindRows.length > 0
          ? unwindRows.map(transaction => <UnwindsTransactions transaction={transaction} columns={positionColumns['closed']} />)
          : null}
      </PositionsTable>
      <PositionsTable
        title="Liquidates"
        marginTop="50px"
        isLoading={isPositionsLoading}
        isUninitialized={isUninitialized}
        positionStatus={'liquidated'}
        // onClickColumn={{Status: setNextStatusFilter}}
      >
        {liquidatedRows && liquidatedRows.length > 0
          ? liquidatedRows.map(transaction => <LiquidatesTransactions transaction={transaction} columns={positionColumns['liquidated']} />)
          : null}
      </PositionsTable>
    </PageContainer>
  )
}

export default Positions
