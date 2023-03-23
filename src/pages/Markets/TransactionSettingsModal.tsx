import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {InfoTip} from '../../components/InfoTip/InfoTip'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {TransactionSettingsButton} from '../../components/Button/Button'
import {NumericalInputContainer} from './Build'

const TransactionSettingModal = styled.div<{isOpen?: boolean}>`
  display: ${({isOpen}) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  border: 1px solid #d0d0d2;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  backdrop-filter: blur(33px);
  z-index: 5;
  color: #f2f2f2;
`

const NumericalInputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px 8px 8px 0;
`

export const TransactionSettingsModal = ({
  isTxnSettingsOpen,
  setSlippageValue,
  isTxnSettingsAuto,
  txnDeadline,
  onSetSlippage,
  handleResetTxnSettings,
  onSetTxnDeadline,
}: {
  isTxnSettingsOpen: boolean
  setSlippageValue: string
  isTxnSettingsAuto: boolean
  txnDeadline: string
  onSetSlippage: (e: string) => void
  handleResetTxnSettings: (e: any) => void
  onSetTxnDeadline: (e: string) => void
}) => {
  return (
    <TransactionSettingModal isOpen={isTxnSettingsOpen}>
      <FlexColumn>
        <TEXT.BoldStandardBody textAlign={'left'} margin={'24px auto 16px 16px'}>
          Transaction Settings
        </TEXT.BoldStandardBody>

        <FlexRow padding="8px 16px">
          <TEXT.Menu>Slippage Tolerance</TEXT.Menu>
        </FlexRow>

        <FlexRow padding="0px 16px 16px">
          <NumericalInputContainer width={'210px'} height={'40px'}>
            <NumericalInput value={setSlippageValue} onUserInput={onSetSlippage} align={'right'} />
            <NumericalInputDescriptor> % </NumericalInputDescriptor>
          </NumericalInputContainer>
          <TransactionSettingsButton
            active={isTxnSettingsAuto}
            onClick={handleResetTxnSettings}
            width={'96px'}
            margin={'0 0 auto auto'}
            padding={'0px'}
            border={'1px solid #f2f2f2'}
          >
            Auto
          </TransactionSettingsButton>
        </FlexRow>

        {/* <FlexRow padding="8px 16px">
          <TEXT.Menu>Transaction Deadline</TEXT.Menu>
        </FlexRow>

        <FlexRow padding="0px 16px 16px">
          <NumericalInputContainer width={'210px'} height={'40px'}>
            <NumericalInput
              value={txnDeadline}
              onUserInput={onSetTxnDeadline}
              align={'right'}
            />
            <NumericalInputDescriptor> minutes </NumericalInputDescriptor>
          </NumericalInputContainer>
        </FlexRow> */}

        <FlexRow margin="auto 0 0 0" padding="16px" borderTop="1px solid white">
          <TransactionSettingsButton onClick={handleResetTxnSettings} border={'none'} width={'96px'} margin={'0 auto 0 0'} padding={'0px'}>
            Reset
          </TransactionSettingsButton>
          {/* <TransactionSettingsButton
          // onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
          width={"96px"}
          padding={"0px"}
          >
          Save
        </TransactionSettingsButton> */}
        </FlexRow>
      </FlexColumn>
    </TransactionSettingModal>
  )
}
