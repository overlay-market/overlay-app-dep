import {useMemo} from 'react'
import {LineChart, Line, ResponsiveContainer, YAxis} from 'recharts'
import {MarketChartData} from '../../constants/markets'
import {useNfts7dQueryQuery} from '../../state/data/enhanced'
import {colors} from '../../theme/theme'
import {currentTimeUnix} from '../../utils/currentTime'

export interface ChartProps {
  marketChartData: MarketChartData
}

const Chart7dNft = ({marketChartData}: ChartProps) => {
  const {data: nftData} = useNfts7dQueryQuery({amm: marketChartData.contractAddress, to: 1685345483, interval: 3600})

  const chartData = useMemo(() => {
    if (nftData && nftData.candles.length) {
      console.log('nft data: ', nftData.candles)
      return nftData.candles.map((item: any) => ({close: item.close}))
    }
  }, [nftData])

  const yDomain = useMemo(() => {
    if (chartData && chartData.length) {
      const prices = chartData.map((item: any) => item.close)
      const minValue = Math.min(...prices)
      const maxValue = Math.max(...prices)
      return [minValue, maxValue]
    }
    return undefined
  }, [chartData])

  const getStrokeColor = (data: any) => {
    if (data && data.length) {
      const firstPrice = data[0].close
      const lastPrice = data[data.length - 1].close
      return firstPrice > lastPrice ? colors(true).dark.red : colors(true).dark.green
    }
    return '#FFFFFF'
  }

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <YAxis domain={yDomain} hide />
        <Line type="monotone" dataKey={'close'} stroke={getStrokeColor(chartData)} strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart7dNft
