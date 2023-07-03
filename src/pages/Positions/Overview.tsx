import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import OverviewCard from '../../components/Card/OverviewCard'
import {Grid, Box} from '@material-ui/core'
import {useTotalValueLocked} from '../../hooks/useTotalValueLocked'
import {useTotalCost} from '../../hooks/useTotalCost'
import {useTotalFees} from '../../hooks/useTotalFees'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useMemo} from 'react'
import {colors} from '../../theme/theme'

const Container = styled.div<{mt?: string}>`
  display: flex;
  flex-direction: column;
  margin-top: 0;

  ${({theme, mt}) => theme.mediaWidth.minMedium`
    margin-top: ${mt ? `${mt}` : ''};
  `}
`

export interface Props {
  account: string | null | undefined
  marginTop: string
  numberOfOpenPositions: number
  numberOfUnwinds: number
  realizedPnl: string
}

export const Overview = ({account, marginTop, numberOfOpenPositions, numberOfUnwinds, realizedPnl}: Props) => {
  const title = 'Overview'

  const totalValueLocked = useTotalValueLocked(account)
  const totalCost = useTotalCost(account)
  const totalFees = useTotalFees(account)

  const upnl = useMemo(() => {
    let formatValue = 0
    if (totalValueLocked && totalCost && totalFees) {
      let _formatValue = formatBigNumber(totalValueLocked.sub(totalCost).sub(totalFees), 18, 2)
      if (_formatValue) {
        formatValue = +_formatValue > 1 ? +_formatValue : +(formatBigNumber(totalValueLocked.sub(totalCost).sub(totalFees), 18, 6) ?? 0)
      }
    }
    return formatValue
  }, [totalValueLocked, totalCost, totalFees])

  const tvl = useMemo(() => {
    let formatValue = 0
    if (totalValueLocked) {
      let _formatValue = formatBigNumber(totalValueLocked, 18, 2)
      if (_formatValue) {
        formatValue = +_formatValue > 1 ? +_formatValue : +(formatBigNumber(totalValueLocked, 18, 6) ?? 0)
      }
    }
    return formatValue
  }, [totalValueLocked])

  const cardsData = [
    {
      title: 'Open Positions',
      value: numberOfOpenPositions.toString(),
      icon: 'book',
    },
    {
      title: 'Total Locked',
      value: `${numberOfOpenPositions > 0 ? (tvl ? tvl + ' OVL' : 'loading') : 'No open positions'}`,
      icon: 'lock',
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
    {
      title: 'Total Realized PnL',
      value: `${numberOfUnwinds > 0 ? (realizedPnl ? realizedPnl + ' OVL' : 'loading') : 'No unwinds yet'}`,
      icon: +realizedPnl < 0 ? 'down' : 'up',
      valueColor: +realizedPnl < 0 ? '#FF648A' : '#5FD0AB',
    },
    {
      title: 'Unrealized PnL',
      value: `${numberOfOpenPositions > 0 ? (upnl ? upnl + ' OVL' : 'loading') : 'No open positions'}`,
      icon: +upnl < 0 ? 'down' : 'up',
      valueColor: +upnl < 0 ? '#FF648A' : '#5FD0AB',
      isOver1000OpenPositions: numberOfOpenPositions > 1000,
    },
  ]

  return account ? (
    <Container mt={marginTop}>
      <TEXT.BoldStandardBody mb="16px">{`${title}`}</TEXT.BoldStandardBody>
      <Box>
        <Grid container spacing={2}>
          {cardsData.map(card => {
            return (
              <Grid item key={card.title} xs={12} sm={6} md={3}>
                <OverviewCard
                  title={card.title}
                  icon={card.icon}
                  value={card.value}
                  valueColor={card.valueColor ?? '#E5F6FF'}
                  isOver1000OpenPositions={card.isOver1000OpenPositions}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Container>
  ) : (
    <Container mt={marginTop}>
      <TEXT.BoldStandardBody mb="16px">{`${title}`}</TEXT.BoldStandardBody>
      <Box>
        <TEXT.SupplementalHeader fontSize={14}>
          Nothing here yet. Open a position on the{' '}
          <a href="/" style={{color: colors(false).dark.blue2}}>
            Markets
          </a>{' '}
          page to begin.
        </TEXT.SupplementalHeader>
      </Box>
    </Container>
  )
}
