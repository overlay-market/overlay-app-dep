import { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { BuildInterface } from './Build';
import { usePositionActionHandlers } from '../../state/positions/hooks';

export const Container = styled.div`
  display: flex !important;
  flex-direction: column;
  z-index: 0;
  color: white;
  padding: 16px;
  margin: 0 auto 32px;
  max-width: 350px;
  position: static;

  ${({ theme }) => theme.mediaWidth.minMedium`
    padding: 16px 0;
    position: relative;
    margin: 0 auto 32px;
  `};
`;

export function Market({ match: {params: { marketId }}}: RouteComponentProps<{ marketId: string }>) {
  const { onResetBuildState } = usePositionActionHandlers();

  useEffect(() => {
    onResetBuildState();
  }, [marketId, onResetBuildState]);

  return (
    <>
      <Container>
        <BuildInterface 
          marketId={marketId}
          marketPrice={'2241.25'}
        />
      </Container>
    </>
  )
};
