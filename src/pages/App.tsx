import './App.css';
import React, { useState } from 'react';
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager';
import { useWeb3React } from '@web3-react/core';
import { useActiveWeb3React } from '../hooks/web3';
import { injected } from '../connectors/connectors';

export const Wallet = () => {
  const { chainId, account, activate, active } = useActiveWeb3React();

  const onClick = () => {
    activate(injected);
  };

  return (
    <div className="App">
      <div>ChainId: {chainId} </div>
      <div> Account: {account} </div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  );
}

const App = () => {
  return (
    <Web3ReactManager>
      <Wallet />
    </Web3ReactManager>
  )
}
export default App;
