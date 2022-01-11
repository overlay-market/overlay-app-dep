import { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';
import { Icon } from '../Icon/Icon';

const AccordionWrapper = styled.div`
`;

const AccordionText = styled.div<{ color?: string }>`
  font-weight: 700;
  font-size: 14px;
  margin: 12px 6px 12px 0px;
  color: ${({ color }) => ( color )}
`;

const ClickableDropdown = styled.div<{ width?: string; clickableMargin?: string }>`
  width: ${({ width }) => ( width ? width : '100%' )};
  margin: ${({ clickableMargin }) => ( clickableMargin ? clickableMargin : 'auto' )};
  display: flex;
`;

const Content = styled.div<{ isOpen: boolean}>`
  max-height: ${({ isOpen }) => ( isOpen ? '100vh' : '0vh' )};
  overflow: hidden;
  display: block;
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
  width,
  clickableMargin
}:{
  activeAccordionText: string | React.ReactNode
  inactiveAccordionText: string | React.ReactNode,
  children?: React.ReactNode
  activeColor?: string
  inactiveColor?: string
  width?: string
  clickableMargin?: string
}) => {
  const [isOpen, setOpen] = useState(false);

  return(
    <AccordionWrapper>
      <ClickableDropdown 
        onClick={() => setOpen(!isOpen)}
        clickableMargin={clickableMargin}
        width={width}
        >
        {isOpen ? (
          <AccordionText color={activeColor}>
            {activeAccordionText}
          </AccordionText>
        ):(
          <AccordionText color={inactiveColor}>
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
      </ClickableDropdown>
      <Content isOpen={isOpen}>
        {children}
      </Content>
    </AccordionWrapper>
  )
};