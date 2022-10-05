import {useEffect} from 'react'
import styled from 'styled-components'
import {useCookies} from 'react-cookie'
import {useModalOpen, useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'
import {SolidColorButton} from '../Button/Button'
import {TEXT} from '../../theme/theme'
import {FlexRow, FlexColumn} from '../Container/Container'
import {useTermsOfServiceStatusManager} from '../../state/application/hooks'
import {UserTermsOfServiceStatus} from '../../state/application/actions'
import Modal from '../Modal/Modal'
import {ExternalLink} from '../ExternalLink/ExternalLink'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  background: #0b0f1c;
`

// @TO-DO: Combine UserAcceptButton and UserDeclineButton
const UserAcceptButton = styled(SolidColorButton)`
  width: 50%;
  padding: 4px;
  color: #12b4ff;
  font-size: 14px;
  margin-right: 8px;
  background: transparent;
  border: 2px solid #12b4ff;

  :hover {
    box-shadow: 0 0px 5px #12b4ff;
    text-decoration: underline;
  }
`

const UserDeclineButton = styled(SolidColorButton)`
  width: 50%;
  padding: 4px;
  color: #d0d0d2;
  font-size: 14px;
  background: transparent;
  border: 1px solid #d0d0d2;

  :hover {
    box-shadow: 0 0px 5px #d0d0d2;
    text-decoration: underline;
  }
`

export enum ClientCookies {
  userHasAcceptedServiceAgreement = 'userHasAcceptedServiceAgreement',
  userRiskLevel = 'userRiskLevel',
}

export default function TermsOfServiceModal() {
  const [userAgreementStatus, setUserAgreementStatus] = useTermsOfServiceStatusManager()
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)
  const [cookies, setCookie] = useCookies([ClientCookies.userHasAcceptedServiceAgreement])

  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()

  useEffect(() => {
    if (userAgreementStatus === UserTermsOfServiceStatus.ACCEPTED) {
      // maxAge in seconds e.g 1 mo = 2628000 seconds
      setCookie(ClientCookies.userHasAcceptedServiceAgreement, 'true', {path: '/', maxAge: 7884000})
    }
  }, [userAgreementStatus, setCookie])

  function acceptTermsOfService() {
    setUserAgreementStatus(UserTermsOfServiceStatus.ACCEPTED)
  }

  function declineTermsOfService() {
    setUserAgreementStatus(UserTermsOfServiceStatus.REJECTED)
  }

  return (
    <Modal
      isOpen={termsOfServiceModalOpen}
      onDismiss={toggleTermsOfServiceModal}
      minHeight={false}
      maxHeight={90}
    >
      <ModalContent>
        <FlexColumn>
          <TEXT.BoldSmallBody lineHeight={1.5} m={'auto'}>
            Perpetuals are not available to anyone residents of, or are located, incorporated, or
            having a registered agent in, the United States or a restricted territory (as defined in
            Overlay's Terms of Service (the "TOS").
            <br />
            <br />
            By accepting, you accept the TOS, which you can find here:
          </TEXT.BoldSmallBody>
          <ExternalLink href={'https://overlay.market/#/tos'}>
            <TEXT.BoldSmallBody color={'#12b4ff'}>https://overlay.market/#/tos</TEXT.BoldSmallBody>
          </ExternalLink>
        </FlexColumn>
        <FlexRow m={'16px auto 8px'}>
          <UserAcceptButton onClick={acceptTermsOfService}>Accept</UserAcceptButton>
          <UserDeclineButton onClick={declineTermsOfService}>Decline</UserDeclineButton>
        </FlexRow>
      </ModalContent>
    </Modal>
  )
}
