import { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { TOKEN_LABELS } from '../../../constants/tokens';
import { BuildInterface } from './Build';
import { usePositionActionHandlers } from '../../../state/positions/hooks';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 0 32px;
  padding: 16px;
  position: static;
  z-index: 0;
  color: white;

  ${({ theme }) => theme.mediaWidth.minMedium`
    padding: 16px 0;
    position: relative;
    margin: 0 auto 32px;
  `};
`;


export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId: string }>
) {

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
