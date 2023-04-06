import styled from 'styled-components'
import {StyledTableRow, StyledTableCell, StyledTableCellThin} from '../../components/Table/Table'
import {Link} from 'react-router-dom'
import {TEXT} from '../../theme/theme'

export interface PositionProps {
  id: string
  positionId: string
  marketName: string
  marketAddress: string
  createdTimestamp: string
  isLong: boolean
  entryPrice: string
  liquidationPrice: string
  currentMidPrice: string
}

export const Position = ({...props}: PositionProps) => {
  const {id, positionId, marketName, marketAddress, createdTimestamp, isLong, entryPrice, liquidationPrice, currentMidPrice} = props

  return (
    <StyledTableRow>
      <StyledTableCellThin>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{marketName}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{createdTimestamp}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{isLong}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{entryPrice}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{currentMidPrice}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>{liquidationPrice}</TEXT.Supplemental>
      </StyledTableCellThin>
      <StyledTableCellThin>
        <TEXT.Supplemental>PnL</TEXT.Supplemental>
      </StyledTableCellThin>
    </StyledTableRow>
  )
}
