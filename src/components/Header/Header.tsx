import React from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { SupportedChainId } from '../../constants/chains';
import styles from './Header.module.scss';

const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React();

  return (
    <div className={styles["headerContainer"]}>
      <div>Overlay</div>
      <div>Markets</div>
      <div>Positions</div>

      <div className={styles["accountContainer"]}>
       {chainId && chainId !== SupportedChainId.MAINNET && NETWORK_LABELS[chainId] && (
              <div>{NETWORK_LABELS[chainId]}</div>
        )}
        <div>{account}</div>
      </div>
    </div>
  )
}

