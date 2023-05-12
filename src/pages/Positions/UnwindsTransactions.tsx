import {useMemo, useCallback} from 'react'
import {StyledTableRow, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {checkIsNegative} from '../../utils/checkIsNegative'
import Loader from '../../components/Loaders/Loaders'
import {useHistory} from 'react-router-dom'
import {TEXT} from '../../theme/theme'
import { Build, Liquidate, Unwind } from '../../state/build/hooks'

export interface PositionProps {
  transaction: {
    collateral: string
    currentDebt: string
    currentOi: string
    id: string
    fraction: string
    isLong: boolean
    mint: string
    price: string
    timestamp: string
    value: string
    unwindNumber: string
    pnl: string
    transferAmount: string
    size: string
    position: {  
      id: string
      positionId: string
      marketName?: string
      marketAddress: string
      leverage: string | number
      createdAtTimestamp: string
      isLong: boolean
      initialCollateral?: string
      entryPrice: string
      exitPrice?: string
      priceCurrency?: string
      parsedMid?: string | number
      decimals?: string | number
      isLiquidated: boolean
      currentOi: string
      numberOfUniwnds: string
      positionStatus: string
      builds: Build[]
      unwinds: Unwind[]
      liquidates: Liquidate[]
    }
  }
  columns: string[]
}

export const UnwindsTransactions = ({
  transaction,
  columns,
}: PositionProps) => {
  const {
    positionId,
    marketName,
    leverage,
    createdAtTimestamp,
    isLong,
    entryPrice,
    priceCurrency,
    decimals,
  } = transaction.position
  const {
    id,
    price,
    timestamp,
    pnl,
    size,
  } = transaction

  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = formatUnixTimestampToDate(createdAtTimestamp)
  const parsedClosedTimestamp =  formatUnixTimestampToDate(timestamp)

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return null
    return formatBigNumber(entryPrice, Number(decimals))
  }, [entryPrice, decimals])

  const parsedPnl = useMemo(() => {
    if (!pnl || decimals === undefined) return null
    return formatBigNumber(pnl, Number(decimals), Math.abs(+pnl) > 10**(+decimals) ? 4 : 6)
  }, [pnl, decimals])

  const parsedExitPrice = useMemo(() => {
    if (!price || decimals === undefined) return null
    return formatBigNumber(price, Number(decimals))
  }, [price, decimals])

  const unwindSize: string | undefined = useMemo(() => {
    return (+size / 10**18) < 1 ? (+size / 10**18).toFixed(6) : (+size / 10**18).toFixed(2)
  }, [size])

  let history = useHistory()

  function handleNavigate(location: string | undefined) {
    if (location) {
      const string = `/closed-positions/${location}`
      history.push(string)
    }
  }

  const positionUrl = useMemo(() => {
    if (!positionId && positionId === undefined) return undefined
    if (!id && id === undefined) return undefined
    return `${id}/${positionId}`
  }, [positionId, id])

  const sortedValues: any[] = useMemo(() => {
    interface Values {
      [key: string]: string | JSX.Element | null | undefined;
      Market?: string;
      Size: string | JSX.Element;
      Position: JSX.Element;
      "Entry Price": string;
      "Exit Price": string;
      "Closed": string;
      Created?: string;
      "PnL": JSX.Element;
    }

    const values: Values = {
      "Market": marketName, 
      "Size": unwindSize ? `${unwindSize} OVL` : <Loader size="12px" />, 
      "Position": <FlexRow>
                    <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
                    <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
                  </FlexRow>, 
      "Entry Price": `${priceCurrency ? priceCurrency : ''}${parsedEntryPrice ? parsedEntryPrice : '-'}`, 
      "Exit Price": `${priceCurrency ? priceCurrency : ''}${parsedExitPrice ?? '-'}`, 
      "Closed": parsedClosedTimestamp, 
      "Created": parsedCreatedTimestamp, 
      "PnL": <ProfitLossCell PnL={Number(parsedPnl)} />
    }
    return columns.map((columnName) => {
      return values[columnName]
    })
  }, [unwindSize, parsedClosedTimestamp, parsedExitPrice, columns, marketName, leverage, isLong, positionSide, priceCurrency, parsedEntryPrice, parsedCreatedTimestamp, parsedPnl]) 


  return (
    <>
      <StyledTableRow onClick={() => handleNavigate(positionUrl)}>
        {
          sortedValues.map((value) => {
            return <StyledTableCell>
            <TEXT.Supplemental>{value}</TEXT.Supplemental>
          </StyledTableCell>
          })
        }
      </StyledTableRow>
    </>
  )
}

const ProfitLossCell = ({PnL}: {PnL: number}) => {
  return ( 
  <FlexRow justify="left">
    {PnL ? <TEXT.Supplemental color={checkIsNegative(PnL) ? '#FF648A' : '#5FD0AB'}>{PnL} OVL</TEXT.Supplemental> : '-'}
  </FlexRow>)
}
