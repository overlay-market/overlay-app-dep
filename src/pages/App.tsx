import './App.css'
import {Route, Switch, Redirect} from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager'
import TermsOfServiceManager from '../components/TermsOfServiceModal/TermsOfServiceManager'
import ChainalysisManager from '../components/ChainalysisManager/ChainanalysisManager'
import Header from '../components/Header/Header'
import CurrentBlock from '../components/CurrentBlock/CurrentBlock'
import Markets from './Markets/Markets'
import {Market} from './Markets/Market'
import {Unwind} from './Positions/Unwind'
import Positions from './Positions/Positions'
import Liquidate from './Liquidate/Liquidate'
import styled from 'styled-components/macro'
import Magic from './Magic/Magic'
import Vaults from './Stake/Vaults'
import {Stake} from './Stake/Stake'
import Bridge from './Bridge/Bridge'
import Popups from '../components/Popup/Popups'
import {Banner} from '../components/Banner/Banner'

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

const BannerText = 'please make sure you are on https://app.overlay.market'

const App = () => {
  return (
    <AppWrapper>
      <Popups />
      <ChainalysisManager>
        <TermsOfServiceManager>
          <Banner content={BannerText} animated={false} />
          <Header />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
              <Route exact strict path="/markets" component={Markets} />
              <Route exact strict path="/markets/:marketId" component={Market} />
              <Route exact strict path="/positions" component={Positions} />
              <Route
                exact
                strict
                path="/positions/:marketPositionId/:positionId"
                component={Unwind}
              />
              <Route exact strict path="/magic" component={Magic} />
              <Route exact strict path="/liquidate" component={Liquidate} />
              <Route exact strict path="/stake" component={Vaults} />
              <Route exact strict path="/stake/:vaultId" component={Stake} />
              <Route exact strict path="/bridge" component={Bridge} />
            </Switch>
          </Web3ReactManager>
        </TermsOfServiceManager>
      </ChainalysisManager>
      <CurrentBlock />
    </AppWrapper>
  )
}
export default App
