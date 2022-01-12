import styled from 'styled-components/macro';
import { Box } from 'rebass/styled-components';

export const Card = styled(Box)<{ 
  width?: string;
  padding?: string; 
  border?: string; 
  borderRadius?: string; 
  textAlign?: string 
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  text-align: ${({ textAlign }) => textAlign};
`
