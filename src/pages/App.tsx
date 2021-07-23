import './App.css';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager';
import Header from '../components/Header/Header';
import CurrentBlock from '../components/CurrentBlock/CurrentBlock';
import Markets from './Markets/Markets';
import { Market } from './Markets/Market';
import Positions from './Positions/Positions';
import styled from 'styled-components/macro';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <Web3ReactManager>
        <Switch>
          <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
          <Route exact strict path="/markets" component={Markets} />
          <Route exact strict path="/positions" component={Positions} />
          <Route exact strict path="/markets/:marketId" component={Market} />
        </Switch>
      </Web3ReactManager>
      <CurrentBlock />
    </AppWrapper>
  )
}
export default App;
