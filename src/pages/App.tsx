import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager';
import Header from '../components/Header/Header';
import Markets from './Markets/Markets';
import Positions from './Positions/Positions';
import { useActiveWeb3React } from '../hooks/web3';
import { injected } from '../connectors/connectors';

export const Wallet = () => {
  const { activate, active } = useActiveWeb3React();

  const onClick = () => {
    activate(injected);
  };

  return (
    <div className="App">
      {active ? (
        <div>Connected</div>
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
    <>
    <Header />
    <Wallet />
    <Web3ReactManager>
      <Switch>
        <Route exact strict path="/markets" component={Markets} />
        <Route exact strict path="/positions" component={Positions} />
      </Switch>
    </Web3ReactManager>
    </>
  )
}
export default App;
