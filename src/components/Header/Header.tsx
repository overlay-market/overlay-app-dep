import React from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { SupportedChainId } from '../../constants/chains';
import { useDarkModeManager } from '../../state/user/hooks';
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
  const { account, chainId } = useActiveWeb3React();

  const [darkMode, toggleDarkMode] = useDarkModeManager();

  return (
    <HeaderContainer>
      <LogoContainer>
        <img src={OverlayLogo} />
      </LogoContainer>
      <div>Markets</div>
      <div>Positions</div>

      <div className={styles["accountContainer"]}>
       {chainId && NETWORK_LABELS[chainId] && (
              <div>{NETWORK_LABELS[chainId]}</div>
        )}
        <div>{account}</div>
        <StyledMenuButton onClick={() => toggleDarkMode()}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </StyledMenuButton>
      </div>
    </HeaderContainer>
  )
}

