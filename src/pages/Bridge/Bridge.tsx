import {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import {useChainOvlBalance} from '../../state/wallet/hooks'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_LABELS} from '../../components/Web3Status/Web3Status'
import {TEXT} from '../../theme/theme'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useBridgeActionHandlers, useBridgeState} from '../../state/bridge/hooks'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {TriggerActionButton} from '../../components/Button/Button'
import {useActiveWeb3React} from '../../hooks/web3'
import {useBridgeTokenCallback} from '../../hooks/useBridgeTokenCallback'
import {LAYER_ZERO_ADDRESS} from '../../constants/bridge'
import {utils} from 'ethers'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {useApproveCallback} from '../../hooks/useApproveCallback'
import {OVL} from '../../constants/tokens'

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
  font-size: 24px;
  color: #f0f0f0;
`

const InterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #71ceff;
  border-radius: 8px;
`

const BridgeSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ChainSelection = styled.div`
  background: #10131d;
  border-radius: 32px;
`

const SwitchButton = styled.button`
  margin: auto;
  width: 200px;
  outline: none;
  text-decoration: none;
  color: white;
`

const InputCurrency = styled.div``

const BridgeFromNetwork = ({chainId}: {chainId: SupportedChainId}) => {
  const bridgeFromNetworkBalance = useChainOvlBalance(chainId)
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
      <FlexRow>
        <TEXT.StandardBody>From</TEXT.StandardBody>
        <ChainSelection>{NETWORK_LABELS[chainId]}</ChainSelection>
      </FlexRow>
      <FlexColumn>
        <FlexRow justify="space-between">
          <TEXT.Supplemental>Send</TEXT.Supplemental>
          <TEXT.Supplemental>Max: {parsedBalance} OVL</TEXT.Supplemental>
        </FlexRow>
        <FlexRow justify="space-between">
          <NumericalInput
            align="left"
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
          />
          <InputCurrency>OVL</InputCurrency>
        </FlexRow>
      </FlexColumn>
    </BridgeSelectorContainer>
  )
}

const BridgeToNetwork = ({chainId}: {chainId: SupportedChainId}) => {
  const bridgeFromNetworkBalance = useChainOvlBalance(chainId)
  const parsedBalance = bridgeFromNetworkBalance?.toFixed(4)
  const {typedValue} = useBridgeState()
  return (
    <BridgeSelectorContainer>
      <FlexRow>
        <TEXT.StandardBody>To</TEXT.StandardBody>
        <ChainSelection>{NETWORK_LABELS[chainId]}</ChainSelection>
      </FlexRow>
      <FlexColumn>
        <FlexRow justify="space-between">
          <TEXT.Supplemental>Receive</TEXT.Supplemental>
          <TEXT.Supplemental>Balance: {parsedBalance} OVL</TEXT.Supplemental>
        </FlexRow>
        <FlexRow justify="space-between">
          <NumericalInput align="left" onUserInput={() => null} value={typedValue?.toString()} />
          <InputCurrency>OVL</InputCurrency>
        </FlexRow>
      </FlexColumn>
    </BridgeSelectorContainer>
  )
}

const Bridge = () => {
  const {account, chainId} = useActiveWeb3React()
  const ovl = chainId ? OVL[chainId] : undefined
  const [{bridgeFromChainId, bridgeToChainId}, setBridgeState] = useState<{
    bridgeFromChainId: SupportedChainId | number
    bridgeToChainId: SupportedChainId | number
  }>({
    bridgeFromChainId: SupportedChainId.MAINNET,
    bridgeToChainId: SupportedChainId.ARBITRUM,
  })

  useEffect(() => {
    setBridgeState({
      bridgeFromChainId: chainId ? chainId : SupportedChainId.MAINNET,
      bridgeToChainId: chainId
        ? chainId === 1
          ? SupportedChainId.ARBITRUM
          : SupportedChainId.MAINNET
        : SupportedChainId.ARBITRUM,
    })
  }, [chainId])

  const {typedValue} = useBridgeState()

  const [approval, approveCallback] = useApproveCallback(
    typedValue !== '.' ? utils.parseUnits(typedValue ? typedValue : '0') : undefined,
    LAYER_ZERO_ADDRESS[bridgeFromChainId],
    ovl,
  )

  console.log('approval: ', approval)

  const {estimatedFees, callback: bridgeTokenCallback} = useBridgeTokenCallback(
    LAYER_ZERO_ADDRESS[bridgeFromChainId],
    LAYER_ZERO_ADDRESS[bridgeToChainId],
    bridgeFromChainId,
    bridgeToChainId,
    typedValue ?? '0',
  )

  console.log('estimatedFees:', estimatedFees)
  const handleBridge = useCallback(() => {
    if (!typedValue) throw new Error('missing bridge token input size')
    if (!bridgeTokenCallback) return
    bridgeTokenCallback()
  }, [bridgeTokenCallback, typedValue])

  const handleSwitch = () => {
    if (bridgeFromChainId === SupportedChainId.MAINNET) {
      setBridgeState({
        bridgeFromChainId: SupportedChainId.ARBITRUM,
        bridgeToChainId: SupportedChainId.MAINNET,
      })
    } else {
      setBridgeState({
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
        <SwitchButton onClick={handleSwitch}>Switch</SwitchButton>
        <BridgeToNetwork chainId={bridgeToChainId} />
      </InterfaceContainer>
      {account ? (
        <TriggerActionButton onClick={handleBridge}>Bridge</TriggerActionButton>
      ) : (
        <TriggerActionButton>Connect Wallet</TriggerActionButton>
      )}
      <FlexRow justify="space-between">
        <TEXT.Supplemental>Estimated Fee</TEXT.Supplemental>
        <TEXT.Supplemental>
          {estimatedFees ? formatWeiToParsedNumber(estimatedFees, 18, 5) + ` ETH` : `-`}
        </TEXT.Supplemental>
      </FlexRow>
    </BridgeContainer>
  )
}

export default Bridge
