import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { MenuLink } from '../Link/Link';
import styled from 'styled-components/macro';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MoreVertical, AlertCircle, Globe } from 'react-feather';
import { TEXT } from '../../theme/theme';
import { Row } from '../Row/Row';

export const IconContainer = styled(Row)`
  width: auto;
  margin-right: 3px;
  min-width: 16px;
`;

export const StyledButton = styled(Button)`
  width: auto;
  min-width: 0px !important;
`;

export const StyledMenuList = styled(MenuList)`
  background: #373A44 !important;
  border-radius: 8px;
`;

export const StyledMenuItem = styled(MenuItem)`
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
  }

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
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'top right' : 'top right' }}
            >
              <StyledPaper>
                <ClickAwayListener onClickAway={handleClose}>
                  <StyledMenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <StyledMenuItem onClick={handleClose}>
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
                    <StyledMenuItem disabled>
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
                          Language
                      </MenuLink>
                    </StyledMenuItem>
                  </StyledMenuList>
                </ClickAwayListener>
              </StyledPaper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
