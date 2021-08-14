import { useState } from "react";
import Modal from "../Modal/Modal";
import { useModalOpen, useWalletModalToggle } from "../../state/application/hooks";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { ApplicationModal } from "../../state/application/actions";
import { TEXT } from "../../theme/theme";
import { X } from "react-feather";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { SUPPORTED_WALLETS } from "../../constants/wallet";
import { isMobile } from "react-device-detect"
import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected } from "../../connectors/connectors";
import PendingView from "./PendingView";
import METAMASK_ICON from '../../assets/images/metamask.png';
import WalletOption from './WalletOptions';
import styled from 'styled-components/macro';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`;

export const WalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CloseIcon = styled.div`
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function ConnectWalletModal() {
  const { active, account, connector, activate, error } = useWeb3React();

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);

  const toggleWalletModal = useWalletModalToggle();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();

  const [pendingError, setPendingError] = useState<boolean>();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = ''
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name)
      }
      return true
    })
    setPendingWallet(connector) // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING)

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector) // a little janky...can't use setError because the connector isn't set
        } else {
          setPendingError(true)
        }
      })
  };

  function getOptions() {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      // check for mobile options
      if (isMobile) {

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <WalletOption
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector)
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              link={option.href}
              header={option.name}
              subheader={null}
              icon={option.iconURL}
            />
          )
        }
        return null
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <WalletOption
                id={`connect-${key}`}
                key={key}
                header={'Install Metamask'}
                subheader={null}
                link={'https://metamask.io/'}
                icon={METAMASK_ICON}
              />
            )
          } else {
            return null //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null
        }
      }

      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <WalletOption
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector)
            }}
            key={key}
            active={option.connector === connector}
            link={option.href}
            header={option.name}
            subheader={null} //use option.descriptio to bring back multi-line
            icon={option.iconURL}
          />
        )
      )
    })
  };

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <ModalContent>
        <WalletHeader>
          <TEXT.Body color={'white'} fontWeight={600} m={'auto 0'}>
              Connect to a wallet
          </TEXT.Body>
          <CloseIcon onClick={toggleWalletModal}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
        </WalletHeader>
        {walletView === WALLET_VIEWS.PENDING ? (
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          ) : (
            <>{getOptions()}</>
          )}
      </ModalContent>
    </Modal>
  )
};