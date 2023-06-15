import {useState, useEffect, useCallback} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
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
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import {ChevronDown, ChevronLeft, ChevronRight, Settings, X} from 'react-feather'
import HeaderHamburger from '../HeaderHamburger/HeaderHamburger'
import {LINKS} from '../../constants/links'
import Modal from '../Modal/Modal'
import {MINIMUM_SLIPPAGE_VALUE, NumericalInputContainer, NumericalInputDescriptor} from '../../pages/Markets/Build'
import {NumericalInput} from '../NumericalInput/NumericalInput'
import {useBuildActionHandlers, useBuildState} from '../../state/build/hooks'
import {DefaultTxnSettings} from '../../state/build/actions'

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
  transition: width 0.3s ease-in-out, border-radius 0.3s ease-in-out;

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
  transition: width 0.3s ease-in-out, height 0.2s ease-in-out, border-radius 0.3s ease-in-out;
`

const DropdownItem = styled(StyledLink)`
  margin: 0;
`

const RotatingChevron = styled(ChevronDown)`
  transition: transform ease-out 0.25s;
`

const PlatformLogo = styled.div<{src: string; open?: boolean}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 17px;
  width: 17px;
  opacity: ${({open}) => (open ? '0' : '1')};
  transition: all 0.2s linear;
`

const RelativeContainer = styled.div`
  position: relative;
`

const WalletMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.dark.grey4};
  position: relative;
  z-index: 100;
`

const MenuContent = styled.div<{open?: boolean}>`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 8px;
  background: ${({theme}) => theme.dark.grey4};
  overflow: hidden;
  transition: all 0.2s linear;
  padding-bottom: 16px;

  width: ${({open}) => (open ? '240px' : '0px')};
  max-height: ${({open}) => (open ? '500px' : '0px')};
  opacity: ${({open}) => (open ? '1' : '0')};
`

const MenuTitle = styled.div<{open?: boolean}>`
  opacity: ${({open}) => (open ? '1' : '0')};
  cursor: ${({open}) => (open ? 'pointer' : 'default')};
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 8px 16px 8px;
  display: flex;
  align-items: center;
`

const MenuItem = styled.div<{background?: string}>`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({background}) => background};
  // &:hover {
  //   background: ${({theme}) => theme.dark.grey3};
  // }
`

const SlippageItem = styled.div`
  display: flex;
  padding: 8px 16px;
`
const SlippageContainer = styled.div`
  cursor: pointer;
  display: flex;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  align-items: center;
  background: ${({theme}) => theme.dark.grey3};
`
const SubMenuContainer = styled.div`
  & > div {
    padding-left: 42px;
  }
`

const MenuLink = ({background, link, children}: {background?: string; link?: string; children: any}) => {
  return (
    <MenuItem onClick={() => (link ? window.open(link, '_blank') : null)} background={background}>
      {children}
    </MenuItem>
  )
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  flex: 1;
  position: relative;
  gap: 4px;
  background: ${({theme}) => theme.dark.background};
`

const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const StyledNumericalInputContainer = styled(NumericalInputContainer)`
  border: 0;
  background: #10131d;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
`

export default function Header() {
  const [darkMode] = useDarkModeManager()
  const [open, setOpen] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState<boolean>(false)
  const {setSlippageValue} = useBuildState()
  const {onSetSlippage} = useBuildActionHandlers()

  const handleResetTxnSettings = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE)
    },
    [onSetSlippage],
  )

  const menuId = 'main-menu'

  const NEW_HEADER_FLAG = true

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

      <PowerCardLink to={'/powercards'}>
        <Trans>
          <TEXT.Menu>Power Cards</TEXT.Menu>
        </Trans>
      </PowerCardLink>

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
        <TEXT.Menu color={colors(false).dark.tan2} marginRight={40}>
          Buy OVL
        </TEXT.Menu>
        <Web3Status />
        {NEW_HEADER_FLAG ? (
          <RelativeContainer>
            <WalletMenu>
              <PlatformLogo open={isMenuOpen} src={ArbitrumLogo} />
              {/* <TEXT.Menu>Earn</TEXT.Menu> */}
              <HeaderHamburger open={isMenuOpen} setOpen={setIsMenuOpen} />
            </WalletMenu>
            <MenuContent open={isMenuOpen}>
              <MenuTitle open={isSubMenuOpen} onClick={() => (isSubMenuOpen ? setIsSubMenuOpen(false) : null)}>
                <ChevronLeft size={16} />
                <TEXT.SmallBody>Menu</TEXT.SmallBody>
              </MenuTitle>
              {isSubMenuOpen ? (
                <>
                  <MenuItem background={colors(false).dark.grey3}>
                    <TEXT.SmallBody>Community</TEXT.SmallBody>
                  </MenuItem>
                  <SubMenuContainer>
                    <MenuLink link={LINKS.DISCORD}>
                      <TEXT.SmallBody>Discord</TEXT.SmallBody>
                    </MenuLink>
                    <MenuLink link={LINKS.TWITTER}>
                      <TEXT.SmallBody>Twitter</TEXT.SmallBody>
                    </MenuLink>
                    <MenuLink link={LINKS.TELEGRAM}>
                      <TEXT.SmallBody>Telegram</TEXT.SmallBody>
                    </MenuLink>
                    <MenuLink link={LINKS.MIRROR}>
                      <TEXT.SmallBody>Mirror</TEXT.SmallBody>
                    </MenuLink>
                  </SubMenuContainer>
                </>
              ) : (
                <>
                  <MenuLink link={LINKS.ARBISCAN} background={colors(false).dark.grey3}>
                    <FlexRow style={{gap: '8px'}}>
                      <PlatformLogo open={false} src={ArbitrumLogo} />
                      <TEXT.SmallBody>Arbitrum One</TEXT.SmallBody>
                    </FlexRow>
                  </MenuLink>
                  <MenuLink link={LINKS.RISKS}>
                    <TEXT.SmallBody>Risks of Overlay</TEXT.SmallBody>
                  </MenuLink>
                  <MenuLink>
                    <FlexRow justify="space-between" onClick={() => setIsSubMenuOpen(true)}>
                      <TEXT.SmallBody>Community</TEXT.SmallBody>
                      <ChevronRight size={16} />
                    </FlexRow>
                  </MenuLink>
                  <MenuLink link={LINKS.GOVERNANCE}>
                    <TEXT.SmallBody>Governance</TEXT.SmallBody>
                  </MenuLink>
                  <MenuLink>
                    <TEXT.SmallBody color={colors(false).dark.tan2}>Add OVL to Wallet</TEXT.SmallBody>
                  </MenuLink>

                  <SlippageItem onClick={() => setIsSlippageModalOpen(true)}>
                    <SlippageContainer>
                      <Settings size={16} />
                      <TEXT.SmallBody>Slippage</TEXT.SmallBody>

                      <TEXT.SmallBody marginLeft="8px">{setSlippageValue}%</TEXT.SmallBody>
                    </SlippageContainer>
                  </SlippageItem>
                </>
              )}
            </MenuContent>
          </RelativeContainer>
        ) : (
          <More />
        )}

        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
      </AccountContainer>
      <SlideMenu open={open} setOpen={setOpen} />

      <Modal
        boxShadow={`0px 0px 12px 6px rgba(91, 96, 164, 0.25)`}
        borderColor={`${colors(false).dark.blue2}80`}
        isOpen={isSlippageModalOpen}
        onDismiss={() => setIsSlippageModalOpen(false)}
      >
        <ModalContainer>
          <CloseIcon onClick={() => setIsSlippageModalOpen(false)}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
          <TEXT.BoldHeader1>Slippage</TEXT.BoldHeader1>

          <FlexRow justify="space-between" marginTop="40px">
            <FlexRow style={{gap: 8}}>
              <Settings size={16} color={colors(false).dark.white} />
              <TEXT.StandardBody>Slippage</TEXT.StandardBody>
            </FlexRow>

            <FlexRow style={{gap: 8}} justify="flex-end">
              <TEXT.StandardBody
                onClick={handleResetTxnSettings}
                color={colors(false).dark.grey1}
                style={{textDecoration: 'underline', cursor: 'pointer'}}
              >
                Auto
              </TEXT.StandardBody>
              <StyledNumericalInputContainer width={'100px'} height={'40px'}>
                <NumericalInput value={setSlippageValue} onUserInput={onSetSlippage} align={'right'} />
                <NumericalInputDescriptor> % </NumericalInputDescriptor>
              </StyledNumericalInputContainer>
            </FlexRow>
          </FlexRow>
          {Number(setSlippageValue) > 5 && (
            <FlexRow>
              <TEXT.Supplemental color={colors(false).dark.red}>
                Caution: High slippage. Your position may result in an unfavorable trade.
              </TEXT.Supplemental>
            </FlexRow>
          )}
          {Number(setSlippageValue) < MINIMUM_SLIPPAGE_VALUE && (
            <FlexRow>
              <TEXT.Supplemental color={colors(false).dark.red}>
                Caution: Slippage too low. Slippage should be set to protocol minimum of 0.05%.
              </TEXT.Supplemental>
            </FlexRow>
          )}
        </ModalContainer>
      </Modal>
    </HeaderContainer>
  )
}
