import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants/misc';
import { LanguageProvider } from "./i18n";
import { SnackbarProvider } from 'notistack';
import ApplicationUpdater from './state/application/updater';
import MulticallUpdater from './state/multicall/updater';
import TransactionsUpdater from './state/transactions/updater';
import ThemeProvider from "./theme/theme";
import store from './state/state';
import getLibrary from './utils/getLibrary';
import "./index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import '@reach/dialog/styles.css'; 

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
      <TransactionsUpdater />
    </>
  )
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LanguageProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <Updaters />
              <SnackbarProvider maxSnack={3}>
                <ThemeProvider>
                  <App />
                </ThemeProvider>
              </SnackbarProvider>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </LanguageProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
