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
import { formatDecimalToPercentage } from "../../utils/formatDecimal";
import { useMarketImpactFee } from "../../hooks/useMarketImpactFee";
import { useIsTxnSettingsAuto } from "../../state/positions/hooks";
import { useEstimatedBuild } from "../../hooks/useEstimatedBuild";
import { useBuildCallback } from "../../hooks/useBuildCallback";
import { useAllMarkets } from "../../state/markets/hooks";
import { shortenAddress } from "../../utils/web3";
import { useBuildFee } from "../../hooks/useBuildFee";
import { AdditionalDetails } from "./AdditionalBuildDetails";
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

export const BuildInterface = ({
  marketId,
  marketPrice,
}:{
  marketId: string;
  marketPrice: string | number;
}) => {
  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);
  const [{ showConfirm, attemptingTxn, txnErrorMessage, txHash }, setBuildState] = useState<{
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

  const { markets } = useAllMarkets();
  const { buildData } = useDerivedBuildInfo();
  const { account, chainId } = useActiveWeb3React();
  const { ovlBalance: userOvlBalance } = useOvlBalance(account);
  const { callback: buildCallback } = useBuildCallback(buildData);
  const isTxnSettingsAuto = useIsTxnSettingsAuto();
  const buildFee = useBuildFee();
  const ovl = chainId ? OVL[chainId] : undefined;
  const parsedUserOvlBalance = userOvlBalance ? formatWeiToParsedString(userOvlBalance, 2) : null;

  const filteredMarketById = markets?.filter((market, key) => market.id === marketId);
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
  
  const handleResetTxnSettings = useCallback((e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE);
      onSetTxnDeadline(DefaultTxnSettings.DEFAULT_DEADLINE);
    }, [onSetSlippage, onSetTxnDeadline]);

  const handleLeverageInput = useCallback((e: any) => {
      onSelectLeverage(e.target.value)}, [onSelectLeverage]);

  const handleSelectPositionSide = useCallback((isLong: boolean) => {
      onSelectPositionSide(isLong)}, [onSelectPositionSide]);
    
  const handleUserInput = useCallback((input: string) => {
      onAmountInput(input)}, [onAmountInput]);
          
  const handleQuickInput = (percentage: number, totalSupply: string | null) => {
    if (totalSupply == '0' || totalSupply === null) return;

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
      txHash
    });
  }, [attemptingTxn, txnErrorMessage, txHash]);
  
  const disableBuildButton: boolean = useMemo(() => {
    return !typedValue || isLong === undefined ? true : false;
  }, [typedValue, isLong]);
  
  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error("missing position input size");  
    if (isLong === undefined) throw new Error("please choose a long/short position");
    if (!buildCallback) return;
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
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval]);
  
  const handleApprove = useCallback(async () => {
    if (!typedValue) throw new Error("missing position input size");
    await approveCallback();
  }, [approveCallback, typedValue]);
  
  const fundingRate = useFundingRate(market?.id);
  
  const averagePrice = useMemo(() => {
    return market ? (
          ( 
            Number(utils.formatUnits(market?.currentPrice.bid, 18)) +
            Number(utils.formatUnits(market?.currentPrice.ask, 18))
          ) / 2
        ).toFixed(7)
        : "loading...";
    }, [market]);
    
  const { impactFee } = useMarketImpactFee(
    market ? market.id : undefined,
    isLong,
    isLong !== undefined ? isLong ? market?.oiLong : market?.oiShort : undefined,
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
            <TEXT.StandardHeader1
              fontWeight={700}
              color={"white"}
              margin={"14px 0 0 0"}
              >
              {market ? shortenAddress(market?.id) : "loading..."}
            </TEXT.StandardHeader1>
            <TEXT.StandardHeader1 
              fontWeight={400} 
              color={"white"}
              >
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
            </TEXT.StandardHeader1>
          </FlexColumnContainer>
          <Icon
            size={24}
            top={"22px"}
            right={"12px"}
            clickable={true}
            position={"absolute"}
            margin={"0 0 auto auto"}
            transform={"rotate(90deg)"}
            onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
            >
            {isTxnSettingsOpen ? <X color={"#12B4FF"} /> : <Sliders color={"#B9BABD"} />}
          </Icon>
        </FlexRowContainer>

        <TransactionSettingModal isOpen={isTxnSettingsOpen}>
          <FlexColumnContainer>
            <TEXT.StandardBody
              fontWeight={700}
              textAlign={"left"}
              margin={"24px auto 16px 16px"}
              >
              Transaction Settings
            </TEXT.StandardBody>

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
                <InputDescriptor> % </InputDescriptor>
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
          min={1}
          max={5}
          step={1}
          margin={"24px 0 0 0"}
          value={selectedLeverage}
          onChange={handleLeverageInput}
        />
        <Label htmlFor="Amount" mt={"24px"}>
          <TEXT.StandardBody margin={"0 auto 4px 0"} color={"white"}>
            Amount
          </TEXT.StandardBody>
          <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() => handleQuickInput(25, parsedUserOvlBalance ?? null)}
              >
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() => handleQuickInput(50, parsedUserOvlBalance ?? null)}
              >
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() => handleQuickInput(75, parsedUserOvlBalance ?? null)}
              >
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              border={"none"}
              onClick={() => handleQuickInput(100, parsedUserOvlBalance ?? null)}
              >
              Max
            </TransparentUnderlineButton>
          </FlexRowContainer>
        </Label>
        <InputContainer>
          <InputDescriptor>
            OVL
          </InputDescriptor>
          <NumericalInput
            align={"right"}
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
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
            isDisabled={disableBuildButton}
            disabled={disableBuildButton}
            >
            Build
          </TriggerBuildButton>
        )}
      </FlexColumnContainer>

      <AdditionalDetails
        bidPrice={market ? formatWeiToParsedString(market.currentPrice.bid, 10) : "..."}
        askPrice={market ? formatWeiToParsedString(market.currentPrice.ask, 10) : "..."}
        fee={buildFee ? formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5)) : "..."}
        oiCap={formatWeiToParsedNumber(market?.oiCap, 18, 0)}
        oiLong={formatWeiToParsedNumber(market?.oiLong, 18, 0)}
        oiShort={formatWeiToParsedNumber(market?.oiShort, 18, 0)}
        slippage={setSlippageValue}
        fundingRate={fundingRate}
        expectedOi={adjustedOi ? adjustedOi.toFixed(2) : "..."}
        estLiquidationPrice={estimatedLiquidationPrice ? estimatedLiquidationPrice : '...'}
      />
      <ConfirmTxnModal
        isOpen={showConfirm}
        isLong={isLong}
        buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
        onConfirm={() => handleBuild()}
        onDismiss={handleDismiss}
        adjustedOi={adjustedOi}
        marketPrice={market ? isLong ? formatWeiToParsedString(market.currentPrice.bid, 10) : formatWeiToParsedString(market.currentPrice.ask, 10) : "n/a"}
        setSlippageValue={setSlippageValue}
        selectedLeverage={selectedLeverage}
        adjustedCollateral={adjustedCollateral}
        estimatedLiquidationPrice={estimatedLiquidationPrice}
      />
      <TransactionPending
        attemptingTxn={attemptingTxn}
        severity={PopupType.WARNING}
      />
    </MarketCard>
  );
};
