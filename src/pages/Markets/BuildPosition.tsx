import { MarketCard } from "../../components/Card/MarketCard";
import { LightGreyButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";

export const BuildPosition = () => {
  return (
    <MarketCard title={'Build'}>
      <Column>
        <TEXT.Body margin={'16px auto 4px 0'}>
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
      </Column>
    </MarketCard>
  )
};