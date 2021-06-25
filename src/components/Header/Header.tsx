import React from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { useDarkModeManager } from '../../state/user/hooks';
import { NavLink  } from 'react-router-dom';
import Web3Status from '../Web3Status/Web3Status';
import OverlayLogo from '../../assets/images/overlay-logo.png';
import LightOverlayLogo from '../../assets/images/overlay-logo-light.png';
import styles from './Header.module.scss';
import styled from 'styled-components/macro';

export const StyledMenuButton = styled.button`
  background-color: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1};
`

export const HeaderContainer = styled.div`
  background-color: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1};
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  max-width: 900px;
  margin: auto;
  padding-top: 30px;
`

export const LogoContainer = styled.div`
  height: 32px;
  width: 32px;
  margin: auto;

  img {
    width: 100%;
    height: 100%;
  }
`

const activeClassName = 'ACTIVE'

export const StyledLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${({theme}) => theme.text1};
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  margin: auto;

  &.${activeClassName} {
    color: ${({theme}) => theme.text4};
  }
`

export default function Header() {
  const [darkMode, toggleDarkMode] = useDarkModeManager();

  return (
    <HeaderContainer>
      <LogoContainer>
        {darkMode ? (
          <img src={LightOverlayLogo} alt={'Overlay Logo Light'} />
          ) : (
            <img src={OverlayLogo} alt={'Overlay Logo'} />
        )}
      </LogoContainer>
      <StyledLink to={'/Markets'}>
        Markets
      </StyledLink>
      <StyledLink to={'/Positions'}>
        Positions
      </StyledLink>

      <div className={styles["accountContainer"]}>
         <Web3Status/>
        <StyledMenuButton onClick={() => toggleDarkMode()}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </StyledMenuButton>
      </div>
    </HeaderContainer>
  )
}

