import { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';
import { Icon } from '../Icon/Icon';

const AccordionWrapper = styled.div`
`;

const AccordionText = styled.div<{ fontFamily?: string }>`
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0;
`;

const Clickable = styled.div`
  display: flex;
  width: 100%;
`;

const Content = styled.div<{ isOpen: boolean}>`
  display: block;
  overflow: hidden;
  max-height: ${({ isOpen }) => ( isOpen ? '100vh' : '0vh' )};
`;
  
// display: ${({ isOpen }) => ( isOpen ? 'block' : 'none' )};
// transition: ${({ isOpen }) => ( isOpen ? 'max-height 0.35s cubic-bezier(0, 1, 0, 1);' : 'max-height 0.3s cubic-bezier(1, 0, 1, 0);' )};

export const AccordionSelection = styled.div`
  display: flex;
  font-size: 12px;
  padding: 0;
`;

export const Accordion = ({ 
  activeAccordionText,
  inactiveAccordionText,
  children,
  activeColor,
  inactiveColor,
}:{
  activeAccordionText: string | React.ReactNode
  inactiveAccordionText: string | React.ReactNode,
  children?: React.ReactNode
  activeColor?: string
  inactiveColor?: string
}) => {
  const [isOpen, setOpen] = useState(false);

  return(
    <AccordionWrapper>
      <Clickable onClick={() => setOpen(!isOpen)}>
        {isOpen ? (
          <AccordionText>
            {activeAccordionText}
          </AccordionText>
        ):(
          <AccordionText>
            {inactiveAccordionText}
          </AccordionText>
        )}
        <Icon 
          size={16} 
          margin={'auto 0 auto auto'} 
          color={isOpen ? activeColor : inactiveColor}
          transform={isOpen ? 'rotate(180deg)' : ''}
          > 
          <ChevronDown height={16} width={16} />
        </Icon>
      </Clickable>
      <Content isOpen={isOpen}>
        {children}
      </Content>
    </AccordionWrapper>
  )
};