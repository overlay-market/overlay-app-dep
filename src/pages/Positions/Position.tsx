import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router';
import { Container } from '../Markets/Market/Market';
import { Column } from '../../components/Column/Column';
import { TEXT } from '../../theme/theme';
import { Label } from '@rebass/forms';
import { Row } from '../../components/Row/Row';
import { TransparentUnderlineButton, LightGreyButton } from '../../components/Button/Button';
import { InputContainer, InputDescriptor } from '../Markets/Market/BuildPosition';
import { NumericalInput } from '../../components/NumericalInput/NumericalInput';
import { PositionCard, PositionsCardHeader } from './Positions';
import { request, gql } from 'graphql-request';

const UnwindButton = styled(LightGreyButton)`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  background: transparent;
  color: #71D2FF;
  margin-top: 24px;
  margin-bottom: 64px; 
`;

export const BobSendAliceMoolah = () => {
  
}

const ListItem = ({
  item,
  value,
  itemColor,
  valueColor,
}:{
  item: string
  value: string
  itemColor?: string
  valueColor?: string
}) => {

  return (
    <Row m={'2px 0'}>
        <TEXT.Body mr={'auto'} color={itemColor}>
          {item}
        </TEXT.Body>
        
        <TEXT.Body fontWeight={700} color={valueColor}>
          {value}
        </TEXT.Body>
    </Row>
  )
};

export function Position(
  { match: {params: { positionId }}
}: RouteComponentProps<{ positionId: string }>
) {
  return (
    <Container>

        <Column>
            <TEXT.MediumHeader fontWeight={700}>
                Close Position
            </TEXT.MediumHeader>
            <TEXT.MediumHeader>
                $2241.25
            </TEXT.MediumHeader>
        </Column>

        <Label htmlFor='Amount' mt={'24px'}>
          <TEXT.Body margin={'0 auto 4px 0'} color={'white'}>
            Unwind Amount
          </TEXT.Body>
          <Row 
            ml={'auto'} 
            mb={'4px'} 
            width={'auto'}
            >
            <TransparentUnderlineButton 
                border={'none'} 
                >
                  25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton 
                border={'none'} 
                >
                  50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
                border={'none'} 
                >
                  75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton 
                border={'none'} 
                >
                  Max
            </TransparentUnderlineButton>
          </Row>
        </Label>
        <InputContainer>
          <InputDescriptor>
            OVL
          </InputDescriptor>
          <NumericalInput 
              value={'0.0'}
              onUserInput={() => null}
              align={'right'}
              />
        </InputContainer>
        <UnwindButton>
           Unwind
        </UnwindButton>


        <PositionsCardHeader />
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
                  navigate={false}
                  />


        <Column mt={'48px'}>
            <ListItem 
                item={'PnL'}
                value={'4.45 OVL (+50%)'}
                valueColor={'#10DCB1'}
                />
            <ListItem
                item={'Value'}
                value={'14.5 OVL'}
                />
            <ListItem
                item={'Open Interest'}
                value={'49.5 OVL'}
                />
        </Column>

        <Column mt={'48px'}>
            <ListItem
                item={'Side'}
                value={'Long'}
                valueColor={'#10DCB1'}
                />
            <ListItem
                item={'Leverage'}
                value={'5x'}
                />
            <ListItem
                item={'Debt'}
                value={'40 OVL'}
                />
            <ListItem
                item={'Cost'}
                value={'10 OVL'}
                />
            <ListItem
                item={'Collateral'}
                value={'9.5 OVL'}
                />
            <ListItem
                item={'Notional'}
                value={'54.45 OVL'}
                />
            <ListItem
                item={'Maintenance'}
                value={'3 OVL'}
                />
        </Column>

        <Column mt={'48px'}>
            <ListItem
                item={'Entry Price'}
                value={'3000.00 USDC'}
                />
            <ListItem
                item={'Current Price'}
                value={'3300.00 USDC'}
                />
            <ListItem
                item={'Liquidation Price (est)'}
                value={'2606.00 USDC'}
                />
        </Column>

        <Column mt={'48px'}>
            <ListItem
                item={'Total Shares Outstanding'}
                value={'50'}
                />
            <ListItem
                item={'Position Shares'}
                value={'15'}
                />
        </Column>
    </Container>
  )
};