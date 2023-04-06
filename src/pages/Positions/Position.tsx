import {useMemo} from 'react'
import styled from 'styled-components'
import {StyledTableRow, StyledTableCell, StyledTableCellThin, StyledHeaderCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {usePositionCost} from '../../hooks/usePositionCost'
import {usePositionValue} from '../../hooks/usePositionValue'
import Loader from '../../components/Loaders/Loaders'
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
  entryPrice: string
  priceCurrency: string
  liquidationPrice: string
  currentMidPrice: string
  decimals: string | number
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
  priceCurrency,
  liquidationPrice,
  currentMidPrice,
  decimals,
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

  const value = usePositionValue(marketAddress, positionId)
  const cost = usePositionCost(marketAddress, positionId)

  const parsedValue: string | number | undefined = useMemo(() => {
    if (!value && value === undefined) return undefined
    return formatBigNumber(value, 18, 2)
  }, [value])

  const parsedCost: string | number | undefined = useMemo(() => {
    if (!cost && cost === undefined) return undefined
    return formatBigNumber(cost, 18, 2, true)
  }, [cost])

  const PnL: string | number | undefined = useMemo(() => {
    if (value === undefined || cost === undefined) return undefined
    const difference = value.sub(cost)
    return formatBigNumber(difference, 18, 2, true)
  }, [value, cost])

  return (
    <StyledTableRow>
      <StyledTableCell>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedValue ? `${parsedValue} OVL` : <Loader />}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{parsedCreatedTimestamp}</TEXT.Supplemental>
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
        <TEXT.Supplemental>{}</TEXT.Supplemental>
      </StyledTableCell>
    </StyledTableRow>
  )
}
