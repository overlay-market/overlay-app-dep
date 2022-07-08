import React, { useEffect, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Label } from "@rebass/forms";
import { BigNumber, utils } from "ethers";
import { RouteComponentProps } from "react-router";
import { TEXT } from "../../theme/theme";
import { InterfaceWrapper } from "../../components/Container/Container";
import { Back } from "../../components/Back/Back";
import { useActiveWeb3React } from "../../hooks/web3";
import { usePositionInfo } from "../../hooks/usePositionInfo";
import { formatDecimalPlaces } from "../../utils/formatDecimal";
import { Accordion } from "../../components/Accordion/Accordion";
import { useUnwindCallback } from "../../hooks/useUnwindCallback";
import { useAccountPositions } from "../../state/build/hooks";
import { NumericalInputContainer, NumericalInputDescriptor } from "../Markets/Build";
import { useLiquidationPrice } from "../../hooks/useLiquidationPrice";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { useUnwindState, useUnwindActionHandlers, useDerivedUnwindInfo } from "../../state/unwind/hooks";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { TransparentUnderlineButton, TriggerActionButton } from "../../components/Button/Button";
import { usePositionValue } from "../../hooks/usePositionValue";
import { usePositionOi } from "../../hooks/usePositionOi";
import { usePositionDebt } from "../../hooks/usePositionDebt";
import { usePositionNotional } from "../../hooks/usePositionNotional";
import { useMaintenanceMargin } from "../../hooks/useMaintenanceMargin";
import { usePositionCollateral } from "../../hooks/usePositionCollateral";
import { usePositionCost } from "../../hooks/usePositionCost";
import { useMarketPrice } from "../../hooks/useMarketPrices";
import { Icon } from "../../components/Icon/Icon";
import { Sliders, X } from "react-feather";
import { TransactionSettingsModal } from "../Markets/TransactionSettingsModal";
import { useBuildState } from "../../state/build/hooks";
import { useBuildActionHandlers } from "../../state/build/hooks";
import { DefaultTxnSettings } from "../../state/build/actions";
import { useIsTxnSettingsAuto } from "../../state/build/hooks";
import { PercentageSlider } from "../../components/PercentageSlider/PercentageSlider";
import { useMarketName } from "../../hooks/useMarketName";
import { useFractionOfCapOi } from "../../hooks/useFractionOfCapOi";
import { useBid } from "../../hooks/useBid";
import { useAsk } from "../../hooks/useAsk";
import Loader from "../../components/Loaders/Loaders";

const ControlInterfaceContainer = styled(FlexColumn)`
  padding: 16px;
`;

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  padding: 16px 0 24px; 
`;

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
  value: string | number;
  detailColor?: string;
  valueColor?: string | number;
}) => {
  return (
    <FlexRow m={"2px 0"}>
      <TEXT.StandardBody mr={"auto"} color={detailColor}>
        {detail}
      </TEXT.StandardBody>

      <TEXT.StandardBody fontWeight={700} color={valueColor}>
        {value === 'loading' ? <Loader stroke="white" size="12px" /> : value}
      </TEXT.StandardBody>
    </FlexRow>
  );
};

export function Unwind({match: {params: { marketPositionId, positionId }}}: RouteComponentProps<{ marketPositionId: string, positionId: string }>) {
  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);
  const { account } = useActiveWeb3React();
  const { error, isLoading, positions } = useAccountPositions(account);
  const { typedValue, selectedPositionId, setSlippageValue, txnDeadline } = useUnwindState();
  const { onAmountInput, onSelectPositionId, onSetSlippage, onSetTxnDeadline, onResetUnwindState } = useUnwindActionHandlers();
  const isTxnSettingsAuto = useIsTxnSettingsAuto();

  const filtered = positions?.filter((index, key) => index.id === marketPositionId);

  const position = filtered ? filtered[0] : null;
  
  const { baseToken, quoteToken } = useMarketName(position?.market.feedAddress);
  const positionIdConverted =  BigNumber.from(positionId).toString();

  const positionInfo = usePositionInfo(position?.market.id, positionId);
  const isLong = positionInfo ? positionInfo.isLong : undefined;
  const collateral = usePositionCollateral(position?.market.id, positionId);
  const cost = usePositionCost(position?.market.id, positionId);
  const value = usePositionValue(position?.market.id, positionId);
  const oi = usePositionOi(position?.market.id, positionId);
  const debt = usePositionDebt(position?.market.id, positionId);
  const notional = usePositionNotional(position?.market.id, positionId);
  const maintenanceMargin = useMaintenanceMargin(position?.market.id, positionId);
  const liquidationPriceResult = useLiquidationPrice(position?.market.id, positionId);
  const liquidationPrice = liquidationPriceResult && formatWeiToParsedNumber(liquidationPriceResult, 18, 2);

  const fractionOfCapOi = useFractionOfCapOi(position?.market.id, oi);
  const estimatedBid = useBid(position?.market.id, fractionOfCapOi);
  const estimatedAsk = useAsk(position?.market.id, fractionOfCapOi);

  const estimatedReceivedPrice = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined) return null;
    // if (estimatedBid === undefined || estimatedAsk === undefined) return prices.mid;
    return isLong ? formatWeiToParsedNumber(estimatedBid, 18, 2) : formatWeiToParsedNumber(estimatedAsk, 18, 2);
  }, [isLong, estimatedBid, estimatedAsk]);

  const prices = useMarketPrice(position?.market.id);
  
  const bidPrice = prices ? formatWeiToParsedNumber(prices.bid_, 18, 2) : null;
  const askPrice = prices ? formatWeiToParsedNumber(prices.ask_, 18, 2) : null;
  
  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null;
    if (!typedValue || isLong === undefined || !bidPrice || !askPrice) return null;

    const priceImpactValue = isLong ? estimatedReceivedPrice - askPrice :  bidPrice - estimatedReceivedPrice;
    const priceImpactPercentage = isLong ? (priceImpactValue / askPrice) * 100 : (priceImpactValue / bidPrice) * 100;

    return priceImpactPercentage.toFixed(2);
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice]);
  
  const PnL = cost && value ? value.sub(cost) : null;
  const parsedPnL = PnL ? formatWeiToParsedNumber(PnL, 18, 2) : 0;
  const entryPrice: number | string | null | undefined = position && formatWeiToParsedNumber(position.entryPrice, 18, 2);
  
  const showUnderwaterFlow = (liquidationPrice && bidPrice && askPrice) ?
      isLong ? (liquidationPrice > bidPrice) : (liquidationPrice < askPrice)
      : false;

  const { unwindData, parsedAmount, inputError } = useDerivedUnwindInfo();
  const { callback: unwindCallback, error: unwindCallbackError } = useUnwindCallback(unwindData, position?.market.id, typedValue, value, positionId, isLong, prices);
  
  useEffect(() => {
    onResetUnwindState();
  }, [positionId, onResetUnwindState]);

  const handleResetTxnSettings = useCallback((e: any) => {
    onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE);
    onSetTxnDeadline(DefaultTxnSettings.DEFAULT_DEADLINE);
  }, [onSetSlippage, onSetTxnDeadline]);

  const handleUserAmount = useCallback((e: any) => {
    onAmountInput(e.target.value)}, [onAmountInput]
  )

  // const handleUserInput = useCallback((input: string) => {
  //   onAmountInput(input)}, [onAmountInput]);

  const handleQuickInput = (percentage: number) => {
    if (percentage < 0 || percentage > 100) return onAmountInput('0');
    return onAmountInput(percentage.toString());
  };

  const handleSelectPosition = useCallback((positionId: number) => {
      onSelectPositionId(positionId)}, [onSelectPositionId]);

  const handleClearInput = useCallback(() => {
    onAmountInput("")}, [onAmountInput]);

  const disableUnwindButton: boolean = useMemo(() => {
    return !unwindCallback || parseFloat(typedValue) === 0 ? true : false;
  }, [unwindCallback, typedValue]);

  const handleUnwind = useCallback(() => {
    if (!unwindCallback) return;
    unwindCallback()
      .then((success) => onResetUnwindState())
      .catch((err) => console.error("Error from handleUnwind: ", err));
  }, [unwindCallback, onResetUnwindState]);

  return (
    <InterfaceWrapper>
      {handleSelectPosition(Number(position?.positionId))}
      <Back arrowSize={16} textSize={16} margin="0 auto 64px 0" />
      <ControlInterfaceContainer
        onSubmit={(e: any) => e.preventDefault()}
        as={"form"}
        >
      <ControlInterfaceHeadContainer>
        <TEXT.StandardHeader1 fontWeight={700} m={'0 4px 4px 4px'}>
          ID: {positionIdConverted}
        </TEXT.StandardHeader1>
        <TEXT.StandardHeader1 fontWeight={500} m={'0 4px 4px 4px'}>
            {
              baseToken === 'loading' && quoteToken === 'loading' ? (
                <Loader stroke="white" size="12px" />
              ):(
                `${baseToken}/${quoteToken}`
              )
            }
        </TEXT.StandardHeader1>
        <TEXT.StandardHeader1 minHeight={'30px'}>
          {isLong !== undefined ? (isLong ? bidPrice : askPrice) : <Loader stroke="white" size="12px" />  }
        </TEXT.StandardHeader1>
        <Icon
            onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
            size={24}
            top={"18px"}
            right={"0px"}
            clickable={true}
            position={"absolute"}
            margin={"0 0 auto auto"}
            transform={"rotate(90deg)"}
            >
            {isTxnSettingsOpen ? <X color={"#12B4FF"} /> : <Sliders color={"#B9BABD"} />}
          </Icon>
      </ControlInterfaceHeadContainer>
      <TransactionSettingsModal 
          isTxnSettingsOpen={isTxnSettingsOpen}
          setSlippageValue={setSlippageValue}
          isTxnSettingsAuto={isTxnSettingsAuto}
          txnDeadline={txnDeadline}
          onSetSlippage={onSetSlippage}
          handleResetTxnSettings={handleResetTxnSettings}
          onSetTxnDeadline={onSetTxnDeadline}
        />
      <TEXT.StandardBody margin={"0 auto 24px 0"} color={"white"}>
        Unwind Amount
      </TEXT.StandardBody>

      <PercentageSlider 
        name={"Unwind Position Amount"}
        min={0}
        max={100}
        step={1}
        value={Number(typedValue)}
        onChange={handleUserAmount}
        >
        <FlexRow ml="auto" mb="4px" width="auto">
          <TransparentUnderlineButton
            onClick={() => handleQuickInput(25)}
            border={"none"}
            >
            25%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton
            onClick={() => handleQuickInput(50)}
            border={"none"}
            >
            50%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton
            onClick={() => handleQuickInput(75)}
            border={"none"}
            >
            75%
          </TransparentUnderlineButton>
          <TransparentUnderlineButton
            onClick={() => handleQuickInput(100)}
            border={"none"}
            >
            Max
          </TransparentUnderlineButton>
        </FlexRow>
      </PercentageSlider>
      {/* <Label htmlFor="Amount" mt={"24px"}>

      </Label> */}
      {/* <NumericalInputContainer>
        <NumericalInputDescriptor>OVL</NumericalInputDescriptor>
        <NumericalInput
          value={typedValue}
          onUserInput={handleUserInput}
          align={"right"}
        />
      </NumericalInputContainer> */}

      {showUnderwaterFlow ? (
        <UnwindButton 
          onClick={() => null}
          isDisabled={true}
          disabled={true}
          >
          Position Underwater
        </UnwindButton>
      ):(
        <UnwindButton 
          onClick={() => handleUnwind()}
          isDisabled={disableUnwindButton}
          disabled={disableUnwindButton}
          >
          Unwind
        </UnwindButton>
      )}
      </ControlInterfaceContainer>
      <FlexColumn mt="48px">
        <AdditionalDetailRow 
          detail={"Profit/Loss"} 
          valueColor={parsedPnL !== undefined && parsedPnL !== 0 ? ( parsedPnL < 0 ? "#FF648A" : "#10DCB1" ) : "#F2F2F2"}
          value={PnL ? `${formatWeiToParsedNumber(PnL, 18, 2)} OVL` : "loading"}
        />
        <AdditionalDetailRow 
          detail={"Side"} 
          valueColor={"#F2F2F2"}
          value={isLong !== undefined ? (isLong ? "Long" : "Short") : "loading"} 
        />
      </FlexColumn>

      {/* <Accordion 
        activeAccordionText={"Less"}
        inactiveAccordionText={"More"}
        activeColor={"#12B4FF"}
        inactiveColor={"#12B4FF"}
        width={"fit-content"}
        clickableMargin={"auto"}
        > */}
        <FlexColumn mt="48px">
          <AdditionalDetailRow
            detail={"Value"}
            value={value ? `${formatWeiToParsedNumber(value, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow
            detail={"Open Interest"}
            value={oi ? `${formatWeiToParsedNumber(oi, 18, 18)}` : "loading"}
          />
          <AdditionalDetailRow 
            detail={"Leverage"}
            value={position?.leverage ? `${Number(position.leverage).toFixed(1)}x` : "loading"}
          />
          <AdditionalDetailRow
            detail={"Debt"}
            value={debt ? `${formatWeiToParsedNumber(debt, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow
            detail={"Cost"}
            value={cost ? `${formatWeiToParsedNumber(cost, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow
            detail={"Current Collateral"}
            value={collateral ? `${formatWeiToParsedNumber(collateral, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow 
            detail={"Current Notional"} 
            value={notional ? `${formatWeiToParsedNumber(notional, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow
            detail={"Initial Collateral"}
            value={position?.initialCollateral ? `${formatWeiToParsedNumber(position?.initialCollateral, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow 
            detail={"Initial Notional"} 
            value={position?.initialNotional ? `${formatWeiToParsedNumber(position?.initialNotional, 18, 4)} OVL` : "loading"}
          />
          <AdditionalDetailRow 
            detail={"Maintenance"} 
            value={maintenanceMargin ? `${formatWeiToParsedNumber(maintenanceMargin, 18, 4)} OVL` : "loading"}
          />
        </FlexColumn>

        <FlexColumn mt="48px">
          <AdditionalDetailRow 
            detail={"Entry Price"} 
            value={ entryPrice ? `${entryPrice}` : 'loading'} 
          />
          <AdditionalDetailRow 
            detail={"Current Price"} 
            value={ bidPrice && askPrice ? (isLong ? bidPrice : askPrice) : 'loading'} 
          />
          <AdditionalDetailRow 
            detail={"Est. Received Price"} 
            value={ estimatedReceivedPrice ? estimatedReceivedPrice : 'loading'} 
          />
          <AdditionalDetailRow 
            detail={"Price Impact"} 
            value={ priceImpact ? `${priceImpact}%` : '-'} 
          />
          <AdditionalDetailRow 
            detail={"Liquidation Price (est)"} 
            value={liquidationPrice ? liquidationPrice : "loading"}
          />
        </FlexColumn>

        {/* <FlexColumn mt={"48px"}>
          <AdditionalDetailRow
            detail={"Total Shares Outstanding"}
            value={`${position?.totalSupply ? Number(utils.formatUnits(position?.totalSupply, 18)).toFixed(2) + " OVL" : "loading..."}`}
          />
          <AdditionalDetailRow 
            detail={"Position Shares"} 
            value={`${position?.currentOi ? Number(utils.formatUnits(position?.currentOi, 18)).toFixed(2) + " OVL" : "loading..."}`}
          />
        </FlexColumn> */}
      {/* </Accordion> */}
      
    </InterfaceWrapper>
  );
}
