import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {NavLink, useLocation} from 'react-router-dom'
import {bool} from 'prop-types'
import {LanguageMenuItem} from '../More/More'
import {SUPPORTED_LOCALES} from '../../constants/locales'
import {useActiveLocale} from '../../hooks/useActiveLocale'
import {useWindowDimensions} from '../../hooks/useWindowDimensions'
import {Accordion, AccordionSelection} from '../Accordion/Accordion'
import {NETWORK_ICONS, NETWORK_LABELS, PlatformLogo} from '../Header/WalletMenu'
import {useActiveWeb3React} from '../../hooks/web3'
import ExternalLinks from '../Header/ExternalLinks'
import {useState} from 'react'
import {useWalletModalToggle} from '../../state/application/hooks'

const NEW_MOBILE_MENU_FLAG = true

const StyledMenu = styled.nav<{open: boolean; height: number; width: number}>`
  display: flex;
  flex-direction: column;
  background: transparent;
  height: 100vh;
  text-align: left;
  backdrop-filter: blur(${NEW_MOBILE_MENU_FLAG ? '10px' : '40px'});
  width: 100%;
  height: ${({height, open}) => `${height}`}px;
  position: fixed;
  top: 0;
  right: 0;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  opacity: ${({open}) => (open ? 1 : 0)};
  z-index: ${({open}) => (open ? 1 : -1)};
  visibility: ${({open}) => (open ? 'default' : 'hidden')};

  ${({theme}) => theme.mediaWidth.minSmall`
    display: none;
  `};
`

const StyledInternalLink = styled(NavLink)`
  color: ${({theme}) => theme.dark.white};
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  font-weight: 700;
  margin: 12px 0;
  border: none !important;
`

const StyledExternalLink = styled.a.attrs(props => ({
  target: props.target || '_blank',
  rel: props.rel || 'noopener noreferrer',
  href: props.href,
}))`
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  color: white;
  font-weight: 700;
  margin: 16px 0;
`

const Separator = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background: white;
  margin: 16px 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 80%;

  ${NEW_MOBILE_MENU_FLAG &&
  `
    position: absolute;
    background: #1D1E21;
    padding: 24px 24px 24px 32px;
    width: 70%;
    height: 100vh;
    right: 0;
    // padding: 20px 24px 20px 24px;
    // left: -50px;
  `}
`

const NetworkLabelContainer = styled.div`
  display: flex;
`

const NetworkLabel = styled.div`
  display: flex;
  border-radius: 8px;
  background: ${({theme}) => theme.dark.grey4};
  padding: 8px 24px;
  gap: 12px;
`

interface StyledMenuLinkProps {
  displayText: string
  linkDestination: string
  currentLocation: string
}

const StyledMenuLink = ({displayText, linkDestination, currentLocation}: StyledMenuLinkProps) => {
  const active = currentLocation === linkDestination
  const color = active ? '#12B4FF' : '#FFF'
  return <TEXT.Menu color={color}>{displayText}</TEXT.Menu>
}

const SlideMenu = ({open, setOpen, ...props}: {open: boolean; setOpen: Function; props?: any}) => {
  const {account, chainId} = useActiveWeb3React()
  const {height, width} = useWindowDimensions()
  const toggleWalletModal = useWalletModalToggle()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)
  const activeLocale = useActiveLocale()
  const isHidden = open ? true : false
  const tabIndex = isHidden ? 0 : -1

  let location = useLocation().pathname

  return (
    <StyledMenu onClick={() => setOpen(!open)} open={open} aria-hidden={!isHidden} height={height} width={width} {...props}>
      {NEW_MOBILE_MENU_FLAG ? (
        <Content onClick={e => e.stopPropagation()}>
          {account && chainId ? (
            <NetworkLabelContainer>
              <NetworkLabel>
                <PlatformLogo open={false} src={NETWORK_ICONS[chainId]} />
                <TEXT.SmallBody>{NETWORK_LABELS[chainId]}</TEXT.SmallBody>
              </NetworkLabel>
            </NetworkLabelContainer>
          ) : (
            <NetworkLabelContainer>
              <NetworkLabel onClick={toggleWalletModal}>
                <TEXT.SmallBody>Connect Wallet</TEXT.SmallBody>
              </NetworkLabel>
            </NetworkLabelContainer>
          )}
          <StyledInternalLink tabIndex={tabIndex} to={'/markets'}>
            <StyledMenuLink displayText={'Markets'} linkDestination={'/markets'} currentLocation={location} />
          </StyledInternalLink>
          <StyledInternalLink tabIndex={tabIndex} to={'/positions'}>
            <StyledMenuLink displayText={'Positions'} linkDestination={'/positions'} currentLocation={location} />
          </StyledInternalLink>
          <StyledInternalLink tabIndex={tabIndex} to={'/bridge'}>
            <StyledMenuLink displayText={'Bridge'} linkDestination={'/bridge'} currentLocation={location} />
          </StyledInternalLink>

          <Separator />
          <ExternalLinks mobile isSubMenuOpen={isSubMenuOpen} setIsSubMenuOpen={setIsSubMenuOpen} />
        </Content>
      ) : (
        <Content onClick={e => e.stopPropagation()}>
          <StyledInternalLink tabIndex={tabIndex} to={'/markets'}>
            <StyledMenuLink displayText={'Markets'} linkDestination={'/markets'} currentLocation={location} />
          </StyledInternalLink>
          <StyledInternalLink tabIndex={tabIndex} to={'/positions'}>
            <StyledMenuLink displayText={'Positions'} linkDestination={'/positions'} currentLocation={location} />
          </StyledInternalLink>
          <StyledInternalLink tabIndex={tabIndex} to={'/bridge'}>
            <StyledMenuLink displayText={'Bridge'} linkDestination={'/bridge'} currentLocation={location} />
          </StyledInternalLink>
          <Separator />

          <StyledExternalLink href="https://overlay.market">Risks</StyledExternalLink>
          <Accordion activeAccordionText={'Language'} inactiveAccordionText={'Language'}>
            {SUPPORTED_LOCALES.map((locale, key) => (
              <AccordionSelection key={key.toString()}>
                <LanguageMenuItem locale={locale} active={activeLocale === locale} componentKey={key.toString()} />
              </AccordionSelection>
            ))}
          </Accordion>
        </Content>
      )}
    </StyledMenu>
  )
}

SlideMenu.propTypes = {
  open: bool.isRequired,
}

export default SlideMenu
