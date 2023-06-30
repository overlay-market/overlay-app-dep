import {useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {useModalOpen, useSetSlippageModalToggle} from '../../state/application/hooks'
import {ApplicationModal} from '../../state/application/actions'
import {TEXT, colors} from '../../theme/theme'
import {FlexRow} from '../Container/Container'
import Modal from '../Modal/Modal'
import {Settings, X} from 'react-feather'
import {MINIMUM_SLIPPAGE_VALUE, NumericalInputContainer, NumericalInputDescriptor} from '../../pages/Markets/Build'
import {NumericalInput} from '../NumericalInput/NumericalInput'
import {useBuildActionHandlers, useBuildState} from '../../state/build/hooks'
import {DefaultTxnSettings} from '../../state/build/actions'
import {useActiveWeb3React} from '../../hooks/web3'

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  padding-bottom: 60px;
  flex: 1;
  position: relative;
  gap: 4px;
  background: ${({theme}) => theme.dark.background};
`

const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const StyledNumericalInputContainer = styled(NumericalInputContainer)`
  border: 0;
  background: #10131d;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
  width: 100px;
  height: 40px;
`

export default function SetSlippageModal() {
  const {account} = useActiveWeb3React()
  const setSlippageModalOpen = useModalOpen(ApplicationModal.SLIPPAGE)
  const toggleSetSlippageModal = useSetSlippageModalToggle()
  const {setSlippageValue} = useBuildState()
  const {onSetSlippage} = useBuildActionHandlers()

  const handleResetSlippage = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE)
    },
    [onSetSlippage],
  )

  useEffect(() => {
    const fetchSlippage = async () => {
      const storedSlippage = localStorage.getItem(`slippage`)
      // When value is edited or not a valid number, set to default slippage value
      if (storedSlippage && !isNaN(Number(storedSlippage))) {
        onSetSlippage(storedSlippage || DefaultTxnSettings.DEFAULT_SLIPPAGE)
      } else {
        localStorage.setItem(`slippage`, setSlippageValue ?? DefaultTxnSettings.DEFAULT_SLIPPAGE)
      }
    }

    fetchSlippage()
  }, [account, onSetSlippage, setSlippageValue])

  return (
    <Modal
      boxShadow={`0px 0px 12px 6px rgba(91, 96, 164, 0.25)`}
      borderColor={`${colors(false).dark.blue2}80`}
      isOpen={setSlippageModalOpen}
      onDismiss={toggleSetSlippageModal}
      minHeight={false}
      maxHeight={90}
    >
      <ModalContainer>
        <CloseIcon onClick={toggleSetSlippageModal}>
          <X color={'white'} height={24} width={24} />
        </CloseIcon>
        <TEXT.BoldHeader1>Slippage</TEXT.BoldHeader1>

        <FlexRow justify="space-between" marginTop="40px">
          <FlexRow style={{gap: 8}}>
            <Settings size={16} color={colors(false).dark.white} />
            <TEXT.StandardBody>Slippage</TEXT.StandardBody>
          </FlexRow>

          <FlexRow style={{gap: 8}} justify="flex-end">
            <TEXT.StandardBody
              onClick={handleResetSlippage}
              color={setSlippageValue === DefaultTxnSettings.DEFAULT_SLIPPAGE ? colors(false).dark.blue2 : colors(false).dark.grey1}
              style={{textDecoration: 'underline', cursor: 'pointer'}}
            >
              Auto
            </TEXT.StandardBody>
            <StyledNumericalInputContainer>
              <NumericalInput value={setSlippageValue} onUserInput={onSetSlippage} align={'right'} />
              <NumericalInputDescriptor> % </NumericalInputDescriptor>
            </StyledNumericalInputContainer>
          </FlexRow>
        </FlexRow>
        {Number(setSlippageValue) > 5 && (
          <FlexRow>
            <TEXT.Supplemental color={colors(false).dark.red}>
              Caution: High slippage. Your position may result in an unfavorable trade.
            </TEXT.Supplemental>
          </FlexRow>
        )}
        {Number(setSlippageValue) < MINIMUM_SLIPPAGE_VALUE && (
          <FlexRow>
            <TEXT.Supplemental color={colors(false).dark.red}>
              Caution: Slippage too low. Slippage should be set to protocol minimum of 0.05%.
            </TEXT.Supplemental>
          </FlexRow>
        )}
      </ModalContainer>
    </Modal>
  )
}
