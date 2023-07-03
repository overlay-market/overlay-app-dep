import React, {useEffect, useMemo, useState} from 'react'
import {ChevronDown, Play} from 'react-feather'
import styled from 'styled-components'
import {Box, Button, Collapse, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {FlexRow} from '../../components/Container/Container'
import {usePositionsTableDetails, usePositionsTableData} from '../../state/build/hooks'
import {useTotalMarketsData} from '../../state/markets/hooks'
import {useMarketDetails} from '../../hooks/useMarketDetails'
import {useCurrentMarketState} from '../../hooks/useCurrentMarketState'
import {OpenPosition} from './OpenPosition'
import {UnwindsTransactions} from './UnwindsTransactions'
import {LiquidatesTransactions} from './LiquidatesTransactions'
import {Overview} from './Overview'
import {colors} from '../../theme/theme'
import Pagination from '../../components/Pagination/Pagination'
import Loader from '../../components/Loaders/Loaders'
import {formatBigNumber} from '../../utils/formatBigNumber'

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
  positionStatus: PositionStatus
  initialCollateral?: string
  rowsCount: number
  marketsData: any
}

export enum PositionStatus {
  Open = 'open',
  Closed = 'closed',
  Liquidated = 'liquidated',
}

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

const StyledTableCell = styled(TableCell)`
  text-align: center !important;
`

const ROWS_PER_PAGE = [10, 20, 40, 50]

const PositionsTable = ({title, marginTop, positionStatus, rowsCount, marketsData}: PositionsTableProps) => {
  const {account} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[0])
  const {positionsTableData, isUninitialized, isLoading} = usePositionsTableData(account, rowsPerPage, (page - 1) * rowsPerPage, positionStatus)
  const [showLoader, setShowLoader] = useState(false)

  // Show loader only on page change
  useEffect(() => {
    setShowLoader(true)
  }, [page])

  useEffect(() => {
    setShowLoader(false)
  }, [positionsTableData])

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
    return Math.ceil(rowsCount / rowsPerPage)
  }, [rowsCount, rowsPerPage])

  const paginatedRows = useMemo(() => {
    if (!positionsTableData) return null

    const rows =
      positionStatus === PositionStatus.Open
        ? positionsTableData.account?.positions
        : positionStatus === PositionStatus.Closed
        ? positionsTableData.account?.unwinds
        : positionStatus === PositionStatus.Liquidated
        ? positionsTableData.account?.liquidates
        : []

    return rows && rows.length > 0 ? (
      <>
        {rows.map((row: any) => {
          const marketAddress = positionStatus === PositionStatus.Open ? row.market.id : row.position.market.id
          const marketState = marketsData.filter((market: any) => market.marketAddress === marketAddress)[0]

          if (positionStatus === PositionStatus.Open) {
            return (
              <OpenPosition
                key={row.id}
                position={{
                  ...marketState,
                  ...row,
                }}
                columns={positionColumns[PositionStatus.Open]}
              />
            )
          } else if (positionStatus === PositionStatus.Closed) {
            return (
              <UnwindsTransactions
                key={row.id}
                transaction={{
                  ...row,
                  position: {
                    ...marketState,
                    ...row.position,
                  },
                }}
                columns={positionColumns[PositionStatus.Closed]}
              />
            )
          } else {
            return (
              <LiquidatesTransactions
                key={row.id}
                transaction={{
                  ...row,
                  position: {
                    ...marketState,
                    ...row.position,
                  },
                }}
                columns={positionColumns[PositionStatus.Liquidated]}
              />
            )
          }
        })}
      </>
    ) : null
  }, [positionStatus, marketsData, positionsTableData])

  return (
    <Container>
      <TEXT.BoldStandardBody mt={marginTop} mb="16px">
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
                    <StyledHeaderCell key={column} width={20}>
                      <TEXT.SupplementalHeader>{column}</TEXT.SupplementalHeader>
                    </StyledHeaderCell>
                  )
                })}
              </StyledTableHeaderRow>
            </TableHead>
            <TableBody>
              {showLoader ? (
                <TableRow>
                  <StyledTableCell colSpan={positionColumns[positionStatus].length}>
                    <Loader />
                  </StyledTableCell>
                </TableRow>
              ) : (
                paginatedRows
              )}
            </TableBody>
          </StyledTable>
        </TableContainer>
        {paginatedRows && (
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
                        <div key={option} onClick={() => handleRowsPerPageChange(option)}>
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
      ) : isUninitialized || isLoading ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="center !important" width="100%">
          <Loader />
        </FlexRow>
      ) : !paginatedRows ? (
        <FlexRow marginTop="32px" marginLeft="8px" justifyContent="left" width="100%">
          <TEXT.StandardBody color="#858585">You have no {positionStatus} positions.</TEXT.StandardBody>
        </FlexRow>
      ) : null}
    </Container>
  )
}

const Positions = () => {
  const {account} = useActiveWeb3React()
  const {positionsTableDetails} = usePositionsTableDetails(account)

  const {markets} = useTotalMarketsData()
  const marketDetails = useMarketDetails(markets)
  const {markets: marketsData} = useCurrentMarketState(marketDetails)

  return (
    <PageContainer>
      <Overview
        marginTop="50px"
        account={account}
        numberOfOpenPositions={Number(positionsTableDetails?.numberOfOpenPositions ?? 0)}
        numberOfUnwinds={Number(positionsTableDetails?.numberOfUnwinds ?? 0)}
        realizedPnl={formatBigNumber(positionsTableDetails?.realizedPnl ?? '0', 18, 6) as string}
      />
      <PositionsTable
        title="Open Positions"
        marginTop="50px"
        positionStatus={PositionStatus.Open}
        rowsCount={Number(positionsTableDetails?.numberOfOpenPositions ?? 0)}
        marketsData={marketsData}
      />
      <PositionsTable
        title="Unwinds"
        marginTop="50px"
        positionStatus={PositionStatus.Closed}
        rowsCount={Number(positionsTableDetails?.numberOfUnwinds ?? 0)}
        marketsData={marketsData}
      />
      <PositionsTable
        title="Liquidates"
        marginTop="50px"
        positionStatus={PositionStatus.Liquidated}
        rowsCount={Number(positionsTableDetails?.numberOfLiquidatedPositions ?? 0)}
        marketsData={marketsData}
      />
    </PageContainer>
  )
}

export default Positions
