import {useMemo} from 'react'
import {StyledTableRow, StyledTableCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {usePositionCost} from '../../hooks/usePositionCost'
import {usePositionValue} from '../../hooks/usePositionValue'
import {usePositionTradingFee} from '../../hooks/usePositionTradingFee'
import {useLiquidationPrice} from '../../hooks/useLiquidationPrice'
import {checkIsNegative} from '../../utils/checkIsNegative'
import Loader from '../../components/Loaders/Loaders'
import {useHistory} from 'react-router-dom'
import {TEXT} from '../../theme/theme'
import {Build, Liquidate, Unwind} from '../../state/build/hooks'

export interface PositionProps {
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
  columns: string[]
}

export const OpenPosition = ({position, columns}: PositionProps) => {
  const {id, positionId, marketName, marketAddress, leverage, createdAtTimestamp, isLong, entryPrice, priceCurrency, parsedMid, decimals} = position

  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = createdAtTimestamp ? formatUnixTimestampToDate(createdAtTimestamp) : null

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return undefined
    return formatBigNumber(entryPrice, Number(decimals))
  }, [entryPrice, decimals])

  const value = usePositionValue(marketAddress, positionId)
  const cost = usePositionCost(marketAddress, positionId)
  const tradingFee = usePositionTradingFee(marketAddress, positionId)
  const liquidationPrice = useLiquidationPrice(marketAddress, positionId)

  const parsedValue: string | number | undefined = useMemo(() => {
    if (!value && value === undefined) return undefined
    const fullValue = formatBigNumber(value, 18, 18)
    if (fullValue === undefined) return '-'
    return +fullValue < 1 ? formatBigNumber(value, 18, 6) : formatBigNumber(value, 18, 2)
  }, [value])

  const parsedLiquidationPrice: string | number | undefined | null = useMemo(() => {
    if (!liquidationPrice && liquidationPrice === undefined) return null
    if (decimals === undefined || decimals === null) return null
    return formatBigNumber(liquidationPrice, Number(decimals), 4)
  }, [liquidationPrice, decimals])

  const unrealizedPnL: string | number | undefined = useMemo(() => {
    if (value === undefined || cost === undefined || tradingFee === undefined || decimals === undefined) return undefined
    const diff = (+value - +cost - +tradingFee) / 10 ** +decimals
    return diff < 1 ? diff.toFixed(6) : diff.toFixed(2)
  }, [value, cost, decimals, tradingFee])

  let history = useHistory()

  function handleNavigate(location: string | undefined) {
    const string = `/positions/${location}`
    history.push(string)
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
      "Current Price": string;
      "Liq. Price": string;
      Created?: string;
      "Unrealized PnL": JSX.Element | string;
    }

    const values: Values = {
      "Market": marketName, 
      "Size": parsedValue ? `${parsedValue} OVL` : <Loader size="12px" />, 
      "Position": <FlexRow>
                    <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
                    <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
                  </FlexRow>, 
      "Entry Price": `${priceCurrency ? priceCurrency : ''}${parsedEntryPrice ? parsedEntryPrice : '-'}`, 
      "Current Price": `${priceCurrency ? priceCurrency : ''}${parsedMid ? parsedMid : '-'}`, 
      "Liq. Price": parsedLiquidationPrice ? `${priceCurrency ?? ''} ${parsedLiquidationPrice}` : `-`, 
      "Created": parsedCreatedTimestamp ?? undefined, 
      "Unrealized PnL": unrealizedPnL ? <ProfitLossCell PnL={Number(unrealizedPnL)} /> : '-'
    }
    return columns.map(columnName => {
      return values[columnName]
    })
  }, [
    columns,
    marketName,
    parsedValue,
    leverage,
    isLong,
    positionSide,
    priceCurrency,
    parsedEntryPrice,
    parsedMid,
    parsedLiquidationPrice,
    parsedCreatedTimestamp,
    unrealizedPnL,
  ])

  return (
    <>
      <StyledTableRow onClick={() => handleNavigate(positionUrl)}>
        {sortedValues.map((value, index) => {
          return (
            <StyledTableCell key={index}>
              <TEXT.Supplemental>{value}</TEXT.Supplemental>
            </StyledTableCell>
          )
        })}
      </StyledTableRow>
    </>
  )
}

const ProfitLossCell = ({PnL}: {PnL: number}) => {
  return ( 
  <FlexRow justify="left">
    {PnL ? <TEXT.Supplemental color={checkIsNegative(PnL) ? '#FF648A' : '#5FD0AB'}>{PnL} OVL</TEXT.Supplemental> : '0.00'}
  </FlexRow>)
}
