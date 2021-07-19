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
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useTotalMarkets, useActiveMarkets } from '../../state/markets/hooks';


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

export const StyledNavLink = styled(NavLink)`
  color: ${({theme}) => theme.text1};
  text-decoration: none;
  font-weight: 500;

  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`
function createData(market: string, price: number, updatePeriod: string, oiLong: string, oiShort: string, positions: string, marketId: string) {
  return {market, price, updatePeriod, oiLong, oiShort, positions, marketId};
}

// replace with fetched data
const mockData = [
  createData("ETH/DAI", 2815.40, "7.4h; 0.9h", "500/1000", "15/1000", "", "1"),
  createData("OVL/DAI", 13.81, "7.4h; 0.9h", "1000/1000", "0/1000", "", "2"),
  createData("OVL/ETH", 0.0100, "7.4h; 0.9h", "230/1000", "423/1000", "", "3"),
];

const Markets = () => {
  const markets = useTotalMarkets();

  // const activeMarkets = useActiveMarkets(markets.result?.marketAddress);
  console.log('markets: ', markets);


  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Market</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Update Period</StyledTableCell>
              <StyledTableCell>OI Long</StyledTableCell>
              <StyledTableCell>OI Short</StyledTableCell>
              <StyledTableCell>Positions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <TableRow>
                  <StyledTableCellThin component="th" scope="row">
                    <StyledNavLink to={`/markets/${row.marketId}`}>
                    {row.market}
                    </StyledNavLink>
                  </StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.price}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.updatePeriod}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.oiLong}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.oiShort}</StyledTableCellThin>
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