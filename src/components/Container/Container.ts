import styled from "styled-components";
import { Box } from 'rebass/styled-components';

export const PageContainer = styled.div<{ maxWidth?: string}>`
  max-width: ${({ maxWidth }) => ( maxWidth ? maxWidth : '900px')};
  margin: auto;
  margin-top: 48px;
  padding: 16px;

  
  > div {
    background: ${({ theme }) => (theme.bg1)} !important;
  }

  ${({ theme }) => theme.mediaWidth.minMedium`
    margin: 0 auto 48px;
  `};
`;

const FlexContainer = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
  borderTop?: string
}>`
  display: flex;
  position: relative;
  width: ${({ width }) => width ?? '100%'}; 
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  border-top: ${({ borderTop }) => borderTop ?? borderTop };
`;

export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`

export const FlexRow = styled(FlexContainer)`
  flex-direction: row;
`