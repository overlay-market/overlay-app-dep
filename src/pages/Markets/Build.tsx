import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { utils } from "ethers";
import { Label, Input } from "@rebass/forms";
import { Sliders, X } from "react-feather";
import { MarketCard } from "../../components/Card/MarketCard";
import { SelectActionButton, TriggerActionButton, TransparentUnderlineButton, TransactionSettingsButton, ApproveTransactionButton } from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { OVL } from "../../constants/tokens";
import { Icon } from "../../components/Icon/Icon";
import { useActiveWeb3React } from "../../hooks/web3";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { useAddPopup } from "../../state/application/hooks";
import { usePositionState } from "../../state/positions/hooks";
import { useDerivedBuildInfo } from "../../state/positions/hooks";
import { DefaultTxnSettings } from "../../state/positions/actions";
import { usePositionActionHandlers } from "../../state/positions/hooks";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { formatWeiToParsedString, formatWeiToParsedNumber, formatFundingRateToDaily } from "../../utils/formatWei";
import { ApprovalState, useApproveCallback } from "../../hooks/useApproveCallback";
import { LeverageSlider } from "../../components/LeverageSlider/LeverageSlider";
import { PopupType } from "../../components/SnackbarAlert/SnackbarAlert";
import { TransactionSettingsModal } from "./TransactionSettingsModal";
import { formatDecimalToPercentage } from "../../utils/formatDecimal";
import { useIsTxnSettingsAuto } from "../../state/positions/hooks";
import { useEstimatedBuild } from "../../hooks/useEstimatedBuild";
import { useBuildCallback } from "../../hooks/useBuildCallback";
import { useAllMarkets } from "../../state/markets/hooks";
import { shortenAddress } from "../../utils/web3";
import { AdditionalDetails } from "./AdditionalBuildDetails";
import { useLiquidationPrice } from "../../hooks/useLiquidationPrice";
import ConfirmTxnModal from "../../components/ConfirmTxnModal/ConfirmTxnModal";
import { useMarket } from "../../state/markets/hooks";
import { useSingleCallResult } from "../../state/multicall/hooks";
import { useV1PeripheryContract } from "../../hooks/useContract";
import { useOvlBalance } from "../../state/wallet/hooks";
import { useMarketOis } from "../../hooks/useMarketOis";
import { useMarketCapOi } from "../../hooks/useMarketCapOi";
import { useEstimatedBuildOi } from "../../hooks/useEstimatedBuildOi"
import { useEstimatedBuildLiquidationPrice } from "../../hooks/useEstimatedBuildLiquidationPrice";
import { useMarketName } from "../../hooks/useMarketName";
import Loader from "../../components/Loaders/Loaders";

const SelectPositionSideButton = styled(SelectActionButton)`
  border: 1px solid #f2f2f2;
  margin: 4px 0;
`
const SelectLongPositionButton = styled(SelectPositionSideButton)`
  color: ${({ active }) => ( active ? '#0B0F1C' : '#10DCB1' )};
  background: ${({ active }) => ( active ? '#10DCB1' : 'transparent' )};
  border: ${({ active }) => ( active && '1px solid #10DCB1' )};
`;

const SelectShortPositionButton = styled(SelectPositionSideButton)`
  color: ${({ active }) => (active ? '#0B0F1C' : '#FF648A')};
  background: ${({ active }) => (active ? '#FF648A' : 'transparent')};
  border: ${({ active }) => ( active && '1px solid #FF648A')};
`;

const TriggerBuildButton = styled(TriggerActionButton)`
  border: 1px solid #f2f2f2;
`;

const ControlInterfaceContainer = styled(FlexColumnContainer)`
  padding: 16px;
`;

const ControlInterfaceHeadContainer = styled(FlexColumnContainer)`
  padding: 16px 0 24px; 
`;

export const NumericalInputContainer = styled(FlexRowContainer)`
  border: 1px solid ${({ theme }) => theme.white};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
`;

export const NumericalInputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px;
`;

const NumericalInputLabel = styled(Label)`
  margin-top: 24px !important;
`;

const NumericalInputTitle = styled(TEXT.StandardBody)`
  margin-bottom: 4px !important;
`;

const NumericalInputBottomText = styled(TEXT.Supplemental)`
  margin: 4px 0 24px auto !important;
`

export const BuildInterface = ({
  marketId,
  marketPrice
}:{
  marketId: string;
  marketPrice: string;
}) => {
  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);
  const [{ showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash }, setBuildState] = useState<{
    showConfirm: boolean;
    attemptingTransaction: boolean;
    transactionErrorMessage: string | undefined;
    transactionHash: string | undefined;
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  });

  const { marketData } = useMarket(marketId);
  const market = marketData?.market;
  const { account, chainId } = useActiveWeb3React();
  const ovlBalance = useOvlBalance();
  const addPopup = useAddPopup();
  const isTxnSettingsAuto = useIsTxnSettingsAuto();
  const ovl = chainId ? OVL[chainId] : undefined;
  // const parsedUserOvlBalance = userOvlBalance ? formatWeiToParsedString(userOvlBalance, 2) : null;
  
  // @TO-DO: pull market name from feed
  const { baseToken, quoteToken } = useMarketName(market?.feedAddress);

  // @TO-DO: pull market attributes
  const capLeverage = market ? formatWeiToParsedNumber(market.capLeverage, 18, 2) : undefined;
  const capPayoff = market ? formatWeiToParsedNumber(market.capPayoff, 18, 2) : undefined;
  const minCollateral = market ? formatWeiToParsedNumber(market.minCollateral, 18, 10) : undefined;

  const ois = useMarketOis(marketId);
  const oiLong = ois && ois[0] ? formatWeiToParsedNumber(ois[0], 18, 4) : null;
  const oiShort = ois && ois[1] ? formatWeiToParsedNumber(ois[1], 18, 4) : null;

  const capOiResult = useMarketCapOi(marketId);
  const capOi = capOiResult ? formatWeiToParsedNumber(capOiResult, 18, 4) : null;

  const peripheryContract = useV1PeripheryContract();
  
  const buildFee = market?.tradingFeeRate
  const fetchPrices = useSingleCallResult(peripheryContract, 'prices', [marketId])
  const fetchFundingRate = useSingleCallResult(peripheryContract, 'fundingRate', [marketId])
  
  const prices = useMemo(() => {
    if (fetchPrices.loading === true || !fetchPrices.result) return {bid: 'loading', ask: 'loading', mid: 'loading'};
    return {
      bid: formatWeiToParsedNumber(fetchPrices.result?.bid_, 18, 2)?.toString(),
      ask: formatWeiToParsedNumber(fetchPrices.result?.ask_, 18, 2)?.toString(),
      mid: formatWeiToParsedNumber(fetchPrices.result?.mid_, 18, 2)?.toString(),
      _bid: fetchPrices.result?.bid_,
      _ask: fetchPrices.result?.ask_,
      _mid: fetchPrices.result?.mid_
    }
  }, [fetchPrices])
  
  const fundingRate = useMemo(() => {
    if (fetchFundingRate.loading === true || !fetchFundingRate.result) return 'loading';
    
    // console.log('fetchFundingRate.result?.[0]: ', formatWeiToParsedString(fetchFundingRate.result?.[0], 18))
    return formatFundingRateToDaily(fetchFundingRate.result?.[0], 18, 2)?.toString() + '%'
  }, [fetchFundingRate]);
  
  const { buildData, parsedAmount, inputError } = useDerivedBuildInfo();
  const { callback: buildCallback } = useBuildCallback(buildData, market?.id, prices._mid, minCollateral, inputError);

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
      attemptingTransaction, 
      transactionErrorMessage, 
      transactionHash
    });
  }, [attemptingTransaction, transactionErrorMessage, transactionHash]);
  
  const disableBuildButton: boolean = useMemo(() => {
    if (!typedValue || !minCollateral || isLong === undefined) return true;
    if (minCollateral > Number(typedValue)) return true;
    return false;
  }, [typedValue, isLong, minCollateral]);
  
  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error("missing position input size");  
    if (isLong === undefined) throw new Error("please choose a long/short position");
    if (!buildCallback) return;
    setBuildState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    buildCallback()
      .then((hash) => {
        setBuildState({
          showConfirm: true,
          attemptingTransaction: true,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        });
        onResetBuildState();
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        });
      })
      .catch((error) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [buildCallback, onResetBuildState, isLong, typedValue]);

  const [approval, approveCallback] = useApproveCallback(
    typedValue !== '.' ? utils.parseUnits(typedValue ? typedValue : "0") : undefined,
    market?.id,
    ovl
  );

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval]);
  
  const handleApprove = useCallback(async () => {
    if (!typedValue) throw new Error("missing position input size");
    setBuildState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    });
    approveCallback()
      .then((hash) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        });
      })
      .catch((error) => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        });
      });
  }, [approveCallback, typedValue]);
  
  const estimatedOiResult = useEstimatedBuildOi(market?.id, typedValue, selectedLeverage, isLong);
  const estimatedOi = estimatedOiResult ? formatWeiToParsedNumber(estimatedOiResult, 18, 5) : null;

  const estimatedLiquidationPriceResult = useEstimatedBuildLiquidationPrice(market?.id, typedValue, selectedLeverage, isLong)
  const estimatedLiquidationPrice = estimatedLiquidationPriceResult ? formatWeiToParsedNumber(estimatedLiquidationPriceResult, 18, 5) : null;

  const slippageDelta = isLong ? 1 + (parseFloat(setSlippageValue) / 100) : 1 - (parseFloat(setSlippageValue) / 100);
  const estimatedBuildPrice = prices.mid !== undefined && prices.mid !== 'loading' && isLong !== undefined ? 
      isLong ? (parseFloat(prices.mid) * slippageDelta) : (parseFloat(prices.mid) * slippageDelta)
      : undefined;
    
  const showUnderwaterFlow = prices.mid !== undefined && prices.mid !=='loading' && estimatedLiquidationPrice ? 
      isLong ? estimatedLiquidationPrice > parseFloat(prices.mid) : estimatedLiquidationPrice < parseFloat(prices.mid)
      : false;

  const exceedOiCap = oiLong && oiShort && capOi && estimatedOi ?
      isLong ? estimatedOi + oiLong > capOi : estimatedOi + oiShort > capOi
      : false;

  const {
    preAdjustedOi,
    calculatedBuildFee,
    adjustedCollateral,
    adjustedOi,
    adjustedDebt
  } = useEstimatedBuild(
    selectedLeverage,
    Number(typedValue),
    buildFee ? formatWeiToParsedNumber(buildFee, 18, 10) : undefined,
  );

  return (
    <MarketCard align={"left"} padding={"0px"}>
      <ControlInterfaceContainer
        onSubmit={(e: any) => e.preventDefault()}
        as={"form"}
        >
        <ControlInterfaceHeadContainer>
          <TEXT.BoldHeader1>
            {
              baseToken === 'loading' && quoteToken === 'loading' ? (
                <Loader stroke="white" size="12px" />
              ):(
                `${baseToken}/${quoteToken}`
              )
            }
          </TEXT.BoldHeader1>
          <TEXT.StandardHeader1>
            {prices.mid === 'loading' ?  <Loader stroke="white" size="12px" /> : prices.mid}
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
        <LeverageSlider
          name={"Build Position Leverage"}
          min={1}
          max={capLeverage ?? 1}
          step={.1}
          margin={"24px 0 0 0"}
          value={Number(selectedLeverage)}
          onChange={handleLeverageInput}
        />
        <NumericalInputLabel htmlFor="Build Amount Input">
          <NumericalInputTitle> Amount </NumericalInputTitle>
          <FlexRowContainer ml={"auto"} mb={"4px"} width={"auto"}>
            <TransparentUnderlineButton onClick={() => handleQuickInput(25, ovlBalance?.toFixed(2) ?? null)}>
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(50, ovlBalance?.toFixed(2) ?? null)}>
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(75, ovlBalance?.toFixed(2) ?? null)}>
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton onClick={() => handleQuickInput(100, ovlBalance?.toFixed(2) ?? null)}>
              Max
            </TransparentUnderlineButton>
          </FlexRowContainer>
        </NumericalInputLabel>
        <NumericalInputContainer>
          <NumericalInputDescriptor> OVL </NumericalInputDescriptor>
          <NumericalInput
            align={"right"}
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
          />
        </NumericalInputContainer>
          <NumericalInputBottomText>
            minimum: {minCollateral !== undefined ? minCollateral : <Loader stroke="white" size="12px" /> }
          </NumericalInputBottomText>

        {
          showUnderwaterFlow ? (
            <TriggerBuildButton
              onClick={() => null}
              isDisabled={true}
              disabled={true}
              >
              Position Underwater
           </TriggerBuildButton>
          ) : exceedOiCap ? (
            <TriggerBuildButton
              onClick={() => null}
              isDisabled={true}
              disabled={true}
              >
              Exceed OI Cap
           </TriggerBuildButton>
          ) : showApprovalFlow ? (
            <ApproveTransactionButton 
              attemptingTransaction={attemptingTransaction}
              onClick={handleApprove}
            />
          ) : (
            <TriggerBuildButton
              onClick={() => {
                setBuildState({
                  showConfirm: true,
                  attemptingTransaction: false,
                  transactionErrorMessage: undefined,
                  transactionHash: undefined,
                });
              }}
              isDisabled={disableBuildButton}
              disabled={disableBuildButton}
              >
              Build
            </TriggerBuildButton>
          )
        }
        
      </ControlInterfaceContainer>

      <AdditionalDetails
        bidPrice={prices.bid}
        askPrice={prices.ask}
        midPrice={prices.mid}
        fee={buildFee ? formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5)) : "loading"}
        oiCap={capOi}
        capPayoff = { capPayoff && formatWeiToParsedNumber(capPayoff, 18, 2)}
        oiLong={ ois && formatWeiToParsedNumber(ois.oiLong_, 18, 5)}
        oiShort={ ois && formatWeiToParsedNumber(ois.oiShort_, 18, 5)}
        slippage={setSlippageValue}
        fundingRate={fundingRate}
        expectedOi={estimatedOi && typedValue !== '' ? estimatedOi : '-'}
        estLiquidationPrice={estimatedLiquidationPriceResult && typedValue !== '' ? formatWeiToParsedNumber(estimatedLiquidationPriceResult, 18, 5) : '-'}
      />

      {/* <ConfirmTxnModal
        isOpen={showConfirm}
        attemptingTransaction={attemptingTransaction}
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
      /> */}

      <ConfirmTxnModal
        isOpen={showConfirm}
        attemptingTransaction={attemptingTransaction}
        isLong={isLong}
        buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
        onConfirm={() => handleBuild()}
        onDismiss={handleDismiss}
        // adjustedOi={'-'}
        marketPrice={!isLong ? prices.bid : prices.ask}
        setSlippageValue={setSlippageValue}
        selectedLeverage={selectedLeverage}
        adjustedCollateral={adjustedCollateral}
        // adjustedCollateral={'-'}
        expectedOi={estimatedOi && typedValue !== '' ? estimatedOi : '-'}
        estimatedLiquidationPrice={estimatedLiquidationPriceResult && typedValue !== '' ? formatWeiToParsedNumber(estimatedLiquidationPriceResult, 18, 5) : '-'}
      />
    </MarketCard>
  );
};
