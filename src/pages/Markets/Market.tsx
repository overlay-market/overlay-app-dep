import React from 'react';
import { RouteComponentProps, useParams } from 'react-router';

export function Market(
  { match: 
  {
    params: { marketId }
  }
}: RouteComponentProps<{ marketId?: string }>
) {

  // let { marketId } = useParams();
  console.log('marketId : ', marketId);
  return (
    <>
      Hello
    </>
  )
};
