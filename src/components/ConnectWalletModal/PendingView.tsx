import { AbstractConnector } from '@web3-react/abstract-connector';
import styled from 'styled-components/macro';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import WalletOption from './WalletOptions';
import { injected } from '../../connectors/connectors';
import { darken } from 'polished';
import { Trans } from '@lingui/macro';
import { TEXT } from '../../theme/theme';
import { AlertTriangle } from 'react-feather';
import Loader from 'react-loader-spinner';

const PendingSection = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`

const LoadingMessage = styled.div<{ error?: boolean }>`
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin: 16px 0;
  color: ${({ theme, error }) => (error ? theme.red1 : 'inherit')};
  border: 1px solid ${({ theme, error }) => (error ? theme.red1 : 'transparent')};

  & > * {
    padding: 1rem;
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ErrorMessage = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconContainer = styled.div`
  display: flex;

  svg {
    margin: auto;
  }
`;

const ErrorButton = styled.div`
  border-radius: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.text1};
  background-color: rgb(86, 90, 105);
  padding: 0.5rem;
  display: flex;
  font-weight: 600;
  user-select: none;
  margin-left: 8px;

  &:hover {
    cursor: pointer;
    background-color: ${darken(0.1, '#565A69')};
  }
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}: {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}) {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingContainer>
          {error ? (
            <ErrorContainer>
              <ErrorMessage>
                <IconContainer>
                  <AlertTriangle height={15} width={15} />
                </IconContainer>
                <TEXT.Body m={'auto 4px'} color={'#FF4343'}>
                  Error connecting
                </TEXT.Body>
              </ErrorMessage>

              <ErrorButton
                onClick={() => {
                  setPendingError(false)
                  connector && tryActivation(connector)
                }}
              >
                <TEXT.Body m={'auto 4px'} fontWeight={400}>
                  Try again
                </TEXT.Body>
              </ErrorButton>
            </ErrorContainer>
          ) : (
            <>
              <Loader type="BallTriangle" height={30} width={30} color={'#12B4FF'}/>
              <TEXT.Body m={'auto 8px'}>
                Initializing...
              </TEXT.Body>
            </>
          )}
        </LoadingContainer>
      </LoadingMessage>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <WalletOption
              id={`connect-${key}`}
              key={key}
              clickable={false}
              header={option.name}
              subheader={option.description}
              icon={option.iconURL}
            />
          )
        }
        return null
      })}
    </PendingSection>
  )
};
