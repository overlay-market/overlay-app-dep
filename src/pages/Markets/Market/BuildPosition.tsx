import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MarketCard } from "../../../components/Card/MarketCard";
import { 
  LightGreyButton, 
  TransparentUnderlineButton, 
  TransparentDarkGreyButton,
  ActiveBlueButton } from "../../../components/Button/Button";
import { TEXT } from "../../../theme/theme";
import { Column } from "../../../components/Column/Column";
import { Row } from "../../../components/Row/Row";
import { Label, Input } from '@rebass/forms';
import { usePositionActionHandlers } from '../../../state/position/hooks';
import { useActiveWeb3React } from '../../../hooks/web3';
import { usePositionState } from '../../../state/position/hooks';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { PositionSide } from '../../../state/position/actions';
import { OVL } from '../../../constants/tokens';
import { maxAmountSpend } from '../../../utils/maxAmountSpend';
import { useApproveCallback } from '../../../hooks/useApproveCallback';
import { useDerivedUserInputs } from '../../../state/position/hooks';
import { NumericalInput } from '../../../components/NumericalInput/NumericalInput';
import { LeverageSlider } from '../../../components/LeverageSlider/LeverageSlider';

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

  const { leverageValue, positionSide, inputValue, inputCurrency } = usePositionState();

  const { parsedAmount, error } = useDerivedUserInputs(
    inputValue,
    ovl
  );

  const { onAmountInput, onLeverageInput, onPositionSideInput } = usePositionActionHandlers();

  // handle user inputs
  const handleLeverageInput = useCallback((e: any) => { onLeverageInput(e.target.value) }, [onLeverageInput]);

  const handlePositionSideLong = useCallback(() => { onPositionSideInput(PositionSide.LONG) }, [onPositionSideInput]);
  
  const handlePositionSideShort = useCallback(() => { onPositionSideInput(PositionSide.SHORT) }, [onPositionSideInput]);
  
  const handleTypeInput = useCallback(
    (value: string) => {
      onAmountInput(value)
    },
    [onAmountInput]
  );

  // handle quick inputs
  const handleMaxInput = useCallback(
    () => { 
      onAmountInput(maxInputAmount?.toExact());
    }, 
    [onAmountInput, maxInputAmount]
  );

  const handle75Input = useCallback(
    () => { 
      onAmountInput(maxInputAmount?.multiply(75).divide(100).toExact().toString()); 
    }, 
    [onAmountInput, maxInputAmount]
  );

  const handle50Input = useCallback(
    () => { 
      onAmountInput(maxInputAmount?.multiply(50).divide(100).toExact().toString()); 
    }, 
    [onAmountInput, maxInputAmount]
  );

  const handle25Input = useCallback(
    () => { 
      onAmountInput(maxInputAmount?.multiply(25).divide(100).toExact().toString()); 
    }, 
    [onAmountInput, maxInputAmount]
  );

  const [approval, approveCallback] = useApproveCallback(parsedAmount, inputCurrency);

  async function attemptToApprove() {
    if (!inputValue) throw new Error('missing position input size');
    if (!positionSide) throw new Error('please choose a long/short position');
    if (!leverageValue) throw new Error('please select a leverage value');

    await approveCallback();
  };

  return (
    <MarketCard title={'Build'}>
      <Column 
        as={'form'} 
        onSubmit={(e:any) => e.preventDefault()}
        >
          <TEXT.Body margin={'16px auto 4px 0'}>
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
        <LeverageSlider
          name={'leverage'}
          value={leverageValue}
          step={1}
          min={1}
          max={5}
          onChange={handleLeverageInput}
          margin={'24px 0 0 0'}
        />
        <Label htmlFor='Amount' mt={'24px'}>
          <TEXT.Body margin={'0 auto 4px 0'} color={'white'}>
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
          <NumericalInput 
            value={inputValue?.toString()}
            onUserInput={handleTypeInput}
            align={'left'}
          />
          <InputOVL 
            height={'32px'} 
            padding={'0 4px'}
            >
            OVL
          </InputOVL>
        </InputContainer>
          <BuildContainer mt={'16px'}>
            <TEXT.Small textAlign={'right'} ml={'auto'} color={'white'}>
              Fee: 0.0%
            </TEXT.Small>
            
            { approval && positionSide && inputValue ? (
              <ActiveBlueButton ml={'auto'} mt={'4px'} onClick={attemptToApprove}>
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