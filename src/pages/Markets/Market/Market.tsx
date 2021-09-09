import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Row } from "../../../components/Row/Row";
import { TOKEN_LABELS } from '../../../constants/tokens';
import { BuildPosition } from './BuildPosition';
import { MarketPositions } from './MarketPositions';
import { InfoTip } from '../../../components/InfoTip/InfoTip';
import { Breadcrumbs } from '../../../components/Breadcrumbs/Breadcrumbs';
import { TEXT } from '../../../theme/theme';
import { Accordion } from '../../../components/Accordion/Accordion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto 32px;
  padding: 16px;
  position: static;
  border-top: 2px solid #12B4FF;
  z-index: 0;

  ${({ theme }) => theme.mediaWidth.minMedium`
    padding: 16px 0;
    position: relative;
  `};
`;

const BannerContainer = styled.div`
  position: static; 
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ theme }) => theme.mediaWidth.minMedium`
    position: absolute;
    left: 0;
    top: 0;
  `};
`;

const BannerItem = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 0 24px; 
  width: 50%;

  ${({ theme }) => theme.mediaWidth.minMedium`
    margin: 32px 0;
  `}; 
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

const DesktopHeader = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.minMedium`
    display: flex;
    width: 500px;
    margin: 0 auto 16px;
  `};
`;

const MobileHeader = styled.div`
  display: flex;
  margin: 16px 0;

  ${({ theme }) => theme.mediaWidth.minMedium`
    display: none;
  `};
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  ${({ theme }) => theme.mediaWidth.minMedium`
    flex-direction: column;
  `};
`;

const MobileDisplay = styled.div`

  ${({ theme }) => theme.mediaWidth.minMedium`
    display: none;
  `}
`;

const MarketTitle = styled.div`
  font-size: 20px;
  text-shadow: 0 0 2px white;
  color: white;
  font-weight: 700;
  margin-right: 8px;
`;

export const MarketDetails = ({
  marketId, 
  openInterest,
  fundingRate
}:{
  marketId: string
  openInterest: number
  fundingRate: number
}) => {
  let marketName = TOKEN_LABELS[Number(marketId)];

  let mobileMarketHeader = (
    <>
        <MobileHeader>
            <MarketTitle> { marketName } </MarketTitle>

            <TEXT.MediumHeader 
                fontWeight={300} 
                color={'white'}
                > 
                $2241.25 
            </TEXT.MediumHeader>
        </MobileHeader>
    </>
    );

  return (
    <BannerContainer>
      <Breadcrumbs padding={'16px 0'} />

      <MobileDisplay>
        <Accordion 
          title={mobileMarketHeader}
          inactiveColor={'#FFF'}
          activeColor={'#12B4FF'}
          >
          <FlexWrap>
            <BannerItem>
              <Title> 
                OI {Math.sign(openInterest) === -1 ? ('SHORT') : ('LONG')}
              </Title>
              <Content> {openInterest}/1000 </Content>
            </BannerItem>

            <BannerItem>
              <Title> 
                Funding rate: 
                <InfoTip tipFor={'Positions'}>
                    <div>
                      ultra meow
                    </div>
                </InfoTip>
              </Title>
              <Content color={'#10DCB1'}> ~ {fundingRate}% </Content>
            </BannerItem>

            <BannerItem>
              <Title> 
                Bid +/- 1%
              </Title>
              <Content> ~$2241.25 </Content>
            </BannerItem>

            <BannerItem>
              <Title> 
                Bid +/- 1%
              </Title>
              <Content> ~$2241.25 </Content>
            </BannerItem>
          </FlexWrap>
        </Accordion>
      </MobileDisplay>
    </BannerContainer>
  )
};


export function Market(
  { match: {params: { marketId }}
}: RouteComponentProps<{ marketId: string }>
) {
  let marketName = TOKEN_LABELS[Number(marketId)];

  return (
    <>
      <Container>
        <MarketDetails
            marketId={marketId}
            openInterest={-200}
            fundingRate={-0.029}
            />
        <DesktopHeader>
          <TEXT.MediumHeader 
              fontWeight={700} 
              color={'white'}
              mr={'8px'}
              > 
              { marketName } 
          </TEXT.MediumHeader>

          <TEXT.MediumHeader 
              fontWeight={300} 
              color={'white'}
              > 
              $2241.25 
          </TEXT.MediumHeader>
        </DesktopHeader>
        <BuildPosition />
        <MarketPositions />
      </Container>
    </>
  )
};
