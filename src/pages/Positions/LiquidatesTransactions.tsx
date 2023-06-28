import {useMemo} from 'react'
import {StyledTableRowNoPointer, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import Loader from '../../components/Loaders/Loaders'
import {TEXT} from '../../theme/theme'
import {Build, Liquidate, Unwind} from '../../state/build/hooks'

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
      fractionUnwound: string
      builds: Build[]
      unwinds: Unwind[]
      liquidates: Liquidate[]
    }
  }
  columns: string[]
}

export const LiquidatesTransactions = ({transaction, columns}: PositionProps) => {
  const {marketName, leverage, createdAtTimestamp, isLong, entryPrice, priceCurrency, decimals} = transaction.position
  const {price, timestamp, size} = transaction

  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = formatUnixTimestampToDate(createdAtTimestamp)
  const parsedClosedTimestamp = formatUnixTimestampToDate(timestamp)

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return null
    return formatBigNumber(entryPrice, Number(decimals))
  }, [entryPrice, decimals])

  const parsedExitPrice = useMemo(() => {
    if (!price || decimals === undefined) return null
    return formatBigNumber(price, Number(decimals))
  }, [price, decimals])

  const parsedSize = useMemo(() => {
    if (!size || decimals === undefined) return null
    return formatBigNumber(size, Number(decimals))
  }, [size, decimals])

  const sortedValues: any[] = useMemo(() => {
    interface Values {
      [key: string]: string | JSX.Element | null | undefined
      Market?: string
      Size: string | JSX.Element
      Position: JSX.Element
      'Entry Price': string
      'Exit Price': string
      Liquidated: string
      Created?: string
    }

    const values: Values = {
      Market: marketName,
      Size: parsedSize ? `${parsedSize} OVL` : <Loader size="12px" />,
      Position: (
        <FlexRow>
          <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
          <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
        </FlexRow>
      ),
      'Entry Price': `${priceCurrency ? priceCurrency : ''}${parsedEntryPrice ? parsedEntryPrice : '-'}`,
      'Exit Price': `${priceCurrency ? priceCurrency : ''}${parsedExitPrice ?? '-'}`,
      Liquidated: parsedClosedTimestamp,
      Created: parsedCreatedTimestamp,
    }
    return columns.map(columnName => {
      return values[columnName]
    })
  }, [
    parsedClosedTimestamp,
    parsedExitPrice,
    columns,
    marketName,
    leverage,
    isLong,
    positionSide,
    priceCurrency,
    parsedEntryPrice,
    parsedCreatedTimestamp,
    parsedSize,
  ])

  return (
    <>
      <StyledTableRowNoPointer>
        {sortedValues.map(value => {
          return (
            <StyledTableCell>
              <TEXT.Supplemental>{value}</TEXT.Supplemental>
            </StyledTableCell>
          )
        })}
      </StyledTableRowNoPointer>
    </>
  )
}
