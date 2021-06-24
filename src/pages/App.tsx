import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager';
import Header from '../components/Header/Header';
import Markets from './Markets/Markets';
import Positions from './Positions/Positions';

const App = () => {
  return (
    <>
    <Header />
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
