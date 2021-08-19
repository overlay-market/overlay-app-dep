import React, { useState } from 'react';
import styled from 'styled-components';
import { MarketCard } from '../../components/Card/MarketCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto 16px;
`;

const Magic = ({
  children
}:{
  children: React.ReactNode
}) => {
  return (
    <Container>
      <MarketCard 
        title={'Make some magic'}
        align={'center'}
        >

      </MarketCard>
    </Container>
  )
};

export default Magic;