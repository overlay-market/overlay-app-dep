import styled from 'styled-components/macro';
import { Box } from 'rebass/styled-components';
import { string } from 'prop-types';

const Row = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  display: flex;
  flex-direction: row;
  width: ${({ width }) => width ?? '100%'}; 
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`