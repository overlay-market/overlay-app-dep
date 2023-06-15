import {useState} from 'react'
import styled from 'styled-components/macro'
import {X} from 'react-feather'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import Modal from '../Modal/Modal'
import {CardText, IconWrapper} from './WalletOptions'
import {NETWORK_LOGO} from '../../constants/tokens'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_LABELS} from '../Web3Status/Web3Status'
import {ArrowRight} from 'react-feather'
import {switchNetworkToArbitrum} from '../../utils/switchNetworkToArbitrum'

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`

export const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const CloseIcon = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export const CardHeader = styled.div`
  justify-content: center;
  text-align: center;
`

const InfoCard = styled.button<{active?: boolean}>`
  background-color: transparent;
  padding: 1rem;
  outline: none;
  border-radius: 12px;
  width: 100% !important;
`

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 16px !important;
  padding: 1rem;
  background: #1f222d;
  border: none;
`

export const OptionCardClickable = styled(OptionCard as any)<{clickable?: boolean}>`
  margin-top: 0;
  border: ${({active}) => (active ? '1px solid green !important' : '')};
  background: ${({active, theme}) => (active ? `${theme.primary1} !important` : '')};

  &:hover {
    cursor: ${({clickable}) => (clickable ? 'pointer' : '')};
    border: ${({clickable, theme}) => (clickable ? `1px solid ${theme.primary1}` : ``)};
    background: #2e3348;
  }
  opacity: ${({disabled}) => (disabled ? '0.5' : '1')};
`

export default function ChangeNetworkModal() {
  const [walletModalOpen, setWalletModalOpen] = useState(true)
  const {chainId} = useActiveWeb3React()
  if (chainId !== 1) return <></>

  const toggleWalletModal = () => setWalletModalOpen(false)

  const onClick = () => {
    switchNetworkToArbitrum()
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <ModalContent>
        <WalletHeader>
          <TEXT.StandardBody color={'white'} fontWeight={600} m={'auto 0'}>
            Change Network to {NETWORK_LABELS[SupportedChainId.ARBITRUM]}
          </TEXT.StandardBody>
          {/* <CurrencyLogo src={NETWORK_LOGO[SupportedChainId.ARBITRUM]} /> */}
          <CloseIcon onClick={toggleWalletModal}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
        </WalletHeader>
        <OptionCardClickable id={'id'} onClick={onClick} clickable={true} active={true}>
          <CardHeader>
            <CardText>
              <IconWrapper size={40}>
                <img src={NETWORK_LOGO[SupportedChainId.MAINNET]} alt={'Icon'} />
              </IconWrapper>
              <ArrowRight color="white" size={40} />
              <IconWrapper size={40}>
                <img src={NETWORK_LOGO[SupportedChainId.ARBITRUM]} alt={'Icon'} />
              </IconWrapper>
            </CardText>
            {/* <SubHeader>subheader</SubHeader> */}
          </CardHeader>
        </OptionCardClickable>
      </ModalContent>
    </Modal>
  )
}
