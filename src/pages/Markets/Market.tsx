import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Column } from '../../components/Column/Column';

export const StyledContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 70px;
`

interface MarketHeaderProps {
  marketId: any
  nextSampleTime?: any
}

export const MarketHeader = ({marketId, nextSampleTime}: MarketHeaderProps) => {
  return (
    <Column width={'auto'}>
      {marketId}
    </Column>
  )
}

export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId?: string }>
) {

  console.log('marketId : ', marketId);
  return (
    <StyledContainer>
      <MarketHeader marketId={marketId} />
    </StyledContainer>
  )
};
