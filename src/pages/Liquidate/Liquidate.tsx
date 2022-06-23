import { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { formatWeiToParsedNumber } from '../../utils/formatWei';
import { TransparentButton } from '../../components/Button/Button';
import { PageContainer } from "../../components/Container/Container";
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';
import { useAllPositions } from '../../state/positions/hooks';
import { useV1PeripheryContract } from '../../hooks/useContract';
import { useSingleContractMultipleData } from '../../state/multicall/hooks';
import { useBlockNumber } from '../../state/application/hooks';
import { useLiquidateCallback } from '../../hooks/useLiquidateCallback';
import Loader from '../../components/Loaders/Loaders';

const LoadingContainer = styled.div`
  display: flex;
  margin: 8px auto auto auto;
  justify-content: center;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-top: 44px;
  `}
`;

const PageHeader = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 44px;
  font-weight: 700;
  color: white;
  padding-top: 16px;

  ${({theme}) => theme.mediaWidth.minSmall`
    padding-top: 16px;
  `}
`;

const LiquidateButton = ({
  marketAddress, 
  ownerAddress, 
  positionId
}:{
  marketAddress?: string,
  ownerAddress?: string,
  positionId?: string
}) => {
  const { callback: liquidateCallback } = useLiquidateCallback(marketAddress, ownerAddress, positionId);

  const handleLiquidate = useCallback(() => {
    if (!marketAddress) throw new Error("missing market address")
    if (!ownerAddress) throw new Error("missing owner address")
    if (!positionId) throw new Error("missing position id")
    if (!liquidateCallback) return;
    liquidateCallback()
      .then((hash) => {
        console.log('liquidation txn hash: ', hash)
      })
      .catch((error) => {
        console.log('liquidation txn error: ', error);
      });
  }, [liquidateCallback, marketAddress, ownerAddress, positionId])

  return (
    <TransparentButton 
      color={'#12B4FF'}
      border={'none'}
      onClick={() => handleLiquidate()}
      >
      Liquidate
    </TransparentButton>
  )
}
const Liquidate = () => {
  const { positions } = useAllPositions();
  const blockNumber = useBlockNumber();

  const positionsCallData = useMemo(() => {
    if (positions === undefined || !positions) return [];

    return positions.map((position) => {
      return [position.market.id, position.owner.id, position.positionId]
    })
  }, [positions])

  const isLiquidatedPositions = useMemo(() => {
    if (positions === undefined || !positions) return [];

    return positions.map((position) => {
      return position.isLiquidated;
    })
  }, [positions])

  const peripheryContract = useV1PeripheryContract();
  const fetchLiquidatablePositions = useSingleContractMultipleData(peripheryContract, "liquidatable", positionsCallData);
  const fetchPositionValues = useSingleContractMultipleData(peripheryContract, "value", positionsCallData);
  const fetchLiquidationFees = useSingleContractMultipleData(peripheryContract, "liquidationFee", positionsCallData);
  const fetchMaintenanceMargins = useSingleContractMultipleData(peripheryContract, "maintenanceMargin", positionsCallData);

  const liquidatablePositions = useMemo(() => {
    return fetchLiquidatablePositions.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined;

      return position?.result?.liquidatable_;
    })
  }, [fetchLiquidatablePositions, blockNumber]);

  const positionValues = useMemo(() => {
    return fetchPositionValues.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined;

      return position?.result?.value_;
    })
  }, [fetchPositionValues, blockNumber])

  const liquidationFees = useMemo(() => {
    return fetchLiquidationFees.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined;

      return position?.result?.liquidationFee_;
    })
  }, [fetchLiquidationFees, blockNumber])

  const maintenanceMargins = useMemo(() => {
    return fetchMaintenanceMargins.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined;

      return position?.result?.maintenanceMargin_;
    })
  }, [fetchMaintenanceMargins, blockNumber])

  return (
      <PageContainer maxWidth={'420px'}>
        <PageHeader> 
          {/* Liquidatable Positions  */}
        </PageHeader>
          <TableContainer component={Paper}>
              <StyledTable>
                  <TableHead>
                      <StyledTableHeaderRow>
                          <StyledHeaderCell width={25}>
                              Maintenance
                          </StyledHeaderCell>

                          <StyledHeaderCell width={25}>
                              Value
                          </StyledHeaderCell>

                          <StyledHeaderCell width={25}>
                              Reward (est.)
                          </StyledHeaderCell>

                          <StyledHeaderCell width={25}>
                          </StyledHeaderCell>  
                      </StyledTableHeaderRow>

                      {liquidatablePositions?.map((position, key) => {
                        const maintenanceMargin = maintenanceMargins !== undefined && maintenanceMargins ? formatWeiToParsedNumber(maintenanceMargins[key], 18, 5) : null;
                        const positionValue = positionValues !== undefined && positionValues ? formatWeiToParsedNumber(positionValues[key], 18, 5) : null;
                        const liquidationFee = liquidationFees !== undefined && liquidationFees ? formatWeiToParsedNumber(liquidationFees[key], 18, 10) : null;
                        const isLiquidated = isLiquidatedPositions[key];

                        if (key === 0 && liquidatablePositions && liquidatablePositions[0] === undefined) {
                          return (
                              <LoadingContainer>
                                <Loader
                                  type="TailSpin"
                                  color="#f2f2f2"
                                  height={33}
                                  width={33}
                                />
                              </LoadingContainer>
                          )
                        }
                        if (maintenanceMargin && maintenanceMargin !== 0 && !isLiquidated) {
                          return (
                            <StyledTableRow hover={false}>
                              <StyledTableCellThin component="th" scope="row">
                                {maintenanceMargin} OVL
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                {positionValue} OVL
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                {liquidationFee} OVL
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                  <LiquidateButton marketAddress={positionsCallData[key]?.[0]} ownerAddress={positionsCallData[key]?.[1]} positionId={positionsCallData[key]?.[2]} />
                              </StyledTableCellThin>
                            </StyledTableRow>
                          )
                      }})}
                  </TableHead>
                </StyledTable>
          </TableContainer>
      </PageContainer>
  )
};

export default Liquidate;