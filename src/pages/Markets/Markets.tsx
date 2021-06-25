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
              <TableCell>Market</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Update period</TableCell>
              <TableCell>Positions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.market}
                </TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.updatePeriod}</TableCell>
                <TableCell align="left">{row.positions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
};

export default Markets;