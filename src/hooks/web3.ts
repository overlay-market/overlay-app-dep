import { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '../constants/misc';
import { injected } from './../connectors/connectors';
import { isMobile } from 'react-device-detect';
import { ChainId } from "@sushiswap/sdk";

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & {
  chainId?: ChainId;
} {
  const context = useWeb3ReactCore<Web3Provider>();
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore();
  const [tried, setTried] = useState(false)

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          })
        } else {
          setTried(true);
        }
      }
    })
  }, [activate])

  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}