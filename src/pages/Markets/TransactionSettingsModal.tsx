import { useState } from 'react';
import styled from 'styled-components';
import { FlexColumnContainer, FlexRowContainer } from '../../components/Container/Container';
import { TEXT } from '../../theme/theme';
import { InfoTip } from '../../components/InfoTip/InfoTip';
import { NumericalInput } from '../../components/NumericalInput/NumericalInput';
import { TransactionSettingsButton } from '../../components/Button/Button';
import { NumericalInputContainer, NumericalInputDescriptor } from './Build';

const TransactionSettingModal = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  border: 1px solid #d0d0d2;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  backdrop-filter: blur(33px);
  z-index: 5;
  color: #f2f2f2;
`;

export const TransactionSettingsModal = ({
  isTxnSettingsOpen,
  setSlippageValue,
  isTxnSettingsAuto,
  txnDeadline,
  onSetSlippage,
  handleResetTxnSettings,
  onSetTxnDeadline
}:{
  isTxnSettingsOpen: boolean;
  setSlippageValue: string;
  isTxnSettingsAuto: boolean;
  txnDeadline: string;
  onSetSlippage: (e: string) => void;
  handleResetTxnSettings: (e: any) => void;
  onSetTxnDeadline: (e: string) => void;
}) => {

  return (
    <TransactionSettingModal isOpen={isTxnSettingsOpen}>
    <FlexColumnContainer>
      <TEXT.BoldStandardBody
        textAlign={"left"}
        margin={"24px auto 16px 16px"}
        >
        Transaction Settings
      </TEXT.BoldStandardBody>

      <FlexRowContainer padding={"8px 16px"}>
        <TEXT.Menu>Slippage Tolerance</TEXT.Menu>
        <InfoTip tipFor={"Slippage Tolerance"}>Lorem Ipsum</InfoTip>
      </FlexRowContainer>

      <FlexRowContainer padding={"0px 16px 16px"}>
        <NumericalInputContainer width={"210px"} height={"40px"}>
          <NumericalInput
            value={setSlippageValue}
            onUserInput={onSetSlippage}
            align={"right"}
          />
          <NumericalInputDescriptor> % </NumericalInputDescriptor>
        </NumericalInputContainer>
        <TransactionSettingsButton
          active={isTxnSettingsAuto}
          onClick={handleResetTxnSettings}
          width={"96px"}
          margin={"0 0 auto auto"}
          padding={"0px"}
          border={"1px solid #f2f2f2"}
          >
          Auto
        </TransactionSettingsButton>
      </FlexRowContainer>

      <FlexRowContainer padding={"8px 16px"}>
        <TEXT.Menu>Transaction Deadline</TEXT.Menu>
      </FlexRowContainer>

      <FlexRowContainer padding={"0px 16px 16px"}>
        <NumericalInputContainer width={"210px"} height={"40px"}>
          <NumericalInput
            value={txnDeadline}
            onUserInput={onSetTxnDeadline}
            align={"right"}
          />
          <NumericalInputDescriptor> minutes </NumericalInputDescriptor>
        </NumericalInputContainer>
      </FlexRowContainer>

      <FlexRowContainer
        margin={"auto 0 0 0"}
        padding={"16px"}
        borderTop={"1px solid white"}
        >
        <TransactionSettingsButton
          onClick={handleResetTxnSettings}
          border={"none"}
          width={"96px"}
          margin={"0 auto 0 0"}
          padding={"0px"}
          >
          Reset
        </TransactionSettingsButton>
        {/* <TransactionSettingsButton
          // onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
          width={"96px"}
          padding={"0px"}
          >
          Save
        </TransactionSettingsButton> */}
      </FlexRowContainer>
    </FlexColumnContainer>
    </TransactionSettingModal>

  )
}
