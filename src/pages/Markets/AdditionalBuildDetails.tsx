import { useMemo } from "react";
import styled from "styled-components";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { formatWeiToParsedNumber } from "../../utils/formatWei";
import Loader from "../../components/Loaders/Loaders";

const ContentContainer = styled(FlexColumn)`
  padding: 0 16px;
  margin-top: 64px;
`;

const AdditionalDetailRow = styled(FlexRow)`
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
  isInverseMarket,
  isLong,
  baseToken,
  quoteToken,
  typedValue,
  estimatedBid,
  estimatedAsk,
  bidPrice,
  askPrice,
  midPrice,
  fee,
  oiCap,
  capPayoff,
  oiLong,
  oiShort,
  slippageTolerance,
  expectedOi,
  fundingRate,
  estLiquidationPrice,
}: {
  isInverseMarket?: boolean | null;
  isLong?: boolean;
  baseToken?: string;
  quoteToken?: string;
  typedValue?: string;
  estimatedBid?: any;
  estimatedAsk?: any;
  bidPrice?: string | number | any;
  askPrice?: string | number | any;
  midPrice?: string | number;
  fee?: string | number;
  oiCap?: number | null;
  capPayoff?: number;
  oiLong?: number;
  oiShort?: number;
  slippageTolerance?: string | number;
  expectedOi?: string | number | null;
  fundingRate?: string | number;
  estLiquidationPrice?: string | number;
}) => {

  const estimatedReceivedPrice = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined) return null;
    return isLong ? formatWeiToParsedNumber(estimatedAsk, 18, 2) : formatWeiToParsedNumber(estimatedBid, 18, 2);
  }, [isLong, estimatedBid, estimatedAsk])

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null;
    if (!typedValue || isLong === undefined || bidPrice === undefined || askPrice === undefined) return null;
    if (bidPrice === 'loading' || askPrice === 'loading') return <Loader stroke="white" size="12px" />;

    const priceImpactValue = isLong ? estimatedReceivedPrice - askPrice : bidPrice - estimatedReceivedPrice;
    const priceImpactPercentage = isLong ? (priceImpactValue / askPrice) * 100 : (priceImpactValue / bidPrice) * 100;

    return priceImpactPercentage.toFixed(2);
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice]);

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
          Est. Received Price
        </PositionDetailType>
        <DetailValue> 
          { estimatedReceivedPrice ? estimatedReceivedPrice : '-' }
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Price Impact
        </PositionDetailType>
        <DetailValue> 
          { priceImpact ? `${priceImpact}%` : `-` }
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Slippage Tolerance
        </PositionDetailType>
        <DetailValue> 
          {slippageTolerance}% 
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
          {expectedOi && baseToken && quoteToken ? 
            expectedOi + ' ' + (isInverseMarket ? baseToken : quoteToken)
            : '-'
          } 
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
          {oiLong || oiLong === 0 ? oiLong : <Loader stroke="white" size="12px" /> }
           / 
          {oiCap || oiCap === 0 ? oiCap : <Loader stroke="white" size="12px" /> }
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
          {oiShort || oiShort === 0 ? oiShort : <Loader stroke="white" size="12px" /> }
           / 
          {oiCap || oiCap === 0 ? oiCap : <Loader stroke="white" size="12px" /> }
        </OpenInterestValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType> 
          Funding Rate 
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