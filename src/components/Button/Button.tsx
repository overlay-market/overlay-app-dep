import styled from 'styled-components/macro'
import {Button as RebassButton, ButtonProps as ButtonPropsOriginal} from 'rebass/styled-components'

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
  width: ${({width}) => (width ? width : '100%')};
  color: ${({color}) => (color ? color : '#f2f2f2')};
  padding: ${({padding}) => (padding ? padding : '16px')};
  border: ${({border}) => border ?? border};
  outline: none;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
  transition: transform 450ms ease;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
`

// border: ${({ active }) => ( active ? 'none !important' : '' )};
export const SelectActionButton = styled(BaseTemplateButton)`
  color: ${({isDisabled}) => (isDisabled ? '#63656D !important' : '')};
  background: ${({isDisabled}) => (isDisabled ? '#D0D0D2 !important' : '')};
  height: auto;
  padding: 16px;
  border-radius: 8px;
`

export const TriggerActionButton = styled(SelectActionButton)`
  color: ${({theme, active}) => (active ? theme.white : '#71d2ff')};
  background: ${({active}) => (active ? '#12B4FF' : 'transparent')};
  border: 1px solid transparent;

  :hover {
    border: 1px solid ${({isDisabled}) => (isDisabled ? '#FF648A' : '#71d2ff')};
    box-shadow: ${({isDisabled}) => (isDisabled ? '0 0px 7px #FF648A' : '0 0px 5px')};
  }
`

export const PendingActionButton = styled(SelectActionButton)`
  color: #0b0f1c;
  border: none;
  background: linear-gradient(91.32deg, #10dcb1 0%, #33e0eb 26.86%, #12b4ff 52.65%, #5295f9 77.89%, #9874ff 102.61%);
`

export const ApproveTransactionButton = ({
  attemptingTransaction,
  onClick,
}: {
  attemptingTransaction: boolean
  onClick: () => void
}) => (
  <>
    {attemptingTransaction ? (
      <PendingActionButton>Pending Confirmation...</PendingActionButton>
    ) : (
      <PendingActionButton onClick={onClick}>Approve</PendingActionButton>
    )}
  </>
)

export const TransactionSettingsButton = styled(BaseTemplateButton)`
  background: ${({active, isDisabled}) => (active ? '#12B4FF' : isDisabled ? 'gray' : 'transparent')};
  color: ${({isDisabled}) => (isDisabled ? '#0B0F1C' : 'white')};
  cursor: ${({isDisabled}) => (isDisabled ? 'none' : 'cursor')};
  height: 40px;
`

export const TransparentButton = styled(BaseTemplateButton)<{width?: string; underline?: boolean}>`
  width: ${({width}) => (width ? width : 'auto')};
  color: ${({color}) => (color ? color : 'white')};
  padding: 0 8px;
  cursor: pointer;
  font-size: 12px;
  background: transparent;
`

export const TransparentUnderlineButton = styled(TransparentButton)`
  text-decoration: underline;
  border: none;
`

export const MenuButton = styled(BaseTemplateButton)`
  background: transparent;
  display: flex;
  font-size: 12px;
`

// @TO-DO: Refactor Green/Red Buttons from TermsOfServiceModal
export const SolidColorButton = styled(BaseTemplateButton)``
