import { TableBody, TableContainer, TableHead, Paper } from '@material-ui/core';
import { StyledContainer } from "../../components/Container/Container";
import { StyledTable, StyledTableCell, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';
import { TransparentButton } from '../../components/Button/Button';
import { useAllPositions } from '../../state/positions/hooks';
import { useLiquidationPrice } from '../../hooks/useLiquidationPrice';
import { formatWeiToParsedNumber } from '../../utils/formatWei';
import { usePositionValue } from '../../hooks/usePositionValue';
import { useMemo } from 'react';

const mock = [
  {maintenance: '1.97 OVL', value: '1.90 OVL', reward: '0.01 OVL', callback: (() => null)},
  {maintenance: '3.00 OVL', value: '2.00 OVL', reward: '0.50 OVL', callback: (() => null)},
  {maintenance: '0.10 OVL', value: '0.01 OVL', reward: '0.00001 OVL', callback: (() => null)},
]

const LiquidatablePosition = (
  market?: string,
  number?: string,
  isLong?: boolean,
  entryBidPrice?: string,
  entryAskPrice?: string,
  debt?: string,
  entryOi?: string,
  currentOi?: string,
  currentBidPrice?: string,
  currentAskPrice?: string
) => {
  const liquidationPrice = useLiquidationPrice(
    market,
    isLong,
    entryBidPrice,
    entryAskPrice,
    debt,
    entryOi,
    currentOi
  );

  console.log('liquidationPrice: ', liquidationPrice);

  const currentValue = usePositionValue(number ? number : null);

  const currentPrice = isLong ? formatWeiToParsedNumber(currentAskPrice, 18, 5) : formatWeiToParsedNumber(currentBidPrice, 18, 5);

  // const maintenanceMargin = parsedMarginMaintenance * entryOi;

  // return currentPrice && liquidationPrice && currentPrice > liquidationPrice ? (
  //   <StyledTableRow hover={false}>
  //     <StyledTableCellThin component="th" scope="row">
  //         {position.maintenance}
  //     </StyledTableCellThin>

  //     <StyledTableCellThin align="left">
  //         {currentValue}
  //     </StyledTableCellThin>

  //     <StyledTableCellThin align="left">
  //         {position.reward}
  //     </StyledTableCellThin>

  //     <StyledTableCellThin align="left">
  //         <TransparentButton 
  //             color={'#12B4FF'}
  //             border={'none'}
  //             onClick={position.callback}>
  //             Liquidate
  //         </TransparentButton>
  //     </StyledTableCellThin>
  //   </StyledTableRow>
  // ) : (
  //   null
  // )
};

const Liquidate = () => {
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    allPositions
  } = useAllPositions();

  return (
      <StyledContainer maxWidth={'420px'}>
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

                      {mock.map((position, key) => (
                          <StyledTableRow key={key.toString()} hover={false}>
                              <StyledTableCellThin component="th" scope="row">
                                  {position.maintenance}
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                  {position.value}
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                  {position.reward}
                              </StyledTableCellThin>

                              <StyledTableCellThin align="left">
                                  <TransparentButton 
                                      color={'#12B4FF'}
                                      border={'none'}
                                      onClick={position.callback}>
                                      Liquidate
                                  </TransparentButton>
                              </StyledTableCellThin>
                          </StyledTableRow>
                      ))}
                  </TableHead>
                </StyledTable>
          </TableContainer>
      </StyledContainer>
  )
};

export default Liquidate;