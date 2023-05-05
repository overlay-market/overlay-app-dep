import {useMemo} from 'react'
import styled from 'styled-components'
import {StyledTableRow, StyledTableCell, StyledTableCellThin, StyledHeaderCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {usePositionCost} from '../../hooks/usePositionCost'
import {usePositionValue} from '../../hooks/usePositionValue'
import {useLiquidationPrice} from '../../hooks/useLiquidationPrice'
import {checkIsNegative} from '../../utils/checkIsNegative'
import Loader from '../../components/Loaders/Loaders'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {TEXT} from '../../theme/theme'

export interface PositionProps {
  id: string
  positionId: string
  marketName: string
  marketAddress: string
  leverage: string | number
  createdTimestamp: string
  isLong: boolean
  initialCollateral?: string
  entryPrice: string
  exitPrice?: string
  priceCurrency: string
  currentMidPrice: string
  decimals: string | number
  isClosed: boolean
  isLiquidated: boolean
}

export const Position = ({
  id,
  positionId,
  marketName,
  marketAddress,
  leverage,
  createdTimestamp,
  isLong,
  entryPrice,
  initialCollateral,
  exitPrice,
  priceCurrency,
  currentMidPrice,
  decimals,
  isClosed,
  isLiquidated,
}: PositionProps) => {
  const {account} = useActiveWeb3React()

  const positionSide = useMemo(() => {
    if (isLong === null || isLong === undefined) return null
    return isLong ? 'Long' : 'Short'
  }, [isLong])

  const parsedCreatedTimestamp = createdTimestamp ? formatUnixTimestampToDate(createdTimestamp) : null

  const parsedEntryPrice = useMemo(() => {
    if (!entryPrice || decimals === undefined) return null
    return formatBigNumber(entryPrice, Number(decimals))
  }, [entryPrice, decimals])

  const parsedExitPrice = useMemo(() => {
    if (!exitPrice || decimals === undefined) return null
    return formatBigNumber(exitPrice, Number(decimals))
  }, [exitPrice, decimals])

  const value = usePositionValue(marketAddress, positionId)
  const cost = usePositionCost(marketAddress, positionId)
  const liquidationPrice = useLiquidationPrice(marketAddress, positionId)

  const parsedValue: string | number | undefined = useMemo(() => {
    if (!value && value === undefined) return undefined
    if (value._hex === '0x00' && initialCollateral) {
      const initialCollateralFormated = +initialCollateral / (10 ** 18)
      return initialCollateralFormated < 1 ? initialCollateralFormated.toFixed(6) : initialCollateralFormated.toFixed(2)
    }
    return formatBigNumber(value, 18, 2) === 0 ? formatBigNumber(value, 18, 6) : formatBigNumber(value, 18, 2)
  }, [value, initialCollateral])

  const parsedCost: string | number | undefined = useMemo(() => {
    if (!cost && cost === undefined) return undefined
    return formatBigNumber(cost, 18, 2, true)
  }, [cost])

  const parsedLiquidationPrice: string | number | undefined | null = useMemo(() => {
    if (!liquidationPrice && liquidationPrice === undefined) return null
    if (decimals === undefined || decimals === null) return null
    return formatBigNumber(liquidationPrice, Number(decimals), 4)
  }, [liquidationPrice, decimals])

  const unrealizedPnL: string | number | undefined = useMemo(() => {
    if (value === undefined || cost === undefined) return undefined
    const difference = value.sub(cost)
    return formatBigNumber(difference, 18, 2, true) === 0 ? formatBigNumber(difference, 18, 6, true) : formatBigNumber(difference, 18, 2, true)
  }, [value, cost])

  const PnL: string | number | undefined = useMemo(() => {
    if (!(parsedEntryPrice && parsedExitPrice && parsedValue)) return undefined
    const priceDiff =  +parsedExitPrice - +parsedEntryPrice
    const pnl = (priceDiff / +parsedEntryPrice) * +parsedValue
    return pnl < 1 ? pnl.toFixed(6) : pnl.toFixed(2)
  }, [parsedEntryPrice, parsedExitPrice, parsedValue])

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

  return isClosed 
  ? (
    <StyledTableRow onClick={() => handleNavigate(positionUrl, isClosed)}>
      <StyledTableCell>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedValue ? `${parsedValue} OVL` : <Loader size="12px" />}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <FlexRow>
          <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
          <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
        </FlexRow>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>
          {priceCurrency}
          {parsedEntryPrice}
        </TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{priceCurrency}{parsedExitPrice}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedCreatedTimestamp}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>
          04/24/2023
        </TEXT.Supplemental>
      </StyledTableCell>
      <ProfitLossCell PnL={Number(PnL)} isClosed={isClosed} isLiquidated={isLiquidated} />
    </StyledTableRow>
  )
  : (
    <StyledTableRow onClick={() => handleNavigate(positionUrl, isClosed)}>
      <StyledTableCell>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedValue ? `${parsedValue} OVL` : <Loader size="12px" />}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <FlexRow>
          <TEXT.Supplemental mr="4px">{leverage}x</TEXT.Supplemental>
          <TEXT.BoldSupplemental color={isLong ? '#5FD0AB' : '#FF648A'}>{positionSide}</TEXT.BoldSupplemental>
        </FlexRow>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>
          {priceCurrency}
          {parsedEntryPrice}
        </TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>
          {priceCurrency}
          {currentMidPrice}
        </TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedLiquidationPrice ? `${priceCurrency} ${parsedLiquidationPrice}` : `-`}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedCreatedTimestamp}</TEXT.Supplemental>
      </StyledTableCell>
      <ProfitLossCell PnL={Number(unrealizedPnL)} isClosed={isClosed} isLiquidated={isLiquidated} />
    </StyledTableRow>
  )
}

const ProfitLossCell = ({PnL, isClosed, isLiquidated}: {PnL: number; isClosed: boolean; isLiquidated: boolean}) => {
  return (
    <StyledTableCell align="center">
      {isLiquidated ? (
        <TEXT.Supplemental>Liquidated</TEXT.Supplemental>
      ) : isClosed ? (
        <FlexRow justify="center">
          {PnL ? <TEXT.Supplemental color={checkIsNegative(PnL) ? '#FF648A' : '#5FD0AB'}>{PnL} OVL</TEXT.Supplemental> : '-'}
        </FlexRow>
      ) : (
        <FlexRow justify="center">
          {PnL ? <TEXT.Supplemental color={checkIsNegative(PnL) ? '#FF648A' : '#5FD0AB'}>{PnL} OVL</TEXT.Supplemental> : '-'}
        </FlexRow>
      )}
    </StyledTableCell>
  )
}
