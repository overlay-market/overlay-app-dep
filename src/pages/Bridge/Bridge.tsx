import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useArbitrumOvlBalance, useChainOvlBalance} from '../../state/wallet/hooks'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_LABELS} from '../../components/Web3Status/Web3Status'
import {TEXT} from '../../theme/theme'
import {FlexColumn, FlexRow} from '../../components/Container/Container'

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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const BridgeFromNetwork = ({chainId}: {chainId: SupportedChainId}) => {
  const bridgeFromNetworkBalance = useChainOvlBalance(chainId)
  const parsedBalance = bridgeFromNetworkBalance?.toFixed(4)

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
      </FlexColumn>
    </BridgeSelectorContainer>
  )
}

const BridgeToNetwork = ({chainId}: {chainId: SupportedChainId}) => {
  return (
    <BridgeSelectorContainer>
      <FlexRow>
        <TEXT.StandardBody>To</TEXT.StandardBody>
        <ChainSelection>{NETWORK_LABELS[chainId]}</ChainSelection>
      </FlexRow>
    </BridgeSelectorContainer>
  )
}

const Bridge = () => {
  const [{bridgeFromChain, bridgeToChain}, setBridgeState] = useState<{
    bridgeFromChain: SupportedChainId
    bridgeToChain: SupportedChainId
  }>({
    bridgeFromChain: SupportedChainId.MAINNET,
    bridgeToChain: SupportedChainId.GÖRLI,
  })

  const mainnetOvlBalance = useChainOvlBalance(SupportedChainId.MAINNET)
  const arbitrumOvlBalance = useChainOvlBalance(SupportedChainId.GÖRLI)

  console.log('mainnetOvlBalance', mainnetOvlBalance?.toFixed(4))
  console.log('arbitrumOvlBalance', arbitrumOvlBalance?.toFixed(4))

  return (
    <BridgeContainer>
      <Title>Bridge</Title>
      <InterfaceContainer>
        <BridgeFromNetwork chainId={bridgeFromChain} />
        <BridgeToNetwork chainId={bridgeToChain} />
      </InterfaceContainer>
    </BridgeContainer>
  )
}

export default Bridge
