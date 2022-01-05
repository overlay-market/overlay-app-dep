import styled from 'styled-components/macro';
import { Link as RebassLink } from "rebass";
import { Link } from "react-router-dom";

export const MenuLink = styled(RebassLink).attrs(props => ({
  target: props.target || '_blank',
  rel: props.rel || 'noopener noreferrer',
  src: props.src || ''
}))`
  text-decoration: none;
  cursor: pointer;
  color: ${({theme}) => theme.text1};
  width: 100%;
  display: flex;
  
  :hover {
    text-decoration: none;
  }

  :focus {
    outline: none;
    text-decoration: none;
  }

  :active {
    text-decoration: none;
  }
`;

export const StyledLink = styled(Link)`
  cursor: pointer;
  position: absolute;
`;