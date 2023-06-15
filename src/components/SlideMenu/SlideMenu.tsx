import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {NavLink, useLocation} from 'react-router-dom'
import {bool} from 'prop-types'
import {LanguageMenuItem} from '../More/More'
import {SUPPORTED_LOCALES} from '../../constants/locales'
import {useActiveLocale} from '../../hooks/useActiveLocale'
import {useWindowDimensions} from '../../hooks/useWindowDimensions'
import {Accordion, AccordionSelection} from '../Accordion/Accordion'

const StyledMenu = styled.nav<{open: boolean; height: number; width: number}>`
  display: flex;
  flex-direction: column;
  background: transparent;
  height: 100vh;
  text-align: left;
  backdrop-filter: blur(40px);
  width: 100%;
  height: ${({height, open}) => `${height}`}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  opacity: ${({open}) => (open ? 1 : 0)};
  z-index: ${({open}) => (open ? 1 : -1)};
  visibility: ${({open}) => (open ? 'default' : 'hidden')};
`

const StyledInternalLink = styled(NavLink)`
  color: ${({theme}) => theme.dark.white};
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  font-weight: 700;
  margin: 16px 0;
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
  const {height, width} = useWindowDimensions()
  const activeLocale = useActiveLocale()
  const isHidden = open ? true : false
  const tabIndex = isHidden ? 0 : -1

  let location = useLocation().pathname

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} height={height} width={width} {...props}>
      <Content>
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
    </StyledMenu>
  )
}

SlideMenu.propTypes = {
  open: bool.isRequired,
}

export default SlideMenu
