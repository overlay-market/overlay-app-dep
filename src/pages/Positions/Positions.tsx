import { useState } from 'react';
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
import { number } from '@lingui/core/cjs/formats';

const Header = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 36px;
  margin-bottom: 24px;
  font-weight: 700;
  color: white;
`;

const CardHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #828282;
  padding-bottom: 8px;
  color: white;
  display: flex;
  flex-direction: row;
`;

const CardCell = styled.div<{ 
  align?: string,
  width?: string
}>`
  text-align: ${({ align }) => ( align ? align : 'left' )};
  width: ${({ width }) => ( width ? width : 'auto' )};
  font-size: 14px;
`;

const Detail = styled.div<{
  fontWeight?: number;
  color?: string;
}>`
  font-weight: ${({ fontWeight }) => ( fontWeight ? fontWeight : 400 )};
  color: ${({ color }) => ( color ? color : 'white' )};
  text-align: inherit;
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;


const HeaderCell = styled(CardCell)`
  font-weight: 700;
`;

const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const PositionsCardHeader = () => (
  <CardHeader>
    <HeaderCell align="left" width="50%">
      Position
    </HeaderCell>
    
    <HeaderCell align="left" width="30%">
      Est. Liq.
    </HeaderCell>

    <HeaderCell align="right" width="20%">
      PnL
    </HeaderCell>
  </CardHeader>
);

const PositionCard = ({
  marketName,
  isLong,
  leverage,
  positionSize,
  collateralCurrency,
  quotePrice,
  quoteCurrency,
  dateCreated,
  timeCreated,
  estLiquidationPrice,
  liquidationCurrency,
  PnL,
  PnLCurrency
}:{
  marketName: string
  isLong: boolean
  leverage: number | string
  positionSize: number | string
  collateralCurrency: string
  quotePrice: number | string
  quoteCurrency: string
  dateCreated: any
  timeCreated: any
  estLiquidationPrice: string
  liquidationCurrency: string
  PnL: number | string
  PnLCurrency: string
}) => {

  return(
    <CardContainer>
      <CardCell width="50%">
        <Detail 
          fontWeight={700} 
          color={'white'}>
          {marketName}
        </Detail>

        {isLong ? (
          <Detail fontWeight={700} color={'#10DCB1'}>
            Long {leverage}x
          </Detail>
        ):(
          <Detail fontWeight={700} color={'#FF648A'}>
            Short {leverage}x
          </Detail>
        )}

        <Detail color={'#C0C0C0'}>
          {}
        </Detail>
      </CardCell>
    </CardContainer>
  )
};


const Positions = () => { 
  const { account, activate, chainId } = useActiveWeb3React();
  const [loading, setLoading] = useState(true);

  const toggleWalletModal = useWalletModalToggle();

  return (
    <Container>
      <Header>
        Positions
      </Header>

      <PositionsCardHeader />
      <PositionsContainer>

      </PositionsContainer>

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