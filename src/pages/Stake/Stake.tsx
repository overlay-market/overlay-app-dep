import styled from "styled-components"
import { PageContainer } from "../../components/Container/Container";
import { TableContainer, TableHead, Paper } from '@material-ui/core';
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';

export const Stake = () => {
  return (
    <PageContainer maxWidth={'690px'}>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell width={20}>
                 Pool
              </StyledHeaderCell>
              <StyledHeaderCell width={20}>
                Balance
              </StyledHeaderCell>
              <StyledHeaderCell width={20}>
                TVL
              </StyledHeaderCell>
              <StyledHeaderCell width={20}>
                Share %
              </StyledHeaderCell>
              <StyledHeaderCell width={20}>
                APY
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>
        </StyledTable>
      </TableContainer>
    </PageContainer>
  )
};

export default Stake;