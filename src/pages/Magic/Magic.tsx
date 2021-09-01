import React, { useState } from 'react';
import styled from 'styled-components';
import { MarketCard } from '../../components/Card/MarketCard';
import { InfoColumn } from '../../components/InfoColumn/InfoColumn';
import { NumericalInput } from '../../components/NumericalInput/NumericalInput';
import { Row } from '../../components/Row/Row';
import { Label } from '@rebass/forms';
import { TEXT } from '../../theme/theme';
import { TransparentUnderlineButton, TransparentDarkGreyButton } from '../../components/Button/Button';
import MagicBackground from '../../assets/images/magic-background.png';

const MagicWallpaper = styled.div`
  background: url(${MagicBackground});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 0;
  min-height: inherit;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto 16px;
  padding: 16px;
  position: relative;
  z-index: 69;
`;

const MagicDetail = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled(Row)`
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({theme}) => theme.white};
  margin-bottom: 24px;
`;

const InputType = styled.div<{
  height?: string
  padding?: string
  background?: string
}>`
  background: ${({background}) => (background ? background : '#E0E0E0')};
  color: ${({theme}) => theme.text1};
  height: ${({height}) => height};
  line-height: ${({height}) => height};
  padding: ${({padding}) => padding};
  font-size: 14px;
`;

const Magic = ({
  children
}:{
  children: React.ReactNode
}) => {
  const [amount, setAmount] = useState(undefined);

  const handleAmountInput = (e: any) => {
    setAmount(e.target.value);
  };
  
  return (
    <>
    <MagicWallpaper />
    <Container>
      <MarketCard 
        title={'Make some Magic'}
        align={'center'}
        >
        <Label htmlFor='Amount' mt={'24px'}>
          <TEXT.Body margin={'0 auto 4px 0'} color={'white'}>
            Amount
          </TEXT.Body>
          <Row 
            ml={'auto'} 
            mb={'4px'} 
            width={'auto'}
            >
            <TransparentUnderlineButton>25%</TransparentUnderlineButton>
            <TransparentUnderlineButton>50%</TransparentUnderlineButton>
            <TransparentUnderlineButton>75%</TransparentUnderlineButton>
            <TransparentUnderlineButton>Max</TransparentUnderlineButton>
          </Row>
        </Label>
        <InputContainer>
          <NumericalInput
            value={amount}
            onUserInput={handleAmountInput}
            />
          <InputType
            background={'transparent'}
            padding={'4px'}
            >
            ETH
          </InputType>
        </InputContainer>
        <MagicDetail>
          <InfoColumn
            title={'magicETH'}
            description={'$0.0'}
            margin={'0 auto 0 0'}
            />
          <InfoColumn
            title={'Funding rate:'}
            description={'~ -0.0026%'}
            descriptionColor={'#10DCB1'}
            margin={'0 auto 0 0'}
            />
          <InfoColumn
            title={'OVL earned'}
            description={'0.0'}
            margin={'0 auto 0 0'}
            />
        </MagicDetail>
        <ButtonContainer>
          <TEXT.Small textAlign={'right'} ml={'auto'} color={'white'}>
              Fee: 0.0%
          </TEXT.Small>
          <TransparentDarkGreyButton ml={'auto'} mt={'4px'} width={'100%'}>
                Make some Magic
          </TransparentDarkGreyButton>
        </ButtonContainer>
      </MarketCard>

      <TEXT.Body m={'48px 0 16px'}>✨ETH</TEXT.Body>

      <TEXT.Body>
        magicETH allows you to Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </TEXT.Body>
    </Container>
    </>
  )
};

export default Magic;