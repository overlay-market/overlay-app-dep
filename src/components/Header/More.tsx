import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Link } from 'react-router-dom';
import { MenuLink } from '../Link/Link';
import { SupportedLocale, LOCALE_LABEL, SUPPORTED_LOCALES } from '../../constants/locales';
import { useLocationLinkProps } from '../../hooks/useLocationLinkProps';
import { useActiveLocale } from '../../hooks/useActiveLocale';
import styled from 'styled-components/macro';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MoreVertical, AlertCircle, Globe, ChevronLeft } from 'react-feather';
import { TEXT } from '../../theme/theme';
import { Row } from '../Row/Row';
import { Fade } from '@material-ui/core';
import { Trans } from '@lingui/macro';

export const IconContainer = styled(Row)`
  width: auto;
  margin-right: 3px;
  min-width: 16px;
`;

export const StyledButton = styled(Button)`
  width: auto;
  min-width: 0px !important;
  padding: 6px 0 !important;
`;

export const StyledMenuList = styled(MenuList)`
  background: #373A44 !important;
  border-radius: 8px;
`;

export const StyledMenuItem = styled(MenuItem).attrs<{disableRipple: boolean}>(({disableRipple}) => ({
  disableRipple: disableRipple ?? true
}))`
  display: flex;
  color: #fff !important;
  text-decoration: none !important;
  font-size: 14px !important;
  padding: 0px !important;
  margin: 6px 6px !important;
  border-radius: 4px !important;
  line-height: 1 !important;

  :hover {
    background: #5f6067 !important;
  }
`;

export const StyledPaper = styled(Paper)`
  border-radius: 8px !important;
`;

export const InternalMenuItem = styled(Link)`

`;

function LanguageMenuItem({ locale, active, key }: { locale: SupportedLocale; active: boolean; key: string}) {
  const { to } = useLocationLinkProps(locale);

  if (!to) return null;

  return (
    <InternalMenuItem key={key} to={to}>
      <div>{LOCALE_LABEL[locale]}</div>
    </InternalMenuItem>
    )
  };
  
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }),
);

export default function More() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const activeLocale = useActiveLocale();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleLanguageToggle = (event: React.MouseEvent<EventTarget>) => {
    event.preventDefault();
    setShowLanguage((prevState) => !prevState);
  };

  const handleLanguageClose = () => {
    setShowLanguage(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <StyledButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVertical color={'white'}/>
        </StyledButton>
        <Popper open={open} anchorEl={anchorRef.current} placement={'bottom-end'} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Fade
              {...TransitionProps}
              timeout={200}
              // style={{ transformOrigin: placement === 'bottom' ? 'top right' : 'top right' }}
            >
              <StyledPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <StyledMenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {showLanguage ? (
                      <>
                        {SUPPORTED_LOCALES.map((locale) => (
                          <LanguageMenuItem locale={locale} active={activeLocale === locale} key={locale} />
                        ))}
                        <StyledMenuItem disableRipple onClick={handleLanguageClose}>
                          <IconContainer>
                            <ChevronLeft size={14}/> 
                              Menu
                          </IconContainer>
                        </StyledMenuItem>
                        <StyledMenuItem disableRipple onClick={handleLanguageClose}>
                              English
                        </StyledMenuItem>
                        <StyledMenuItem disableRipple onClick={handleLanguageClose}>
                              中文
                        </StyledMenuItem>
                        <StyledMenuItem disableRipple onClick={handleLanguageClose}>
                              Espanol
                        </StyledMenuItem>
                      </>
                    ) : (
                      <>
                        <StyledMenuItem disableRipple onClick={handleClose}>
                          <MenuLink 
                            pt={2} 
                            pb={2} 
                            pl={2} 
                            pr={3}
                            minWidth={100} 
                            href="https://overlay.market"
                            >
                            <IconContainer>
                              <AlertCircle size={14}/> 
                            </IconContainer>
                              Risks
                          </MenuLink>
                        </StyledMenuItem>
                        <StyledMenuItem disableRipple onClick={handleLanguageToggle}>
                          <MenuLink 
                              pt={2} 
                              pb={2} 
                              pl={2} 
                              pr={3}
                              minWidth={100} 
                              href=""
                              >
                            <IconContainer>
                              <Globe size={14}/> 
                            </IconContainer>
                          </MenuLink>
                        </StyledMenuItem>
                      </>
                    )}
                  </StyledMenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Fade>
          )}
        </Popper>
      </div>
    </div>
  );
};
