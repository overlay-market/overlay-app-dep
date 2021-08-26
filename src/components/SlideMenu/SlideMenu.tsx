import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Accordion, AccordionSelection } from '../Accordion/Accordion';
import { LanguageMenuItem } from '../More/More';
import { useActiveLocale } from '../../hooks/useActiveLocale';
import { SUPPORTED_LOCALES } from '../../constants/locales';
import { useLocationLinkProps } from '../../hooks/useLocationLinkProps';

const StyledMenu = styled.nav<{open: boolean}>`
  display: flex;
  flex-direction: column;
  background: #2F2F2F;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  min-width: 300px;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
`;

const StyledInternalLink = styled(NavLink)`
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  font-weight: 700;
  margin: 12px 0;
  border: none !important;
`;

const StyledExternalLink = styled.a.attrs(props => ({
  target: props.target || '_blank',
  rel: props.rel || 'noopener noreferrer',
  href: props.href
}))`
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  color: white;
  font-weight: 700;
  margin: 12px 0;
`;

const Separator = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background: white;
  margin: 12px 0;
`;

const SlideMenu = ({ 
  open, 
  ...props 
}:{
  open: boolean
  props?: any
}) => {
  const activeLocale = useActiveLocale();
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <StyledInternalLink tabIndex={tabIndex} to={'/markets'}>
        Markets
      </StyledInternalLink>
      <StyledInternalLink tabIndex={tabIndex} to={'/positions'}>
        Positions
      </StyledInternalLink>
      <StyledInternalLink tabIndex={tabIndex} to={'/magic'}>
        Magic
      </StyledInternalLink>

      <Separator />
      
      <StyledExternalLink href="https://overlay.market">
        Risks
      </StyledExternalLink>
      <Accordion title="Language">
        {SUPPORTED_LOCALES.map((locale) => (
           <AccordionSelection>
             <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
           </AccordionSelection>
        ))}
      </Accordion>
    </StyledMenu>
  )
}

SlideMenu.propTypes = {
  open: bool.isRequired,
}

export default SlideMenu;