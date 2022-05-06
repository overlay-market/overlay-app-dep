import { useMemo } from "react";
import styled from "styled-components/macro";
import Loader from "react-loader-spinner";
import { utils, BigNumber } from "ethers";
import { Button } from "rebass";
import { useActiveWeb3React } from "../../hooks/web3";
import { MarketCard } from "../../components/Card/MarketCard";
import { useAccountPositions } from "../../state/positions/hooks";
import { useUnwindActionHandlers } from "../../state/unwind/hooks";
import { PositionCard, PositionTableHeader } from "./PositionCard";
import { useWalletModalToggle } from "../../state/application/hooks";
import { shortenAddress } from "../../utils/web3";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { useSingleContractMultipleData } from "../../state/multicall/hooks";
import { useV1PeripheryContract } from "../../hooks/useContract";
import { useBlockNumber } from "../../state/application/hooks";

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
  display: flex;
  margin: 32px auto auto auto;
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
  const blockNumber = useBlockNumber();
  const { onResetUnwindState } = useUnwindActionHandlers();
  const { account } = useActiveWeb3React();
  const { isLoading, positions } = useAccountPositions(account ? account : undefined);

  // console.log('positions: ', positions);

  const positionsCallData = useMemo(() => {
    if (!positions || positions === undefined || !account || !blockNumber) return [];

    return positions.map((position) => [position.market.id, account, position.positionId])
  }, [positions, account, blockNumber])

  const peripheryContract = useV1PeripheryContract();
  const fetchLiquidationPrices = useSingleContractMultipleData(peripheryContract, 'liquidationPrice', positionsCallData);
  const fetchPositionValues = useSingleContractMultipleData(peripheryContract, "value", positionsCallData);
  const fetchPositionCosts = useSingleContractMultipleData(peripheryContract, "cost", positionsCallData);

  const liquidationPrices = useMemo(() => {
    return fetchLiquidationPrices.map((position, index) => {
      if (position.loading === true || position === undefined || blockNumber === undefined) return undefined;

      return position?.result?.liquidationPrice_;
    })
  }, [fetchLiquidationPrices, blockNumber]);

  
  const positionValues = useMemo(() => {
    return fetchPositionValues.map((position, index) => {
      if (position.loading === true || position === undefined || blockNumber === undefined) return undefined;
      
      return position?.result?.value_;
    })
  }, [fetchPositionValues, blockNumber]);
  
  const positionCosts = useMemo(() => {
    return fetchPositionCosts.map((position, index) => {
      if (position.loading === true || position === undefined || blockNumber === undefined) return undefined;

      return position?.result?.cost_;
    })
  }, [fetchPositionCosts, blockNumber]);

  
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
              <LoadingContainer>
                <Loader
                  type="TailSpin"
                  color="#f2f2f2"
                  height={100}
                  width={100}
                />
              </LoadingContainer>
            ):(
              positions?.map((index, key) => {
                let position = index;
                return (
                  <PositionCard
                    key={key.toString()}
                    positionId={position.positionId}
                    marketName={`${shortenAddress(position.market.id) + `-` + BigNumber.from(position.positionId).toString()}`}
                    isLong={position.isLong}
                    leverage={position.leverage}
                    positionValue={positionValues !== undefined ? formatWeiToParsedNumber(positionValues[key], 18, 5) : null}
                    positionCost={positionCosts !== undefined ? formatWeiToParsedNumber(positionCosts[key], 18 , 5) : null}
                    collateralCurrency={"OVL"}
                    quotePrice={"-"}
                    quoteCurrency={"-"}
                    // estLiquidationPrice={position.liquidationPrice}
                    estLiquidationPrice={liquidationPrices !== undefined ? formatWeiToParsedString(liquidationPrices[key], 2) : 'loading...'}
                    navigate={true}
                    hasBorder={true}
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
