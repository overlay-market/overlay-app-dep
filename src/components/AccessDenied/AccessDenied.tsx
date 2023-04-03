import styled from 'styled-components'
import {ExternalLink} from '../ExternalLink/ExternalLink'
import {FlexColumn} from '../Container/Container'
import {TEXT} from '../../theme/theme'

const MessageContainer = styled(FlexColumn)`
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 16px 16px 24px;
  background: #1b2131;
  margin: auto;
  max-width: 400px;
`

interface AccessDeniedProps {
  message: AccessDeniedType | string
}

export enum AccessDeniedType {
  EXCEED_RISK_TOLERANCE = 'Unauthorized user access.',
  REJECT_SERVICE_AGREEMENT = 'Rejected Terms of Service.',
}

export const AccessDenied = ({message}: AccessDeniedProps) => {
  return (
    <FlexColumn height="100vh">
      <MessageContainer>
        <TEXT.BoldHeader1 textAlign="center">Service Not Available In Your Region</TEXT.BoldHeader1>
        <TEXT.StandardBody textAlign="center" mt="12px">
          For compliance reasons, service is not available in your region.
        </TEXT.StandardBody>
        <TEXT.StandardBody textAlign="center" mt="12px">
          Use of Tor, VPN, proxies or other means to circumvent this restriction is a violation of our
          <ExternalLink href={'https://overlay.market/#/tos'}>
            <TEXT.StandardBody color={'#12b4ff'}>Terms of Service.</TEXT.StandardBody>
          </ExternalLink>
        </TEXT.StandardBody>
        {/* <TEXT.StandardBody>{message}</TEXT.StandardBody> */}
      </MessageContainer>
    </FlexColumn>
  )
}
