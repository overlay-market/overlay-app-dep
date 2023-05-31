import styled from 'styled-components/macro'
import {Label, Slider} from '@rebass/forms'

const SliderContainer = styled.div<{margin?: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${({margin}) => (margin ? margin : '0')};
`

const Header = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.dark.white};
`

const StyledLabel = styled(Label)<{justifyContent?: string}>`
  align-items: baseline;
  margin-bottom: 8px !important;
  justify-content: ${({justifyContent}) => (justifyContent ? justifyContent : 'start')};
`

type PercentageSliderProps = {
  value: number
  liquidationPrice?: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  min: number
  max: number
  step: number
  margin?: string
  justifyContent?: string
  children?: React.ReactNode
  showTilde?: boolean
}

export const PercentageSlider = ({
  value,
  liquidationPrice,
  onChange,
  name,
  min,
  max,
  step,
  margin,
  justifyContent,
  children,
  showTilde,
}: PercentageSliderProps) => {
  const SLIDER_INPUT = {
    backgroundColor: '#F2F2F2',
    sliderDotColor: '#12B4FF',
  }
  return (
    <SliderContainer margin={margin}>
      <StyledLabel justifyContent={justifyContent} htmlFor={name}>
        <Header>{`${showTilde ? '~' : ''}${value}%`}</Header>
        {children}
      </StyledLabel>
      <Slider
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        backgroundColor={SLIDER_INPUT.backgroundColor}
        color={SLIDER_INPUT.sliderDotColor}
      />
    </SliderContainer>
  )
}
