import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { BuildInterface } from './Build';
import { useBuildActionHandlers } from '../../state/build/hooks';
import { InterfaceWrapper } from '../../components/Container/Container';

export function Market({ match: {params: { marketId }}}: RouteComponentProps<{ marketId: string }>) {
  const { onResetBuildState } = useBuildActionHandlers();

  useEffect(() => {
    onResetBuildState();
  }, [marketId, onResetBuildState]);

  return (
    <InterfaceWrapper>
      <BuildInterface marketId={marketId} />
    </InterfaceWrapper>
  )
};
