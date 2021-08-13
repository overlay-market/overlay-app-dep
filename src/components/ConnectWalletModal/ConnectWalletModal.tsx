import Modal from "../Modal/Modal";
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";
import { TEXT } from "../../theme/theme";
import { X } from "react-feather";
import { Image } from "rebass";
import styled from 'styled-components/macro';

export const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
`;

export const CloseIcon = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

export default function ConnectWalletModal() {
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <WalletHeader>
        <TEXT.Body color={'white'} fontWeight={600} m={'auto 0'}>
            Connect to a wallet
        </TEXT.Body>
        <CloseIcon onClick={toggleWalletModal}>
          <X color={'white'} height={24} width={24} />
        </CloseIcon>
      </WalletHeader>
    </Modal>
  )
};