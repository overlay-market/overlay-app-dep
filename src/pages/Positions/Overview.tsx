import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import OverviewCard from '../../components/Card/OverviewCard'
import {Grid, Box} from '@material-ui/core'
import {PositionDataV2} from '../../state/build/hooks'
import {useTotalValueLocked} from '../../hooks/useTotalValueLocked'
import {useTotalCost} from '../../hooks/useTotalCost'
import {useTotalFees} from '../../hooks/useTotalFees'
import {formatBigNumber} from '../../utils/formatBigNumber'
import {useMemo} from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export interface Props {
  marginTop: string
  openPositions: PositionDataV2[] | undefined
  unwinds: {
    pnl: string
  }[]
}

export const Overview = ({marginTop, openPositions, unwinds}: Props) => {
  const title = 'Overview'

  let tvlArray = []
  if (openPositions) {
    for (let position of openPositions) {
      tvlArray.push({marketAddress: position.market.id, positionId: position.positionId})
    }
  }
  const totalValueLocked = useTotalValueLocked(tvlArray)
  const totalCost = useTotalCost(tvlArray)
  const totalFees = useTotalFees(tvlArray)

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

  const pnl = useMemo(() => {
    let formatValue = '0'
    if (unwinds) {
      let _formatValue = 0
      for (let unwind of unwinds) {
        _formatValue += +unwind.pnl / 10 ** 18
      }
      if (_formatValue) {
        formatValue = _formatValue > 1 ? _formatValue.toFixed(2) : _formatValue.toFixed(6)
      }
    }
    return formatValue
  }, [unwinds])

  const cardsData = [
    {
      title: 'Open Positions',
      value: openPositions?.length.toString() ?? '0',
      icon: 'book',
    },
    {
      title: 'Total Locked',
      value: `${tvlArray.length > 0 ? tvl ? tvl + ' OVL' : 'loading' : 'No open positions'}`,
      icon: 'lock',
    },
    {
      title: 'Total Realized PnL',
      value: `${unwinds ? pnl ? pnl + ' OVL' : 'loading' : 'No unwinds yet'}`,
      icon: +pnl < 0 ? 'down' : 'up',
      valueColor: +pnl < 0 ? '#FF648A' : '#5FD0AB',
    },
    {
      title: 'Unrealized PnL',
      value: `${tvlArray.length > 0 ? upnl ? upnl + ' OVL' : 'loading' : 'No open positions'}`,
      icon: +upnl < 0 ? 'down' : 'up',
      valueColor: +upnl < 0 ? '#FF648A' : '#5FD0AB',
    },
  ]

  return tvlArray.length > 0 && unwinds
  ? (
    <Container>
      <TEXT.BoldStandardBody mt={marginTop} mb="16px">
        {`${title}`}
      </TEXT.BoldStandardBody>
      <Box>
        <Grid container spacing={2}>
          {cardsData.map(card => {
            return (
              <Grid item key={card.title} xs={3}>
                <OverviewCard title={card.title} icon={card.icon} value={card.value} valueColor={card.valueColor ?? '#E5F6FF'} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Container>
  )
  : (
    <Container>
      <TEXT.BoldStandardBody mt={marginTop} mb="16px">
        {`${title}`}
      </TEXT.BoldStandardBody>
      <Box>
      <TEXT.SupplementalHeader fontSize={14}>
      Nothing here yet. Open a position on the <a href="/">Markets</a> page to begin.
      </TEXT.SupplementalHeader>
      </Box>
    </Container>
  )
}
