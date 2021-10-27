import styled from "styled-components";

export const StyledContainer = styled.div<{ maxWidth?: string}>`
  max-width: ${({ maxWidth }) => ( maxWidth ? maxWidth : '900px')};
  margin: auto;
  margin-top: 48px;
  padding: 16px;

  > div {
    background: ${({ theme }) => (theme.bg1)} !important;
  }
`;