import { MarketCard } from "../../../components/Card/MarketCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { 
  StyledContainer, 
  StyledTableCell, 
  StyledTableCellThin, 
  StyledTableRow,
  StyledTableHeaderRow, 
  StyledHeaderCell,
  StyledTable
} from '../Markets';
import styled from 'styled-components/macro';

export const StyledEmptyBody = styled(TableBody)`
  background-color: ${({theme}) => theme.bg1} !important;
  height: 250px;
  min-height: 250px !important;
  width: 100%;
  text-align: center;
`

export const StyledEmptyRow = styled(TableCell)`
  background-color: ${({theme}) => theme.bg1} !important;
  color: ${({theme}) => theme.text1} !important;
  border-bottom: 0px solid transparent !important;
`

const PositionHeaders = ['Amt.', 'Side', 'Leverage', 'Lock price', 'Est. Liq.', 'PnL'];

export const MarketPositions = () => {
  return (
    <MarketCard title={'Positions'}>
      <TableContainer component={Paper}>
        <StyledTable>
          <StyledTableHeaderRow>
              {PositionHeaders.map((header, index) => {
                return (
                  <StyledHeaderCell>{header}</StyledHeaderCell>
                )
              })}
          </StyledTableHeaderRow>
          <StyledEmptyBody>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
          </StyledEmptyBody>
        </StyledTable>
      </TableContainer>
    </MarketCard>
  )
};
