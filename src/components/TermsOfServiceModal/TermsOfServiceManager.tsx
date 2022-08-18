import {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useTermsOfServiceModalToggle} from '../../state/application/hooks'
import TermsOfServiceModal from './TermsOfServiceModal'
import {UserTermsOfServiceStatus} from '../../state/application/actions'
import {useTermsOfServiceStatusManager} from '../../state/application/hooks'
import {useModalOpen} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'

const AccessDenied = () => {
  return <>AccessDenied</>
}

export default function TermsOfServiceManager({children}: {children: JSX.Element | JSX.Element[]}) {
  const [userAgreementStatus, setUserAgreementStatus] = useTermsOfServiceStatusManager()
  const [cookies] = useCookies(['userHasAcceptedServiceAgreement'])
  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)

  useEffect(() => {
    const {userHasAcceptedServiceAgreement} = cookies

    if (!userHasAcceptedServiceAgreement && !termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    } else if (userHasAcceptedServiceAgreement && termsOfServiceModalOpen) {
      toggleTermsOfServiceModal()
    }
  }, [cookies, termsOfServiceModalOpen, toggleTermsOfServiceModal])

  if (userAgreementStatus === UserTermsOfServiceStatus.REJECTED) {
    return <AccessDenied />
  }

  return (
    <>
      {children}
      <TermsOfServiceModal />
    </>
  )
}
