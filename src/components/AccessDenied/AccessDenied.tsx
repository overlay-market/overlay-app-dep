import styled from 'styled-components'
import {PlanckCatLoader} from '../Loaders/Loaders'
import {FlexColumn} from '../Container/Container'
import {TEXT} from '../../theme/theme'

const MessageContainer = styled(FlexColumn)`
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px 16px 24px;
  background: #1b2131;
  width: 300px;
  margin: auto;
`

interface AccessDeniedProps {
  message: string
}

export enum AccessDeniedType {
  EXCEED_RISK_TOLERANCE = 'Unauthorized user access.',
  REJECT_SERVICE_AGREEMENT = 'Rejected Terms of Service.',
}

export const AccessDenied = ({message}: AccessDeniedProps) => {
  return (
    <FlexColumn height="100vh">
      <MessageContainer>
        <PlanckCatLoader duration={5} width={25} />
        <TEXT.StandardBody>Access Denied:</TEXT.StandardBody>
        <TEXT.StandardBody>{message}</TEXT.StandardBody>
      </MessageContainer>
    </FlexColumn>
  )
}
