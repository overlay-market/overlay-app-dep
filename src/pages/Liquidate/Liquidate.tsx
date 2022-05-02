import { useMemo } from 'react';
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { useAccountPositions } from '../../state/positions/hooks';
import { formatWeiToParsedNumber } from '../../utils/formatWei';
import { usePositionValue } from '../../hooks/usePositionValue';
import { formatDecimalPlaces } from '../../utils/formatDecimal';
import { TransparentButton } from '../../components/Button/Button';
import { PageContainer } from "../../components/Container/Container";
import { useLiquidationPrice } from '../../hooks/useLiquidationPrice';
import { useMaintenanceMargin } from '../../hooks/useMaintenanceMargin';
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';

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

// const Liquidate = () => {
//   const { allPositions } = useAllPositions();

//   return (
//       <PageContainer maxWidth={'420px'}>
//           <TableContainer component={Paper}>
//               <StyledTable>
//                   <TableHead>
//                       <StyledTableHeaderRow>
//                           <StyledHeaderCell width={25}>
//                               Maintenance
//                           </StyledHeaderCell>

//                           <StyledHeaderCell width={25}>
//                               Value
//                           </StyledHeaderCell>

//                           <StyledHeaderCell width={25}>
//                               Reward (est.)
//                           </StyledHeaderCell>

//                           <StyledHeaderCell width={25}>
//                           </StyledHeaderCell>  
//                       </StyledTableHeaderRow>

//                       {allPositions?.map((position, key) => (
//                           <LiquidatablePosition
//                             positionData={position}
//                             />
//                       ))}
//                   </TableHead>
//                 </StyledTable>
//           </TableContainer>
//       </PageContainer>
//   )
// };

// export default Liquidate;