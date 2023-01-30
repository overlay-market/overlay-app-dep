import {useState, useEffect} from 'react'
import styled from 'styled-components'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Bridge = () => {
  const [{bridgeFromChain, bridgeToChain}, setBridgeState] = useState<{
    bridgeFromChain: string
    bridgeToChain: string
  }>({
    bridgeFromChain: 'Ethereum',
    bridgeToChain: 'Arbitrum',
  })

  return <BridgeContainer>Bridge</BridgeContainer>
}

export default Bridge
