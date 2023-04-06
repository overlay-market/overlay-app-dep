import styled from 'styled-components'

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

export const Position = ({...props}: PositionProps) => {}
