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
import { useTotalMarkets, useActiveMarkets, useMarketData, useAllMarkets } from '../../state/markets/hooks';
import { Trans } from '@lingui/macro';
import { InfoTip } from '../../components/InfoTip/InfoTip';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Column } from '../../components/Column/Column';
import { TEXT } from '../../theme/theme';

export const StyledContainer = styled.div`
  max-width: 900px;
  margin: auto;
  margin-top: 48px;
  padding: 16px;

  > div {
    background: ${({ theme }) => (theme.bg1)} !important;
  }
`;

export const StyledTable = styled(Table)`
  white-space: nowrap !important;
`;

export const StyledTableCell = styled(TableCell)`
  font-size: 14px;
  color: ${({theme}) => theme.text1} !important;
`;

export const StyledHeaderCell = styled(StyledTableCell)`
  padding-bottom: 8px !important;
  font-weight: 700 !important;
`;

export const StyledTableCellThin = styled(StyledTableCell)`
  font-weight: 400;
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
  height: 69px;


  ${({theme}) => theme.mediaWidth.minMedium`
    height: auto;

    :hover { 
      background: #262626 !important;

      >* {
        font-weight: 900 !important;
      }
    }
  `}
`;

export const StyledTableHeaderRow = styled(TableRow)`
  background: ${({theme}) => theme.bg1};
  cursor: default;
`;

function createData(market: string, price: string, oiLong: number, oiShort: number, oiTotal: number, positions: string, marketId: string) {
  return {market, price, oiLong, oiShort, oiTotal, positions, marketId};
}

// replace with fetched data
const mockData = [
  createData("ETH/DAI", 'N/A', 500, 690, 1000, "6", "1"),
  createData("OVL/DAI", 'N/A', 1000, 0, 1000, "9", "2"),
  createData("OVL/ETH", 'N/A', 230, 420, 1000, "", "3"),
];

const Markets = () => {
  const markets = useTotalMarkets();
  const marketData = useMarketData();
  
  let history = useHistory();

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`);
  };

  console.log('markets: ', markets);
  console.log('marketData: ', marketData);
  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans> Market </Trans>
                <InfoTip tipFor={'Market'}>
                  <div> mega meow </div>
                </InfoTip>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> Price </Trans>
              </StyledHeaderCell>
              
              <StyledHeaderCell>
                <Trans> OI Long </Trans>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> OI Short </Trans>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> Positions </Trans>
                <InfoTip tipFor={'Positions'}>
                  <div> meow meow </div>
                </InfoTip>
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

                  <StyledTableCellThin align="left">
                    {row.price}
                  </StyledTableCellThin>

                  <StyledTableCellThin align="left">
                    <Column align={ 'left' }>
                      <TEXT.SubHeader>
                        { row.oiLong } / { row.oiTotal }
                      </TEXT.SubHeader>
                      <ProgressBar
                        value={ row.oiLong }
                        max={ row.oiTotal }
                        color={ '#10DCB1' }
                        width={ '88px' }
                        margin={ '0' }
                        />
                    </Column>
                  </StyledTableCellThin>

                  <StyledTableCellThin align="left">
                    <Column align={ 'left' }>
                      <TEXT.SubHeader>
                        { row.oiShort } / { row.oiTotal }
                      </TEXT.SubHeader>
                      <ProgressBar
                        value={ row.oiShort }
                        max={ row.oiTotal }
                        color={ '#DC1F4E' }
                        width={ '88px' }
                        margin={ '0' }
                        />
                    </Column>
                  </StyledTableCellThin>

                  <StyledTableCellThin align="left">
                    {row.positions}
                  </StyledTableCellThin>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
    </StyledContainer>
  )
};

export default Markets;
