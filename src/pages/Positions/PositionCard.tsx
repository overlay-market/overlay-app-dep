import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import { ChevronRight } from "react-feather";
import { FlexRowContainer } from "../../components/Container/Container";

const CardHeaderContainer = styled(FlexRowContainer)`
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
  positionId,
  marketName,
  isLong,
  leverage,
  positionSize,
  collateralCurrency,
  quotePrice,
  quoteCurrency,
  estLiquidationPrice,
  PnL,
  navigate,
  hasBorder,
}:{
  positionId: string;
  marketName: string;
  isLong: boolean | null;
  leverage: number | string;
  positionSize: number | string | undefined;
  collateralCurrency: string;
  quotePrice: number | string;
  quoteCurrency: string;
  estLiquidationPrice: string | undefined;
  PnL: number | string | undefined;
  navigate?: boolean;
  hasBorder?: boolean;
}) => {
  return (
    <CardContainer
      navigate={navigate}
      hasBorder={hasBorder}
      to={`/positions/${positionId}`}
      >
      <PositionCardColumn width="50%">
        <Detail fontWeight={700} color={"white"}>
          {marketName}
        </Detail>

        {isLong === null && (
          <Detail fontWeight={700} color={"#C0C0C0"}>
            loading...
          </Detail>
        )}

        {isLong === true && (
          <Detail fontWeight={700} color={"#10DCB1"}>
            Long {leverage}x
          </Detail>
        )}

        {isLong === false && (
          <Detail fontWeight={700} color={"#FF648A"}>
            Short {leverage}x
          </Detail>
        )}

        <Detail color={"#C0C0C0"}>
          {positionSize} {collateralCurrency}
        </Detail>
      </PositionCardColumn>

      <PositionCardColumn width="30%">
        <Detail fontWeight={700} color={"white"}>
          {estLiquidationPrice}
        </Detail>
      </PositionCardColumn>

      <PositionCardColumn width="20%" align="right">
        <Detail fontWeight={700} color={"#10DCB1"}>
          {PnL !== undefined ? `${PnL} OVL` : 'loading...'}
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