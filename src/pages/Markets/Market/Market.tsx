import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Row } from "../../../components/Row/Row";
import { ContractAddresses } from '../../../constants/addresses';
import { BuildPosition } from './BuildPosition';
import { MarketPositions } from './MarketPositions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto 16px;
`;

const BannerContainer = styled(Row)`
  border-top: 1px solid ${({theme}) => theme.white1};
  max-width: 900px;
  padding: 48px;
  width: auto;
  justify-content: space-between;
  margin: 24px auto 0;
  align-items: start;
`;

const BannerItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Title = styled.div`
  color: white;
  font-size: 14px;
`;

const Content = styled.div<{color?: string}>`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme, color}) => (color ? color : theme.text1)};
`;

const TOKEN_LABELS: { [tokenId in ContractAddresses | number]: string } = {
  [ContractAddresses.ETH_DAI]: 'ETH/DAI',
  [ContractAddresses.OVL_DAI]: 'OVL/DAI',
  [ContractAddresses.OVL_ETH]: 'OVL/ETH',
}


export const MarketHeader = ({
  marketId, 
  marketPrice, 
  nextSampleTime,
  openInterest,
  fundingRate
}:{
  marketId: string
  marketPrice: string
  nextSampleTime: string
  openInterest: number
  fundingRate: number
}) => {
  let marketName = TOKEN_LABELS[Number(marketId)];

  return (
    <BannerContainer>
      <BannerItem>
        <Title> {marketName} </Title>
        <Content> {marketPrice} </Content>
      </BannerItem>

      <BannerItem>
        <Title> Next sample time </Title>
        <Content> {nextSampleTime} </Content>
      </BannerItem>

      <BannerItem>
        <Title> 
          Open interest available {Math.sign(openInterest) === -1 ? ('SHORT') : ('LONG')}
        </Title>
        <Content> {openInterest}/1000 </Content>
      </BannerItem>

      <BannerItem>
        <Title> Funding rate: </Title>
        <Content color={'#10DCB1'}> ~ {fundingRate}% </Content>
      </BannerItem>
    </BannerContainer>
  )
};


export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId: string }>
) {

  return (
    <>
    <MarketHeader
      marketId={marketId}
      marketPrice={'$2241.25'}
      nextSampleTime={'1:00'}
      openInterest={-200}
      fundingRate={-0.029}
      />
      <Container>
        <BuildPosition />
        <MarketPositions />
      </Container>
    </>
  )
};
