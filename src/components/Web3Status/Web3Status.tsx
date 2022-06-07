import { useMemo } from 'react';
import styled from 'styled-components/macro';
import { utils } from 'ethers';
import { Trans } from '@lingui/macro';
import { AlertTriangle } from 'react-feather';
import { UnsupportedChainIdError } from '@web3-react/core';
import { TEXT } from '../../theme/theme';
import { shortenAddress } from '../../utils/web3';
import { useActiveWeb3React } from '../../hooks/web3';
import { useOvlBalance } from '../../state/wallet/hooks';
import { useTokenBalance } from '../../state/wallet/hooks';
import { SupportedChainId } from '../../constants/chains';
import { OVL } from '../../constants/tokens';
import { FlexRow } from '../Container/Container';
import { useWalletModalToggle } from '../../state/application/hooks';
import { useAllTransactions } from '../../state/transactions/hooks';
import { TransactionDetails } from '../../state/transactions/reducer';
import { useSpring, animated } from 'react-spring';
import NumberSpring from '../NumberSpring/NumberSpring';
import Dropdown from './Dropdown';
import ConnectWalletModal from '../ConnectWalletModal/ConnectWalletModal';
import Loader from '../Loaders/Loaders';

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
  margin-right: 24px;
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

export const Account = styled(FlexRow)`
  font-size: 12px;
  font-weight: 400;
  margin: auto 12px auto auto;
  display: flex;
  flex-direction: row;

  ${({theme}) => theme.mediaWidth.minSmall`
      margin: auto 24px auto auto;
  `}
`;

const PendingTransactions = styled.div`
  display: flex;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  font-size: 12px;
  margin: 4px 8px 4px 4px;
  padding: 0 4px;
`;

const BalanceContainer = styled(FlexRow)`
  margin-right: 12px;
  font-size: 12px;
  font-weight: 400;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-right: 16px;
  `}
`;

const Amount = styled(FlexRow)`
  margin-left: 4px;
  font-weight: 500;
  
  ${({theme}) => theme.mediaWidth.minSmall`
    min-width: 85px;
  `}
`;

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
 export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

interface TokenBalanceProps {
  balance: any
  network: string
};

export const TokenBalance = ({balance, network}: TokenBalanceProps) => {
  if (balance === 'Loading...') {
    return (
      <>
        <BalanceContainer>
            <Trans>
              Balance:
            </Trans>
            <TEXT.BoldSupplemental ml={1} mr={0} minWidth={'auto'}>
              <Loader size="12px" stroke="white" />
            </TEXT.BoldSupplemental>
        </BalanceContainer>
      </>
    )
  } else if (network === 'Mainnet') {
    return (
      <>
        <BalanceContainer>
            <TEXT.Supplemental minWidth={'fit-content'}>
              <Trans>
                Balance:
              </Trans>
            </TEXT.Supplemental>
            <Amount>
              {NumberSpring(balance, 'OVL')}
            </Amount>
        </BalanceContainer>
      </>
    )
  } else {
    return (
      <>
        <BalanceContainer minWidth={'auto'}>
            <Trans>
              Balance:
            </Trans>
            <Amount>
              {NumberSpring(balance, 'OVL')}
            </Amount>
        </BalanceContainer>
      </>
    )
  }
};

const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
};

function Web3StatusInner() {
  const { account, chainId, error } = useActiveWeb3React();

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)

  const hasPendingTransactions = !!pending.length

  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError;
  const ovlBalance = useOvlBalance();
  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    // connected
    return (  
      <Web3StatusConnected>
      {hasPendingTransactions && (
        <PendingTransactions>
          {pending?.length} pending&nbsp;
          <Loader size="12px" stroke="white" />
        </PendingTransactions>
      )}

      {account && chainId && !ovlBalance && (
        <TokenBalance balance={'Loading...'} network={NETWORK_LABELS[chainId]} />
      )}

      {account && chainId && ovlBalance && (
        <TokenBalance balance={Number(ovlBalance?.toFixed(2))} network={NETWORK_LABELS[chainId]} />
      )}

      {account && chainId && !ovlBalance && (
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

          {chainId && NETWORK_LABELS[chainId] === 'LocalHost' && (
            <Dropdown connectedNetwork={NETWORK_LABELS[chainId]} colorStatus={'yellow'} />
          )}

          {chainId && NETWORK_LABELS[chainId] === 'LocalHostDev' && (
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