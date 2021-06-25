import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import styled from 'styled-components/macro';


export const StyledContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 70px;
`

export const StyledTableCell = styled(TableCell)`
  background: ${({theme}) => theme.bg1};
  font-size: 14px;
  font-weight: 700 !important;
  color: ${({theme}) => theme.text1} !important;
`

export const StyledTableCellThin = styled(StyledTableCell)`
  font-weight: 400 !important;
`

function createData(market: string, price: number, updatePeriod: string, positions: string) {
  return {market, price, updatePeriod, positions};
}

// replace with fetched data
const mockData = [
  createData("AAVE/ETH", 13.81, "7.4h; 0.9h Sampling Period", ""),
  createData("ETH/DAI", 2815.40, "7.4h; 0.9h Sampling Period", ""),
  createData("OVL/ETH", 0.0100, "7.4h; 0.9h Sampling Period", ""),
  createData("UNI/ETH", 0.00, "7.4h; 0.9h Sampling Period", ""),
  createData("WBTC/ETH", 2815.40, "7.4h; 0.9h Sampling Period", ""),
];

const Markets: React.FC = () => {
  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Market</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Update period</StyledTableCell>
              <StyledTableCell>Positions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <TableRow>
                <StyledTableCellThin component="th" scope="row">
                  {row.market}
                </StyledTableCellThin>
                <StyledTableCellThin align="left">{row.price}</StyledTableCellThin>
                <StyledTableCellThin align="left">{row.updatePeriod}</StyledTableCellThin>
                <StyledTableCellThin align="left">{row.positions}</StyledTableCellThin>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
};

export default Markets;