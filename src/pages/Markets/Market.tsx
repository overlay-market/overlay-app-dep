import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Column } from '../../components/Column/Column';
import { Row } from "../../components/Row/Row";
import { ContractAddresses } from '../../constants/addresses';
import { BuildPosition } from './BuildPosition';
import { ChevronRight } from 'react-feather';
import { TEXT } from '../../theme/theme';
import { Box as MarketBodyContainer } from 'rebass';
import { NavLink } from 'react-router-dom';
import { MarketPositions } from './MarketPositions';
import { MarketLiquidate } from './MarketLiquidate';

export const MarketHeaderContainer = styled(Row)`
  border-top: 1px solid ${({theme}) => theme.white1};
  max-width: 900px;
  padding-top: 48px;
  margin-top: 24px;
  width: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  align-items: start;
`;

export const Header = styled.div`
  color: ${props => props.color || "white"};
  font-size: 14px;
  font-weight: 400;
`;

export const HeaderDetail = styled.div`
  color: ${props => props.color || "white"};
  font-weight: 700;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
`;

export const StyledArrow = styled(ChevronRight)`
  margin-top: auto;
`;

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
    <MarketHeaderContainer>
      <Column 
        width={'auto'} 
        align={'left'} 
        padding={'0 16px 0'}
        >
        <Header> 
          {TOKEN_LABELS[marketId]} 
        </Header>
        <HeaderDetail> 
          $TBD 
        </HeaderDetail>
      </Column>
      <Column 
        width={'auto'} 
        align={'left'} 
        padding={'0 16px 0'}
        >
        <Header>
          Next sample time:
        </Header>
        <HeaderDetail> 
          09:15 
        </HeaderDetail>
      </Column>
      <Column 
        width={'auto'} 
        align={'left'} 
        padding={'0 16px 0'}
        >
        <Header>
          Open interest available LONG
        </Header>
        <TEXT.Small 
          color={'white'} 
          fontWeight={700}
          mt={'2px'}
          >
            0 out of 1000
          </TEXT.Small>
      </Column>
      <Column 
        width={'auto'} 
        align={'left'} 
        padding={'0 16px 0'}
        >
        <Header>
          Funding rate:
        </Header>
        <TEXT.Small 
          color={'#10DCB1'} 
          fontWeight={700}
          mt={'2px'}
          >
            ~0.0026%
        </TEXT.Small>
      </Column>
      {/* <Row 
        width={'auto'} 
        padding={'0 16px 0'}
        >
        <StyledLink to="/markets">
          <TEXT.Body>Back</TEXT.Body>
        </StyledLink>
        <StyledArrow color={'white'} size={16}/>
      </Row> */}
    </MarketHeaderContainer>
  )
}


export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId?: string }>
) {

  console.log('marketId : ', marketId);
  return (
    <>
      <MarketHeader marketId={marketId} />
      <MarketBodyContainer ml={'auto'} mr={'auto'} mb={'16px'} maxWidth={'500px'}>
        <BuildPosition />
        <MarketPositions />
        <MarketLiquidate />
      </MarketBodyContainer>
    </>
  )
};
