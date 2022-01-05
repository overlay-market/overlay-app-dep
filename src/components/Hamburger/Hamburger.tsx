import React from 'react';
import styled from 'styled-components';
import { bool, func } from 'prop-types';

export const StyledBurger = styled.button<{open: boolean}>`
  position: block;
  top: 5%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 69;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  span {
    width: ${({ open }) => ( open ? '17px' : '4px' )};
    height: ${({ open }) => ( open ? '2px' : '4px' )};
    background: ${({ theme, open }) => open ? theme.white: theme.white};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 0px;
    margin: ${({ open }) => ( open ? '2px 0' : '1px 0' )};
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  ${({ theme }) => theme.mediaWidth.minSmall`
    display: none;
  `};
`;

const Burger = ({ 
  open, 
  setOpen, 
  ...props 
}:{
  open: boolean
  setOpen: Function
  props?: any
}
) => {
  
  const isExpanded = open ? true : false;
  
  return (
    <StyledBurger aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span />
      <span />
      <span />
    </StyledBurger>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
