import {useState, useEffect} from 'react'
import {Link, NavLink, useLocation} from 'react-router-dom'
import styled from 'styled-components/macro'
import {IconButton} from '@material-ui/core'
import {Trans} from '@lingui/macro'
import {Image} from 'rebass'
import {useDarkModeManager} from '../../state/user/hooks'
import {FlexRow} from '../Container/Container'
import {enableLock, disableLock} from '../../utils/scrollLock'
import {TEXT, colors} from '../../theme/theme'
import More from '../More/More'
import Burger from '../Hamburger/Hamburger'
import SlideMenu from '../SlideMenu/SlideMenu'
import Web3Status from '../Web3Status/Web3Status'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'
import {ChevronDown} from 'react-feather'
import WalletMenu from './WalletMenu'

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

const PowerCardLink = styled(StyledLink)`
  background: linear-gradient(89.2deg, #d5b4ff -1.18%, #ffa2b9 26.07%, #ff648a 47.56%, #ffcc8f 64.85%, #d5b4ff 99.44%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const Dropdown = styled.div<{active: boolean}>`
  display: none;
  flex-direction: column;
  position: relative;
  text-decoration: none;
  margin: auto 16px;
  padding: 8px 0 8px 8px;
  cursor: pointer;
  background: ${({theme}) => theme.dark.grey4};
  color: ${({theme, active}) => (active ? theme.dark.blue2 : theme.dark.purple2)};
  border-radius: 8px;
  width: 59px;
  transition: width 0.2 ease-in-out;

  .dropdown-list {
    padding: 0;
    border-radius: 8px;
    width: 59px;
    height: 0px;

    a {
      display: none;
    }
  }

  .chevron {
    transform: rotate(0deg);
  }

  &:hover {
    border-radius: 8px 8px 0 0;
    width: 110px;

    .chevron {
      transform: rotate(180deg);
    }

    .dropdown-list {
      padding: 8px 0px 16px 8px;
      border-radius: 0 0 8px 8px;
      width: 110px;
      height: 83px;

      a {
        display: flex;
      }
    }
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    display: flex;
  `};
`

const DropdownContent = styled.div`
  display: flex;
  gap: 4px;
`

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({theme}) => theme.dark.grey4};
  overflow: hidden;
  transition: width 0.2 ease-in-out;
`

const DropdownItem = styled(StyledLink)`
  margin: 0;
`

const RotatingChevron = styled(ChevronDown)`
  transition: transform ease-out 0.25s;
`

export const UnstyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
`

const BuyOVLButtonContainer = styled.div`
  display: flex;
  margin-right: 40px;
  align-items: center;
`
const SoonTag = styled.div`
  padding: 4px 8px;
  background: ${({theme}) => theme.dark.grey3};
  border-radius: 8px;
`

export default function Header() {
  const [darkMode] = useDarkModeManager()
  const [open, setOpen] = useState<boolean>(false)

  const menuId = 'main-menu'

  const NEW_HEADER_FLAG = true
  const HIDE_POWER_CARDS = true
  const HIDE_BUY_OVL = true
  const HIDE_EARN_DROPDOWN_FLAG = true

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

      {HIDE_POWER_CARDS ? null : (
        <PowerCardLink to={'/powercards'}>
          <Trans>
            <TEXT.Menu>Power Cards</TEXT.Menu>
          </Trans>
        </PowerCardLink>
      )}

      {HIDE_EARN_DROPDOWN_FLAG ? (
        <>
          <StyledLink to={'/leaderboard'}>
            <Trans>
              <TEXT.Menu>Leaderboard</TEXT.Menu>
            </Trans>
          </StyledLink>
        </>
      ) : (
        <Dropdown active={location === '/stake' || location === '/leaderboard' || location === '/referrals'}>
          <DropdownContent>
            <TEXT.Menu>Earn</TEXT.Menu>
            <RotatingChevron className="chevron" height={17} width={17} />
          </DropdownContent>

          <DropdownList className="dropdown-list">
            <DropdownItem to={'/stake'}>
              <Trans>
                <TEXT.Menu>Stake</TEXT.Menu>
              </Trans>
            </DropdownItem>
            <DropdownItem to={'/leaderboard'}>
              <Trans>
                <TEXT.Menu>Leaderboard</TEXT.Menu>
              </Trans>
            </DropdownItem>
            <DropdownItem to={'/referrals'}>
              <Trans>
                <TEXT.Menu>Referrals</TEXT.Menu>
              </Trans>
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      )}

      {/* <StyledLink to={'/bridge'}>
        <Trans>
          <TEXT.Menu>Earn</TEXT.Menu>
        </Trans>
      </StyledLink> */}

      {/* <StyledLink to={'/claimpage'}>
        <Trans>
          <TEXT.Menu>Claim</TEXT.Menu>
        </Trans>
      </StyledLink> */}
      <AccountContainer>
        {HIDE_BUY_OVL ? null : (
          <UnstyledLink to={'/'}>
            <BuyOVLButtonContainer>
              <TEXT.Menu color={colors(false).dark.tan2} marginRight="8px">
                Buy OVL
              </TEXT.Menu>
              <SoonTag>
                <TEXT.Supplemental>Soon!</TEXT.Supplemental>
              </SoonTag>
            </BuyOVLButtonContainer>
          </UnstyledLink>
        )}
        <Web3Status />
        {NEW_HEADER_FLAG ? <WalletMenu /> : <More />}
        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
      </AccountContainer>
      <SlideMenu open={open} setOpen={setOpen} />
    </HeaderContainer>
  )
}
