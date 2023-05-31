import React, {useState, useRef, useEffect} from 'react'
import styled from 'styled-components/macro'
import {Play, LogOut} from 'react-feather'
import {Fade} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {TEXT} from '../../theme/theme'
import {MenuButton} from '../Button/Button'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow} from '../Container/Container'
import {useWalletModalToggle} from '../../state/application/hooks'
import {StyledPaper, StyledMenuList, StyledMenuItem, IconContainer, StyledPopper} from '../More/More'

export const Web3StatusMenuItem = styled(StyledMenuItem)`
  opacity: 1 !important;
`

export const Web3Status = styled(FlexRow)`
  border: 1px solid white;
  border-radius: 20px;
  display: flex;
`

interface ColorStatusProps {
  colorStatus: string
}

export const ColorStatus = styled.div<ColorStatusProps>`
  border-radius: 50px;
  height: 6px;
  width: 6px;
  margin: auto 7px auto 3px;
  background: ${props => props.colorStatus};
`

export const TriangleButton = styled(Button)`
  padding: 0 !important;
  width: auto;
  min-width: 0 !important;
  padding-top: 2px !important;
  height: 36px;
`

interface RotatingTriangleProps {
  open: boolean
}

export const RotatingTriangle = styled(Play)<RotatingTriangleProps>`
  transform: ${props => (props.open ? 'rotate(270deg)' : 'rotate(90deg)')};
  transition: transform ease-out 0.25s;
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
)

interface DropdownProps {
  connectedNetwork: String
  colorStatus: string
}

export default function Dropdown({connectedNetwork, colorStatus}: DropdownProps) {
  const {deactivate, account} = useActiveWeb3React()

  const toggleWalletModal = useWalletModalToggle()

  const disconnectWallet = () => {
    deactivate()
    localStorage.setItem('disconnected', "true");
    window.location.reload()
  }

  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div className={classes.root}>
      <div>
        <TriangleButton ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
          <RotatingTriangle color={'white'} fill={'white'} height={8} width={20} open={open} />
        </TriangleButton>
        <StyledPopper open={open} anchorEl={anchorRef.current} placement={'bottom-end'} role={undefined} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Fade {...TransitionProps} timeout={200}>
              <StyledPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <StyledMenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <Web3StatusMenuItem disabled>
                      <Web3Status m={'4px 16px 4px 8px'} p={'8px 16px 8px 11px'} width={'auto'} color={'white'} fontSize={14}>
                        <ColorStatus colorStatus={colorStatus} />
                        <TEXT.Menu>{connectedNetwork}</TEXT.Menu>
                      </Web3Status>
                    </Web3StatusMenuItem>

                    {account ? (
                      <StyledMenuItem>
                        <MenuButton padding={'8px 16px 8px 12px'} onClick={toggleWalletModal} border={'none'}>
                          <TEXT.Menu m={'auto'} fontSize={14}>
                            Change wallet
                          </TEXT.Menu>
                        </MenuButton>
                      </StyledMenuItem>
                    ) : null}

                    <StyledMenuItem>
                      <MenuButton padding={'8px 16px 8px 12px'} onClick={disconnectWallet} border={'none'}>
                        <IconContainer m={'auto 3px'}>
                          <LogOut size={13} />
                        </IconContainer>
                        <TEXT.Menu m={'auto'} fontSize={14}>
                          Disconnect wallet
                        </TEXT.Menu>
                      </MenuButton>
                    </StyledMenuItem>
                  </StyledMenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Fade>
          )}
        </StyledPopper>
      </div>
    </div>
  )
}
