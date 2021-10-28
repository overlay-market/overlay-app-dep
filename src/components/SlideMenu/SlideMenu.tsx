import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Accordion, AccordionSelection } from '../Accordion/Accordion';
import { LanguageMenuItem } from '../More/More';
import { useActiveLocale } from '../../hooks/useActiveLocale';
import { SUPPORTED_LOCALES } from '../../constants/locales';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

const StyledMenu = styled.nav<{open: boolean, height: number, width: number}>`
  display: flex;
  flex-direction: column;
  background: transparent;
  height: 100vh;
  text-align: left;
  backdrop-filter: blur(40px);
  width: 100%;
  height: ${({ height, open }) => ( `${height}` )}px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  opacity: ${({ open }) => ( open ? 1 : 0 )};
  z-index: ${({ open }) => ( open ? 1 : -1 )};
  visibility: ${({ open }) => ( open ? 'default' : 'hidden' )};
`;

const StyledInternalLink = styled(NavLink)`
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  text-align: left;
  text-decoration: none;
  font-weight: 700;
  margin: 16px 0;
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
  margin: 16px 0;
`;

const Separator = styled.div`
  display: block;
  height: 1px;
  width: 100%;
  background: white;
  margin: 16px 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
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

  const { height, width } = useWindowDimensions();

  return (
    <StyledMenu 
        open={open} 
        aria-hidden={!isHidden} 
        height={height}
        width={width}
        {...props}>
      <Content>
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
        <Accordion 
            title={"Language"}
            >
          {SUPPORTED_LOCALES.map((locale, key) => (
            <AccordionSelection>
              <LanguageMenuItem 
                  locale={locale} 
                  active={activeLocale === locale} 
                  key={locale}
                  />
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

export default SlideMenu;