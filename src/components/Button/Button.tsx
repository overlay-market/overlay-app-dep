import styled from 'styled-components/macro';
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components';

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const BaseTemplateButton = styled(RebassButton)<
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
  width: ${({ width }) => (width ? width : '100%')};
  color: ${({ color }) => ( color ? color : '#f2f2f2' )};
  padding: ${({ padding }) => (padding ? padding : '16px')};
  border: ${({ border }) => ( border ? border : '1px solid #f2f2f2' )};
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  transition: transform 450ms ease;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
  "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
  sans-serif;
`

export const SelectActionButton = styled(BaseTemplateButton)`
  color: ${({ disabled }) => ( disabled ? '#63656D' : '')};
  cursor: ${({ disabled }) => ( disabled ? 'none' : 'cursor' )};
  background: ${({ disabled }) => ( disabled ? '#D0D0D2' : '')};
  height: 48px;
  padding: 16px;
  border-radius: 8px;
`;

export const TriggerActionButton = styled(SelectActionButton)`
  color: ${({ active }) => ( active ? '#0B0F1C' : '#71d2ff' )};
  background: ${({ active }) => ( active ? '#12B4FF' : 'transparent' )};
`;

export const TxnSettingsButton = styled(BaseTemplateButton)`
  background: ${({ active, disabled }) => ( active ? '#12B4FF' : disabled ? 'gray' : 'transparent')};
  color: ${({ disabled }) => ( disabled ? '#0B0F1C' : 'white' )};
  cursor: ${({ disabled }) => ( disabled ? 'none' : 'cursor' )};
  height: 40px;
`;

export const TransparentButton = styled(BaseTemplateButton)<{ width?: string, underline?: boolean }>`
  background: transparent;
  color: ${({ color }) => ( color ? color : 'white' )};
  padding: 0 8px;
  width: ${({width}) => (width ? width : 'auto')};
  font-size: 12px;
  cursor: pointer;
`

export const TransparentUnderlineButton = styled(TransparentButton)`
  text-decoration: underline;
`

export const MenuButton = styled(BaseTemplateButton)`
  background: transparent;
  display: flex;
  font-size: 12px;
`

// Build Button base
const BuildButton = styled(BaseTemplateButton)`
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
