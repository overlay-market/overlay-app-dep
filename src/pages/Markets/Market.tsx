import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Column } from '../../components/Column/Column';
import { Row } from "../../components/Row/Row";
import { ContractAddresses } from '../../constants/addresses';

export const StyledContainer = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: 70px;
`

export const Header = styled.div`
  color: ${props => props.color || "white"};
  font-size: 16px;
  font-weight: 400;
`

export const HeaderDetail = styled.div`
  color: ${props => props.color || "white"};
  font-size: 20px;
  font-weight: 700;
`

const TOKEN_LABELS: { [tokenId in ContractAddresses | number]: string } = {
  [ContractAddresses.ETH_DAI]: 'ETH/DAI',
  [ContractAddresses.OVL_DAI]: 'OVL/DAI',
  [ContractAddresses.OVL_ETH]: 'OVL/ETH',
}

interface MarketHeaderProps {
  marketId: any
  nextSampleTime?: any
  marketPrice?: any
}

export const MarketHeader = ({marketId, marketPrice, nextSampleTime}: MarketHeaderProps) => {
  return (
    <Row>
      <Column width={'auto'} align={'left'} padding={'0 38px 0 0'}>
        <Header> {TOKEN_LABELS[marketId]} </Header>
        <HeaderDetail> TBD </HeaderDetail>
      </Column>
      <Column width={'auto'} align={'left'}>
        <Header color={'#10DCB1'}>Next sample time:</Header>
        <HeaderDetail> 09:15 </HeaderDetail>
      </Column>
    </Row>
  )
}

export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId?: string }>
) {

  console.log('marketId : ', marketId);
  return (
    <StyledContainer>
      <MarketHeader marketId={marketId} />
    </StyledContainer>
  )
};
