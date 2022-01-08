import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";
import { ChevronRight } from "react-feather";

const CardHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #828282;
  padding-bottom: 8px;
  color: white;
  display: flex;
  flex-direction: row;
`;

const CardCell = styled.div<{
  align?: string;
  width?: string;
}>`
  text-align: ${({ align }) => (align ? align : "left")};
  width: ${({ width }) => (width ? width : "auto")};
  font-size: 14px;
`;
  
const HeaderCell = styled(CardCell)`
  font-weight: 700;
`;

const Detail = styled.div<{
  fontWeight?: number;
  color?: string;
}>`
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
  color: ${({ color }) => (color ? color : "white")};
  text-align: inherit;
`;

const CardContainer = styled(Link)<{ navigate?: boolean; border?: boolean }>`
  display: flex;
  flex-direction: row;
  border-bottom: ${({ border }) => (border ? "1px solid #828282" : "none")};
  width: 100%;
  padding: 16px 0;
  min-height: 69px;
  text-decoration: none;

  pointer-events: ${({ navigate }) => (navigate ? "auto" : "none")};

  :hover {
    background: #262626 !important;
  }
`;

export const PositionTableHeader = () => (
  <CardHeader>
    <HeaderCell align="left" width="50%">
      Position
    </HeaderCell>

    <HeaderCell align="left" width="30%">
      Est. Liq.
    </HeaderCell>

    <HeaderCell align="right" width="20%">
      PnL
    </HeaderCell>
  </CardHeader>
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
  border,
}: {
  positionId: string;
  marketName: string;
  isLong: boolean | null;
  leverage: number | string;
  positionSize: number | string;
  collateralCurrency: string;
  quotePrice: number | string;
  quoteCurrency: string;
  estLiquidationPrice: string;
  PnL: number | string | undefined;
  navigate?: boolean;
  border?: boolean;
}) => {
  return (
    <CardContainer
      navigate={navigate}
      border={border}
      to={`/positions/${positionId}`}
      >
      <CardCell width="50%">
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
      </CardCell>

      <CardCell width="30%">
        <Detail fontWeight={700} color={"white"}>
          {estLiquidationPrice}
        </Detail>
      </CardCell>

      <CardCell width="20%" align="right">
        <Detail fontWeight={700} color={"#10DCB1"}>
          {PnL}
        </Detail>

        {navigate ?? (
          <Icon size={12} margin={"24px 0 0 auto"}>
            <ChevronRight />
          </Icon>
        )}
      </CardCell>
    </CardContainer>
  );
};