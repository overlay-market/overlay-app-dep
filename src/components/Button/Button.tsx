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
  cursor: pointer;
`

export const LightGreyButton = styled(BaseButton)<{ background?: string }>`
  background: ${({background}) => background ?? '#BDBDBD'};
  color: ${({theme}) => theme.text3};
  font-size: 14px;
`

export const TransparentUnderlineButton = styled(BaseButton)`
  background: transparent;
  text-decoration: underline;
  color: ${({theme}) => theme.white};
  padding: 0 8px;
  width: auto;
  font-size: 12px;
`

// Build Button base
const BuildButton = styled(BaseButton)`
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #F2F2F2;
  padding: 8px;
  width: 120px;
`

export const TransparentDarkGreyButton = styled(BuildButton)`
  background: #505050;
  opacity: 0.8;
`

export const ActiveBlueButton = styled(BuildButton)`
  background: ${({theme}) => theme.blue3};
`