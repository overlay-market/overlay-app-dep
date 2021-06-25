import { useActiveWeb3React } from '../../hooks/web3';
import { SupportedChainId } from '../../constants/chains';
import { injected } from "../../connectors/connectors";
import { shortenAddress } from '../../utils/web3';
import styled from 'styled-components/macro';

export const Web3StatusConnected = styled.div`
  display: flex;
  flex-direction: row;

`
export const Web3StatusUnconnected = styled.button`
  text-decoration: none;
  color: ${({theme}) => theme.text1};
  border: ${({theme}) => theme.text1};

`

export const Chain = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin: auto;
`

export const Account = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin: auto;
`

const NETWORK_LABELS: { [chainId in SupportedChainId | number]: string } = {
  [SupportedChainId.MAINNET]: 'Mainnet',
  [SupportedChainId.KOVAN]: 'Kovan',
}

function Web3StatusInner() {
  const { account, chainId, activate, error } = useActiveWeb3React();

  const connectWallet = () => {
    activate(injected);
  };

  if (account) {
    // connected
    return (  
      <Web3StatusConnected>
        {chainId && NETWORK_LABELS[chainId] && (
              <Chain>{NETWORK_LABELS[chainId]}</Chain>
        )}
        <Account>
          {shortenAddress(account)}
        </Account>
      </Web3StatusConnected>
    )
  } else if (error) {
    // either wrong network or error
    return (
      <Web3StatusConnected>
        Error
      </Web3StatusConnected>
    )
  } else {
    return (
    // not connected
      <Web3StatusUnconnected onClick={connectWallet}>
        Metamask
      </Web3StatusUnconnected>
    )
  }
}

export default function Web3Status() {

  return (
    <>
      <Web3StatusInner />
    </>
  )
}