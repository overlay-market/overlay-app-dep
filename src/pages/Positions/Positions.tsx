import { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper
} from '@material-ui/core';
import { 
  StyledContainer, 
  StyledTableCell, 
  StyledTableCellThin, 
  StyledTableRow,
  StyledTableHeaderRow, 
  StyledHeaderCell 
} from '../Markets/Markets';
import { useActiveWeb3React } from '../../hooks/web3';
import Loader from 'react-loader-spinner';
import { Trans } from '@lingui/macro';
import styled from 'styled-components/macro';
import { TEXT } from '../../theme/theme';
import { PlanckCatLoader } from '../../components/Loaders/Loaders';

const LoadingContainer = styled.div`
  display: block;
`;

const tableHeaders = [
  'Market',
  'Amt.',
  'Side',
  'Leverage',
  'Lock price',
  'Est. Liq.',
  'PnL'
];

const Positions = () => { 
  const { account, chainId } = useActiveWeb3React();
  const [loading, setLoading] = useState(true);

  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table>
          <StyledTableHeaderRow>
            {tableHeaders.map((header, column) => (
              <StyledHeaderCell>
                <Trans>{header}</Trans>
              </StyledHeaderCell>
            ))}
          </StyledTableHeaderRow>
        </Table>
        <TableBody>
        </TableBody>
      </TableContainer>

        <LoadingContainer>
          <PlanckCatLoader duration={8} width={32} />
          <PlanckCatLoader duration={8} width={32} />
          <PlanckCatLoader duration={8} width={32} />
        </LoadingContainer>
    </StyledContainer>
  )
};

export default Positions;