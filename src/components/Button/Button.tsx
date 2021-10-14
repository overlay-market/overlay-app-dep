import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components';
import styled from 'styled-components/macro';

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const BaseButton = styled(RebassButton)<
  {
    padding?: string
    width?: string
    borderRadius?: string
    border?: string
    disabled?: boolean
    active?: boolean
    color?: any
  } & ButtonProps
>`
  padding: ${({ padding }) => (padding ? padding : '16px')};
  width: ${({ width }) => (width ? width : '100%')};
  borderRadius: ${({ borderRadius }) => ( borderRadius ? borderRadius : '8px' )};
  color: ${({ color }) => ( color ? color : '#f2f2f2' )};
  border: ${({ border }) => ( border ? border : '1px solid #f2f2f2' )};
  cursor: pointer;
  text-align: center;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: transform 450ms ease;
`

export const TxnSettingsButton = styled(BaseButton)`
  background: ${({ active, disabled }) => ( active ? '#12B4FF' : disabled ? 'gray' : 'transparent')};
  color: ${({ disabled }) => ( disabled ? '#0B0F1C' : '#71D2FF' )};
  cursor: ${({ disabled }) => ( disabled ? 'none' : 'cursor' )};
`;


export const LightGreyButton = styled(BaseButton)<{ background?: string; border?: string; color?: string }>`
  background: ${({ background }) => background ?? '#BDBDBD'};
  color: ${({ color }) => ( color ? color : 'white' )};
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  border: ${({ border }) => ( border ? border : '1px solid #F2F2F2')};
`

export const TransparentUnderlineButton = styled(BaseButton)<{width?: string}>`
  background: transparent;
  text-decoration: underline;
  color: ${({theme}) => theme.white};
  padding: 0 8px;
  width: ${({width}) => (width ? width : 'auto')};
  font-size: 12px;
`

export const MenuButton = styled(BaseButton)`
  background: transparent;
  display: flex;
  font-size: 12px;
`

// Build Button base
const BuildButton = styled(BaseButton)`
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  color: #F2F2F2;
  padding: 8px;
`

export const TransparentDarkGreyButton = styled(BuildButton)`
  background: #505050;
  opacity: 0.8;
`

export const ActiveBlueButton = styled(BuildButton)`
  background: ${({theme}) => theme.blue3};
`