import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useArbitrumOvlBalance, useChainOvlBalance} from '../../state/wallet/hooks'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_LABELS} from '../../components/Web3Status/Web3Status'
import {TEXT} from '../../theme/theme'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
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

const ChainSelectionContainer = styled.div`
  display: flex;
`

const BridgeSelectorContainer = styled.div`
  display: flex;
  flex-container: column;
`

const ChainSelection = styled.div`
  background: #10131d;
  border-radius: 32px;
`

const BridgeFromNetwork = ({chainId}: {chainId: any}) => {
  return (
    <BridgeSelectorContainer>
      <ChainSelectionContainer>
        <TEXT.StandardBody>From</TEXT.StandardBody>
        <ChainSelection>{NETWORK_LABELS[chainId]}</ChainSelection>
      </ChainSelectionContainer>
    </BridgeSelectorContainer>
  )
}

const BridgeToNetwork = ({chainId}: {chainId: any}) => {
  return (
    <BridgeSelectorContainer>
      <ChainSelectionContainer>
        <TEXT.StandardBody>To</TEXT.StandardBody>
        <ChainSelection>{NETWORK_LABELS[chainId]}</ChainSelection>
      </ChainSelectionContainer>
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
