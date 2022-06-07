import { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { BuildInterface } from './Build';
import { usePositionActionHandlers } from '../../state/positions/hooks';
import { InterfaceWrapper } from '../../components/Container/Container';

export function Market({ match: {params: { marketId }}}: RouteComponentProps<{ marketId: string }>) {
  const { onResetBuildState } = usePositionActionHandlers();

  useEffect(() => {
    onResetBuildState();
  }, [marketId, onResetBuildState]);

  return (
    <InterfaceWrapper>
      <BuildInterface marketId={marketId} />
    </InterfaceWrapper>
  )
};
