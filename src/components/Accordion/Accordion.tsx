import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Icon } from '../Icon/Icon';
import styled from 'styled-components';

const AccordionWrapper = styled.div`

`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0;
`;

const Clickable = styled.div`
  display: flex;
  width: 100%
`;

const Content = styled.div<{ isOpen: boolean}>`
  overflow: hidden;
  transition: ${({isOpen}) => (isOpen ? 'max-height 0.35s cubic-bezier(0, 1, 0, 1);' : 'max-height 0.3s cubic-bezier(1, 0, 1, 0);')};
  height: ${({isOpen}) => (isOpen ? 'auto' : 0)};
  max-height: 9999px;
`;

export const AccordionSelection = styled.div`
  display: flex;
  font-size: 12px;
  padding: 0;
`;

export const Accordion = ({ 
  title,
  children
}:{
  title: string
  children?: React.ReactNode
}) => {
  const [isOpen, setOpen] = useState(false);

  return(
    <AccordionWrapper>
      <Clickable onClick={() => setOpen(!isOpen)}>
        <Title> {title} </Title>
        <Icon size={16} margin={'auto 0 auto auto'}> 
          { isOpen ? (
            <ChevronUp height={16} width={16}/>
          ):(
            <ChevronDown height={16} width={16}/>
          )}
        </Icon>
      </Clickable>
      <Content isOpen={isOpen}>
        {children}
      </Content>
    </AccordionWrapper>
  )
};