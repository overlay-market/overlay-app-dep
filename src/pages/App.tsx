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
import { Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

export const routes = [
  { path: "/markets", name: "Markets", Component: Markets},
  { path: "/positions", name: "Positions", Component: Positions},
  { path: "/markets/:marketId", name: ":marketId", Component: Market}
]

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <Web3ReactManager>
        <Switch>
          {/* <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
          <Route exact strict path="/markets" component={Markets} />
          <Route exact strict path="/positions" component={Positions} />
          <Route exact strict path="/markets/:marketId" component={Market} /> */}
          {routes.map(({ path, name, Component}, key) => (
          <Route
            exact
            path={path}
            key={key}
            render={props => {
              const crumbs = routes
                // Get all routes that contain the current one.
                .filter(({ path }) => props.match.path.includes(path))
                // Swap out any dynamic routes with their param values.
                // E.g. "/pizza/:pizzaId" will become "/pizza/1"
                .map(({ path, ...rest }) => ({
                  path: Object.keys(props.match.params).length
                    ? Object.keys(props.match.params).reduce(
                        (path, param) =>
                          // @ts-ignore
                          path.replace(`:${param}`, props.match.params[param]),
                        path
                      )
                    : path,
                  ...rest
                }));

              console.log(`Generated crumbs for ${props.match.path}`);
              crumbs.map(({ name, path }) => console.log({ name, path }));

                return (
                  <div>
                    <Breadcrumbs crumbs={crumbs} />
                    <Component {...props} />
                  </div>
                );
              }}
            />
          ))}
        </Switch>
      </Web3ReactManager>
      <CurrentBlock />
    </AppWrapper>
  )
}
export default App;
