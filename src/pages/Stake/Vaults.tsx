import styled from "styled-components"
import { NavLink, useHistory } from "react-router-dom";
import { PageContainer } from "../../components/Container/Container";
import { TableContainer, TableHead, TableBody, Paper } from '@material-ui/core';
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from '../../components/Table/Table';

export const Vaults = () => {
  const history = useHistory();

  function redirectToVault(vaultId: string) {
    history.push(`/stake/${vaultId}`);
  }

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

          <TableBody>
            <StyledTableRow>
              <StyledTableCellThin component="th" scope="row">
                OVL/ETH UNI v3 LP
              </StyledTableCellThin>
              <StyledTableCellThin component="th" scope="row">
                -
              </StyledTableCellThin>
              <StyledTableCellThin component="th" scope="row">
                -
              </StyledTableCellThin>
              <StyledTableCellThin component="th" scope="row">
                -
              </StyledTableCellThin>
              <StyledTableCellThin component="th" scope="row">
                -
              </StyledTableCellThin>
            </StyledTableRow>
          </TableBody>
        </StyledTable>
      </TableContainer>
    </PageContainer>
  )
};

export default Vaults;