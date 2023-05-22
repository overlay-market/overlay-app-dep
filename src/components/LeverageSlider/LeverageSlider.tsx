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

const Value = styled.div`
  font-size: 16px;
  margin-left: auto;
  color: ${({theme}) => theme.dark.white};
`

const StyledLabel = styled(Label)`
  align-items: baseline;
  margin-bottom: 8px !important;
`

type LeverageSliderProps = {
  value: number
  liquidationPrice?: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  min: number
  max: number
  step: number
  margin?: string
}

export const LeverageSlider = ({value, liquidationPrice, onChange, name, min, max, step, margin}: LeverageSliderProps) => {
  const SLIDER_CONSTANTS = {
    backgroundColor: '#F2F2F2',
    sliderColor: '#12B4FF',
  }
  return (
    <SliderContainer margin={margin}>
      <StyledLabel htmlFor={name}>
        <Header>Leverage:</Header>
        <Value>{value}x</Value>
      </StyledLabel>
      <Slider
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        backgroundColor={SLIDER_CONSTANTS.backgroundColor}
        color={SLIDER_CONSTANTS.sliderColor}
      />
    </SliderContainer>
  )
}
