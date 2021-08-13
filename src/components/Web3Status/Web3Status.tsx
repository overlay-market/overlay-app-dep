import { useActiveWeb3React } from '../../hooks/web3';
import { UnsupportedChainIdError } from '@web3-react/core';
import { SupportedChainId } from '../../constants/chains';
import { injected } from "../../connectors/connectors";
import { shortenAddress } from '../../utils/web3';
import { useETHBalances, useTokenBalance, useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks';
import { OVL } from '../../constants/tokens';
import { Row } from '../Row/Row';
import { TEXT } from '../../theme/theme';
import { AlertTriangle } from 'react-feather';
import { Trans } from '@lingui/macro';
import { useWalletModalToggle } from '../../state/application/hooks';
import Dropdown from './Dropdown';
import styled from 'styled-components/macro';
import ConnectWalletModal from '../ConnectWalletModal/ConnectWalletModal';

export const Web3StatusConnected = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Web3StatusUnconnected = styled.button`
  text-decoration: underline;
  background: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1};
  border: 0px;
  border-radius: 25px;
  margin-right: 7px;
  font-size: 12px;
  cursor: pointer;
`;

export const Web3StatusError = styled(Web3StatusConnected)`
  opacity: 0.8;
  cursor: default;
  font-size: 12px;
  border: 1px solid ${({theme}) => theme.text1};
  border-radius: 15px;
  padding: 4px 8px;
`;

export const StyledAlertTriangle = styled(AlertTriangle)`
  margin-right: 3px;
`;

export const Account = styled(Row)`
  font-size: 12px;
  font-weight: 400;
  margin: auto 12px auto auto;
  display: flex;
  flex-direction: row;
`;
interface TokenBalanceProps {
  balance: any
  network: string
};

export const TokenBalance = ({balance, network}: TokenBalanceProps) => {
  if (balance === 'Loading...') {
    return (
      <>
        <Row fontSize={12} fontWeight={400} mr={4}>
            <Trans>
              Balance:
            </Trans>
            <TEXT.BoldSmall ml={1} mr={0} minWidth={'auto'}>
              {balance}
            </TEXT.BoldSmall>
        </Row>
      </>
    )
  } else if (network === 'Mainnet') {
    return (
      <>
        <Row fontSize={12} fontWeight={400} mr={4}>
            <TEXT.Small minWidth={'fit-content'}>
              <Trans>
                Balance:
              </Trans>
            </TEXT.Small>
            <TEXT.BoldSmall ml={1} mr={0} minWidth={'auto'}>
              {balance}
            </TEXT.BoldSmall>
            <TEXT.BoldSmall ml={1} mr={0}>
              OVL
            </TEXT.BoldSmall>
        </Row>
      </>
    )
  } else {
    return (
      <>
        <Row fontSize={12} fontWeight={400} mr={4} minWidth={'auto'}>
            <Trans>
              Balance:
            </Trans>
            <TEXT.BoldSmall ml={1} mr={0}>
              {balance}
            </TEXT.BoldSmall>
            <TEXT.BoldSmall ml={1} mr={0}>
              OVL
            </TEXT.BoldSmall>
        </Row>
      </>
    )
  }
};

const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
};

function Web3StatusInner() {
  const { account, chainId, activate, error } = useActiveWeb3React();

  const connectWallet = () => {
    activate(injected);
  };

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  
  console.log('isError: ', isUnsupportedChainIdError);

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];

  const ovl = chainId ? OVL[chainId] : undefined;
  const userOvlBalance = useTokenBalance(account ?? undefined, ovl);
  const isLoadingBalance = useTokenBalancesWithLoadingIndicator(account ?? undefined, [ovl])[1];
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    // connected
    return (  
      <Web3StatusConnected>

      {account && isLoadingBalance && chainId && (
        <TokenBalance balance={'Loading...'} network={NETWORK_LABELS[chainId]} />
      )}

      {account && chainId && userOvlBalance && (
        <TokenBalance balance={userOvlBalance?.toSignificant(4)} network={NETWORK_LABELS[chainId]} />
      )}

      {account && chainId && !userOvlBalance && !isLoadingBalance && (
        <TokenBalance balance={0} network={NETWORK_LABELS[chainId]} />
      )}  

        <Account>
          {shortenAddress(account)}

          {chainId && NETWORK_LABELS[chainId] === 'Mainnet' && (
            <Dropdown connectedNetwork={NETWORK_LABELS[chainId]} colorStatus={'#10DCB1'} />
          )}

          {chainId && NETWORK_LABELS[chainId] === 'Kovan' && (
            <Dropdown connectedNetwork={NETWORK_LABELS[chainId]} colorStatus={'yellow'} />
          )}
        </Account>
      </Web3StatusConnected>
    )
  } else if (error && isUnsupportedChainIdError) {
    console.error('Network Error: ', error);
    // either wrong network or error
    return (
      <Web3StatusError>
        <StyledAlertTriangle color={'white'} size={15} />
          ERR - Unsupported network
      </Web3StatusError>
    )
  } else if (error) {
    console.error('Connection Error: ', error);
    // either wrong network or error
    return (
      <Web3StatusError>
        <StyledAlertTriangle color={'white'} size={15} />
          ERROR - Refresh browser
      </Web3StatusError>
    )
  } else {
    return (
    // not connected
      <Web3StatusUnconnected onClick={toggleWalletModal}>
        Connect wallet
      </Web3StatusUnconnected>
    )
  }
};

export default function Web3Status() {
  return (
    <>
      <Web3StatusInner />
      <ConnectWalletModal />
    </>
  )
};