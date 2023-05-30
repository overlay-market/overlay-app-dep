import {useEffect, useMemo, useState} from 'react'
import {LineChart, Line, ResponsiveContainer, YAxis} from 'recharts'
import {MarketChartData} from '../../constants/markets'
import {colors} from '../../theme/theme'

export interface ChartProps {
  marketChartData: MarketChartData
}

const Chart7dCoin = ({marketChartData}: ChartProps) => {
  const [coinData, setCoinData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.stringify({
          query: `
            query PriceHistoryQuery($schemaName: String!, $contractAddress: String!) {
              priceHistoryWithTimestamp(
                schemaName: $schemaName
                contractAddress: $contractAddress
              ) {
                nodes {
                  id
                  latestAnswer
                  blockNumber
                  blockTimestamp
                }
              }
            }
          `,
          variables: {
            contractAddress: marketChartData.contractAddress,
            schemaName: marketChartData.schemaName,
          },
        })

        const response = await fetch('https://atlas-postgraphile.public.main.prod.cldev.sh/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        })

        const resData = await response.json()
        setCoinData(resData.data.priceHistoryWithTimestamp.nodes)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [marketChartData.contractAddress, marketChartData.schemaName])

  const chartData = useMemo(() => {
    if (coinData.length) {
      return [...coinData].reverse().map((item: any) => ({latestAnswer: item.latestAnswer}))
    }
  }, [coinData])

  const yDomain = useMemo(() => {
    if (chartData && chartData.length) {
      const prices = chartData.map((item: any) => item.latestAnswer)
      const minValue = Math.min(...prices)
      const maxValue = Math.max(...prices)
      return [minValue, maxValue]
    }
    return undefined
  }, [chartData])

  const getStrokeColor = (data: any) => {
    if (data && data.length > 1) {
      const firstPrice = parseInt(data[0].latestAnswer)
      const lastPrice = parseInt(data[data.length - 1].latestAnswer)
      return firstPrice > lastPrice ? colors(true).dark.red : colors(true).dark.green
    }
    return undefined
  }

  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={chartData}>
        <YAxis domain={yDomain} hide />
        <Line type="monotone" dataKey={'latestAnswer'} stroke={getStrokeColor(chartData)} strokeWidth={1} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart7dCoin
