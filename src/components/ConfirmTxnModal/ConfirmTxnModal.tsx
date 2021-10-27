import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { ModalContent, WalletHeader, CloseIcon } from "../ConnectWalletModal/ConnectWalletModal";
import { X } from "react-feather";
import { TEXT } from "../../theme/theme";
import { ListItem } from "../List/List";

export default function ConfirmTxnModal() {
  return(
    <Modal isOpen={true} onDismiss={() => null}>
        <ModalContent>
            <WalletHeader>
                <TEXT.Body color={'white'} fontWeight={600} m={'auto 0'}>
                    Confirm Transaction
                </TEXT.Body>
            </WalletHeader>
        </ModalContent>
    </Modal>
  )
}