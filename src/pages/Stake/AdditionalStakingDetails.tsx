import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'

const ContentContainer = styled(FlexColumn)`
  padding: 0 16px;
  margin-top: 16px;
`

const AdditionalDetailRow = styled(FlexRow)`
  width: 100%;
  display: flex;
  margin: 8px 0;
`

export const PositionDetailType = styled.div`
  color: #f2f2f2;
  font-size: 14px;
  font-weight: 700;
`

export const DetailValue = styled.div<{color?: string}>`
  color: ${({color}) => (color ? color : '#f2f2f2')};
  display: flex;
  font-size: 14px;
  margin-left: auto;
  flex-direction: row;
`

export const AdditionalStakingDetails = ({
  stakingApr,
}: {
  stakingApr?: string | number
}) => {
  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <PositionDetailType>My stake</PositionDetailType>
        <DetailValue>-</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>APR</PositionDetailType>
        <DetailValue>- %</DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
