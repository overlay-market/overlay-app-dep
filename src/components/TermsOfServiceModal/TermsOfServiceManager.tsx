import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useTermsOfServiceStatusManager} from '../../state/application/hooks'
import {useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {UserTermsOfServiceStatus} from '../../state/application/actions'
import {ApplicationModal} from '../../state/application/actions'
import {useModalOpen} from '../../state/application/hooks'
import {PageContainer} from '../Container/Container'
import {PlanckCatLoader} from '../Loaders/Loaders'
import {FlexColumn} from '../Container/Container'
import {TEXT} from '../../theme/theme'
import TermsOfServiceModal from './TermsOfServiceModal'
import {ClientCookies} from './TermsOfServiceModal'

interface AccessDeniedProps {
  message: string
}

export const AccessDenied = ({message}: AccessDeniedProps) => {
  return (
    <PageContainer>
      <FlexColumn height={'80vh'} width={'200px'} m={'auto'} justify={'center'}>
        <PlanckCatLoader duration={5} width={25} />
        <TEXT.StandardBody color={'red'}>Access Denied:</TEXT.StandardBody>
        <TEXT.StandardBody>{message}</TEXT.StandardBody>
      </FlexColumn>
    </PageContainer>
  )
}

export default function TermsOfServiceManager({children}: {children: JSX.Element | JSX.Element[]}) {
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)
  const [userAgreementStatus] = useTermsOfServiceStatusManager()
  const [cookies] = useCookies([ClientCookies.userHasAcceptedServiceAgreement])

  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()

  useEffect(() => {
    const {userHasAcceptedServiceAgreement} = cookies
    if (!userHasAcceptedServiceAgreement && !termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    } else if (userHasAcceptedServiceAgreement && termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    }
  }, [cookies, termsOfServiceModalOpen, toggleTermsOfServiceModal])

  if (userAgreementStatus === UserTermsOfServiceStatus.REJECTED) {
    return <AccessDenied message={'Rejected Terms of Service.'} />
  }

  return (
    <>
      {children}
      <TermsOfServiceModal />
    </>
  )
}
