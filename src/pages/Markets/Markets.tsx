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
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useTotalMarkets, useActiveMarkets, useMarketData } from '../../state/markets/hooks';
import { Trans } from '@lingui/macro';


export const StyledContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 70px;
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 14px;
  font-weight: 700 !important;
  color: ${({theme}) => theme.text1} !important;
`;

export const StyledHeaderCell = styled(StyledTableCell)`
  padding-bottom: 8px !important;
`;

export const StyledTableCellThin = styled(StyledTableCell)`
  font-weight: 400 !important;
`;

const activeClassName = 'INACTIVE';

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${({theme}) => theme.text1};
  text-decoration: none;
  font-weight: 500;

  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`;

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  background: ${({theme}) => theme.bg1};

  :hover { 
    font-weight: 900 !important;
    background: #262626 !important;
  }
`;

export const StyledTableHeaderRow = styled(TableRow)`
  background: ${({theme}) => theme.bg1};
  cursor: default;
`;

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
  const marketData = useMarketData();
  
  let history = useHistory();

  function redirectToMarket(marketId: string) {
    history.push(`/market/${marketId}`);
  };

  console.log('markets: ', markets);
  console.log('marketData: ', marketData);
  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans>
                  Market
                </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans>
                  Price
                </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans>
                  Update Period
                </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans>
                  OI Long
                </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans>
                  OI Short
                </Trans>
              </StyledHeaderCell>
              <StyledHeaderCell>
                <Trans>
                  Positions
                </Trans>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
          <TableBody>
            {mockData.map((row) => (
              <StyledTableRow 
                onClick={() => redirectToMarket(row.marketId)}
                hover={true}
                >
                  <StyledTableCellThin component="th" scope="row">
                    {row.market}
                  </StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.price}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.updatePeriod}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.oiLong}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.oiShort}</StyledTableCellThin>
                  <StyledTableCellThin align="left">{row.positions}</StyledTableCellThin>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  )
};

export default Markets;