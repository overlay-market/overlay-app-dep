import {useState, useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {useChainOvlBalance, useChainLLBalance} from '../../state/wallet/hooks'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_LABELS} from '../../components/Web3Status/Web3Status'
import {TEXT} from '../../theme/theme'
import {ChainId} from '@sushiswap/sdk'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useBridgeActionHandlers, useBridgeState} from '../../state/bridge/hooks'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {TriggerActionButton} from '../../components/Button/Button'
import {useActiveWeb3React} from '../../hooks/web3'
import {useBridgeTokenCallback} from '../../hooks/useBridgeTokenCallback'
import {LAYER_ZERO_ADDRESS} from '../../constants/bridge'
import {utils} from 'ethers'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {useApproveCallback, ApprovalState} from '../../hooks/useApproveCallback'
import {OVL, LL} from '../../constants/tokens'
import {useWalletModalToggle} from '../../state/application/hooks'
import {Icon} from '../../components/Icon/Icon'
import {RefreshCw} from 'react-feather'
import {NETWORK_LOGO} from '../../constants/tokens'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
  color: white;
`

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: #f0f0f0;
`

const InterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px 16px 24px;
  margin: 16px 0 24px;
  background: #1b2131;
`

const BridgeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InputContainer = styled(FlexColumn)`
  background: #10131d;
  padding: 8px 8px 12px;
  border-radius: 8px;
  margin-top: 25px;
`

const ChainSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: #10131d;
  border-radius: 32px;
  padding: 8px 10px;
  min-width: 200px;
  text-align: center;
  margin-right: 6px;
`

const Placeholder = styled.div<{width?: number}>`
  width: ${({width}) => (width ? `${width}px` : '50px')};
`

const InputCurrency = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-color: #c4c4c4;
  font-weight: 700;
`

const CurrencyLogo = styled.img`
  margin-right: 4px;
  height: 24px;
  width: 24px;
`

const BridgeFromNetwork = ({chainId}: {chainId: ChainId}) => {
  const bridgeFromNetworkBalance = useChainLLBalance(chainId)
  const parsedBalance = bridgeFromNetworkBalance?.toFixed(4)
  const {typedValue} = useBridgeState()
  const {onAmountInput} = useBridgeActionHandlers()

  const handleUserInput = useCallback(
    (input: string) => {
      onAmountInput(input)
    },
    [onAmountInput],
  )

  return (
    <BridgeSelectorContainer>
      <FlexRow justify="space-between">
        <TEXT.StandardBody width="50px">From</TEXT.StandardBody>
        <ChainSelection>
          <FlexRow width="auto">
            <CurrencyLogo src={NETWORK_LOGO[chainId]} />
            {NETWORK_LABELS[chainId]}
          </FlexRow>
        </ChainSelection>
        <Placeholder width={50} />
      </FlexRow>
      <InputContainer>
        <FlexRow justify="space-between" mb="25px">
          <TEXT.Supplemental>Send</TEXT.Supplemental>
          <TEXT.Supplemental>Max: {parsedBalance ? parsedBalance : '-'} OVL</TEXT.Supplemental>
        </FlexRow>
        <FlexRow justify="space-between">
          <NumericalInput
            align="left"
            padding="0px"
            fontWeight="700"
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
          />
          <InputCurrency>OVL</InputCurrency>
        </FlexRow>
      </InputContainer>
    </BridgeSelectorContainer>
  )
}

const BridgeToNetwork = ({chainId}: {chainId: ChainId}) => {
  const bridgeToNetworkBalance = useChainLLBalance(chainId)
  const parsedBalance = bridgeToNetworkBalance?.toFixed(4)
  const {typedValue} = useBridgeState()
  return (
    <BridgeSelectorContainer>
      <FlexRow justify="space-between">
        <TEXT.StandardBody width="50px">To</TEXT.StandardBody>
        <ChainSelection>
          <FlexRow width="auto">
            <CurrencyLogo src={NETWORK_LOGO[chainId]} />
            {NETWORK_LABELS[chainId]}
          </FlexRow>
        </ChainSelection>
        <Placeholder width={50} />
      </FlexRow>
      <InputContainer>
        <FlexRow justify="space-between" mb="25px">
          <TEXT.Supplemental>Receive</TEXT.Supplemental>
          <TEXT.Supplemental>Balance: {parsedBalance ? parsedBalance : '-'} OVL</TEXT.Supplemental>
        </FlexRow>
        <FlexRow justify="space-between">
          <NumericalInput
            align="left"
            padding="0px"
            fontWeight="700"
            onUserInput={() => null}
            value={typedValue?.toString()}
          />
          <InputCurrency>OVL</InputCurrency>
        </FlexRow>
      </InputContainer>
    </BridgeSelectorContainer>
  )
}

const Bridge = () => {
  const {account, chainId} = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()

  const ll = chainId ? LL[chainId] : undefined
  const userLLBalance = useChainLLBalance(chainId)
  const parsedLLBalance = userLLBalance && userLLBalance.toFixed(2)

  const [
    {showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash},
    setBridgeState,
  ] = useState<{
    showConfirm: boolean
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined
    transactionHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })

  const [{bridgeFromChainId, bridgeToChainId}, setBridgeIdState] = useState<{
    bridgeFromChainId: SupportedChainId | number
    bridgeToChainId: SupportedChainId | number
  }>({
    bridgeFromChainId: SupportedChainId.MAINNET,
    bridgeToChainId: SupportedChainId.ARBITRUM,
  })

  useEffect(() => {
    setBridgeIdState({
      bridgeFromChainId: chainId ? chainId : SupportedChainId.MAINNET,
      bridgeToChainId: chainId
        ? chainId === 1
          ? SupportedChainId.ARBITRUM
          : SupportedChainId.MAINNET
        : SupportedChainId.ARBITRUM,
    })
  }, [chainId])

  const {typedValue} = useBridgeState()

  const showNotEnoughBalanceFlow = useMemo(() => {
    if (!typedValue) return false
    if (!parsedLLBalance) return false
    return typedValue > parsedLLBalance ? true : false
  }, [parsedLLBalance, typedValue])

  const [approval, approveCallback] = useApproveCallback(
    typedValue !== '.' ? utils.parseUnits(typedValue ? typedValue : '0') : undefined,
    LAYER_ZERO_ADDRESS[bridgeFromChainId],
    ll,
  )

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval])

  const handleApprove = useCallback(async () => {
    if (!typedValue) {
      // throw new Error("missing position input size");
      return
    }
    setBridgeState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    approveCallback()
      .then(hash => {
        setBridgeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        })
      })
      .catch(error => {
        setBridgeState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [approveCallback, typedValue])

  const {estimatedFees, callback: bridgeTokenCallback} = useBridgeTokenCallback(
    LAYER_ZERO_ADDRESS[bridgeFromChainId],
    LAYER_ZERO_ADDRESS[bridgeToChainId],
    bridgeFromChainId,
    bridgeToChainId,
    typedValue ?? '0',
  )

  const handleBridge = useCallback(() => {
    if (!typedValue) throw new Error('missing bridge token input size')
    if (!bridgeTokenCallback) return
    bridgeTokenCallback()
  }, [bridgeTokenCallback, typedValue])

  const handleSwitch = () => {
    if (bridgeFromChainId === SupportedChainId.MAINNET) {
      setBridgeIdState({
        bridgeFromChainId: SupportedChainId.ARBITRUM,
        bridgeToChainId: SupportedChainId.MAINNET,
      })
    } else {
      setBridgeIdState({
        bridgeFromChainId: SupportedChainId.MAINNET,
        bridgeToChainId: SupportedChainId.ARBITRUM,
      })
    }
  }

  return (
    <BridgeContainer>
      <Title>Bridge</Title>
      <InterfaceContainer>
        <BridgeFromNetwork chainId={bridgeFromChainId} />
        <Icon margin="25px auto" clickable={true} onClick={handleSwitch}>
          <RefreshCw color="#71CEFF" />
        </Icon>
        <BridgeToNetwork chainId={bridgeToChainId} />
      </InterfaceContainer>
      {account ? (
        showApprovalFlow ? (
          <TriggerActionButton active={true} onClick={handleApprove}>
            Approve LL
          </TriggerActionButton>
        ) : (
          <TriggerActionButton
            active={typedValue ? true : false}
            isDisabled={typedValue ? false : true}
            onClick={typedValue ? handleBridge : () => null}
          >
            Bridge
          </TriggerActionButton>
        )
      ) : (
        <TriggerActionButton active={true} onClick={toggleWalletModal}>
          Connect Wallet
        </TriggerActionButton>
      )}
      <FlexRow justify="space-between" mt="24px">
        <TEXT.Supplemental>Estimated Fee</TEXT.Supplemental>
        <TEXT.Supplemental>
          {estimatedFees ? formatWeiToParsedNumber(estimatedFees, 18, 5) + ` ETH` : `-`}
        </TEXT.Supplemental>
      </FlexRow>
      <FlexRow justify="space-between" mt="24px">
        <TEXT.Supplemental>Time to transfer</TEXT.Supplemental>
        <TEXT.Supplemental>~15 min</TEXT.Supplemental>
      </FlexRow>
    </BridgeContainer>
  )
}

export default Bridge
