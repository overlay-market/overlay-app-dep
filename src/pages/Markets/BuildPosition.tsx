import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MarketCard } from "../../components/Card/MarketCard";
import { 
  LightGreyButton, 
  TransparentUnderlineButton, 
  TransparentDarkGreyButton,
  ActiveBlueButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";
import { Label, Slider, Input } from '@rebass/forms';
import { usePositionActionHandlers } from '../../state/position/hooks';
import { useActiveWeb3React } from '../../hooks/web3';
import { usePositionState } from '../../state/position/hooks';
import { useTokenBalance } from '../../state/wallet/hooks';
import { PositionSide } from '../../state/position/actions';
import { OVL } from '../../constants/tokens';
import { maxAmountSpend } from '../../utils/maxAmountSpend';

export const InputContainer = styled(Row)`
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({theme}) => theme.white};
`;

export const InputOVL = styled.div<{
  height?: string
  padding?: string
}>`
  background: #E0E0E0;
  color: ${({theme}) => theme.text3};
  height: ${({height}) => height};
  line-height: ${({height}) => height};
  padding: ${({padding}) => padding};
`;

export const AmountInput = styled(Input)`
  border-color: transparent !important;
`

export const BuildContainer = styled(Column)`

`

export const BuildPosition = () => {
  const { account, chainId } = useActiveWeb3React();

  const ovl = chainId ? OVL[chainId] : undefined;

  const userOvlBalance = useTokenBalance(account ?? undefined, ovl);

  const maxInputAmount = maxAmountSpend(userOvlBalance);
  const inputAmount75 = maxInputAmount?.multiply(75).divide(100).toExact();
  const inputAmount50 = maxInputAmount?.multiply(50).divide(100).toExact();
  const inputAmount25 = maxInputAmount?.multiply(25).divide(100).toExact();

  const { leverageValue, positionSide, inputValue } = usePositionState();

  const { onAmountInput, onLeverageInput, onPositionSideInput } = usePositionActionHandlers();

  const handleAmountInput = useCallback(
    (e: any) => {
      onAmountInput(e.target.value);
    },
    [onAmountInput]
  )
  
  const handleLeverageInput = useCallback(
    (e: any) => {
      onLeverageInput(e.target.value);
    },
    [onLeverageInput]
  );

  const handlePositionSideLong = useCallback(
    () => {
      onPositionSideInput(PositionSide.LONG)
    },
    [onPositionSideInput]
  );

  const handlePositionSideShort = useCallback(
    () => {
      onPositionSideInput(PositionSide.SHORT)
    },
    [onPositionSideInput]
  );
  
  const handleMaxInput = useCallback(
    () => {
      onAmountInput(maxInputAmount?.toExact());
    },
    [onAmountInput, maxInputAmount]
  );

  const handle75Input = useCallback(
    () => {
      onAmountInput(inputAmount75);
    },
    [onAmountInput, inputAmount75]
  );

  const handle50Input = useCallback(
    () => {
      onAmountInput(inputAmount50);
    },
    [onAmountInput, inputAmount50]
  );

  const handle25Input = useCallback(
    () => {
      onAmountInput(inputAmount25);
    },
    [onAmountInput, inputAmount25]
  );

  

  return (
    <MarketCard title={'Build'}>
      <Column 
        as={'form'} 
        onSubmit={(e:any) => e.preventDefault()}
        >
          <TEXT.Body 
            margin={'16px auto 4px 0'} 
            letterSpacing={'0.25px'}
            >
              Side
          </TEXT.Body>
        <Row>
          <LightGreyButton 
            height={'32px'} 
            padding={'8px'} 
            mr={'2px'}
            onClick={handlePositionSideLong}
            background={positionSide === 'LONG' ? '#10DCB1' : undefined}
            >
              Long
          </LightGreyButton>
          <LightGreyButton 
            height={'32px'} 
            padding={'8px'}
            onClick={handlePositionSideShort}
            background={positionSide === 'SHORT' ? '#10DCB1' : undefined}
            >
              Short
          </LightGreyButton>
        </Row>
        <Label htmlFor='leverage'>
          <TEXT.Body 
            margin={'24px 0 4px 0'} 
            letterSpacing={'0.25px'}
            >
              Leverage: {leverageValue}x
          </TEXT.Body>
          <TEXT.Small 
            margin={'auto auto 4px 4px'} 
            color={'white'}>
              (Liquidation Price Est.: N/A USD)
          </TEXT.Small>
        </Label>
        <Slider
          id='leverage'
          name='leverage'
          value={leverageValue}
          step={0.5}
          min={1}
          max={5}
          color='#12B4FF'
          bg="#F2F2F2"
          onChange={handleLeverageInput}
        />
        <Label htmlFor='Amount' mt={'24px'}>
          <TEXT.Body
            margin={'0 auto 4px 0'}
            color={'white'}
            letterSpacing={'0.25px'}
            >
            Amount
          </TEXT.Body>
          <Row 
            ml={'auto'} 
            mb={'4px'} 
            width={'auto'}
            >
            <TransparentUnderlineButton onClick={handle25Input}>25%</TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={handle50Input}>50%</TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={handle75Input}>75%</TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={handleMaxInput}>Max</TransparentUnderlineButton>
          </Row>
        </Label>
        <InputContainer>
          <AmountInput
            height='32px'
            onChange={handleAmountInput}
            value={inputValue?.toString()}
            id='amount'
            name='amount'
            color='#fff'
            min='0'
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            type="Number"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder='0.0'
            spellCheck="false"
            />
            <InputOVL 
              height={'32px'} 
              padding={'0 4px'}
              >
              OVL
            </InputOVL>
          </InputContainer>
          <BuildContainer
            mt={'16px'}
            >
            <TEXT.Small
              textAlign={'right'}
              ml={'auto'}
              color={'white'}
              >
              Fee: 0.0%
            </TEXT.Small>
            { leverageValue !== undefined && positionSide && inputValue ? (
              <ActiveBlueButton ml={'auto'} mt={'4px'}>
                Build
              </ActiveBlueButton>
            ):(
              <TransparentDarkGreyButton ml={'auto'} mt={'4px'}>
                Build
              </TransparentDarkGreyButton>
            )}
          </BuildContainer>
      </Column>
    </MarketCard>
  )
};