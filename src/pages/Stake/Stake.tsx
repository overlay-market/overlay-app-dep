import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { InterfaceWrapper } from "../../components/Container/Container";
import { TEXT } from "../../theme/theme";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { TransparentButton, TransparentUnderlineButton, SelectActionButton } from "../../components/Button/Button";
import { NumericalInputContainer, NumericalInputTitle, NumericalInputLabel, NumericalInputDescriptor } from "../Markets/Build";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { AdditionalStakingDetails } from "./AdditionalStakingDetails";
import { Back } from "../../components/Back/Back";

const StakeButton = styled(SelectActionButton)`
  border: 1px solid white;
  margin-top: 8px;
  background: transparent;
`;

const ClaimButton = styled(SelectActionButton)`
  border: 1px solid white;
  background: transparent;
`;

const StakeInterface = styled.div`
  padding: 16px;
  background: #262626;
`;

const RewardsContainer = styled(FlexColumn)`
  background: #262626;
  margin-top: 16px;
  padding: 16px;
`;

export function Stake({match: {params: { vaultId }}}: RouteComponentProps<{ vaultId: string }>) {

  return (
    <InterfaceWrapper>
      <Back arrowSize={12} textSize={12} />
      <FlexColumn margin="8px 0">
        <TEXT.StandardBody>
          Pool
        </TEXT.StandardBody>
        <TEXT.BoldHeader1>
          OVL/ETH UNI v3 LP
        </TEXT.BoldHeader1>
      </FlexColumn>

      <StakeInterface style={{ background: '#262626' }}>
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
        <StakeButton>
          Stake
        </StakeButton>
      </StakeInterface>

      <RewardsContainer>
        <FlexRow margin="0 0 8px">
          <TEXT.BoldStandardBody>
            Rewards
          </TEXT.BoldStandardBody>
          <TEXT.StandardBody>
            0.0 OVL
          </TEXT.StandardBody>
        </FlexRow>
        <ClaimButton>
          Collect Rewards
        </ClaimButton>
      </RewardsContainer>

      <AdditionalStakingDetails />
    </InterfaceWrapper>
  )
};