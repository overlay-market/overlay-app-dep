import { useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper
} from '@material-ui/core';
import { 
  StyledTableCell, 
  StyledTableCellThin, 
  StyledTableRow,
  StyledTableHeaderRow, 
  StyledHeaderCell,
  StyledTable
} from '../Markets/Markets';
import { useActiveWeb3React } from '../../hooks/web3';
import { useWalletModalToggle } from "../../state/application/hooks";
import Loader from 'react-loader-spinner';
import { Trans } from '@lingui/macro';
import styled from 'styled-components/macro';
import { TEXT } from '../../theme/theme';
import { PlanckCatLoader } from '../../components/Loaders/Loaders';
import { Button } from 'rebass';
import { injected } from '../../connectors/connectors';
import { Container } from '../Markets/Market/Market';

const Header = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 36px;
  margin-bottom: 24px;
  font-weight: 700;
  color: white;
`;

const TableHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #828282;
  padding-bottom: 8px;
  color: white;
  display: flex;
  flex-direction: row;
`;

const HeaderCell = styled.div<{ 
  align?: string,
  width: string
}>`
  text-align: ${({ align }) => ( align ? align : 'left' )};
  width: ${({ width }) => ( width ? width : 'auto' )};
  font-size: 14px;
  font-weight: 700;
`

const LoadingContainer = styled.div`
  display: block;
`;

const ConnectWallet = styled(Button)`
  width: 100%;
  height: 33vh;
  cursor: pointer;
  background: none;

  :hover {
    opacity: 0.7;
  }
`;

const PositionsChartHeader = () => (
  <TableHeader>
    <HeaderCell align="left" width="50%">
      Position
    </HeaderCell>

    <HeaderCell align="left" width="30%">
      Est. Liq.
    </HeaderCell>

    <HeaderCell align="right" width="20%">
      PnL
    </HeaderCell>
  </TableHeader>
)


const Positions = () => { 
  const { account, activate, chainId } = useActiveWeb3React();
  const [loading, setLoading] = useState(true);

  const toggleWalletModal = useWalletModalToggle();

  return (
    <Container>
      <Header>
        Positions
      </Header>

      <PositionsChartHeader />
      {account ? (
        <LoadingContainer>
          <PlanckCatLoader duration={5} width={24} />
          <PlanckCatLoader duration={5} width={24} />
          <PlanckCatLoader duration={5} width={24} />
        </LoadingContainer>
      ):(
        <LoadingContainer>
          <ConnectWallet onClick={toggleWalletModal}>
            <strong>
              Please connect wallet
            </strong>
          </ConnectWallet>
        </LoadingContainer>
      )}
    </Container>
  )
};

export default Positions;