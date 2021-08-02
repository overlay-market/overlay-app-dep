import { Link } from "rebass";
import styled from 'styled-components/macro';

export const MenuLink = styled(Link).attrs(props => ({
  target: props.target || '_blank',
  rel: props.rel || 'noopener noreferrer',
  src: props.src || ''
}))`
  text-decoration: none;
  cursor: pointer;
  color: ${({theme}) => theme.text1};
  width: 100%;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`;