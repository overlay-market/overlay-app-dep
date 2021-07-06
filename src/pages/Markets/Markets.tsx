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
import { NavLink, Link } from 'react-router-dom';
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

function createData(market: string, price: number, updatePeriod: string, positions: string, marketId: string) {
  return {market, price, updatePeriod, positions, marketId};
}

// replace with fetched data
const mockData = [
  createData("AAVE/ETH", 13.81, "7.4h; 0.9h Sampling Period", "", "1"),
  createData("ETH/DAI", 2815.40, "7.4h; 0.9h Sampling Period", "", "2"),
  createData("OVL/ETH", 0.0100, "7.4h; 0.9h Sampling Period", "", "3"),
  createData("UNI/ETH", 0.00, "7.4h; 0.9h Sampling Period", "", "4"),
  createData("WBTC/ETH", 2815.40, "7.4h; 0.9h Sampling Period", "", "5"),
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
              <TableRow 
                // component={Link} 
                // to={`/Markets/${row.marketId}`}
                >
                  <StyledTableCellThin component="th" scope="row">
                    <NavLink to={`/Markets/${row.marketId}`}>
                    {row.market}
                    </NavLink>
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