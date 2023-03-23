import React, {useState} from 'react'
import styled from 'styled-components/macro'
import CloseIcon from '@material-ui/icons/Close'
import {Alert, AlertTitle} from '@material-ui/lab'
import {IconButton, Snackbar} from '@material-ui/core'

export enum PopupType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

const StyledAlert = styled(Alert)``

const Message = styled.div`
  font-size: 12px;
`

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 888;
`

const StyledIconButton = styled(IconButton)`
  margin-bottom: auto !important;
  margin-top: 5px !important;
  margin-right: 0px !important;
`

interface SnackbarAlertProps {
  message?: any
  severity: any
  title?: any
  children?: React.ReactNode
  onClick?: () => void
  autoHideDuration?: number | null
}

export const SnackbarAlert: React.FC<SnackbarAlertProps> = ({message, severity, title, children, onClick, autoHideDuration}) => {
  const [open, setOpen] = useState(true)

  return (
    <StyledSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      autoHideDuration={autoHideDuration ? autoHideDuration : 5000}
      open={open}
    >
      <StyledAlert
        severity={severity}
        action={
          <StyledIconButton aria-label="close" color="inherit" size="small" onClick={onClick}>
            <CloseIcon fontSize="inherit" />
          </StyledIconButton>
        }
      >
        <AlertTitle> {title} </AlertTitle>
        <Message> {message} </Message>
        {children}
      </StyledAlert>
    </StyledSnackbar>
  )
}
