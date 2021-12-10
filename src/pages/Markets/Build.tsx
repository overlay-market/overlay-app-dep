import { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { MarketCard } from "../../components/Card/MarketCard";
import {
  LightGreyButton,
  TransparentUnderlineButton,
  TransparentDarkGreyButton,
  ActiveBlueButton,
  TxnSettingsButton,
} from "../../components/Button/Button";
import { TEXT } from "../../theme/theme";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";
import { Label, Input } from "@rebass/forms";
import { usePositionActionHandlers } from "../../state/positions/hooks";
import { useActiveWeb3React } from "../../hooks/web3";
import { usePositionState } from "../../state/positions/hooks";
import { useOvlBalance } from "../../state/wallet/hooks";
import { DefaultTxnSettings } from "../../state/positions/actions";
import { OVL } from "../../constants/tokens";
import {
  OVL_ADDRESS,
  OVL_COLLATERAL_ADDRESS,
  OVL_MARKET_ADDRESS,
} from "../../constants/addresses";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import {
  ApprovalState,
  useApproveCallback,
} from "../../hooks/useApproveCallback";
import {
  useDerivedBuildInfo,
  tryParseAmount,
} from "../../state/positions/hooks";
import { NumericalInput } from "../../components/NumericalInput/NumericalInput";
import { LeverageSlider } from "../../components/LeverageSlider/LeverageSlider";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Sliders, X } from "react-feather";
import { Icon } from "../../components/Icon/Icon";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { useIsTxnSettingsAuto } from "../../state/positions/hooks";
import { useTransactionAdder } from "../../state/transactions/hooks";
import ConfirmTxnModal from "../../components/ConfirmTxnModal/ConfirmTxnModal";
import TransactionPending from "../../components/Popup/TransactionPending";
import { PopupType } from "../../components/SnackbarAlert/SnackbarAlert";
import { useBuildCallback } from "../../hooks/useBuildCallback";
import { utils } from "ethers";
import { useAllMarkets } from "../../state/markets/hooks";
import { Back } from "../../components/Back/Back";
import {
  formatWeiToParsedString,
  formatWeiToParsedNumber,
} from "../../utils/formatWei";
import { useAllPositions } from "../../state/positions/hooks";
import { shortenAddress } from "../../utils/web3";
import { useSingleCallResult } from "../../state/multicall/hooks";
import { useCollateralManagerContract } from "../../hooks/useContract";
import { useBuildFees } from "../../hooks/useBuildFees";

export const LongPositionButton = styled(LightGreyButton)<{ active?: boolean }>`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  background: ${({ active }) => (active ? "#10DCB1" : "transparent")};
  color: ${({ active }) => (active ? "#F2F2F2" : "#10DCB1")};
`;

export const ShortPositionButton = styled(LightGreyButton)<{
  active?: boolean;
}>`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  background: ${({ active }) => (active ? "#FF648A" : "transparent")};
  color: ${({ active }) => (active ? "#F2F2F2" : "#FF648A")};
`;

export const BuildButton = styled(LightGreyButton)`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  background: transparent;
  color: #71d2ff;
  margin-top: 24px;
`;

export const ApproveButton = styled(LightGreyButton)`
  height: 48px;
  padding: 16px;
  margin: 4px 0;
  margin-top: 24px;
  background: linear-gradient(
    91.32deg,
    #10dcb1 0%,
    #33e0eb 24.17%,
    #12b4ff 52.11%,
    #3d96ff 77.89%,
    #7879f1 102.61%
  );
`;

export const InputContainer = styled(Row)`
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

export const Detail = styled(Row)`
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

export const OI = styled.div`
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
    <Column mt={"64px"} padding={"0 16px"}>
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
        <Content> ${estLiquidationPrice} </Content>
      </Detail>

      <Detail>
        <Title> Bid </Title>
        <Content> ~${bid} </Content>
      </Detail>

      <Detail>
        <Title> Ask </Title>
        <Content> ~${ask} </Content>
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

        <OI>
          {" "}
          {oiLong} / {oiCap}{" "}
        </OI>
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

        <OI>
          {" "}
          {oiShort} / {oiCap}{" "}
        </OI>
      </Detail>

      <Detail>
        <Title> Funding rate </Title>
        <Content color={"#10DCB1"}> ~ {fundingRate}% </Content>
      </Detail>
    </Column>
  );
};

export const BuildInterface = ({
  marketId,
  marketPrice,
}: {
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

  const addTransaction = useTransactionAdder();

  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false);

  const isAuto = useIsTxnSettingsAuto();

  const { account, chainId, library } = useActiveWeb3React();

  const ovl = chainId ? OVL[chainId] : undefined;

  const { error, ovlBalance: userOvlBalance } = useOvlBalance(account);

  const { isLoading, markets } = useAllMarkets();

  const { positions } = useAllPositions(account);

  const buildFees = useBuildFees();

  const filtered = markets?.filter((market, key) => {
    return market.id === marketId;
  });

  const market = filtered ? filtered[0] : null;

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

  const { buildData, inputError } = useDerivedBuildInfo();

  const { callback: buildCallback, error: buildCallbackError } =
    useBuildCallback(buildData);

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

  const averagePrice = useMemo(() => {
    return market
      ? (
          (Number(utils.formatUnits(market?.currentPrice.bid, 18)) +
            Number(utils.formatUnits(market?.currentPrice.ask, 18))) /
          2
        ).toFixed(7)
      : "loading...";
  }, [market]);

  return (
    <MarketCard align={"left"} padding={"0px"}>
      <Column
        padding={"0 16px"}
        as={"form"}
        onSubmit={(e: any) => e.preventDefault()}
      >
        <Row margin={"0 0 32px 0"}>
          <Column>
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
          </Column>
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
            {isTxnSettingsOpen ? (
              <X color={"#12B4FF"} />
            ) : (
              <Sliders color={"#B9BABD"} />
            )}
          </Icon>
        </Row>

        <TransactionSettingModal isOpen={isTxnSettingsOpen}>
          <Column>
            <TEXT.Body
              fontWeight={700}
              textAlign={"left"}
              margin={"24px auto 16px 16px"}
            >
              Transaction Settings
            </TEXT.Body>

            <Row padding={"8px 16px"}>
              <TEXT.Menu>Slippage Tolerance</TEXT.Menu>

              <InfoTip tipFor={"Slippage Tolerance"}>
                <div>meow meow meow</div>
              </InfoTip>
            </Row>

            <Row padding={"0px 16px 16px"}>
              <InputContainer width={"210px"} height={"40px"}>
                <NumericalInput
                  value={setSlippageValue}
                  onUserInput={onSetSlippage}
                  align={"right"}
                />
                <InputDescriptor>%</InputDescriptor>
              </InputContainer>
              <TxnSettingsButton
                active={isAuto}
                onClick={handleResetTxnSettings}
                width={"96px"}
                margin={"0 0 0 auto"}
                padding={"0px"}
              >
                Auto
              </TxnSettingsButton>
            </Row>

            <Row padding={"8px 16px"}>
              <TEXT.Menu>Transaction Deadline</TEXT.Menu>
              <InfoTip tipFor={"Transaction Deadline"}>
                <div>meow meow woof</div>
              </InfoTip>
            </Row>

            <Row padding={"0px 16px 16px"}>
              <InputContainer width={"210px"} height={"40px"}>
                <NumericalInput
                  value={txnDeadline}
                  onUserInput={onSetTxnDeadline}
                  align={"right"}
                />
                <InputDescriptor>minutes</InputDescriptor>
              </InputContainer>
            </Row>

            <Row
              margin={"auto 0 0 0"}
              padding={"16px"}
              borderTop={"1px solid white"}
            >
              <TxnSettingsButton
                onClick={handleResetTxnSettings}
                border={"none"}
                width={"96px"}
                margin={"0 auto 0 0"}
                padding={"0px"}
              >
                Reset
              </TxnSettingsButton>
              <TxnSettingsButton
                onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
                width={"96px"}
                padding={"0px"}
              >
                Save
              </TxnSettingsButton>
            </Row>
          </Column>
        </TransactionSettingModal>

        <Column>
          <LongPositionButton
            onClick={() => handleSelectPositionSide(true)}
            active={isLong}
          >
            Long
          </LongPositionButton>

          <ShortPositionButton
            onClick={() => handleSelectPositionSide(false)}
            active={!isLong && isLong !== undefined}
          >
            Short
          </ShortPositionButton>
        </Column>

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
          <Row ml={"auto"} mb={"4px"} width={"auto"}>
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
          </Row>
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
          <ApproveButton onClick={handleApprove}>Approve</ApproveButton>
        ) : (
          <BuildButton
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
          </BuildButton>
        )}
      </Column>

      <AdditionalDetails
        fee={buildFees ? formatWeiToParsedNumber(buildFees, 18, 2) : "loading"}
        slippage={setSlippageValue}
        estLiquidationPrice={"0.00"}
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
        expectedOi={"0"}
        oiLong={formatWeiToParsedNumber(market?.oiLong, 18, 0)}
        oiShort={formatWeiToParsedNumber(market?.oiShort, 18, 0)}
        oiCap={formatWeiToParsedNumber(market?.oiCap, 18, 0)}
        fundingRate={"-0.0026"}
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
        collateral={typedValue}
        setSlippageValue={setSlippageValue}
      />
      <TransactionPending
        attemptingTxn={attemptingTxn}
        severity={PopupType.WARNING}
      />
    </MarketCard>
  );
};
