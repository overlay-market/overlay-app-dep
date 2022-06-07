import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { Container } from "../Markets/Market";
import { TEXT } from "../../theme/theme";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { TransparentButton, TransparentUnderlineButton, SelectActionButton } from "../../components/Button/Button";
import { NumericalInputContainer, NumericalInputTitle, NumericalInputLabel, NumericalInputDescriptor } from "../Markets/Build";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";

const ControlInterfaceContainer = styled(FlexColumn)`
  background: #262626;
`;

const RewardInterfaceContainer = styled(FlexColumn)`
  margin-top: 16px;
  background: #262626;
`;

const HeaderContainer = styled(FlexColumn)`

`;

export function Stake({match: {params: { vaultId }}}: RouteComponentProps<{ vaultId: string }>) {

  return (
    <Container>
      <HeaderContainer>
        <TEXT.StandardBody>
          Pool
        </TEXT.StandardBody>
        <TEXT.BoldHeader1>
          OVL/ETH UNI v3 LP
        </TEXT.BoldHeader1>
      </HeaderContainer>

      <ControlInterfaceContainer>
        <FlexRow>
          <TransparentButton width={'50%'}>
            Stake
          </TransparentButton>
          <TransparentButton width={'50%'}>
            Withdraw
          </TransparentButton>
        </FlexRow>

        <NumericalInputLabel htmlFor="Stake Amount Input">
          <NumericalInputTitle> Amount </NumericalInputTitle>
          <FlexRow ml={"auto"} mb={"4px"} width={"auto"}>
            <TransparentUnderlineButton>
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton>
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton>
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton>
              Max
            </TransparentUnderlineButton>
          </FlexRow>        
        </NumericalInputLabel>
        <NumericalInputContainer>
          <NumericalInputDescriptor> OVL </NumericalInputDescriptor>
          <NumericalInput
            align={"right"}
            onUserInput={() => null}
            value={"0"}
          />
        </NumericalInputContainer>
        <SelectActionButton>
          Stake
        </SelectActionButton>
      </ControlInterfaceContainer>

      <RewardInterfaceContainer>
        <FlexRow>
          <TEXT.BoldStandardBody>
            Rewards
          </TEXT.BoldStandardBody>
          <TEXT.StandardBody>
            0.0 OVL
          </TEXT.StandardBody>
        </FlexRow>
        <SelectActionButton>
          Collect Rewards
        </SelectActionButton>
      </RewardInterfaceContainer>
    </Container>
  )
};