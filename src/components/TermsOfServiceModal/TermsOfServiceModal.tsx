import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useModalOpen, useTermsOfServiceModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'
import Modal from '../Modal/Modal'

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
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
      <ModalContent>Lorem Ipsum</ModalContent>
    </Modal>
  )
}
