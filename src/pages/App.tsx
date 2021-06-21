import './App.css';
import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan
  ]
})

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();

  const onClick = () => {
    activate(injectedConnector);
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
    <Wallet />
  )
}
export default App;
