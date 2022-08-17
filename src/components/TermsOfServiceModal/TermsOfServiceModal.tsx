import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useModalOpen, useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'
import {SolidColorButton} from '../Button/Button'
import {TEXT} from '../../theme/theme'
import {FlexRow} from '../Container/Container'
import Modal from '../Modal/Modal'

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
  background: rgb(46, 51, 72);
`

const UserAcceptButton = styled(SolidColorButton)`
  background: green;
`

const UserRejectButton = styled(SolidColorButton)`
  background: red;
`

export default function TermsOfServiceModal() {
  const termsOfServiceModalOpen = useModalOpen(ApplicationModal.TERMS_OF_SERVICE)

  const toggleTermsOfServiceModal = useTermsOfServiceModalToggle()

  const modalOpen = true
  return (
    <Modal
      isOpen={modalOpen}
      onDismiss={toggleTermsOfServiceModal}
      minHeight={false}
      maxHeight={90}
    >
      <ModalContent>
        <TEXT.BoldSmallBody lineHeight={1.5} m={'auto'}>
          Please carefully read through the Terms of Service Agreement. By clicking "Accept", the
          user is acknowledging to abide by the Terms of Service.
        </TEXT.BoldSmallBody>
        <FlexRow>
          <UserAcceptButton>Accept</UserAcceptButton>
          <UserRejectButton>Reject</UserRejectButton>
        </FlexRow>
      </ModalContent>
    </Modal>
  )
}
