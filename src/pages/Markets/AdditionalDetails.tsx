import styled from "styled-components";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";

const Container = styled(FlexColumnContainer)`
  margin-top: 64px;
  padding: 0 16px;
`;

const AdditionalDetailRow = styled(FlexRowContainer)`
  margin: 12px 0;
  width: 100%;
  display: flex;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #b9babd;
`;

export const Content = styled.div<{ color?: string }>`
  margin-left: auto;
  flex-direction: row;
  display: flex;
  font-size: 14px;
  color: ${({ color }) => (color ? color : "#B9BABD")};
`;

export const OpenInterestValue = styled.div`
  font-size: 14px;
  text-align: right;
  min-width: 130px;
  color: #b9babd;
`;

const AdditionalDetails = ({
  fee,
  slippage,
  estLiquidationPrice,
  bid,
  ask,
  expectedOi,
  oiLong,
  oiShort,
  oiCap,
  fundingRate,
}: {
  fee?: string | number;
  slippage?: string | number;
  estLiquidationPrice?: string | number;
  bid?: string | number;
  ask?: string | number;
  expectedOi?: string | number;
  oiLong?: number | undefined;
  oiShort?: number | undefined;
  oiCap?: number | undefined;
  fundingRate?: string | number;
}) => {
  return (
    <Container>
      <AdditionalDetailRow>
        <Title> Fee </Title>
        <Content> {fee}% </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Slippage </Title>
        <Content> {slippage}% </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Est. Liquidation </Title>
        <Content> {estLiquidationPrice} </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Bid </Title>
        <Content> ~{bid} </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Ask </Title>
        <Content> ~{ask} </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Expected OI </Title>
        <Content> {expectedOi} OVL </Content>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> OI Long </Title>
        <ProgressBar
          value={oiLong}
          max={oiCap}
          width={"75px"}
          color={"#10DCB1"}
          margin={"0 0 0 auto"}
        />

        <OpenInterestValue>
          {" "}
          {oiLong} / {oiCap}
          {" "}
        </OpenInterestValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> OI Short </Title>
        <ProgressBar
          value={oiShort}
          max={oiCap}
          width={"75px"}
          color={"#DC1F4E"}
          margin={"0 0 0 auto"}
        />

        <OpenInterestValue>
          {" "}
          {oiShort} / {oiCap}
          {" "}
        </OpenInterestValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <Title> Funding rate </Title>
        <Content color={"#10DCB1"}> ~ {fundingRate}% </Content>
      </AdditionalDetailRow>
    </Container>
  );
};