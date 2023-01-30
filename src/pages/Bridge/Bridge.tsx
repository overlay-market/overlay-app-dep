import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useArbitrumOvlBalance} from '../../state/wallet/hooks'

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

const Bridge = () => {
  const [{bridgeFromChain, bridgeToChain}, setBridgeState] = useState<{
    bridgeFromChain: string
    bridgeToChain: string
  }>({
    bridgeFromChain: 'Ethereum',
    bridgeToChain: 'Arbitrum',
  })

  const arbitrumOvlBalance = useArbitrumOvlBalance()

  console.log('arbitrumOvlBalance', arbitrumOvlBalance?.toFixed(4))

  return (
    <BridgeContainer>
      <Title>Bridge</Title>
      <InterfaceContainer></InterfaceContainer>
    </BridgeContainer>
  )
}

export default Bridge
