import {useState, useEffect} from 'react'
import {FlexRow, FlexColumn} from '../Container/Container'
import styled from 'styled-components'

const Container = styled.div<{width: string; margin?: string}>`
  margin: ${({margin}) => (margin ? margin : 'auto')};
  width: ${({width}) => width};
  text-align: center;
`

const ProgressBackground = styled.div<{reverse: boolean}>`
  border-radius: 30px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25), 0 1px rgba(255, 255, 255, 0.08);
  transform: ${({reverse}) => (reverse ? 'rotate(-180deg)' : '')};
`

const Bar = styled.div<{width?: number; color: string}>`
  height: 6px;
  border-radius: 0 30px 30px 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05));
  transition: 1s ease-out;
  transition-property: width, background-color;
  width: ${({width}) => `${width}%`};
  background-color: ${({color}) => color};
  animation: progressAnimation 1s;
`

export const ProgressBar = ({
  value,
  max,
  color,
  width = 'auto',
  margin,
  reverse = false,
}: {
  value: number | undefined
  max: number | undefined | null
  color: string
  width?: string
  margin?: string | undefined
  reverse?: boolean
}) => {
  const [progressValue, setProgressValue] = useState(0)
  const currentPercentage = max && value ? (value / max) * 100 : 0

  useEffect(() => {
    if (progressValue !== currentPercentage) {
      setProgressValue(currentPercentage)
    }
  }, [currentPercentage, progressValue])

  return (
    <Container width={width} margin={margin}>
      <ProgressBackground reverse={reverse}>
        <Bar width={progressValue} color={color} />
      </ProgressBackground>
    </Container>
  )
}

export const DoubleProgressBar = () => {
  return (
    <FlexColumn>
      <FlexRow flexWrap={'wrap'}>
        <ProgressBar
          reverse={true}
          width={'50%'}
          value={50}
          max={100}
          color={'#10DCB1'}
          margin={'0'}
        />
        <ProgressBar
          reverse={false}
          width={'50%'}
          value={50}
          max={100}
          color={'red'}
          margin={'0'}
        />
      </FlexRow>
    </FlexColumn>
  )
}
