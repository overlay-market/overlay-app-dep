import {PageContainer} from '../Container/Container'
import {PlanckCatLoader} from '../Loaders/Loaders'
import {FlexColumn} from '../Container/Container'
import {TEXT} from '../../theme/theme'

interface AccessDeniedProps {
  message: string
}

export enum AccessDeniedType {
  EXCEED_RISK_TOLERANCE = 'Unauthorized user access.',
  REJECT_SERVICE_AGREEMENT = 'Rejected Terms of Service.',
}

export const AccessDenied = ({message}: AccessDeniedProps) => {
  return (
    <PageContainer>
      <FlexColumn height={'80vh'} width={'200px'} m={'auto'} justify={'center'}>
        <PlanckCatLoader duration={5} width={25} />
        <TEXT.StandardBody>Access Denied:</TEXT.StandardBody>
        <TEXT.StandardBody>{message}</TEXT.StandardBody>
      </FlexColumn>
    </PageContainer>
  )
}
