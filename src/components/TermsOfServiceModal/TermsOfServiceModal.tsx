import {useModalOpen, useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'

export default function TermsOfServiceModal() {
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)

  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()
}
