import { Label, Slider } from "@rebass/forms";
import styled from 'styled-components/macro';

const SliderContainer = styled.div<{margin?: string}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: ${({margin}) => (margin ? margin : '0')};
`;

const Header = styled.div`
  font-size: 16px;
  color: ${({theme}) => theme.text1};
`;

const Value = styled.div`
  font-size: 16px;
  margin-left: auto;
  color: ${({theme}) => theme.text1};
`;

const Subheader = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.text1};
  margin-left: 4px;
`;

const StyledLabel = styled(Label)`
  align-items: baseline;
  margin-bottom: 8px !important;
`;


export const LeverageSlider = ({
  value,
  liquidationPrice,
  onChange,
  name,
  min,
  max,
  step,
  margin
}:{
  value: number
  liquidationPrice?: any
  onChange: React.ChangeEventHandler<HTMLInputElement>
  name: string
  min: number
  max: number
  step: number
  defaultValue?: number
  margin?: string
}) => {
  return (  
    <SliderContainer margin={margin}>
      <StyledLabel htmlFor={name}>
        <Header>
          Leverage:
        </Header>
        <Value>
          {value}x
        </Value>
      </StyledLabel>
      <Slider 
        value={value}
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        defaultValue={1}
        backgroundColor={'#F2F2F2'}
        color={'#12B4FF'}
        />
    </SliderContainer>
  )
};