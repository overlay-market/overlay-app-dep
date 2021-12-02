import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router";
import { Container } from "../Markets/Market/Market";
import { Column } from "../../components/Column/Column";
import { TEXT } from "../../theme/theme";
import { Label } from "@rebass/forms";
import { Row } from "../../components/Row/Row";
import { Back } from "../../components/Back/Back";
import {
  TransparentUnderlineButton,
  LightGreyButton,
} from "../../components/Button/Button";
import {
  InputContainer,
  InputDescriptor,
} from "../Markets/Market/BuildPosition";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { PositionCard, PositionsCardHeader } from "./Positions";
import { useOvlBalance } from "../../state/wallet/hooks";
import { useActiveWeb3React } from "../../hooks/web3";
import { api } from "../../state/data/slice";
import { useAppDispatch } from "../../state/hooks";
import { formatAmount } from "../../utils/formatData";
import ConfirmTxnModal from "../../components/ConfirmTxnModal/ConfirmTxnModal";
import { useUnwindCallback } from "../../hooks/useUnwindCallback";
import { BigNumberish, utils } from "ethers";
import { useAllPositions } from "../../state/positions/hooks";
import {
  useUnwindState,
  useUnwindActionHandlers,
} from "../../state/unwind/hooks";

const UnwindButton = styled(LightGreyButton)`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  background: transparent;
  color: #71d2ff;
  margin-top: 24px;
  margin-bottom: 64px;
`;

export const ListItem = ({
  item,
  value,
  itemColor,
  valueColor,
}: {
  item: string;
  value: string;
  itemColor?: string;
  valueColor?: string;
}) => {
  return (
    <Row m={"2px 0"}>
      <TEXT.Body mr={"auto"} color={itemColor}>
        {item}
      </TEXT.Body>

      <TEXT.Body fontWeight={700} color={valueColor}>
        {value}
      </TEXT.Body>
    </Row>
  );
};

export function Position({
  match: {
    params: { positionId },
  },
}: RouteComponentProps<{ positionId: string }>) {
  const { account } = useActiveWeb3React();

  const dispatch = useAppDispatch();

  const { error, isLoading, positions } = useAllPositions(account);

  const filtered = positions?.filter((index, key) => {
    return index.position.id === positionId;
  });

  const position = filtered ? filtered[0].position : null;

  const { typedValue, selectedPositionId } = useUnwindState();

  const { onUserInput, onSelectPositionId } = useUnwindActionHandlers();

  const handleUserInput = useCallback(
    (input: string) => {
      onUserInput(input);
    },
    [onUserInput]
  );

  const handleQuickInput = (percentage: number, totalOi: string | null) => {
      let calculatedOi = (Number(totalOi) * (percentage / 100)).toFixed(0)
      return onUserInput(calculatedOi)
  };

  const handleSelectPosition = useCallback(
    (positionId: number) => {
      onSelectPositionId(positionId);
    },
    [onSelectPositionId]
  );

  const handleClearInput = useCallback(() => {
    onUserInput("")
    }, 
    [onUserInput]
  );

  const { callback: unwindCallback, error: unwindCallbackError } =
    useUnwindCallback(typedValue, selectedPositionId);

  const handleUnwind = useCallback(() => {
    if (!unwindCallback) {
      return;
    }

    unwindCallback()
      .then((success) => handleClearInput)
      .catch((err) => console.error('Error from handleUnwind: ', err))
  }, [unwindCallback, handleClearInput]);

  return (
    <Container>
      {handleSelectPosition(position?.number)}
      <Back arrowSize={16} textSize={16} margin={"0 auto 64px 0"} />

      <Column>
        <TEXT.MediumHeader fontWeight={700}>Close Position</TEXT.MediumHeader>
        <TEXT.MediumHeader>$2241.25</TEXT.MediumHeader>
      </Column>

      <Label htmlFor="Amount" mt={"24px"}>
        <TEXT.Body margin={"0 auto 4px 0"} color={"white"}>
          Unwind Amount
        </TEXT.Body>
        <Row ml={"auto"} mb={"4px"} width={"auto"}>
          <TransparentUnderlineButton onClick={() => handleQuickInput(25, position?.oiShares ? (Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)) : (null))} border={"none"}>
            25%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton onClick={() => handleQuickInput(50, position?.oiShares ? (Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)) : (null))} border={"none"}>
            50%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton onClick={() => handleQuickInput(75, position?.oiShares ? (Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)) : (null))} border={"none"}>
            75%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton onClick={() => handleQuickInput(100, position?.oiShares ? (Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)) : (null))} border={"none"}>
            Max
          </TransparentUnderlineButton>
        </Row>
      </Label>
      <InputContainer>
        <InputDescriptor>OVL</InputDescriptor>
        <NumericalInput
          value={typedValue}
          onUserInput={handleUserInput}
          align={"right"}
        />
      </InputContainer>
      <UnwindButton onClick={() => handleUnwind()}>Unwind</UnwindButton>

      <PositionsCardHeader />
      <PositionCard
        positionId={position?.id ?? "loading"}
        marketName={position?.number}
        isLong={position?.isLong ?? null}
        leverage={position?.leverage}
        positionSize={`${
          position?.oiShares
            ? Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)
            : "loading..."
        }`}
        collateralCurrency={"OVL"}
        quotePrice={"n/a"}
        quoteCurrency={"n/a"}
        estLiquidationPrice={position?.liquidationPrice}
        PnL={"n/a"}
        navigate={false}
      />

      <Column mt={"48px"}>
        <ListItem item={"PnL"} valueColor={"#10DCB1"} value={"n/a"} />
        <ListItem item={"Value"} value={"n/a"} />
        <ListItem
          item={"Open Interest"}
          value={`${
            position?.oiShares
              ? Number(utils.formatUnits(position?.oiShares, 18)).toFixed(2)+" OVL"
              : "loading..."
          }`}
        />
      </Column>

      <Column mt={"48px"}>
        <ListItem item={"Side"} value={"Long"} valueColor={"#10DCB1"} />
        <ListItem
          item={"Leverage"}
          value={`${position?.leverage ? position.leverage : "loading"}`}
        />
        <ListItem
          item={"Debt"}
          value={`${
            position?.debt
              ? Number(utils.formatUnits(position?.debt, 18)).toFixed(2)+" OVL"
              : "loading..."
          }`}
        />
        <ListItem
          item={"Cost"}
          value={`${
            position?.cost
              ? Number(utils.formatUnits(position?.cost, 18)).toFixed(2)+" OVL"
              : "loading..."
          }`}
        />
        <ListItem
          item={"Collateral"}
          value={`${
            position?.debt
              ? Number(utils.formatUnits(position?.debt, 18)).toFixed(2)+" OVL"
              : "loading..."
          }`}
        />
        <ListItem item={"Notional"} value={"n/a"} />
        <ListItem item={"Maintenance"} value={"n/a"} />
      </Column>

      <Column mt={"48px"}>
        <ListItem item={"Entry Price"} value={"n/a"} />
        <ListItem item={"Current Price"} value={"n/a"} />
        <ListItem item={"Liquidation Price (est)"} value={"n/a"} />
      </Column>

      <Column mt={"48px"}>
        <ListItem
          item={"Total Shares Outstanding"}
          value={`${
            position?.totalSupply
              ? Number(utils.formatUnits(position?.totalSupply, 18)).toFixed(2)+" OVL"
              : "loading..."
          }`}
        />
        <ListItem item={"Position Shares"} value={"n/a"} />
      </Column>
    </Container>
  );
}
