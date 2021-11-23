import { useState } from 'react';
import { useActiveWeb3React } from '../../hooks/web3';
import { useWalletModalToggle } from "../../state/application/hooks";
import Loader from 'react-loader-spinner';
import { ChevronRight } from 'react-feather';
import { Trans } from '@lingui/macro';
import styled from 'styled-components/macro';
import { TEXT } from '../../theme/theme';
import { Link } from 'react-router-dom';
import { PlanckCatLoader } from '../../components/Loaders/Loaders';
import { Button } from 'rebass';
import { injected } from '../../connectors/connectors';
import { number } from '@lingui/core/cjs/formats';
import { Icon } from '../../components/Icon/Icon';
import { MarketCard } from '../../components/Card/MarketCard';
import { StyledLink } from '../../components/Link/Link';
import { useOvlBalance } from '../../state/wallet/hooks';
import { useActivePositions } from '../../state/position/hooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto 32px;
  position: static;
  z-index: 0;
`;

const Header = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 32px;
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

const CardContainer = styled(Link)<{ navigate?: boolean}>`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #828282;
  width: 100%;
  padding: 16px 0;
  text-decoration: none;

  pointer-events: ${({ navigate }) => ( navigate ? 'auto' : 'none' )};

  :hover {
    border-right: ${({ navigate }) => ( navigate ? '2px solid #12B4FF' : 'none' )};
    border-left: ${({ navigate }) => ( navigate ? '2px solid #12B4FF' : 'none' )};
  }
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

function create_mock_position(
  positionId: string,
  marketName: string,
  isLong: boolean,
  leverage: number | string,
  positionSize: number | string,
  collateralCurrency: string,
  quotePrice: number | string,
  quoteCurrency: string,
  dateCreated: any,
  timeCreated: any,
  estLiquidationPrice: string,
  liquidationCurrency: string,
  PnL: number | string,
  PnLCurrency: string,
  ) {
    return { 
      positionId,
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
      PnLCurrency }
  };


export const mock_position_data = [
  create_mock_position("0", "ETH/DAI", true, 1, 100, "OVL", 2410.24, "DAI", "9/17/21", '10:28:30 PM +UTC', '420.60', 'DAI', '0.10', 'OVL'),
  create_mock_position("1", "ETH/DAI", false, 3, 3300, "OVL", 2910.23, "DAI", "9/21/21", '09:13:24 PM +UTC', '2533.89', 'DAI', '5.01', 'OVL'),
  create_mock_position("2", "ETH/DAI", true, 7, 700, "OVL", 3300.77, "DAI", "9/25/21", '22:21:15 PM +UTC', '3156.22', 'DAI', '33.33', 'OVL')
]

export const PositionsCardHeader = () => (
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

export const PositionCard = ({
  positionId,
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
  PnLCurrency,
  navigate
}:{
  positionId: string
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
  navigate?: boolean
}) => {


  return(
    <CardContainer navigate={navigate} to={`/positions/${positionId}`} >
      <CardCell width="50%">
        <Detail fontWeight={700} color={'white'}>
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
          {positionSize} {collateralCurrency}
        </Detail>

        <Detail color={'#C0C0C0'}>
          @ {quotePrice} {quoteCurrency}
        </Detail>

        <Detail color={'#C0C0C0'}>
          {dateCreated}
        </Detail>

        <Detail color={'#C0C0C0'}>
          {timeCreated}
        </Detail>
      </CardCell>

      <CardCell width="30%">
        <Detail fontWeight={700} color={'white'}>
          {estLiquidationPrice}
        </Detail>

        <Detail color={'#C0C0C0'}>
          {liquidationCurrency}
        </Detail>
      </CardCell>

      <CardCell width="20%" align="right">
        <Detail fontWeight={700} color={'#10DCB1'}>
          {PnL}
        </Detail>

        <Detail color={'#C0C0C0'}>
          {PnLCurrency}
        </Detail>

        <Icon size={12} margin={'24px 0 0 auto'}>
          <ChevronRight />
        </Icon>
      </CardCell>
    </CardContainer>
  )
};


export const Positions = () => { 
  const { account, activate, chainId } = useActiveWeb3React();

  // const ovlBalance = useOvlBalance(account);
  // const positions = useActivePositions(account);

  // console.log('positions: ', positions); 

  const [loading, setLoading] = useState(true);

  const toggleWalletModal = useWalletModalToggle();

  return (
    <MarketCard>
      <Container>
        <Header>
          Positions
        </Header>

        {account ? (
          <>
            <PositionsCardHeader />
            
            <PositionsContainer>
              <PositionCard
                  positionId={ '0' }
                  marketName={ 'ETH/DAI' }
                  isLong={true}
                  leverage={1}
                  positionSize={ '100.0' }
                  collateralCurrency={ 'OVL' }
                  quotePrice={ '2410.0' }
                  quoteCurrency={ 'DAI' }
                  dateCreated={ '9/17/21' }
                  timeCreated={ '10:28:30 PM +UTC' }
                  estLiquidationPrice={ '3210.79' }
                  liquidationCurrency={ 'DAI' }
                  PnL={ '0.10' }
                  PnLCurrency={ 'OVL' }
                  navigate={true}
                  />

              {mock_position_data.map((p, key) => (
                <PositionCard 
                    positionId={p.positionId}
                    marketName={p.marketName}
                    isLong={p.isLong}
                    leverage={p.leverage}
                    positionSize={p.positionSize}
                    collateralCurrency={p.collateralCurrency}
                    quotePrice={p.quotePrice}
                    quoteCurrency={p.quoteCurrency}
                    dateCreated={p.dateCreated}
                    timeCreated={p.timeCreated}
                    estLiquidationPrice={p.estLiquidationPrice}
                    liquidationCurrency={p.liquidationCurrency}
                    PnL={p.PnL}
                    PnLCurrency={p.PnLCurrency}
                    navigate={true}
                    />
              ))} 
            </PositionsContainer>
          </>
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
    </MarketCard>
  )
};

export default Positions;