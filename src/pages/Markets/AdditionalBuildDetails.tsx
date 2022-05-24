import styled from "styled-components";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import Loader from "../../components/Loaders/Loaders";

const ContentContainer = styled(FlexColumnContainer)`
  padding: 0 16px;
  margin-top: 64px;
`;

const AdditionalDetailRow = styled(FlexRowContainer)`
  width: 100%;
  display: flex;
  margin: 12px 0;
`;

export const PositionDetailType = styled.div`
  color: #b9babd;
  font-size: 14px;
  font-weight: 700;
`;

export const DetailValue = styled.div<{ color?: string }>`
  color: ${({ color }) => (color ? color : "#B9BABD")};
  display: flex;
  font-size: 14px;
  margin-left: auto;
  flex-direction: row;
  `;
  
  export const OpenInterestValue = styled.div`
  color: #b9babd;
  font-size: 14px;
  min-width: 130px;
  text-align: right;
`;

export const AdditionalDetails = ({
  bidPrice,
  askPrice,
  midPrice,
  fee,
  oiCap,
  capPayoff,
  oiLong,
  oiShort,
  slippage,
  expectedOi,
  fundingRate,
  estLiquidationPrice,
}: {
  bidPrice?: string | number;
  askPrice?: string | number;
  midPrice?: string | number;
  fee?: string | number;
  oiCap?: number | null;
  capPayoff?: number;
  oiLong?: number;
  oiShort?: number;
  slippage?: string | number;
  expectedOi?: string | number;
  fundingRate?: string | number;
  estLiquidationPrice?: string | number;
}) => {
  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <PositionDetailType> 
          Fee 
        </PositionDetailType>
        <DetailValue> 
          {fee === 'loading' ? (
             <Loader stroke="white" size="12px" />
           ):(
            `${fee}%`
           )}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Slippage 
        </PositionDetailType>
        <DetailValue> 
          {slippage}% 
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Bid 
        </PositionDetailType>
        <DetailValue>
          {bidPrice === 'loading' ? (
             <Loader stroke="white" size="12px" />
           ):(
            bidPrice
           )}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Ask 
        </PositionDetailType>
        <DetailValue> 
          {askPrice === 'loading' ? (
             <Loader stroke="white" size="12px" />
           ):(
            askPrice
           )}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Est. Liquidation Price
        </PositionDetailType>
        <DetailValue> 
          {estLiquidationPrice} 
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Expected OI 
        </PositionDetailType>
        <DetailValue> 
          {expectedOi}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          OI Long 
        </PositionDetailType>
        <ProgressBar
          value={oiLong}
          max={oiCap}
          width={"75px"}
          color={"#10DCB1"}
          margin={"0 0 0 auto"}
        />
        <OpenInterestValue>
          {oiLong ? oiLong : <Loader stroke="white" size="12px" /> }
           / 
          {oiCap ? oiCap : <Loader stroke="white" size="12px" /> }
        </OpenInterestValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          OI Short 
        </PositionDetailType>
        <ProgressBar
          value={oiShort}
          max={oiCap}
          width={"75px"}
          color={"#DC1F4E"}
          margin={"0 0 0 auto"}
        />
        <OpenInterestValue>
          {oiShort ? oiShort : <Loader stroke="white" size="12px" /> }
           / 
          {oiCap ? oiCap : <Loader stroke="white" size="12px" /> }
        </OpenInterestValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Funding rate 
        </PositionDetailType>
        <DetailValue color={"#10DCB1"}>
           {fundingRate === 'loading' ? (
             <Loader stroke="white" size="12px" />
           ):(
             fundingRate
           )}
        </DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  );
};