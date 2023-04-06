import {useMemo} from 'react'
import styled from 'styled-components'
import {StyledTableRow, StyledTableCell, StyledTableCellThin, StyledHeaderCell} from '../../components/Table/Table'
import formatUnixTimestampToDate from '../../utils/formatUnixTimestampToDate'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow} from '../../components/Container/Container'
import {formatBigNumber} from '../../utils/formatBigNumber'
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

  return (
    <StyledTableRow>
      <StyledTableCell>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCell>
      <StyledTableCell>
        <TEXT.Supplemental>{isLong}</TEXT.Supplemental>
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
        <TEXT.Supplemental>{liquidationPrice}</TEXT.Supplemental>
      </StyledTableCell>
    </StyledTableRow>
  )
}
