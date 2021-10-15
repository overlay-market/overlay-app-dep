import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';

export function Position(
  { match: {params: { positionId }}
}: RouteComponentProps<{ positionId: string }>
) {
  return (
    <div>
      {positionId}
    </div>
  )
};