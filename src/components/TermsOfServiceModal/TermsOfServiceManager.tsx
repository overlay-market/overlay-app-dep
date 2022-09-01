import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useTermsOfServiceStatusManager} from '../../state/application/hooks'
import {useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {UserTermsOfServiceStatus} from '../../state/application/actions'
import {ApplicationModal} from '../../state/application/actions'
import {AccessDenied, AccessDeniedType} from '../AccessDenied/AccessDenied'
import {useModalOpen} from '../../state/application/hooks'
import {ClientCookies} from './TermsOfServiceModal'
import TermsOfServiceModal from './TermsOfServiceModal'

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
    return <AccessDenied message={AccessDeniedType.REJECT_SERVICE_AGREEMENT} />
  }

  return (
    <>
      {children}
      <TermsOfServiceModal />
    </>
  )
}
