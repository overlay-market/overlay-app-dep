import Modal from "../Modal/Modal";
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { ApplicationModal } from "../../state/application/actions";

export default function ConnectWalletModal() {
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      hello there
    </Modal>
  )
};