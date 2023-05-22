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
import Positions from './Positions/PositionsPage'
import Liquidate from './Liquidate/Liquidate'
import styled from 'styled-components/macro'
import Bridge from './Bridge/Bridge'
import Claim from './Claim/Claim'
import ClaimPage from './Claim/ClaimPage'
import Popups from '../components/Popup/Popups'
import {ClosedPosition} from './Positions/ClosedPosition'

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.dark.background};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

const App = () => {
  return (
    <AppWrapper>
      <Popups />
      <ChainalysisManager>
        <TermsOfServiceManager>
          <Header />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/" render={() => <Redirect to="/markets" />} />
              <Route exact strict path="/markets" component={Markets} />
              <Route exact strict path="/markets/:marketId" component={Market} />
              <Route exact strict path="/positions" component={Positions} />
              <Route exact strict path="/positions/:marketPositionId/:positionId" component={Unwind} />
              <Route exact strict path="/closed-positions/:unwindId/:positionId" component={ClosedPosition} />
              <Route exact strict path="/claim/:claimId" component={Claim} />
              <Route exact strict path="/claimpage" component={ClaimPage} />
              <Route exact strict path="/liquidate" component={Liquidate} />
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
