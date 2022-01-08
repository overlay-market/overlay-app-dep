import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { utils } from "ethers";
import { Button } from "rebass";
import { useActiveWeb3React } from "../../hooks/web3";
import { MarketCard } from "../../components/Card/MarketCard";
import { useAccountPositions } from "../../state/positions/hooks";
import { useUnwindActionHandlers } from "../../state/unwind/hooks";
import { PositionCard, PositionTableHeader } from "./PositionCard";
import { useWalletModalToggle } from "../../state/application/hooks";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto 32px;
  position: static;
  z-index: 0;
`;

const PageHeader = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 32px;
  font-weight: 700;
  color: white;
`;

const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: block;
`;

const ConnectWalletToggleText = styled(Button)`
  width: 100%;
  height: 33vh;
  cursor: pointer;
  font-weight: 700;
  background: none;

  :hover {
    opacity: 0.7;
  }
`;

export const Positions = () => {
  const toggleWalletModal = useWalletModalToggle();
  const { onResetUnwindState } = useUnwindActionHandlers();
  const { account } = useActiveWeb3React();
  const { isLoading, positions } = useAccountPositions(account ? account : undefined);

  return (
    <MarketCard>
      {onResetUnwindState()}
      <Container>
        <PageHeader> Positions </PageHeader>
        {account ? (
          <>
          <PositionTableHeader />
          <PositionsContainer>
            {isLoading ? (
              <Loader
                type="TailSpin"
                color="#f2f2f2"
                height={100}
                width={100}
              />
            ):(
              positions?.map((positionData, key) => {
                let position = positionData.position;
                return (
                  <PositionCard
                    key={key.toString()}
                    positionId={position.id}
                    marketName={position.number}
                    isLong={position.isLong}
                    leverage={position.leverage}
                    positionSize={Number(utils.formatUnits(position.oiShares, 18)).toFixed(2)}
                    collateralCurrency={"OVL"}
                    quotePrice={"2410.0"}
                    quoteCurrency={"DAI"}
                    estLiquidationPrice={position.liquidationPrice}
                    PnL={"0.10"}
                    navigate={true}
                    border={true}
                  />
                )})
            )}
          </PositionsContainer>
          </>
        ):(
          <LoadingContainer>
            <ConnectWalletToggleText onClick={toggleWalletModal}>
              Please connect wallet
            </ConnectWalletToggleText>
          </LoadingContainer>
        )}
      </Container>
    </MarketCard>
  );
};

export default Positions;
