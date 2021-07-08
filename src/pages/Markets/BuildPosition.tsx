import { useState } from 'react';
import { MarketCard } from "../../components/Card/MarketCard";
import { LightGreyButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";
import { Label, Slider } from '@rebass/forms';


export const BuildPosition = () => {
  const [leverage, setLeverage] = useState(1);


  const updateLeverage = (e:any) => {
    setLeverage(e.target.value);
    console.log('leverage: ', leverage);
  }

  return (
    <MarketCard title={'Build'}>
      <Column as={'form'} onSubmit={(e:any) => e.preventDefault()}>
        <TEXT.Body margin={'16px auto 4px 0'} letterSpacing={'0.25px'}>
          Side
        </TEXT.Body>
        <Row>
          <LightGreyButton height={'32px'} padding={'8px'} mr={'2px'}>
            Long
          </LightGreyButton>
          <LightGreyButton height={'32px'} padding={'8px'}>
            Short
          </LightGreyButton>
        </Row>
        <Label htmlFor='leverage'>
          <TEXT.Body margin={'24px 0 4px 0'} letterSpacing={'0.25px'}>
            Leverage: {leverage}x
          </TEXT.Body>
            <TEXT.Small margin={'auto auto 4px 4px'} color={'white'}>
              (Liquidation Price Est.: N/A USD)
            </TEXT.Small>
        </Label>
        <Slider
          id='leverage'
          name='leverage'
          value={leverage}
          step={0.5}
          min={1}
          max={5}
          color='#12B4FF'
          bg="#F2F2F2"
          onChange={updateLeverage}
        />
      </Column>
    </MarketCard>
  )
};