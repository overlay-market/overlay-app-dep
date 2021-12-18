import { TableBody, TableContainer, TableHead, Paper } from '@material-ui/core';
import { StyledContainer } from "../../components/Container/Container";
import { StyledTable, StyledTableCell, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';
import { TransparentButton } from '../../components/Button/Button';
import { useAllPositions } from '../../state/positions/hooks';
import { useLiquidationPrice } from '../../hooks/useLiquidationPrice';
import { formatWeiToParsedNumber } from '../../utils/formatWei';
import { usePositionValue } from '../../hooks/usePositionValue';
import { useMaintenanceMargin } from '../../hooks/useMaintenanceMargin';
import { useMemo } from 'react';

// const mock = [
//   {maintenance: '1.97 OVL', value: '1.90 OVL', reward: '0.01 OVL', callback: (() => null)},
//   {maintenance: '3.00 OVL', value: '2.00 OVL', reward: '0.50 OVL', callback: (() => null)},
//   {maintenance: '0.10 OVL', value: '0.01 OVL', reward: '0.00001 OVL', callback: (() => null)},
// ]

export const LiquidatablePosition = (positionData: any) => {
  let position = positionData.positionData;

  // const liquidationPrice = useLiquidationPrice(
  //   market.market,
  //   isLong,
  //   entryBidPrice,
  //   entryAskPrice,
  //   debt,
  //   entryOi,
  //   currentOi
  // );
  console.log('positionData: ', positionData.positionData);

  const maintenanceMarginRate = useMaintenanceMargin(position.market.id);

  const currentValue = usePositionValue(position.number ? position.number : null);
  const currentPrice = positionData.isLong ? formatWeiToParsedNumber(position.market.currentPrice.bid, 18, 5) : formatWeiToParsedNumber(position.market.currentPrice.ask, 18, 5);

  const parsedCurrentValue = currentValue ? formatWeiToParsedNumber(currentValue, 18, 10) : undefined;
  const parsedMaintenanceMarginRate = maintenanceMarginRate ? formatWeiToParsedNumber(maintenanceMarginRate, 18, 10) : undefined;
  const parsedCurrentOi = position.oiShares ? formatWeiToParsedNumber(position.oiShares, 18, 10) : undefined;

  const nominalMaintenanceMargin: BigInt | number | any = parsedCurrentOi && parsedMaintenanceMarginRate && parsedCurrentOi * parsedMaintenanceMarginRate;

  const reward = parsedCurrentValue && parsedMaintenanceMarginRate && parsedCurrentValue * parsedMaintenanceMarginRate;

  const maintenanceMargin = parsedMaintenanceMarginRate && position.totalSupply && parsedMaintenanceMarginRate * position.totalSupply;

  return (
      <>
        <StyledTableRow hover={false}>
          <StyledTableCellThin component="th" scope="row">
              {nominalMaintenanceMargin}
          </StyledTableCellThin>

          <StyledTableCellThin align="left">
              {parsedCurrentValue}
          </StyledTableCellThin>

          <StyledTableCellThin align="left">
              {reward}
          </StyledTableCellThin>

          <StyledTableCellThin align="left">
              <TransparentButton 
                  color={'#12B4FF'}
                  border={'none'}
                  // onClick={() => ()}
                  >
                  Liquidate
              </TransparentButton>
          </StyledTableCellThin>
        </StyledTableRow>
      </>
  )
};

const Liquidate = () => {
  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    allPositions
  } = useAllPositions();

  console.log('allPositions: ', allPositions);
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

                      {allPositions?.map((position, key) => (
                          <LiquidatablePosition
                            positionData={position}
                            />
                      ))}
                      {/* {mock.map((position, key) => (
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
                      ))} */}
                  </TableHead>
                </StyledTable>
          </TableContainer>
      </StyledContainer>
  )
};

export default Liquidate;