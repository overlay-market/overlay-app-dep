import './App.css'
import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useTermsOfServiceModalToggle} from '../state/application/hooks'
import {Route, Switch, Redirect} from 'react-router-dom'
import Web3ReactManager from '../components/Web3ReactManager/Web3ReactManager'
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
import Popups from '../components/Popup/Popups'

import TermsOfServiceModal from '../components/TermsOfServiceModal/TermsOfServiceModal'
import {useModalOpen} from '../state/application/hooks'
import {ApplicationModal} from '../state/application/actions'

export const AppWrapper = styled.div`
  background-color: ${({theme}) => theme.bg1};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`

const TermsOfServiceManager = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  const [cookies] = useCookies(['userHasAcceptedServiceAgreement'])
  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)

  useEffect(() => {
    const {userHasAcceptedServiceAgreement} = cookies

    if (!userHasAcceptedServiceAgreement && !termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    }
    if (userHasAcceptedServiceAgreement && termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    }
  }, [cookies, termsOfServiceModalOpen, toggleTermsOfServiceModal])

  return (
    <>
      {children}
      <TermsOfServiceModal />
    </>
  )
}

const App = () => {
  return (
    <AppWrapper>
      <Popups />
      <TermsOfServiceManager>
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
          </Switch>
        </Web3ReactManager>
      </TermsOfServiceManager>
      <CurrentBlock />
    </AppWrapper>
  )
}
export default App
