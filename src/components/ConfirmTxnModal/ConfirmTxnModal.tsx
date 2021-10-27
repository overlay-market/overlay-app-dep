import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../Modal/Modal";
import { ModalContent, WalletHeader, CloseIcon } from "../ConnectWalletModal/ConnectWalletModal";
import { X } from "react-feather";
import { TEXT } from "../../theme/theme";
import { ListItem } from "../../pages/Positions/Position";
import { Row } from "../Row/Row";
import { Column } from "../Column/Column";
import { ActiveBlueButton } from "../Button/Button";

export default function ConfirmTxnModal() {
  return(
    <Modal isOpen={true} onDismiss={() => null} width={'350px'}>
        <ModalContent>
            <WalletHeader>
                <TEXT.Body color={'white'} fontWeight={600} m={'auto 0'}>
                    Confirm Transaction
                </TEXT.Body>
                <CloseIcon onClick={() => null}>
                    <X color={'white'} height={24} width={24} />
                </CloseIcon>
            </WalletHeader>
                <Column mt={'24px'} mr={'auto'} width={'auto'} align={'start'}>
                    <TEXT.Body color={'white'} fontWeight={400}>
                        Market
                    </TEXT.Body>

                    <TEXT.LargeHeader color={'white'}>
                        ETH/USDC
                    </TEXT.LargeHeader>
                </Column>

                <Column mt={'16px'} color={'white'}>
                    <ListItem 
                        item={'Price'} 
                        itemColor={'#B9BABD'}
                        value={'3000.00 USDC'}
                        />

                    <ListItem 
                        item={'Side'} 
                        itemColor={'#B9BABD'}
                        value={'Long'}
                        />  

                    <ListItem 
                        item={'Leverage'} 
                        itemColor={'#B9BABD'}
                        value={'4x'}
                        />  
                </Column>

                <Column mt={'48px'} color={'white'}>
                    <ListItem 
                        item={'Fee'} 
                        itemColor={'#B9BABD'}
                        value={'0%'}
                        />

                    <ListItem 
                        item={'Slippage'} 
                        itemColor={'#B9BABD'}
                        value={'0%'}
                        />  

                    <ListItem 
                        item={'Est. Liquidation'} 
                        itemColor={'#B9BABD'}
                        value={'$0.00'}
                        />  
                </Column>

                <Column mt={'48px'} color={'white'}>
                    <ListItem 
                        item={'Collateral'} 
                        itemColor={'#B9BABD'}
                        value={'10 OVL'}
                        />

                    <ListItem 
                        item={'Expected OI'} 
                        itemColor={'#B9BABD'}
                        value={'~9.89 OVL'}
                        />  
                </Column>

                <TEXT.Small color={'#B9BABD'} mt={'24px'} mb={'24px'}>
                  The unwind price will be at least 2989.99 USDC or the transaction will revert.
                </TEXT.Small>

                <ActiveBlueButton border={'none'}>
                   Confirm Build
                </ActiveBlueButton>
        </ModalContent>
    </Modal>
  )
}