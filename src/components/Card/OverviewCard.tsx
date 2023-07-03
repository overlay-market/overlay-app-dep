import {Lock, Unlock, TrendingDown, TrendingUp, Book} from 'react-feather'
import styled from 'styled-components'
import {TEXT, colors} from '../../theme/theme'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #1b2131;
  border: 0.5px solid rgba(113, 206, 255, 0.5);
  border-radius: 8px;
  padding: 24px;
  max-width: 260px;

  ${({theme}) => theme.mediaWidth.minMedium`
    max-width: unset;
  `}
`

const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  background: #474747;
  border-radius: 50%;
  display: flex;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 8px 16px;
  justify-content: space-between;
`

interface DataProps {
  title: string
  icon: string
  value: string
  valueColor?: string
  isOver1000OpenPositions?: boolean
}

const OverviewCard = (props: DataProps) => {
  const {title, icon, value, valueColor, isOver1000OpenPositions} = props

  return (
    <Container>
      <CardIcon>
        {icon === 'unlock' ? (
          <Unlock color="#71CEFF" />
        ) : icon === 'lock' ? (
          <Lock color="#D5B4FF" />
        ) : icon === 'up' ? (
          <TrendingUp color="#5FD0AB" />
        ) : icon === 'down' ? (
          <TrendingDown color="#FF648A" />
        ) : icon === 'book' ? (
          <Book color="#71CEFF" />
        ) : null}
      </CardIcon>
      <CardContent>
        <TEXT.SmallBody style={{whiteSpace: 'nowrap'}}>{title}</TEXT.SmallBody>
        <TEXT.BoldNumber
          fontSize={18}
          style={{
            color: `${valueColor ?? '#E5F6FF'}`,
          }}
        >
          {value}
        </TEXT.BoldNumber>
        {isOver1000OpenPositions && (
          <div style={{position: 'absolute', marginTop: '47px'}}>
            <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} color={colors(true).dark.red}>
              Open Positions {'>'} 1000
            </TEXT.Supplemental>
            <TEXT.Supplemental style={{whiteSpace: 'nowrap'}} color={colors(true).dark.red}>
              May output wrong value
            </TEXT.Supplemental>
          </div>
        )}
      </CardContent>
    </Container>
  )
}

export default OverviewCard
