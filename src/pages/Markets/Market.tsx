import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
interface MarketHeaderProps {
  marketId: any
  nextSampleTime?: any
}

export const MarketHeader = ({marketId, nextSampleTime}: MarketHeaderProps) => {
  return (
    <>
      {marketId}
    </>
  )
}

export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId?: string }>
) {

  console.log('marketId : ', marketId);
  return (
    <>
      <MarketHeader marketId={marketId} />
    </>
  )
};
