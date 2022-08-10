import {useState, useEffect} from 'react'
import styled from 'styled-components'

const Container = styled.div<{width: string; margin?: string}>`
  margin: ${({margin}) => (margin ? margin : 'auto')};
  width: ${({width}) => width};
  text-align: center;
`

const ProgressBackground = styled.div`
  border-radius: 30px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
`

const Bar = styled.div<{width?: number; color: string}>`
  height: 8px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
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
}: {
  value: number | undefined
  max: number | undefined | null
  color: string
  width?: string
  margin?: string | undefined
}) => {
  const [progressValue, setProgressValue] = useState(0)

  let currentPercentage = max && value ? (value / max) * 100 : 0

  useEffect(() => {
    if (progressValue !== currentPercentage) {
      setProgressValue(currentPercentage)
    }
  }, [currentPercentage, progressValue])

  return (
    <Container width={width} margin={margin}>
      <ProgressBackground>
        <Bar width={progressValue} color={color} />
      </ProgressBackground>
    </Container>
  )
}
