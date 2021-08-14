import { AbstractConnector } from '@web3-react/abstract-connector';
import styled from 'styled-components/macro';
import { SUPPORTED_WALLETS } from '../../constants/wallet';
import WalletOption from './WalletOptions';
import { injected } from '../../connectors/connectors';
import { darken } from 'polished';
import { Trans } from '@lingui/macro';
import Loader from 'react-loader-spinner';

const PendingSection = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`

const StyledLoader = styled(Loader)`
  margin-right: 1rem;
`

const LoadingMessage = styled.div<{ error?: boolean }>`
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.red1 : 'inherit')};
  border: 1px solid ${({ theme, error }) => (error ? theme.red1 : theme.text4)};

  & > * {
    padding: 1rem;
  }
`

const ErrorGroup = styled.div`
  align-items: center;
  justify-content: flex-start;
`

const ErrorButton = styled.div`
  border-radius: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg1};
  margin-left: 1rem;
  padding: 0.5rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => darken(0.1, theme.text4)};
  }
`

const LoadingWrapper = styled.div`
  align-items: center;
  justify-content: center;
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
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div>
                <Trans>Error connecting</Trans>
              </div>
              <ErrorButton
                onClick={() => {
                  setPendingError(false)
                  connector && tryActivation(connector)
                }}
              >
                <Trans>Try Again</Trans>
              </ErrorButton>
            </ErrorGroup>
          ) : (
            <>
              <Loader type="BallTriangle" />
              <Trans>Initializing...</Trans>
            </>
          )}
        </LoadingWrapper>
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
