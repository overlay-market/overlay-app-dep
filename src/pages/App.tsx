import './App.css';
import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../connectors/connectors';

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React();

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
    <Wallet />
  )
}
export default App;
