import { useMemo } from 'react';
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { useAccountPositions } from '../../state/positions/hooks';
import { formatWeiToParsedNumber } from '../../utils/formatWei';
import { formatDecimalPlaces } from '../../utils/formatDecimal';
import { TransparentButton } from '../../components/Button/Button';
import { PageContainer } from "../../components/Container/Container";
import { useLiquidationPrice } from '../../hooks/useLiquidationPrice';
import { useMaintenanceMargin } from '../../hooks/useMaintenanceMargin';
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';
import { useAllPositions } from '../../state/positions/hooks';
import { useV1PeripheryContract } from '../../hooks/useContract';
import { useSingleContractMultipleData } from '../../state/multicall/hooks';
import { useBlockNumber } from '../../state/application/hooks';
import { useLiquidateCallback } from '../../hooks/useLiquidateCallback';

// const mock = [
//   {maintenance: '1.97 OVL', value: '1.90 OVL', reward: '0.01 OVL', callback: (() => null)},
//   {maintenance: '3.00 OVL', value: '2.00 OVL', reward: '0.50 OVL', callback: (() => null)},
//   {maintenance: '0.10 OVL', value: '0.01 OVL', reward: '0.00001 OVL', callback: (() => null)},
// ]

// export const LiquidatablePosition = (positionData: any) => {
//   let position = positionData.positionData;

//   const estimatedLiquidationPrice = useLiquidationPrice(
//     position.market.id,
//     position.isLong,
//     position.pricePoint.bid,
//     position.pricePoint.ask,
//     position.debt,
//     position.totalSupply,
//     position.oiShares
//   );

//   const maintenanceMarginRate = useMaintenanceMargin(position.market.id);

//   const currentValue = usePositionValue(position.number ? position.number : null);
//   const currentPrice = positionData.isLong ? formatWeiToParsedNumber(position.market.currentPrice.bid, 18, 5) : formatWeiToParsedNumber(position.market.currentPrice.ask, 18, 5);

//   const parsedCurrentValue = currentValue ? formatWeiToParsedNumber(currentValue, 18, 10) : undefined;
//   const parsedMaintenanceMarginRate = maintenanceMarginRate ? formatWeiToParsedNumber(maintenanceMarginRate, 18, 10) : undefined;
//   const parsedCurrentOi = position.oiShares ? formatWeiToParsedNumber(position.oiShares, 18, 10) : undefined;
//   const parsedInitialOi = position.totalSupply && formatWeiToParsedNumber(position.totalSupply, 18, 10);

//   const nominalMaintenanceMargin: BigInt | number | any = parsedCurrentOi && parsedMaintenanceMarginRate && parsedCurrentOi * parsedMaintenanceMarginRate;

//   const reward = parsedCurrentValue && parsedMaintenanceMarginRate && parsedCurrentValue * parsedMaintenanceMarginRate;

//   const liquidationPrice = parsedInitialOi && parsedMaintenanceMarginRate && parsedInitialOi * parsedMaintenanceMarginRate;

//   const liquidatable = parsedCurrentValue && currentPrice && liquidationPrice > parsedCurrentValue;

//   console.log('parsedCurrentValue: ', parsedCurrentValue);
//   console.log('liquidationPrice: ', liquidationPrice);
//   console.log('currentPrice: ', currentPrice);


//   return (
//       <>
//         <StyledTableRow hover={false}>
//           <StyledTableCellThin component="th" scope="row">
//               {formatDecimalPlaces(5, liquidationPrice)}
//           </StyledTableCellThin>

//           <StyledTableCellThin align="left">
//               {formatDecimalPlaces(5, parsedCurrentValue)}
//           </StyledTableCellThin>

//           <StyledTableCellThin align="left">
//               {formatDecimalPlaces(5, reward)}
//           </StyledTableCellThin>

//           <StyledTableCellThin align="left">
//               <TransparentButton 
//                   color={'#12B4FF'}
//                   border={'none'}
//                   // onClick={() => ()}
//                   >
//                   Liquidate
//               </TransparentButton>
//           </StyledTableCellThin>
//         </StyledTableRow>
//       </>
//   )
// };

const Liquidate = () => {
  const { positions } = useAllPositions();
  const blockNumber = useBlockNumber();

  const positionsCallData = useMemo(() => {
    if (positions === undefined || !positions) return [];

    return positions.map((position) => {
      if (position.isLiquidated) return;
      return [position.market.id, position.owner.id, position.positionId]
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

                      {liquidatablePositions?.map((position, key) => (
                        <StyledTableRow hover={false}>
                          <StyledTableCellThin component="th" scope="row">
                            {maintenanceMargins !== undefined ? formatWeiToParsedNumber(maintenanceMargins[key], 18, 5): null}
                          </StyledTableCellThin>

                          <StyledTableCellThin align="left">
                            {positionValues !== undefined ? formatWeiToParsedNumber(positionValues[key], 18, 5): null}
                          </StyledTableCellThin>

                          <StyledTableCellThin align="left">
                            {liquidationFees !== undefined ? formatWeiToParsedNumber(liquidationFees[key], 18, 5): null}
                          </StyledTableCellThin>

                          <StyledTableCellThin align="left">
                            {positionsCallData && (
                              <TransparentButton 
                                  color={'#12B4FF'}
                                  border={'none'}
                                  // onClick={() => useLiquidateCallback(positionsCallData[key]?.[0], positionsCallData[key]?.[1], positionsCallData[key]?.[2])}
                                  >
                                  Liquidate
                              </TransparentButton>
                              )}
                          </StyledTableCellThin>
                        </StyledTableRow>
                      ))}
                  </TableHead>
                </StyledTable>
          </TableContainer>
      </PageContainer>
  )
};

export default Liquidate;