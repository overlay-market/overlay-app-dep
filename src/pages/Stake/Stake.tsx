import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { Container } from "../Markets/Market";
import { TEXT } from "../../theme/theme";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { TransparentButton, TransparentUnderlineButton, SelectActionButton } from "../../components/Button/Button";
import { NumericalInputContainer, NumericalInputTitle, NumericalInputLabel, NumericalInputDescriptor } from "../Markets/Build";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";

const ControlInterfaceContainer = styled(FlexColumnContainer)`
  background: #262626;
`;

const RewardInterfaceContainer = styled(FlexColumnContainer)`
  margin-top: 16px;
  background: #262626;
`;

const HeaderContainer = styled(FlexColumnContainer)`

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
        <FlexRowContainer>
          <TransparentButton width={'50%'}>
            Stake
          </TransparentButton>
          <TransparentButton width={'50%'}>
            Withdraw
          </TransparentButton>
        </FlexRowContainer>

        <NumericalInputLabel htmlFor="Stake Amount Input">
          <NumericalInputTitle> Amount </NumericalInputTitle>
          <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
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
          </FlexRowContainer>        
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
        <FlexRowContainer>
          <TEXT.BoldStandardBody>
            Rewards
          </TEXT.BoldStandardBody>
          <TEXT.StandardBody>
            0.0 OVL
          </TEXT.StandardBody>
        </FlexRowContainer>
        <SelectActionButton>
          Collect Rewards
        </SelectActionButton>
      </RewardInterfaceContainer>
    </Container>
  )
};