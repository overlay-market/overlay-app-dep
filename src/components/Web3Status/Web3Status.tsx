import { useActiveWeb3React } from '../../hooks/web3';
import { SupportedChainId } from '../../constants/chains';
import { injected } from "../../connectors/connectors";
import { shortenAddress } from '../../utils/web3';
import { useETHBalances, useTokenBalance } from '../../state/wallet/hooks';
import { OVL } from '../../constants/tokens';
import styled from 'styled-components/macro';

export const Web3StatusConnected = styled.div`
  display: flex;
  flex-direction: row;

`
export const Web3StatusUnconnected = styled.button`
  text-decoration: none;
  background: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1};
  border: 1px ${({theme}) => theme.text1} solid;
  border-radius: 25px;
  margin-right: 7px;
`

export const Chain = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin: auto 7px auto auto;
  border: 1px ${({theme}) => theme.bg2} solid;
  border-radius: 25px;
  padding: 7px;
`

export const Account = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin: auto 7px auto auto;
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

  const userEthBalance = useETHBalances(account ? [account] : [])?.[
    account ?? ""
  ];

  const ovl = chainId ? OVL[chainId] : undefined;
  const userOvlBalance = useTokenBalance(account ?? undefined, ovl);

  if (account) {
    // connected
    return (  
      <Web3StatusConnected>
        {chainId && NETWORK_LABELS[chainId] && (
              <Chain>{NETWORK_LABELS[chainId]}</Chain>
        )}
      {account && userOvlBalance && (
              <>
                <Chain>
                  {userOvlBalance?.toSignificant(4)}{" "}
                  OVL
                </Chain>
              </>
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