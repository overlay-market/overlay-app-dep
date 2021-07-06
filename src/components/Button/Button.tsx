import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components';
import styled from 'styled-components/macro';

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const BaseButton = styled(RebassButton)<
  {
    padding?: string
    width?: string
  } & ButtonProps
>`
  padding: ${({ padding }) => (padding ? padding : '16px')};
  width: ${({ width }) => (width ? width : '100%')};
`

export const MarketButton = styled(BaseButton)`

`