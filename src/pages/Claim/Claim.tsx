import styled from 'styled-components'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {FlexRow, FlexColumn} from '../../components/Container/Container'
import {shortenAddress} from '../../utils/web3'

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
  padding: 16px;
  border-radius: 8px;
`

const ClaimModal = () => {
  const {account, chainId, error} = useActiveWeb3React()
  return (
    <ClaimModalContainer>
      <FlexRow>
        <TEXT.SmallBody>Claim OVL</TEXT.SmallBody>
        <TEXT.SmallBody>{account ? shortenAddress(account) : 'Not connected'}</TEXT.SmallBody>
      </FlexRow>
    </ClaimModalContainer>
  )
}
const Claim = () => {
  const {account, chainId, error} = useActiveWeb3React()
  return (
    <BridgeContainer>
      <ClaimModal></ClaimModal>
    </BridgeContainer>
  )
}

export default Claim
