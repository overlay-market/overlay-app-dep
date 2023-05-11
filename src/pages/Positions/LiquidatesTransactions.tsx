import {useMemo, useCallback} from 'react'
import {StyledTableRow, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
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
    isLong: boolean
    mint: string
    price: string
    timestamp: string
    value: string
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
      fractionUnwound: string
      builds: Build[]
      unwinds: Unwind[]
      liquidates: Liquidate[]
    }
  }
  columns: string[]
}

export const LiquidatesTransactions = ({
  transaction,
  columns,
}: PositionProps) => {
  const {
    positionId,
    marketName,
    leverage,
    createdAtTimestamp,
    isLong,
    initialCollateral,
    entryPrice,
    priceCurrency,
    decimals,
    unwinds,
  } = transaction.position
  const {
    id,
    price,
    timestamp,
  } = transaction
  const BN_ONE = 10 ** 18
  const isClosed = false;

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

  const parsedBigStringUsingDecimals = useCallback((bigString: string, toFixed: boolean = false) => {
    if (!decimals) return '-'
    return (toFixed 
    ? formatBigNumber(bigString, Number(decimals))
    : formatBigNumber(bigString, Number(decimals), Number(decimals)))
  }, [decimals])

  const parsedExitPrice = useMemo(() => {
    if (!price || decimals === undefined) return null
    return formatBigNumber(price, Number(decimals))
  }, [price, decimals])

  const liquidateSize: string | undefined = useMemo(() => {
    if (!initialCollateral) return undefined
    let parsedInitialCollateral = parsedBigStringUsingDecimals(initialCollateral)
    if (!parsedInitialCollateral) return undefined
    let positionCost = +parsedInitialCollateral
    if (!positionCost) return undefined
    for (let i=0; i < unwinds.length; i++) {
      positionCost = +positionCost * (1 - (+unwinds.filter(item => +item.unwindNumber === i)[0].fraction / BN_ONE))
    }
    let unwindAmount = +positionCost
    return unwindAmount < 1 ? unwindAmount.toFixed(6) : unwindAmount.toFixed(2)
  }, [initialCollateral, parsedBigStringUsingDecimals, BN_ONE, unwinds])

  let history = useHistory()

  function handleNavigate(location: string | undefined, isClosed: boolean) {
    if (location) {
      if (isClosed) {
        const string = `/closed-positions/${location}`
        history.push(string)
      } else {
        const string = `/positions/${location}`
        history.push(string)
      }
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
      "Liquidated": string;
      Created?: string;
    }

    const values: Values = {
      "Market": marketName, 
      "Size": liquidateSize ? `${liquidateSize} OVL` : <Loader size="12px" />, 
      "Position": <FlexRow>
                    <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
                    <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
                  </FlexRow>, 
      "Entry Price": `${priceCurrency ? priceCurrency : ''}${parsedEntryPrice ? parsedEntryPrice : '-'}`, 
      "Exit Price": `${priceCurrency ? priceCurrency : ''}${parsedExitPrice ?? '-'}`, 
      "Liquidated": parsedClosedTimestamp, 
      "Created": parsedCreatedTimestamp,
    }
    return columns.map((columnName) => {
      return values[columnName]
    })
  }, [liquidateSize, parsedClosedTimestamp, parsedExitPrice, columns, marketName, leverage, isLong, positionSide, priceCurrency, parsedEntryPrice, parsedCreatedTimestamp]) 


  return (
    <>
      <StyledTableRow onClick={() => handleNavigate(positionUrl, isClosed)}>
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