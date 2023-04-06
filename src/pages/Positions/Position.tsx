import styled from 'styled-components'
import {StyledTableRow} from '../../components/Table/Table'
import {Link} from 'react-router-dom'
export interface PositionProps {
  id: string
  marketName: string
  marketAddress: string
  createdTimestamp: string
  isLong: boolean
  entryPrice: string
  liquidationPrice: string
  currentMidPrice: string
}

export const Position = ({...props}: PositionProps) => {
  const {id, marketName, marketAddress, createdTimestamp, isLong, entryPrice, liquidationPrice, currentMidPrice} = props

  return <StyledTableRow></StyledTableRow>
}
