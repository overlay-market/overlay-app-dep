import styled from 'styled-components/macro';
import { Button as RebassButton, ButtonProps as ButtonPropsOriginal } from 'rebass/styled-components';

type ButtonProps = Omit<ButtonPropsOriginal, 'css'>

const BaseTemplateButton = styled(RebassButton)<
  {
    padding?: string
    width?: string
    borderRadius?: string
    border?: string
    isDisabled?: boolean
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
  border: ${({ active }) => ( active ? 'none' : '' )};
  color: ${({ isDisabled }) => ( isDisabled ? '#63656D !important' : '')};
  background: ${({ isDisabled }) => ( isDisabled ? '#D0D0D2 !important' : '')};
  height: 48px;
  padding: 16px;
  border-radius: 8px;
`;

export const TriggerActionButton = styled(SelectActionButton)`
  color: ${({ active }) => ( active ? '#0B0F1C' : '#71d2ff' )};
  background: ${({ active }) => ( active ? '#12B4FF' : 'transparent' )};
`;

export const TransactionSettingsButton = styled(BaseTemplateButton)`
  background: ${({ active, isDisabled }) => ( active ? '#12B4FF' : isDisabled ? 'gray' : 'transparent')};
  color: ${({ isDisabled }) => ( isDisabled ? '#0B0F1C' : 'white' )};
  cursor: ${({ isDisabled }) => ( isDisabled ? 'none' : 'cursor' )};
  height: 40px;
`;

export const TransparentButton = styled(BaseTemplateButton)<{ width?: string, underline?: boolean }>`
  width: ${({width}) => (width ? width : 'auto')};
  color: ${({ color }) => ( color ? color : 'white' )};
  padding: 0 8px;
  cursor: pointer;
  font-size: 12px;
  background: transparent;
`;

export const TransparentUnderlineButton = styled(TransparentButton)`
  text-decoration: underline;
  border: none;
`;

export const MenuButton = styled(BaseTemplateButton)`
  background: transparent;
  display: flex;
  font-size: 12px;
`;
