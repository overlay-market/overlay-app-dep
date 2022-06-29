import styled from "styled-components/macro";
import { BigNumberish } from "ethers";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import { ChevronRight } from "react-feather";
import { FlexRow } from "../../components/Container/Container";
import { formatWeiToParsedNumber, formatWeiToParsedString } from "../../utils/formatWei";
import { useMemo } from "react";
import { ConsoleView } from "react-device-detect";
import { BigNumber } from "ethers";
import Loader from "../../components/Loaders/Loaders";

const CardHeaderContainer = styled(FlexRow)`
  color: white;
  padding-bottom: 8px;
  border-bottom: 1px solid #828282;
`;

const PositionCardColumn = styled.div<{ align?: string; width?: string; }>`
  width: ${({ width }) => (width ? width : "auto")};
  text-align: ${({ align }) => (align ? align : "left")};
  font-size: 14px;
`;
  
const HeaderCell = styled(PositionCardColumn)`
  font-weight: 700;
`;

const Detail = styled.div<{ fontWeight?: number; color?: string; }>`
  color: ${({ color }) => (color ? color : "white")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
  text-align: inherit;
`;

const CardContainer = styled(Link)<{ navigate?: boolean; hasBorder?: boolean }>`
  pointer-events: ${({ navigate }) => (navigate ? "auto" : "none")};
  border-bottom: ${({ hasBorder }) => (hasBorder ? "1px solid #828282" : "none")};
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 0;
  min-height: 69px;
  text-decoration: none;

  :hover {
    background: #262626 !important;
  }
`;

export const PositionTableHeader = () => (
  <CardHeaderContainer>
    <HeaderCell align="left" width="50%">
      Position
    </HeaderCell>

    <HeaderCell align="left" width="30%">
      Est. Liq.
    </HeaderCell>

    <HeaderCell align="right" width="20%">
      PnL
    </HeaderCell>
  </CardHeaderContainer>
);

export const PositionCard = ({
  id,
  positionId,
  marketId,
  baseToken,
  quoteToken,
  isLong,
  leverage,
  positionValue,
  positionCost,
  positionOi,
  collateralToken,
  quotePrice,
  quoteCurrency,
  estLiquidationPrice,
  // PnL,
  navigate,
  hasBorder,
}:{
  id: string;
  positionId: string;
  marketId: string;
  baseToken: string;
  quoteToken: string;
  isLong: boolean | null;
  leverage: number | string;
  positionValue: number | null | undefined;
  positionCost: number | null | undefined;
  positionOi: number | null | undefined;
  collateralToken: string;
  quotePrice: number | string;
  quoteCurrency: string;
  estLiquidationPrice: string | undefined;
  // PnL: number | string | undefined;
  navigate?: boolean;
  hasBorder?: boolean;
}) => {
  let parsedLeverage = Number(leverage).toFixed(1);
  let PnL = positionValue && positionCost ? positionValue - positionCost : null;
  let fixedPnL = positionValue === 0 ? '0' : (PnL ? `${PnL.toFixed(4)}` : null);

  const indicatorColor = useMemo(() => {
    if (!fixedPnL || parseFloat(fixedPnL) === 0 || fixedPnL === 'Closed') return '#F2F2F2';
    if (parseFloat(fixedPnL) > 0) return '#10DCB1';
    else return '#FF648A';
  }, [fixedPnL])

  return (
    <CardContainer
      navigate={navigate}
      hasBorder={hasBorder}
      to={`/positions/${id}/${positionId}`}
      >
      <PositionCardColumn width="50%">
        <Detail fontWeight={700} color={"white"}>
          {baseToken === 'loading' ? <Loader stroke="white" size="12px" /> : baseToken}
          /
          {quoteToken === 'loading' ? <Loader stroke="white" size="12px" /> : quoteToken}
        </Detail>

        <Detail fontWeight={700} color={"white"}>
          ID: {(positionId).toString()}
        </Detail>

        {isLong === null && (
          <Detail fontWeight={700} color={"#C0C0C0"}>
            loading...
          </Detail>
        )}

        {isLong === true && (
          <Detail fontWeight={700} color={"#10DCB1"}>
            Long {parsedLeverage}x
          </Detail>
        )}

        {isLong === false && (
          <Detail fontWeight={700} color={"#FF648A"}>
            Short {parsedLeverage}x
          </Detail>
        )}

        <Detail color={"#C0C0C0"}>
          OI: {positionOi === undefined ? 'loading...' : positionOi}
        </Detail>

        <Detail color={"#C0C0C0"}>
          Value: {positionValue === undefined ? 'loading...' : `${positionValue} ${collateralToken}`}
        </Detail>
      </PositionCardColumn>

      <PositionCardColumn width="20%">
        <Detail fontWeight={700} color={"white"}>
          {estLiquidationPrice}
        </Detail>
      </PositionCardColumn>

      <PositionCardColumn width="30%" align="right">
        <Detail fontWeight={700} color={indicatorColor}>
          {fixedPnL ? `${fixedPnL} ${collateralToken}` : <Loader stroke="white" size="12px" />}
        </Detail>

        {navigate ?? (
          <Icon size={12} margin={"24px 0 0 auto"}>
            <ChevronRight />
          </Icon>
        )}
      </PositionCardColumn>
    </CardContainer>
  );
};