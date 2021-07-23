import { MarketCard } from "../../components/Card/MarketCard";
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

export const StyledTableHeader = styled(TableCell)`
  background: ${({theme}) => theme.bg1};
  color: ${({theme}) => theme.text1} !important;
  padding: 0 4px 4px !important;
  font-weight: 600 !important;
`

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
        <Table>
          <TableHead>
            <TableRow>
              {PositionHeaders.map((header, index) => {
                return (
                  <StyledTableHeader>{header}</StyledTableHeader>
                )
              })}
            </TableRow>
          </TableHead>
          <StyledEmptyBody>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
              <StyledEmptyRow></StyledEmptyRow>
          </StyledEmptyBody>
        </Table>
      </TableContainer>
    </MarketCard>
  )
};
