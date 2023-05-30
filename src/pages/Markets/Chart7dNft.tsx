import {useEffect, useMemo, useState} from 'react'
import {LineChart, Line, ResponsiveContainer, YAxis} from 'recharts'
import {MarketChartData} from '../../constants/markets'
import {colors} from '../../theme/theme'
import {currentTimeUnix} from '../../utils/currentTime'

export interface ChartProps {
  marketChartData: MarketChartData
}

const Chart7dNft = ({marketChartData}: ChartProps) => {
  const unixTimestamp = currentTimeUnix()
  const [nftData, setNftData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.stringify({
          query: `
            query($amm: Bytes, $to: BigInt, $interval: Int!) { 
              candles(
                first: 1000,
                orderBy: timestamp,
                orderDirection: asc,
                where: {
                  amm: $amm,
                  interval: $interval,
                  timestamp_lte: $to
                }
              ) {
                amm
                timestamp
                interval
                open
                close 
              }
            }
          `,
          variables: {
            amm: marketChartData.contractAddress,
            to: unixTimestamp,
            interval: 3600,
          },
        })

        const response = await fetch('https://api.thegraph.com/subgraphs/name/nftperp/beta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        })

        const resData = await response.json()
        setNftData(resData.data.candles)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
    // Disabling eslint warning as passing unixTimestamp will cause the useEffect to keep running
    // eslint-disable-next-line
  }, [marketChartData.contractAddress])

  const chartData = useMemo(() => {
    if (nftData && nftData.length) {
      return nftData.map((item: any) => ({close: item.close}))
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
      const firstPrice = parseInt(data[0].close)
      const lastPrice = parseInt(data[data.length - 1].close)
      return firstPrice > lastPrice ? colors(true).dark.red : colors(true).dark.green
    }
    return undefined
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
