import {useState, useEffect} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import styled from 'styled-components/macro'
import {IconButton} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {Image} from 'rebass'
import {useDarkModeManager} from '../../state/user/hooks'
import {FlexRow} from '../Container/Container'
import {enableLock, disableLock} from '../../utils/scrollLock'
import {TEXT} from '../../theme/theme'
import More from '../More/More'
import Burger from '../Hamburger/Hamburger'
import SlideMenu from '../SlideMenu/SlideMenu'
import Web3Status from '../Web3Status/Web3Status'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'

export const HeaderContainer = styled.div`
  color: ${({theme}) => theme.dark.white};
  display: flex;
  flex-direction: row;
  width: auto;
  max-width: 1200px;
  margin: auto;
  padding: 24px 16px 24px;
  position: sticky;
  z-index: 420;

  ${({theme}) => theme.mediaWidth.minSmall`
    width: auto;
    padding: 24px 16px;
  `};
`

export const LogoContainer = styled.div`
  height: 30px;
  width: 30px;
  margin: auto 16px auto 0px;
  cursor: pointer;
`

export const AccountContainer = styled(FlexRow)`
  width: auto;
  margin-left: auto;
`

const activeClassName = 'ACTIVE'

export const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${({theme}) => theme.dark.white};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  margin: auto 16px;
  display: none;

  &.${activeClassName} {
    color: ${({theme}) => theme.dark.blue2};
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    display: flex;
  `};
`

export default function Header() {
  const [darkMode] = useDarkModeManager()
  const [open, setOpen] = useState(false)
  const menuId = 'main-menu'

  let location = useLocation().pathname

  // close menu when at new route
  useEffect(() => {
    if (open) {
      setOpen(open => false)
    }

    // Disabling eslint warning as passing open as a dependency will prevent the menu from opening
    // eslint-disable-next-line
  }, [location])

  // disable scroll when mobile menu open
  useEffect(() => {
    if (open) {
      enableLock()
    } else {
      disableLock()
    }
  }, [open])

  return (
    <HeaderContainer>
      <LogoContainer>
        <IconButton href="/" style={{padding: 0}}>
          {darkMode ? (
            <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo Light'} height={'100%'} width={'100%'} minHeight={'30px'} minWidth={'30px'} />
          ) : (
            <Image src={OverlayLogoOnlyDark} alt={'Overlay Logo'} height={'100%'} width={'100%'} minHeight={'30px'} minWidth={'30px'} />
          )}
        </IconButton>
      </LogoContainer>
      <StyledLink to={'/markets'}>
        <Trans>
          <TEXT.Menu>Markets</TEXT.Menu>
        </Trans>
      </StyledLink>
      <StyledLink to={'/positions'}>
        <Trans>
          <TEXT.Menu>Positions</TEXT.Menu>
        </Trans>
      </StyledLink>
      <StyledLink to={'/bridge'}>
        <Trans>
          <TEXT.Menu>Bridge</TEXT.Menu>
        </Trans>
      </StyledLink>
      {/* <StyledLink to={'/claimpage'}>
        <Trans>
          <TEXT.Menu>Claim</TEXT.Menu>
        </Trans>
      </StyledLink> */}
      <AccountContainer>
        <Web3Status />
        <More />
        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
      </AccountContainer>
      <SlideMenu open={open} setOpen={setOpen} />
    </HeaderContainer>
  )
}
