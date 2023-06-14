import React, {useMemo, useState} from 'react'
import {ChevronDown, Play} from 'react-feather'
import styled from 'styled-components'
import {Box, Button, Collapse, TableBody, TableContainer, TableHead, Select, MenuItem} from '@material-ui/core'
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
import {Pagination} from '@material-ui/lab'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {colors} from '../../theme/theme'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      '& .MuiPagination-ul': {
        '& li:first-child .MuiButtonBase-root': {
          padding: '10px',
          background: '#2E3343',
          marginLeft: '4px',
        },
        '& li:last-child .MuiButtonBase-root': {
          padding: '10px',
          background: '#2E3343',
          marginRight: 0,
        },
      },
      '& .MuiPaginationItem-root': {
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
        color: '#C4C4C4',
        fontSize: '14px',
        padding: '6.5px 7.5px',
        minWidth: 0,
        width: '24px',
        height: '30px',
        margin: '0 6px',
        '&:hover': {
          boxShadow: '0px 0px 4px 2px rgba(180, 229, 255, 0.3)',
        },
      },
      '& .Mui-selected': {
        border: '1px solid #E5F6FF',
        color: '#E5F6FF',
      },
      '& .MuiPaginationItem-ellipsis': {
        '&:hover': {
          boxShadow: 'none !important',
        },
      },
    },
    select: {
      padding: '6.5px 10px',
      background: '#2E3343',
      borderRadius: '4px',
      marginLeft: '8px',
      boxSizing: 'border-box',
      maxWidth: '104px',
      whiteSpace: 'nowrap',

      '&:hover': {
        cursor: 'pointer',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        '& > $selectDropdown': {
          display: 'block',
        },
        '& $chevron': {
          transform: 'rotate(180deg)',
        },
      },
    },
    selectDropdown: {
      position: 'absolute',
      zIndex: 1,
      top: '100%',
      left: 0,
      background: '#2E3343',
      borderRadius: '0 0 4px 4px',
      display: 'none',
      '& > div': {
        borderRadius: '4px',
        padding: '6.5px 10px',
        boxSizing: 'border-box',
        width: '104px',
        whiteSpace: 'nowrap',
        '&:hover': {
          boxShadow: '0px 0px 4px 2px rgba(180, 229, 255, 0.3)',
        },
      },
    },
    chevron: {
      marginLeft: '8px',
      transition: 'transform ease-out 0.25s',
    },
  }),
)

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

const ROWS_PER_PAGE = [10, 20, 40, 50]

const PositionsTable = ({title, children, marginTop, isLoading, isUninitialized, positionStatus}: PositionsTableProps) => {
  const classes = useStyles()
  const {account} = useActiveWeb3React()
  const [open, setOpen] = useState<boolean>(true)
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE[0])

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleRowsPerPageChange = (newValue: number) => {
    setRowsPerPage(newValue)
  }

  return (
    <Container>
      <TableContainer style={{overflow: 'visible'}}>
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
          {children && (
            <Box display="flex" justifyContent="flex-start" alignItems="center" paddingTop={'28px'} paddingBottom={'8px'}>
              <Pagination count={10} shape="rounded" className={classes.pagination} />
              <Box display="flex" alignItems="center" ml="28px">
                <TEXT.SmallBody color={colors(true).dark.grey2}>Show:</TEXT.SmallBody>
                {/* Dropdown container */}
                <Box position="relative" className={classes.select}>
                  {/* Select */}
                  <Box display="flex" alignItems="center">
                    <TEXT.SmallBody color={colors(true).dark.white}>{rowsPerPage} / page</TEXT.SmallBody>
                    <ChevronDown className={classes.chevron} color={colors(true).dark.white} strokeWidth={1} height={18} width={18} />
                  </Box>

                  {/* Dropdown */}
                  <Box className={classes.selectDropdown}>
                    {ROWS_PER_PAGE.map(
                      option =>
                        option !== rowsPerPage && (
                          <div onClick={() => handleRowsPerPageChange(option)}>
                            <TEXT.SmallBody>{option} / page</TEXT.SmallBody>
                          </div>
                        ),
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
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
        // onClickColumn={{Status: setNextStatusFilter}}
      >
        {openPositions && openPositions.length > 0
          ? openPositions.map(position => <OpenPosition position={position} columns={positionColumns['open']} />)
          : null}
      </PositionsTable>
      <PositionsTable
        title="Unwinds"
        marginTop="32px"
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
        marginTop="32px"
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
