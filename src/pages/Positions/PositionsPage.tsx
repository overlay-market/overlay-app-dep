import React, {useMemo, useState} from 'react'
import {ChevronDown, Play} from 'react-feather'
import styled from 'styled-components'
import {Box, Button, Collapse, TableBody, TableContainer, TableHead} from '@material-ui/core'
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
import {colors} from '../../theme/theme'
import Pagination from '../../components/Pagination/Pagination'

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
  rows?: any[]
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
  min-width: 20px !important;
  margin-left: 4px !important;
`

interface RotatingTriangleProps {
  open: boolean
}

export const RotatingTriangle = styled(Play)<RotatingTriangleProps>`
  transform: ${props => (props.open ? 'rotate(270deg)' : 'rotate(90deg)')};
  transition: transform ease-out 0.25s;
`

const Dropdown = styled.div`
  position: relative;
  padding: 6.5px 10px;
  background: ${({theme}) => theme.dark.grey4};
  border-radius: 4px;
  margin-left: 8px;
  box-sizing: border-box;
  max-width: 104px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    .dropdown-menu {
      display: block;
    }

    .chevron {
      transform: rotate(180deg);
    }
  }
`

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  background: ${({theme}) => theme.dark.grey4};
  border-radius: 0 0 4px 4px;
  display: none;

  > div {
    border-radius: 4px;
    padding: 6.5px 10px;
    box-sizing: border-box;
    width: 104px;
    white-space: nowrap;

    &:hover {
      box-shadow: 0px 0px 4px 2px rgba(180, 229, 255, 0.3);
    }
  }
`

const RotatingChevron = styled(ChevronDown)`
  margin-left: 8px;
  transition: transform ease-out 0.25s;
`

const ROWS_PER_PAGE = [10, 20, 40, 50]

const PositionsTable = ({title, marginTop, isLoading, isUninitialized, positionStatus, rows}: PositionsTableProps) => {
  const {account} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[0])

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue)
    setPage(1)
  }

  const pageCount = useMemo(() => {
    if (!rows) return 0

    return Math.ceil(rows.length / rowsPerPage)
  }, [rows, rowsPerPage])

  const paginatedRows = useMemo(() => {
    if (!rows) return null

    const lastRowIndex = page * rowsPerPage
    const firstRowIndex = lastRowIndex - rowsPerPage
    const currentRows = rows.slice(firstRowIndex, lastRowIndex)

    return currentRows.map(row => {
      if (positionStatus === 'open') {
        return <OpenPosition position={row} columns={positionColumns['open']} />
      } else if (positionStatus === 'closed') {
        return <UnwindsTransactions transaction={row} columns={positionColumns['closed']} />
      } else if (positionStatus === 'liquidated') {
        return <LiquidatesTransactions transaction={row} columns={positionColumns['liquidated']} />
      } else {
        return null
      }
    })
  }, [rows, page, rowsPerPage, positionStatus])

  return (
    <Container>
      <TEXT.BoldStandardBody mt={marginTop} mb="16px">
        {/* {`${positionStatus.charAt(0).toUpperCase() + positionStatus.slice(1)} ${title}`} */}
        {`${title}`}
        <TriangleButton onClick={handleToggle}>
          <RotatingTriangle color={'white'} fill={'white'} height={10} width={10} open={open} />
        </TriangleButton>
      </TEXT.BoldStandardBody>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <StyledTable>
            <TableHead>
              <StyledTableHeaderRow>
                {positionColumns[positionStatus].map((column: string) => {
                  return (
                    <StyledHeaderCell width={20}>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>{paginatedRows}</TableBody>
          </StyledTable>
        </TableContainer>
        {!!rows?.length && (
          <Box display="flex" justifyContent="flex-start" alignItems="center" paddingTop={'28px'} paddingBottom={'8px'}>
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
            <Box display="flex" alignItems="center" ml="28px">
              <TEXT.SmallBody color={colors(true).dark.grey2}>Show:</TEXT.SmallBody>
              <Dropdown>
                <Box display="flex" alignItems="center">
                  <TEXT.SmallBody color={colors(true).dark.white}>{rowsPerPage} / page</TEXT.SmallBody>
                  <RotatingChevron className="chevron" color={colors(true).dark.white} strokeWidth={1} height={18} width={18} />
                </Box>

                <DropdownMenu className="dropdown-menu">
                  {ROWS_PER_PAGE.map(
                    option =>
                      option !== rowsPerPage && (
                        <div onClick={() => handleRowsPerPageChange(option)}>
                          <TEXT.SmallBody>{option} / page</TEXT.SmallBody>
                        </div>
                      ),
                  )}
                </DropdownMenu>
              </Dropdown>
            </Box>
          </Box>
        )}
      </Collapse>

      {!account ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">No wallet connected. </TEXT.StandardBody>
        </FlexRow>
      ) : isUninitialized ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">Fetching positions...</TEXT.StandardBody>
        </FlexRow>
      ) : !rows?.length ? (
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
    return rows.sort((a, b) => +b.timestamp - +a.timestamp)
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
        rows={openPositions}
        // onClickColumn={{Status: setNextStatusFilter}}
      />
      <PositionsTable
        title="Unwinds"
        marginTop="50px"
        isLoading={isPositionsLoading}
        isUninitialized={isUninitialized}
        positionStatus={'closed'}
        rows={unwindRows}
        // onClickColumn={{Status: setNextStatusFilter}}
      />
      <PositionsTable
        title="Liquidates"
        marginTop="50px"
        isLoading={isPositionsLoading}
        isUninitialized={isUninitialized}
        positionStatus={'liquidated'}
        rows={liquidatedRows}
        // onClickColumn={{Status: setNextStatusFilter}}
      />
    </PageContainer>
  )
}

export default Positions
