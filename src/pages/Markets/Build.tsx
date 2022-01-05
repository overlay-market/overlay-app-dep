import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { utils } from "ethers";
import { Label, Input } from "@rebass/forms";
import { Sliders, X } from "react-feather";
import { MarketCard } from "../../components/Card/MarketCard";
import { SelectActionButton, TriggerActionButton, TransparentUnderlineButton, TransactionSettingsButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { OVL } from "../../constants/tokens";
import { Icon } from "../../components/Icon/Icon";
import { useActiveWeb3React } from "../../hooks/web3";
import { useOvlBalance } from "../../state/wallet/hooks";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { usePositionState } from "../../state/positions/hooks";
import { useDerivedBuildInfo } from "../../state/positions/hooks";
import { DefaultTxnSettings } from "../../state/positions/actions";
import { usePositionActionHandlers } from "../../state/positions/hooks";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { ApprovalState, useApproveCallback } from "../../hooks/useApproveCallback";
import { LeverageSlider } from "../../components/LeverageSlider/LeverageSlider";
import { PopupType } from "../../components/SnackbarAlert/SnackbarAlert";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { formatDecimalToPercentage } from "../../utils/formatDecimal";
import { useMarketImpactFee } from "../../hooks/useMarketImpactFee";
import { useIsTxnSettingsAuto } from "../../state/positions/hooks";
import { useEstimatedBuild } from "../../hooks/useEstimatedBuild";
import { useBuildCallback } from "../../hooks/useBuildCallback";
import { useAllMarkets } from "../../state/markets/hooks";
import { shortenAddress } from "../../utils/web3";
import { useBuildFee } from "../../hooks/useBuildFee";
import { useFundingRate } from "../../hooks/useFundingRate";
import { useLiquidationPrice } from "../../hooks/useLiquidationPrice";
import TransactionPending from "../../components/Popup/TransactionPending";
import ConfirmTxnModal from "../../components/ConfirmTxnModal/ConfirmTxnModal";

const SelectLongPositionButton = styled(SelectActionButton)`
  color: ${({ active }) => ( active ? '#0B0F1C' : '#10DCB1' )};
  background: ${({ active }) => ( active ? '#10DCB1' : 'transparent' )};
  margin: 4px 0;
`;

const SelectShortPositionButton = styled(SelectActionButton)`
  color: ${({ active }) => (active ? '#0B0F1C' : '#FF648A')};
  background: ${({ active }) => (active ? '#FF648A' : 'transparent')};
  margin: 4px 0;
`;

const TriggerBuildButton = styled(TriggerActionButton)`
  margin-top: 24px;
`;

const TriggerApproveButton = styled(SelectActionButton)`
  margin-top: 24px;
  border: none;
  background: linear-gradient(
    91.32deg,
    #10dcb1 0%,
    #33e0eb 24.17%,
    #12b4ff 52.11%,
    #3d96ff 77.89%,
    #7879f1 102.61%
  );
`;

export const InputContainer = styled(FlexRowContainer)`
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.white};
`;

export const InputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px;
`;

export const AmountInput = styled(Input)`
  border-color: transparent !important;
`;

export const Detail = styled(FlexRowContainer)`
  margin: 12px 0;
  width: 100%;
  display: flex;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #b9babd;
`;

export const Content = styled.div<{ color?: string }>`
  margin-left: auto;
  flex-direction: row;
  display: flex;
  font-size: 14px;
  color: ${({ color }) => (color ? color : "#B9BABD")};
`;

export const OpenInterestValue = styled.div`
  font-size: 14px;
  text-align: right;
  min-width: 130px;
  color: #b9babd;
`;

const TransactionSettingModal = styled.div<{ isOpen?: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  position: absolute;
  border: 1px solid #d0d0d2;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  backdrop-filter: blur(33px);
  z-index: 5;
  color: #f2f2f2;
`;

const AdditionalDetails = ({
  fee,
  slippage,
  estLiquidationPrice,
  bid,
  ask,
  expectedOi,
  oiLong,
  oiShort,
  oiCap,
  fundingRate,
}: {
  fee?: string | number;
  slippage?: string | number;
  estLiquidationPrice?: string | number;
  bid?: string | number;
  ask?: string | number;
  expectedOi?: string | number;
  oiLong?: number | undefined;
  oiShort?: number | undefined;
  oiCap?: number | undefined;
  fundingRate?: string | number;
}) => {
  return (
    <FlexColumnContainer mt={"64px"} padding={"0 16px"}>
      <Detail>
        <Title> Fee </Title>
        <Content> {fee}% </Content>
      </Detail>

      <Detail>
        <Title> Slippage </Title>
        <Content> {slippage}% </Content>
      </Detail>

      <Detail>
        <Title> Est. Liquidation </Title>
        <Content> {estLiquidationPrice} </Content>
      </Detail>

      <Detail>
        <Title> Bid </Title>
        <Content> ~{bid} </Content>
      </Detail>

      <Detail>
        <Title> Ask </Title>
        <Content> ~{ask} </Content>
      </Detail>

      <Detail>
        <Title> Expected OI </Title>
        <Content> {expectedOi} OVL </Content>
      </Detail>

      <Detail>
        <Title> OI Long </Title>
        <ProgressBar
          value={oiLong}
          max={oiCap}
          width={"75px"}
          color={"#10DCB1"}
          margin={"0 0 0 auto"}
        />

        <OpenInterestValue>
          {" "}
          {oiLong} / {oiCap}
          {" "}
        </OpenInterestValue>
      </Detail>

      <Detail>
        <Title> OI Short </Title>
        <ProgressBar
          value={oiShort}
          max={oiCap}
          width={"75px"}
          color={"#DC1F4E"}
          margin={"0 0 0 auto"}
        />

        <OpenInterestValue>
          {" "}
          {oiShort} / {oiCap}
          {" "}
        </OpenInterestValue>
      </Detail>

      <Detail>
        <Title> Funding rate </Title>
        <Content color={"#10DCB1"}> ~ {fundingRate}% </Content>
      </Detail>
    </FlexColumnContainer>
  );
};

export const BuildInterface = ({
  marketId,
  marketPrice,
}:{
  marketId: string;
  marketPrice: string | number;
}) => {
  const [
    { showConfirm, attemptingTxn, txnErrorMessage, txHash },
    setBuildState,
  ] = useState<{
    showConfirm: boolean;
    attemptingTxn: boolean;
    txnErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    showConfirm: false,
    attemptingTxn: false,
    txnErrorMessage: undefined,
    txHash: undefined,
  });

  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);

  const isTxnSettingsAuto = useIsTxnSettingsAuto();

  const { account, chainId } = useActiveWeb3React();

  const ovl = chainId ? OVL[chainId] : undefined;

  const { ovlBalance: userOvlBalance } = useOvlBalance(account);

  const { markets } = useAllMarkets();

  const buildFee = useBuildFee();
  
  const filteredMarketById = markets?.filter((market, key) => {
    return market.id === marketId;
  });
  
  const market = filteredMarketById ? filteredMarketById[0] : null;
  
  const {
    selectedLeverage,
    isLong,
    typedValue,
    setSlippageValue,
    txnDeadline,
  } = usePositionState();
  
  const {
    onAmountInput,
    onSelectLeverage,
    onSelectPositionSide,
    onSetSlippage,
    onSetTxnDeadline,
    onResetBuildState,
  } = usePositionActionHandlers();
  
  const { buildData } = useDerivedBuildInfo();
  
  const { callback: buildCallback, error: buildCallbackError } = useBuildCallback(buildData);
  
  const handleResetTxnSettings = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE);
      onSetTxnDeadline(DefaultTxnSettings.DEFAULT_DEADLINE);
    },
  [onSetSlippage, onSetTxnDeadline]
  );
    
  const handleLeverageInput = useCallback(
    (e: any) => {
      onSelectLeverage(e.target.value);
    },
  [onSelectLeverage]
  );
      
  const handleSelectPositionSide = useCallback(
    (isLong: boolean) => {
      onSelectPositionSide(isLong);
    },
  [onSelectPositionSide]
  );
    
  const handleUserInput = useCallback(
    (input: string) => {
      onAmountInput(input);
    },
  [onAmountInput]
  );
          
  const handleQuickInput = (percentage: number, totalSupply: string | null) => {
    let calculatedAmountByPercentage;
    
    if (percentage < 100) {
      calculatedAmountByPercentage = (
        Number(totalSupply) *
        (percentage / 100)
        ).toFixed(0);
    } else {
      calculatedAmountByPercentage = (
        Number(totalSupply) *
        (percentage / 100)
        ).toFixed(10);
    }
        
    return handleUserInput(calculatedAmountByPercentage);
  };
              
  const handleDismiss = useCallback(() => {
    setBuildState({
      showConfirm: false,
      attemptingTxn,
      txnErrorMessage,
      txHash,
    });
  }, [attemptingTxn, txnErrorMessage, txHash]);
  
  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error("missing position input size");
    
    if (isLong === undefined)
    throw new Error("please choose a long/short position");
    
    if (!selectedLeverage) throw new Error("please select a leverage value");
    
    if (!buildCallback) {
      return;
    }
    
    setBuildState({
      showConfirm: false,
      attemptingTxn: true,
      txnErrorMessage: undefined,
      txHash: undefined,
    });
    buildCallback()
    .then((hash) => {
      setBuildState({
        showConfirm: false,
        attemptingTxn: false,
        txnErrorMessage: undefined,
        txHash: hash,
      });
      onResetBuildState();
    })
    .catch((error) => {
      setBuildState({
        showConfirm: false,
        attemptingTxn: false,
        txnErrorMessage: error,
        txHash: undefined,
      });
    });
  }, [buildCallback, onResetBuildState, isLong, selectedLeverage, typedValue]);
  
  const [approval, approveCallback] = useApproveCallback(
    utils.parseUnits(typedValue ? typedValue : "0"),
    ovl,
    account ?? undefined
    );

  const showApprovalFlow = useMemo(() => {
    return (
      approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  );
  }, [approval]);
  
  const handleApprove = useCallback(async () => {
    if (!typedValue) throw new Error("missing position input size");
    
    await approveCallback();
  }, [approveCallback, typedValue]);
  
  const fundingRate = useFundingRate(market?.id);
  
  const averagePrice = useMemo(() => {
    return market
    ? (
      (Number(utils.formatUnits(market?.currentPrice.bid, 18)) +
      Number(utils.formatUnits(market?.currentPrice.ask, 18))) /
      2
      ).toFixed(7)
      : "loading...";
    }, [market]);
    
  const { lmbda, pressure, impactFee, pbnj } = useMarketImpactFee(
    market ? market.id : undefined,
    isLong,
    isLong !== undefined
    ? isLong
    ? market?.oiLong
    : market?.oiShort
    : undefined,
    market?.oiCap
    );
    
    const {
      preAdjustedOi,
      calculatedBuildFee,
      calculatedImpactFee,
      adjustedCollateral,
      adjustedOi,
      adjustedDebt
    } = useEstimatedBuild(
      selectedLeverage,
      Number(typedValue),
      buildFee ? formatWeiToParsedNumber(buildFee, 18, 10) : undefined,
      impactFee
      );
        
    const estimatedLiquidationPrice = useLiquidationPrice(
      market?.id,
      isLong,
      formatWeiToParsedNumber(market?.currentPrice.bid, 18, 5),
      formatWeiToParsedNumber(market?.currentPrice.ask, 18, 5),
      adjustedDebt,
      adjustedOi,
      adjustedOi
      );

  return (
    <MarketCard align={"left"} padding={"0px"}>
      <FlexColumnContainer
        padding={"0 16px"}
        as={"form"}
        onSubmit={(e: any) => e.preventDefault()}
        >
        <FlexRowContainer margin={"0 0 32px 0"}>
          <FlexColumnContainer>
            <TEXT.MediumHeader
              fontWeight={700}
              color={"white"}
              margin={"14px 0 0 0"}
            >
              {market ? shortenAddress(market?.id) : "loading..."}
            </TEXT.MediumHeader>

            <TEXT.MediumHeader fontWeight={400} color={"white"}>
              {isLong === undefined && averagePrice}

              {isLong !== undefined && market
                ? isLong
                  ? Number(
                      utils.formatUnits(market?.currentPrice.bid, 18)
                    ).toFixed(7)
                  : Number(
                      utils.formatUnits(market?.currentPrice.ask, 18)
                    ).toFixed(7)
                : null}
            </TEXT.MediumHeader>
          </FlexColumnContainer>
          <Icon
            size={24}
            margin={"0 0 auto auto"}
            transform={"rotate(90deg)"}
            clickable={true}
            top={"22px"}
            right={"12px"}
            position={"absolute"}
            onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
          >
            {isTxnSettingsOpen ? (<X color={"#12B4FF"} />) : (<Sliders color={"#B9BABD"} />)}
          </Icon>
        </FlexRowContainer>

        <TransactionSettingModal isOpen={isTxnSettingsOpen}>
          <FlexColumnContainer>
            <TEXT.Body
              fontWeight={700}
              textAlign={"left"}
              margin={"24px auto 16px 16px"}
            >
              Transaction Settings
            </TEXT.Body>

            <FlexRowContainer padding={"8px 16px"}>
              <TEXT.Menu>Slippage Tolerance</TEXT.Menu>
              <InfoTip tipFor={"Slippage Tolerance"}>Lorem Ipsum</InfoTip>
            </FlexRowContainer>

            <FlexRowContainer padding={"0px 16px 16px"}>
              <InputContainer width={"210px"} height={"40px"}>
                <NumericalInput
                  value={setSlippageValue}
                  onUserInput={onSetSlippage}
                  align={"right"}
                />
                <InputDescriptor>%</InputDescriptor>
              </InputContainer>
              <TransactionSettingsButton
                active={isTxnSettingsAuto}
                onClick={handleResetTxnSettings}
                width={"96px"}
                margin={"0 0 0 auto"}
                padding={"0px"}
              >
                Auto
              </TransactionSettingsButton>
            </FlexRowContainer>

            <FlexRowContainer padding={"8px 16px"}>
              <TEXT.Menu>Transaction Deadline</TEXT.Menu>
            </FlexRowContainer>

            <FlexRowContainer padding={"0px 16px 16px"}>
              <InputContainer width={"210px"} height={"40px"}>
                <NumericalInput
                  value={txnDeadline}
                  onUserInput={onSetTxnDeadline}
                  align={"right"}
                />
                <InputDescriptor>minutes</InputDescriptor>
              </InputContainer>
            </FlexRowContainer>

            <FlexRowContainer
              margin={"auto 0 0 0"}
              padding={"16px"}
              borderTop={"1px solid white"}
            >
              <TransactionSettingsButton
                onClick={handleResetTxnSettings}
                border={"none"}
                width={"96px"}
                margin={"0 auto 0 0"}
                padding={"0px"}
              >
                Reset
              </TransactionSettingsButton>
              <TransactionSettingsButton
                onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
                width={"96px"}
                padding={"0px"}
              >
                Save
              </TransactionSettingsButton>
            </FlexRowContainer>
          </FlexColumnContainer>
        </TransactionSettingModal>

        <FlexColumnContainer>
          <SelectLongPositionButton
            onClick={() => handleSelectPositionSide(true)}
            active={isLong}
            >
            Long
          </SelectLongPositionButton>

          <SelectShortPositionButton
            onClick={() => handleSelectPositionSide(false)}
            active={!isLong && isLong !== undefined}
            >
            Short
          </SelectShortPositionButton>
        </FlexColumnContainer>

        <LeverageSlider
          name={"leverage"}
          value={selectedLeverage}
          step={1}
          min={1}
          max={5}
          onChange={handleLeverageInput}
          margin={"24px 0 0 0"}
        />

        <Label htmlFor="Amount" mt={"24px"}>
          <TEXT.Body margin={"0 auto 4px 0"} color={"white"}>
            Amount
          </TEXT.Body>
          <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() =>
                handleQuickInput(
                  25,
                  userOvlBalance
                    ? Number(utils.formatUnits(userOvlBalance, 18)).toFixed(2)
                    : null
                )
              }
            >
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() =>
                handleQuickInput(
                  50,
                  userOvlBalance
                    ? Number(utils.formatUnits(userOvlBalance, 18)).toFixed(2)
                    : null
                )
              }
            >
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() =>
                handleQuickInput(
                  75,
                  userOvlBalance
                    ? Number(utils.formatUnits(userOvlBalance, 18)).toFixed(2)
                    : null
                )
              }
            >
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() =>
                handleQuickInput(
                  100,
                  userOvlBalance
                    ? Number(utils.formatUnits(userOvlBalance, 18)).toFixed(2)
                    : null
                )
              }
            >
              Max
            </TransparentUnderlineButton>
          </FlexRowContainer>
        </Label>
        <InputContainer>
          <InputDescriptor>OVL</InputDescriptor>
          <NumericalInput
            // value={55}
            value={typedValue?.toString()}
            onUserInput={handleUserInput}
            align={"right"}
          />
        </InputContainer>
        {showApprovalFlow ? (
          <TriggerApproveButton 
            onClick={handleApprove}
            >
            Approve
          </TriggerApproveButton>
        ) : (
          <TriggerBuildButton
            onClick={() => {
              setBuildState({
                showConfirm: true,
                attemptingTxn: false,
                txnErrorMessage: undefined,
                txHash: undefined,
              });
            }}

            >
            Build
          </TriggerBuildButton>
        )}
      </FlexColumnContainer>

      <AdditionalDetails
        fee={
          buildFee
            ? formatDecimalToPercentage(
                formatWeiToParsedNumber(buildFee, 18, 5)
              )
            : "loading"
        }
        slippage={setSlippageValue}
        estLiquidationPrice={estimatedLiquidationPrice}
        bid={
          market
            ? formatWeiToParsedString(market.currentPrice.bid, 10)
            : "loading"
        }
        ask={
          market
            ? formatWeiToParsedString(market.currentPrice.ask, 10)
            : "loading"
        }
        expectedOi={adjustedOi ? adjustedOi.toFixed(2) : " - "}
        oiLong={formatWeiToParsedNumber(market?.oiLong, 18, 0)}
        oiShort={formatWeiToParsedNumber(market?.oiShort, 18, 0)}
        oiCap={formatWeiToParsedNumber(market?.oiCap, 18, 0)}
        fundingRate={fundingRate}
      />

      <ConfirmTxnModal
        isOpen={showConfirm}
        onConfirm={() => handleBuild()}
        onDismiss={handleDismiss}
        marketPrice={
          market
            ? isLong
              ? formatWeiToParsedString(market.currentPrice.bid, 10)
              : formatWeiToParsedString(market.currentPrice.ask, 10)
            : "n/a"
        }
        isLong={isLong}
        selectedLeverage={selectedLeverage}
        adjustedCollateral={adjustedCollateral}
        adjustedOi={adjustedOi}
        setSlippageValue={setSlippageValue}
        buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
        estimatedLiquidationPrice={estimatedLiquidationPrice}
      />
      <TransactionPending
        attemptingTxn={attemptingTxn}
        severity={PopupType.WARNING}
      />
    </MarketCard>
  );
};
