import { useState } from "react";
import { useActiveWeb3React } from "../../hooks/web3";
import { useWalletModalToggle } from "../../state/application/hooks";
import Loader from "react-loader-spinner";
import { ChevronRight } from "react-feather";
import { Trans } from "@lingui/macro";
import styled from "styled-components/macro";
import { TEXT } from "../../theme/theme";
import { Link } from "react-router-dom";
import { PlanckCatLoader } from "../../components/Loaders/Loaders";
import { Button } from "rebass";
import { Icon } from "../../components/Icon/Icon";
import { MarketCard } from "../../components/Card/MarketCard";
import { useAllPositions } from "../../state/positions/hooks";
import { utils } from "ethers";
import { useUnwindActionHandlers } from "../../state/unwind/hooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto 32px;
  position: static;
  z-index: 0;
`;

const Header = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 700;
  color: white;
`;

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
  overflow: scroll;
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
    border-right: ${({ navigate }) =>
      navigate ? "2px solid #12B4FF" : "none"};
    border-left: ${({ navigate }) => (navigate ? "2px solid #12B4FF" : "none")};
  }
`;

const HeaderCell = styled(CardCell)`
  font-weight: 700;
`;

const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: block;
`;

const ConnectWallet = styled(Button)`
  width: 100%;
  height: 33vh;
  cursor: pointer;
  background: none;

  :hover {
    opacity: 0.7;
  }
`;

export const PositionsCardHeader = () => (
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
  PnL: number | string;
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

export const Positions = () => {
  const { account } = useActiveWeb3React();

  const toggleWalletModal = useWalletModalToggle();

  const { isLoading, positions } = useAllPositions(
    account ? account : undefined
  );

  const { onResetUnwindState } = useUnwindActionHandlers();

  return (
    <MarketCard>
      {onResetUnwindState()}
      <Container>
        <Header>Positions</Header>

        {account ? (
          <>
            <PositionsCardHeader />

            <PositionsContainer>
              {isLoading ? (
                <Loader
                  type="TailSpin"
                  color="#f2f2f2"
                  height={100}
                  width={100}
                />
              ) : (
                positions?.map((positionData, key) => {
                  let position = positionData.position;

                  return (
                    <PositionCard
                      key={key.toString()}
                      positionId={position.id}
                      marketName={position.number}
                      isLong={position.isLong}
                      leverage={position.leverage}
                      positionSize={Number(
                        utils.formatUnits(position.oiShares, 18)
                      ).toFixed(2)}
                      collateralCurrency={"OVL"}
                      quotePrice={"2410.0"}
                      quoteCurrency={"DAI"}
                      estLiquidationPrice={position.liquidationPrice}
                      PnL={"0.10"}
                      navigate={true}
                      border={true}
                    />
                  );
                })
              )}
            </PositionsContainer>
          </>
        ) : (
          <LoadingContainer>
            <ConnectWallet onClick={toggleWalletModal}>
              <strong>Please connect wallet</strong>
            </ConnectWallet>
          </LoadingContainer>
        )}
      </Container>
    </MarketCard>
  );
};

export default Positions;
