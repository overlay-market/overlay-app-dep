import styled from 'styled-components'
import {TEXT} from '../../theme/theme'

const BridgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  margin-top: 64px;
  color: white;
`

const ClaimModal = styled.div`
  display: flex;
  flex-direction: column;
  background: #1b2131;
  border: 1px solid #71ceff;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px;
  border-radius: 8px;
`

const Claim = () => {
  return (
    <BridgeContainer>
      <ClaimModal>
        <TEXT.SmallBody>Claim OVL</TEXT.SmallBody>
      </ClaimModal>
    </BridgeContainer>
  )
}

export default Claim
