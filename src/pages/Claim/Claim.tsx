import {useState, useMemo, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow, FlexColumn} from '../../components/Container/Container'
import {shortenAddress} from '../../utils/web3'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {TriggerActionButton} from '../../components/Button/Button'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useUserClaimData, useClaimCallback, useUserHasAvailableClaim} from '../../state/claim/hooks'
import {useUserHasSubmittedClaim} from '../../state/transactions/hooks'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {RouteComponentProps, Link, useHistory, useLocation} from 'react-router-dom'
import {SupportedChainId} from '../../constants/chains'
import {isAddress} from '../../utils/web3'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
  color: white;
`

const ClaimModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1b2131;
  border: 1px solid #71ceff;
  box-shadow: 0 0 12px #5b60a4;
  border-radius: 8px;
`

const Claim = ({
  match: {
    params: {claimId},
  },
}: RouteComponentProps<{claimId: string}>) => {
  const {account, chainId, error} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const userHasAvailableClaim = useUserHasAvailableClaim(account, claimId)
  const userClaimData = useUserClaimData(account, claimId)

  const [isFullyClaimed, setIsFullyClaimed] = useState<boolean>(false)

  useEffect(() => {
    setIsFullyClaimed(false)
  }, [claimId])

  const userClaimAmount =
    userClaimData?.amount && formatWeiToParsedNumber(userClaimData.amount, 18, 0)

  // monitor the status of the claim from contracts and txns
  const {claimCallback} = useClaimCallback(account, claimId)

  // used for UI loading states
  const [attempting, setAttempting] = useState<boolean>(false)

  const {claimSubmitted, claimTxn} = useUserHasSubmittedClaim(account ?? undefined)
  const claimConfirmed = Boolean(claimTxn?.receipt)

  // wrap in useMemo hook to account for changes in claimId
  const handleClaim = useCallback(() => {
    if (!claimId) return
    setAttempting(true)
    claimCallback()
      // reset modal and log error
      .catch(error => {
        setAttempting(false)
        console.error(error)

        let errorMessage = error.error.message
        if (errorMessage === 'execution reverted: ERC20: transfer amount exceeds balance') {
          setIsFullyClaimed(true)
        }
      })
  }, [claimCallback, claimId])

  const ClaimButton = () => {
    return isFullyClaimed ? (
      <TriggerActionButton isDisabled={true} onClick={() => null}>
        Tokens fully claimed
      </TriggerActionButton>
    ) : (
      <TriggerActionButton active={true} onClick={handleClaim}>
        Claim OVL
      </TriggerActionButton>
    )
  }

  const isWrongNetwork = useMemo(() => {
    if (!chainId) return true
    return chainId !== Number(SupportedChainId.ARBITRUM)
  }, [chainId])

  return useMemo(() => {
    if (isWrongNetwork) {
      return (
        <BridgeContainer>
          <ClaimModalContainer>
            <FlexColumn padding="16px">
              <FlexRow marginBottom="8px">
                <TEXT.SmallBody marginRight="16px">Claim OVL</TEXT.SmallBody>
                <TEXT.SmallBody>
                  {account ? shortenAddress(account) : 'Not connected'}
                </TEXT.SmallBody>
              </FlexRow>
            </FlexColumn>
            <FlexColumn padding="16px 16px 32px">
              <TEXT.SmallBody marginRight="auto">
                Wrong network, switch to Arbitrum-One
              </TEXT.SmallBody>
            </FlexColumn>
          </ClaimModalContainer>
        </BridgeContainer>
      )
    }
    return (
      <BridgeContainer>
        {!account && (
          <ClaimModalContainer>
            <FlexColumn padding="16px">
              <TEXT.SmallBody marginRight="auto" marginBottom="16px">
                Claim OVL
              </TEXT.SmallBody>
              <TEXT.StandardBody marginBottom="16px">
                Connect your wallet to see if you have any claimable OVL.
              </TEXT.StandardBody>
              <TriggerActionButton onClick={toggleWalletModal} active={true}>
                Connect Wallet
              </TriggerActionButton>
            </FlexColumn>
          </ClaimModalContainer>
        )}

        {account && !userClaimData && account && userHasAvailableClaim === undefined && (
          <ClaimModalContainer>
            <FlexColumn padding="16px">
              <TEXT.SmallBody marginRight="auto" marginBottom="18px">
                Claim OVL
              </TEXT.SmallBody>
              <TEXT.StandardBody marginRight="auto" marginBottom="16px" color="#FF648A">
                This wallet does not have any OVL to claim.
              </TEXT.StandardBody>
              <TEXT.StandardBody marginBottom="32px" color="#FF648A">
                Please check another address by connecting another wallet.
              </TEXT.StandardBody>
            </FlexColumn>
          </ClaimModalContainer>
        )}

        {account &&
          userClaimAmount &&
          userHasAvailableClaim &&
          userHasAvailableClaim !== undefined &&
          !isWrongNetwork && (
            <ClaimModalContainer>
              <FlexColumn padding="16px" borderBottom="1px solid #71CEFF">
                <FlexRow marginBottom="8px">
                  <TEXT.SmallBody marginRight="16px">Claim OVL</TEXT.SmallBody>
                  <TEXT.SmallBody>
                    {account ? shortenAddress(account) : 'Not connected'}
                  </TEXT.SmallBody>
                </FlexRow>
                <TEXT.AdjustableSize fontSize="34px" marginRight="auto">
                  {userClaimAmount} OVL
                </TEXT.AdjustableSize>
              </FlexColumn>
              <FlexColumn padding="16px">
                <TEXT.SmallBody>
                  As a member of the Overlay community, you may claim OVL to be used for voting and
                  governance, and to interact with the Overlay protocol.
                </TEXT.SmallBody>
                <ExternalLink
                  href="https://docs.overlay.market/"
                  style={{
                    color: '#71CEFF',
                    textDecoration: 'underline',
                    fontSize: '14px',
                    margin: '16px auto 16px 0',
                  }}
                >
                  Read more about OVL
                </ExternalLink>
                <ClaimButton />
              </FlexColumn>
            </ClaimModalContainer>
          )}

        {account &&
          userClaimAmount &&
          !userHasAvailableClaim &&
          userHasAvailableClaim !== undefined && (
            <ClaimModalContainer>
              <FlexColumn padding="16px" borderBottom="1px solid #71CEFF">
                <FlexRow marginBottom="8px">
                  <TEXT.SmallBody marginRight="16px">Claim OVL</TEXT.SmallBody>
                  <TEXT.SmallBody>
                    {account ? shortenAddress(account) : 'Not connected'}
                  </TEXT.SmallBody>
                </FlexRow>
                <TEXT.AdjustableSize fontSize="34px" marginRight="auto">
                  Already Claimed
                </TEXT.AdjustableSize>
              </FlexColumn>
              <FlexColumn padding="16px">
                <TEXT.SmallBody>
                  As a member of the Overlay community, you may claim OVL to be used for voting and
                  governance, and to interact with the Overlay protocol.
                </TEXT.SmallBody>
                <ExternalLink
                  href="https://docs.overlay.market/"
                  style={{
                    color: '#71CEFF',
                    textDecoration: 'underline',
                    fontSize: '14px',
                    margin: '16px auto 16px 0',
                  }}
                >
                  Read more about OVL
                </ExternalLink>
                <TriggerActionButton isDisabled={true}>Claim OVL</TriggerActionButton>
              </FlexColumn>
            </ClaimModalContainer>
          )}
      </BridgeContainer>
    )
  }, [
    account,
    claimId,
    isWrongNetwork,
    userClaimAmount,
    userClaimData,
    userHasAvailableClaim,
    handleClaim,
    isFullyClaimed,
    ClaimButton,
    toggleWalletModal,
  ])
}

export default Claim
