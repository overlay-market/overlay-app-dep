import React, { useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Label } from "@rebass/forms";
import { BigNumber, utils } from "ethers";
import { RouteComponentProps } from "react-router";
import { TEXT } from "../../theme/theme";
import { Container } from "../Markets/Market";
import { Back } from "../../components/Back/Back";
import { useActiveWeb3React } from "../../hooks/web3";
import { usePositionInfo } from "../../hooks/usePositionInfo";
import { formatDecimalPlaces } from "../../utils/formatDecimal";
import { Accordion } from "../../components/Accordion/Accordion";
import { useUnwindCallback } from "../../hooks/useUnwindCallback";
import { useAccountPositions } from "../../state/positions/hooks";
import { NumericalInputContainer, NumericalInputDescriptor } from "../Markets/Build";
import { useLiquidationPrice } from "../../hooks/useLiquidationPrice";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { useUnwindState, useUnwindActionHandlers } from "../../state/unwind/hooks";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { TransparentUnderlineButton, TriggerActionButton } from "../../components/Button/Button";

const UnwindButton = styled(TriggerActionButton)`
  margin: 24px 0;
  border: 1px solid #f2f2f2;
`;

export const AdditionalDetailRow = ({
  detail,
  value,
  detailColor,
  valueColor,
}: {
  detail: string;
  value: string;
  detailColor?: string;
  valueColor?: string | number;
}) => {
  return (
    <FlexRowContainer m={"2px 0"}>
      <TEXT.StandardBody mr={"auto"} color={detailColor}>
        {detail}
      </TEXT.StandardBody>

      <TEXT.StandardBody fontWeight={700} color={valueColor}>
        {value}
      </TEXT.StandardBody>
    </FlexRowContainer>
  );
};

export function Unwind({match: {params: { positionId }}}: RouteComponentProps<{ positionId: string }>) {
  const { account } = useActiveWeb3React();
  const { error, isLoading, positions } = useAccountPositions(account);
  const { typedValue, selectedPositionId } = useUnwindState();
  const { onUserInput, onSelectPositionId, onResetUnwindState } = useUnwindActionHandlers();
  const { callback: unwindCallback, error: unwindCallbackError } = useUnwindCallback(typedValue, selectedPositionId);
  
  const filtered = positions?.filter((index, key) => index.positionId === positionId);
  const position = filtered ? filtered[0] : null;

  const positionInfo = usePositionInfo(position?.market.id, position?.positionId);

  console.log('positionInfo: ', positionInfo)
  // const PnL = positionValue ? utils.formatUnits(positionValue) : 0;
  // const PnL = BigNumber.from(0);
  // const PnL = positionValue && position?.currentDebt ? formatWeiToParsedNumber((positionValue.sub(position.currentDebt)), 18, 2) : undefined;

  const entryPrice: number | string | null | undefined = position && formatWeiToParsedNumber(position.entryPrice, 18, 2);
  const notional = positionInfo && formatWeiToParsedNumber(positionInfo[0], 18, 2);

  console.log('notional: ', notional);
  // const estLiquidationPrice = useLiquidationPrice(
  //   position?.market?.id,
  //   position?.isLong,
  //   entryPrice,
  //   entryPrice,
  //   formatWeiToParsedNumber(position?.currentDebt, 18, 18),
  //   formatWeiToParsedNumber(position?.totalSupply, 18, 18),
  //   formatWeiToParsedNumber(position?.currentOi, 18, 18)
  // )

  useEffect(() => {
    onResetUnwindState();
  }, [positionId, onResetUnwindState]);

  const handleUserInput = useCallback((input: string) => {
      onUserInput(input)}, [onUserInput]);

  const handleQuickInput = (percentage: number, totalOi: string | null) => {
    let calculatedOi: string =
      percentage !== 100
        ? (Number(totalOi) * (percentage / 100)).toFixed(4)
        : (Number(totalOi) * (percentage / 100)).toFixed(18);
    return onUserInput(calculatedOi);
  };

  const handleSelectPosition = useCallback((positionId: number) => {
      onSelectPositionId(positionId)}, [onSelectPositionId]);

  const handleClearInput = useCallback(() => {
    onUserInput("")}, [onUserInput]);

  const disableUnwindButton: boolean = useMemo(() => {
    return !unwindCallback || Number(typedValue) == 0 ? true : false;
  }, [unwindCallback, typedValue]);

  const handleUnwind = useCallback(() => {
    if (!unwindCallback) return;
    unwindCallback()
      .then((success) => handleClearInput())
      .catch((err) => console.error("Error from handleUnwind: ", err));
  }, [unwindCallback, handleClearInput]);

  return (
    <Container>
      {handleSelectPosition(Number(position?.positionId))}
      <Back arrowSize={16} textSize={16} margin={"0 auto 64px 0"} />

      <FlexColumnContainer>
        <TEXT.StandardHeader1 fontWeight={700}>Close Position</TEXT.StandardHeader1>
        <TEXT.StandardHeader1>
          {/* {position && position?.isLong
            ? formatWeiToParsedNumber(position?.pricePoint.bid, 18, 7)
            : formatWeiToParsedNumber(position?.pricePoint.ask, 18, 7)} */}
        </TEXT.StandardHeader1>
      </FlexColumnContainer>

      <Label htmlFor="Amount" mt={"24px"}>
      <TEXT.StandardBody margin={"0 auto 4px 0"} color={"white"}>
        Unwind Amount
      </TEXT.StandardBody>
      <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
        <TransparentUnderlineButton
          onClick={() => handleQuickInput(25, position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) : null)}
          border={"none"}
          >
          25%
        </TransparentUnderlineButton>
        <TransparentUnderlineButton
          onClick={() => handleQuickInput(50, position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) : null)}
          border={"none"}
          >
          50%
        </TransparentUnderlineButton>
        <TransparentUnderlineButton
          onClick={() => handleQuickInput(75, position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) : null)}
          border={"none"}
          >
          75%
        </TransparentUnderlineButton>
        <TransparentUnderlineButton
          onClick={() => handleQuickInput(100, position?.currentOi ? utils.formatUnits(position?.currentOi, 18) : null)}
          border={"none"}
          >
          Max
        </TransparentUnderlineButton>
      </FlexRowContainer>

      </Label>
      <NumericalInputContainer>
        <NumericalInputDescriptor>OVL</NumericalInputDescriptor>
        <NumericalInput
          value={typedValue}
          onUserInput={handleUserInput}
          align={"right"}
        />
      </NumericalInputContainer>
      <UnwindButton 
        onClick={() => handleUnwind()}
        isDisabled={disableUnwindButton}
        disabled={disableUnwindButton}
        >
        Unwind
      </UnwindButton>

      <FlexColumnContainer mt={"48px"}>
        <AdditionalDetailRow 
          detail={"Profit/Loss"} 
          // valueColor={PnL && PnL < 0 ? "#FF648A" : "#10DCB1"} value={`${PnL} OVL`} 
          valueColor={"#10DCB1"}
          value={`0 OVL`} 
        />
        <AdditionalDetailRow 
          detail={"Side"} 
          value={`${position?.isLong ? "Long" : "Short"}`} valueColor={`${position?.isLong ? "#10DCB1" : "#FF648A" }`} 
        />
      </FlexColumnContainer>

      <Accordion 
        activeAccordionText={"Less"}
        inactiveAccordionText={"More"}
        activeColor={"#12B4FF"}
        inactiveColor={"#12B4FF"}
        width={"fit-content"}
        clickableMargin={"auto"}
        >
        <FlexColumnContainer mt={"48px"}>
          <AdditionalDetailRow
            detail={"Value"}
            // value={positionValue ? `${formatWeiToParsedNumber(positionValue, 18, 2)} OVL` : "..."}
            value={"-"}
          />
          <AdditionalDetailRow
            detail={"Open Interest"}
            value={`${position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) + " OVL" : "..."}`}
          />
          <AdditionalDetailRow 
            detail={"Leverage"}
            value={`${position?.leverage ? position.leverage : "loading"}`}
          />
          <AdditionalDetailRow
            detail={"Debt"}
            value={`${position?.currentDebt ? Number(utils.formatUnits(position?.currentDebt, 18)).toFixed(2) + " OVL" : "loading..."}`}
          />
          {/* <AdditionalDetailRow
            detail={"Cost"}
            value={`${position?.cost ? Number(utils.formatUnits(position?.cost, 18)).toFixed(2) + " OVL" : "loading..."}`}
          /> */}
          {/* <AdditionalDetailRow
            detail={"Collateral"}
            value={`${position?.currentDebt ? Number(utils.formatUnits(position?.cost, 18)).toFixed(2) + " OVL" : "loading..."}`}
          /> */}
          <AdditionalDetailRow 
            detail={"Notional"} 
            value={"n/a"} 
          />
          <AdditionalDetailRow 
            detail={"Maintenance"} 
            value={"n/a"} 
          />
        </FlexColumnContainer>

        <FlexColumnContainer mt={"48px"}>
          <AdditionalDetailRow 
            detail={"Entry Price"} 
            value={ entryPrice ? `${entryPrice}` : 'loading'} 
          />
          {/* <AdditionalDetailRow 
            detail={"Current Price"} 
            value={ currentPrice ? `${currentPrice}` : 'loading'} 
          />
          <AdditionalDetailRow 
            detail={"Liquidation Price (est)"} 
            value={ estLiquidationPrice ? `${formatDecimalPlaces(5, estLiquidationPrice.toString())}` : 'loading'} 
          /> */}
        </FlexColumnContainer>

        <FlexColumnContainer mt={"48px"}>
          {/* <AdditionalDetailRow
            detail={"Total Shares Outstanding"}
            value={`${position?.totalSupply ? Number(utils.formatUnits(position?.totalSupply, 18)).toFixed(2) + " OVL" : "loading..."}`}
          /> */}
          <AdditionalDetailRow 
            detail={"Position Shares"} 
            value={`${position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) + " OVL" : "loading..."}`}
          />
        </FlexColumnContainer>
      </Accordion>
      
    </Container>
  );
}
