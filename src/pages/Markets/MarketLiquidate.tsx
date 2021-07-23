import { MarketCard } from "../../components/Card/MarketCard";
import styled from 'styled-components/macro';

export const EmptyContent = styled.div`
  background: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1};
  text-align: center;
  width: 100%;
  height: 250px;
  line-height: 250px;
`
export const MarketLiquidate = () => {
  return (
    <MarketCard title={'Liquidate'}>
      <EmptyContent>
        NaN
      </EmptyContent>
    </MarketCard>
  )
}
