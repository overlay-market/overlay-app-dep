import React from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { SupportedChainId } from '../../constants/chains';
import { useDarkModeManager } from '../../state/user/hooks';
import { NavLink } from 'react-router-dom';
import { Wallet } from '../Wallet/Wallet';
import OverlayLogo from '../../assets/images/overlay-logo.png';
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
`

export const LogoContainer = styled.div`
  height: 32px;
  width: 32px;

  img {
    width: 100%;
    height: 100%;
  }
`

const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
}

export default function Header() {
  const { account, chainId, active } = useActiveWeb3React();
  const [darkMode, toggleDarkMode] = useDarkModeManager();

  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={OverlayLogo} alt={'Overlay Logo'}/>
      </LogoContainer>
      <NavLink to={'/Markets'}>
        Markets
      </NavLink>
      <NavLink to={'/Positions'}>
        Positions
      </NavLink>

      <div className={styles["accountContainer"]}>
       {chainId && NETWORK_LABELS[chainId] && (
              <div>{NETWORK_LABELS[chainId]}</div>
        )}
        {active ? 
          (<div>{account}</div>) :
          (<Wallet />)
         }
        <StyledMenuButton onClick={() => toggleDarkMode()}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </StyledMenuButton>
      </div>
    </HeaderContainer>
  )
}

