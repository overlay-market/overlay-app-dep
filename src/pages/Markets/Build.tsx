import {useState, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {utils, BigNumberish} from 'ethers'
import {Label, Input} from '@rebass/forms'
import {Sliders, X} from 'react-feather'
import {MarketCard} from '../../components/Card/MarketCard'
import {
  SelectActionButton,
  TriggerActionButton,
  TransparentUnderlineButton,
  TransactionSettingsButton,
  ApproveTransactionButton,
} from '../../components/Button/Button'
import {TEXT} from '../../theme/theme'
import {OVL} from '../../constants/tokens'
import {Icon} from '../../components/Icon/Icon'
import {useActiveWeb3React} from '../../hooks/web3'
import {InfoTip} from '../../components/InfoTip/InfoTip'
import {useAddPopup} from '../../state/application/hooks'
import {useBuildState} from '../../state/build/hooks'
import {useDerivedBuildInfo} from '../../state/build/hooks'
import {DefaultTxnSettings} from '../../state/build/actions'
import {useBuildActionHandlers} from '../../state/build/hooks'
import {NumericalInput} from '../../components/NumericalInput/NumericalInput'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {
  formatWeiToParsedString,
  formatWeiToParsedNumber,
  formatFundingRateToDaily,
  formatBigNumberUsingDecimalsToString,
  formatBigNumberUsingDecimalsToNumber,
} from '../../utils/formatWei'
import {ApprovalState, useApproveCallback} from '../../hooks/useApproveCallback'
import {LeverageSlider} from '../../components/LeverageSlider/LeverageSlider'
import {PopupType} from '../../components/SnackbarAlert/SnackbarAlert'
import {TransactionSettingsModal} from './TransactionSettingsModal'
import {formatDecimalToPercentage} from '../../utils/formatDecimal'
import {useIsTxnSettingsAuto} from '../../state/build/hooks'
import {useEstimatedBuild} from '../../hooks/useEstimatedBuild'
import {useBuildCallback} from '../../hooks/useBuildCallback'
import {useAllMarkets} from '../../state/markets/hooks'
import {shortenAddress} from '../../utils/web3'
import {AdditionalDetails} from './AdditionalBuildDetails'
import {useLiquidationPrice} from '../../hooks/useLiquidationPrice'
import ConfirmTxnModal from '../../components/ConfirmTxnModal/ConfirmTxnModal'
import {useMarket} from '../../state/markets/hooks'
import {useSingleCallResult} from '../../state/multicall/hooks'
import {useToken} from '../../hooks/useToken'
import {useV1PeripheryContract} from '../../hooks/useContract'
import {useOvlBalance} from '../../state/wallet/hooks'
import {useMarketOi} from '../../hooks/useMarketOis'
import {useMarketCapOi} from '../../hooks/useMarketCapOi'
import {useEstimatedBuildOi} from '../../hooks/useEstimatedBuildOi'
import {useEstimatedBuildLiquidationPrice} from '../../hooks/useEstimatedBuildLiquidationPrice'
import {useMarketName} from '../../hooks/useMarketName'
import {useFractionOfCapOi} from '../../hooks/useFractionOfCapOi'
import {useBid} from '../../hooks/useBid'
import {useAsk} from '../../hooks/useAsk'
import {OVL_TOKEN_ADDRESS} from '../../constants/addresses'
import Loader from '../../components/Loaders/Loaders'
import {GraphQLInputObjectType} from 'graphql'

const SelectPositionSideButton = styled(SelectActionButton)`
  border: 1px solid #f2f2f2;
  margin: 4px 0;
`
const SelectLongPositionButton = styled(SelectPositionSideButton)`
  color: ${({active}) => (active ? '#0B0F1C' : '#10DCB1')};
  background: ${({active}) => (active ? '#10DCB1' : 'transparent')};
  border: ${({active}) => active && '1px solid #10DCB1'};
`

const SelectShortPositionButton = styled(SelectPositionSideButton)`
  color: ${({active}) => (active ? '#0B0F1C' : '#FF648A')};
  background: ${({active}) => (active ? '#FF648A' : 'transparent')};
  border: ${({active}) => active && '1px solid #FF648A'};
`

const TriggerBuildButton = styled(TriggerActionButton)`
  border: 1px solid #f2f2f2;
`

const ControlInterfaceContainer = styled(FlexColumn)`
  padding: 16px;
`

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  padding: 16px 0 24px;
`

export const NumericalInputContainer = styled(FlexRow)`
  border: 1px solid ${({theme}) => theme.white};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
`

export const NumericalInputDescriptor = styled.div`
  background: transparent;
  font-size: 16px;
  color: #f2f2f2;
  padding: 8px;
`

export const NumericalInputLabel = styled(Label)`
  margin-top: 24px !important;
`

export const NumericalInputTitle = styled(TEXT.StandardBody)`
  margin-bottom: 4px !important;
`

const NumericalInputBottomText = styled(TEXT.Supplemental)`
  margin: 4px 0 24px auto !important;
`

// @TO-DO: Break down BuildInterface into sub-components
// separate out data fetching logic from view components

// BuildInterface component to handle user input
// & callbacks for approve/build, data from periphery contract
// to be moved to respective sub-components to keep clean
export const BuildInterface = ({marketId}: {marketId: string}) => {
  const [isTxnSettingsOpen, setTxnSettingsOpen] = useState<boolean>(false)
  const [
    {showConfirm, attemptingTransaction, transactionErrorMessage, transactionHash},
    setBuildState,
  ] = useState<{
    showConfirm: boolean
    attemptingTransaction: boolean
    transactionErrorMessage: string | undefined
    transactionHash: string | undefined
  }>({
    showConfirm: false,
    attemptingTransaction: false,
    transactionErrorMessage: undefined,
    transactionHash: undefined,
  })

  const {marketData} = useMarket(marketId)
  const market = marketData?.market
  const {account, chainId} = useActiveWeb3React()
  const ovlBalance = useOvlBalance()
  const isTxnSettingsAuto = useIsTxnSettingsAuto()
  const ovl = chainId ? OVL[chainId] : undefined

  // @TO-DO: pull market name from feed
  const {baseToken, quoteToken, baseTokenAddress, quoteTokenAddress} = useMarketName(
    market?.feedAddress,
  )

  const baseTokenInfo = useToken(baseTokenAddress)
  const quoteTokenInfo = useToken(quoteTokenAddress)

  const baseTokenDecimals = useMemo(() => {
    if (!baseTokenInfo) return undefined
    return baseTokenInfo.decimals
  }, [baseTokenInfo])

  const quoteTokenDecimals = useMemo(() => {
    if (quoteTokenInfo === undefined || !quoteTokenInfo) return undefined
    return quoteTokenInfo.decimals
  }, [quoteTokenInfo])

  const sigFigConstant = 4

  const isInverseMarket =
    chainId && quoteTokenAddress ? quoteTokenAddress === OVL_TOKEN_ADDRESS[chainId] : null

  // @TO-DO: pull market attributes
  const capLeverage = market ? formatWeiToParsedNumber(market.capLeverage, 18, 2) : undefined
  const capPayoff = market ? formatWeiToParsedNumber(market.capPayoff, 18, 2) : undefined
  const minCollateral = market ? formatWeiToParsedNumber(market.minCollateral, 18, 10) : undefined

  const ois = useMarketOi(marketId, baseTokenDecimals, quoteTokenDecimals)
  const oiLong = ois && ois[0] ? formatWeiToParsedNumber(ois[0], 18, 4) : null
  const oiShort = ois && ois[1] ? formatWeiToParsedNumber(ois[1], 18, 4) : null

  const capOiResult = useMarketCapOi(marketId)
  const capOi = capOiResult ? formatWeiToParsedNumber(capOiResult, 18, 4) : null

  const peripheryContract = useV1PeripheryContract()

  const buildFee = market?.tradingFeeRate
  const fetchPrices = useSingleCallResult(peripheryContract, 'prices', [marketId])
  const fetchFundingRate = useSingleCallResult(peripheryContract, 'fundingRate', [marketId])

  const prices: {
    bid?: string | number | any
    ask?: string | number | any
    mid?: string | number | any
    _bid?: BigNumberish
    _ask?: BigNumberish
    _mid?: BigNumberish
  } = useMemo(() => {
    if (fetchPrices.loading === true || !fetchPrices.result || quoteTokenDecimals === undefined)
      return {bid: 'loading', ask: 'loading', mid: 'loading'}
    return {
      bid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.bid_, quoteTokenDecimals, 2),
      ask: formatBigNumberUsingDecimalsToString(fetchPrices.result?.ask_, quoteTokenDecimals, 2),
      mid: formatBigNumberUsingDecimalsToString(fetchPrices.result?.mid_, quoteTokenDecimals, 2),
      _bid: fetchPrices.result?.bid_,
      _ask: fetchPrices.result?.ask_,
      _mid: fetchPrices.result?.mid_,
    }
  }, [fetchPrices, quoteTokenDecimals])

  const fundingRate = useMemo(() => {
    if (fetchFundingRate.loading === true || !fetchFundingRate.result) return 'loading'
    return formatFundingRateToDaily(fetchFundingRate.result?.[0], 18, 2)?.toString() + '%'
  }, [fetchFundingRate])

  const {buildData, parsedAmount, inputError} = useDerivedBuildInfo()
  const {callback: buildCallback} = useBuildCallback(
    buildData,
    market?.id,
    prices._mid,
    minCollateral,
    inputError,
  )

  const {selectedLeverage, isLong, typedValue, setSlippageValue, txnDeadline} = useBuildState()
  const {
    onAmountInput,
    onSelectLeverage,
    onSelectPositionSide,
    onSetSlippage,
    onSetTxnDeadline,
    onResetBuildState,
  } = useBuildActionHandlers()

  const handleResetTxnSettings = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE)
      onSetTxnDeadline(DefaultTxnSettings.DEFAULT_DEADLINE)
    },
    [onSetSlippage, onSetTxnDeadline],
  )

  const handleLeverageInput = useCallback(
    (e: any) => {
      onSelectLeverage(e.target.value)
    },
    [onSelectLeverage],
  )

  const handleSelectPositionSide = useCallback(
    (isLong: boolean) => {
      onSelectPositionSide(isLong)
    },
    [onSelectPositionSide],
  )

  const handleUserInput = useCallback(
    (input: string) => {
      onAmountInput(input)
    },
    [onAmountInput],
  )

  const handleQuickInput = (percentage: number, totalSupply: string | null) => {
    if (totalSupply == '0' || totalSupply === null) return

    let calculatedAmountByPercentage
    if (percentage < 100) {
      calculatedAmountByPercentage = (Number(totalSupply) * (percentage / 100)).toFixed(0)
    } else {
      calculatedAmountByPercentage = (Number(totalSupply) * (percentage / 100)).toFixed(10)
    }
    return handleUserInput(calculatedAmountByPercentage)
  }

  const handleDismiss = useCallback(() => {
    setBuildState({
      showConfirm: false,
      attemptingTransaction,
      transactionErrorMessage,
      transactionHash,
    })
  }, [attemptingTransaction, transactionErrorMessage, transactionHash])

  const disableBuildButton: boolean = useMemo(() => {
    if (!typedValue || !minCollateral || isLong === undefined) return true
    if (minCollateral > Number(typedValue)) return true
    return false
  }, [typedValue, isLong, minCollateral])

  const handleBuild = useCallback(() => {
    if (!typedValue) throw new Error('missing position input size')
    if (isLong === undefined) throw new Error('please choose a long/short position')
    if (!buildCallback) return
    setBuildState({
      showConfirm: true,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    buildCallback()
      .then(hash => {
        setBuildState({
          showConfirm: true,
          attemptingTransaction: true,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: hash,
        })
        // onResetBuildState();
      })
      .catch(error => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [buildCallback, onResetBuildState, isLong, typedValue])

  const [approval, approveCallback] = useApproveCallback(
    typedValue !== '.' ? utils.parseUnits(typedValue ? typedValue : '0') : undefined,
    market?.id,
    ovl,
  )

  const showApprovalFlow = useMemo(() => {
    return approval !== ApprovalState.APPROVED && approval !== ApprovalState.UNKNOWN
  }, [approval])

  const handleApprove = useCallback(async () => {
    if (!typedValue) {
      // throw new Error("missing position input size");
      return
    }
    setBuildState({
      showConfirm: false,
      attemptingTransaction: true,
      transactionErrorMessage: undefined,
      transactionHash: undefined,
    })
    approveCallback()
      .then(hash => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: undefined,
          transactionHash: undefined,
        })
      })
      .catch(error => {
        setBuildState({
          showConfirm: false,
          attemptingTransaction: false,
          transactionErrorMessage: error,
          transactionHash: undefined,
        })
      })
  }, [approveCallback, typedValue])

  const estimatedOiResult = useEstimatedBuildOi(
    market?.id,
    typedValue,
    selectedLeverage,
    isLong,
    baseTokenDecimals,
    quoteTokenDecimals,
  )

  const estimatedOi = estimatedOiResult.rawOi
    ? formatWeiToParsedNumber(estimatedOiResult.rawOi, 18, 18)
    : null
  const expectedOi = estimatedOiResult?.formattedOi ? estimatedOiResult?.formattedOi : null
  const estimatedFractionOfCapOi = useFractionOfCapOi(market?.id, estimatedOiResult?.rawOi)
  const estimatedBid = useBid(market?.id, estimatedFractionOfCapOi)
  const estimatedAsk = useAsk(market?.id, estimatedFractionOfCapOi)

  const estimatedLiquidationPriceResult = useEstimatedBuildLiquidationPrice(
    market?.id,
    typedValue,
    selectedLeverage,
    isLong,
  )
  const estimatedLiquidationPrice = estimatedLiquidationPriceResult
    ? formatBigNumberUsingDecimalsToNumber(
        estimatedLiquidationPriceResult,
        quoteTokenDecimals,
        sigFigConstant,
      )
    : null

  const estimatedReceivedPrice: any = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined)
      return null
    // if (estimatedBid === undefined || estimatedAsk === undefined) return prices.mid;
    return isLong
      ? formatBigNumberUsingDecimalsToString(estimatedAsk, quoteTokenDecimals, 2)
      : formatBigNumberUsingDecimalsToString(estimatedBid, quoteTokenDecimals, 2)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals])

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null
    if (!typedValue || isLong === undefined || prices.bid === undefined || prices.ask === undefined)
      return null
    if (prices.bid === 'loading' || prices.ask === 'loading')
      return <Loader stroke="white" size="12px" />

    const priceImpactValue = isLong
      ? estimatedReceivedPrice - prices.ask
      : prices.bid - estimatedReceivedPrice
    const priceImpactPercentage = isLong
      ? (priceImpactValue / prices.ask) * 100
      : (priceImpactValue / prices.bid) * 100

    return priceImpactPercentage.toFixed(2)
  }, [estimatedReceivedPrice, typedValue, isLong, prices.bid, prices.ask])

  const isSlippageTooHigh: boolean | null = useMemo(() => {
    if (!estimatedReceivedPrice || !priceImpact) return null
    if (!setSlippageValue) return null
    return Number(priceImpact) - Number(setSlippageValue) > 0 ? true : false
  }, [estimatedReceivedPrice, priceImpact, setSlippageValue])

  const showUnderwaterFlow = useMemo(() => {
    if (prices.mid === undefined || prices.mid === 'loading' || !estimatedLiquidationPrice)
      return false
    return isLong
      ? estimatedLiquidationPrice > parseFloat(prices.mid)
      : estimatedLiquidationPrice < parseFloat(prices.mid)
  }, [prices, isLong, estimatedLiquidationPrice])

  const exceedOiCap = useMemo(() => {
    if (!oiLong || !oiShort || !capOi || !estimatedOi || isLong === undefined) return false
    return isLong ? estimatedOi + oiLong > capOi : estimatedOi + oiShort > capOi
  }, [isLong, oiLong, oiShort, capOi, estimatedOi])

  const {preAdjustedOi, calculatedBuildFee, adjustedCollateral, adjustedOi, adjustedDebt} =
    useEstimatedBuild(
      selectedLeverage,
      Number(typedValue),
      buildFee ? formatWeiToParsedNumber(buildFee, 18, 10) : undefined,
    )

  return (
    <MarketCard align={'left'} padding={'0px'}>
      <ControlInterfaceContainer onSubmit={(e: any) => e.preventDefault()} as={'form'}>
        <ControlInterfaceHeadContainer>
          <TEXT.BoldHeader1>
            {baseToken === 'loading' && quoteToken === 'loading' ? (
              <Loader stroke="white" size="12px" />
            ) : (
              `${baseToken}/${quoteToken}`
            )}
          </TEXT.BoldHeader1>
          <TEXT.StandardHeader1>{estimatedReceivedPrice ?? prices.mid}</TEXT.StandardHeader1>
          <Icon
            onClick={() => setTxnSettingsOpen(!isTxnSettingsOpen)}
            size={24}
            top={'18px'}
            right={'0px'}
            clickable={true}
            position={'absolute'}
            margin={'0 0 auto auto'}
            transform={'rotate(90deg)'}
          >
            {isTxnSettingsOpen ? <X color={'#12B4FF'} /> : <Sliders color={'#B9BABD'} />}
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
        <SelectLongPositionButton onClick={() => handleSelectPositionSide(true)} active={isLong}>
          Long
        </SelectLongPositionButton>
        <SelectShortPositionButton
          onClick={() => handleSelectPositionSide(false)}
          active={!isLong && isLong !== undefined}
        >
          Short
        </SelectShortPositionButton>
        <LeverageSlider
          name={'Build Position Leverage'}
          min={1}
          max={capLeverage ?? 1}
          step={0.1}
          margin={'24px 0 0 0'}
          value={Number(selectedLeverage)}
          onChange={handleLeverageInput}
        />
        <NumericalInputLabel htmlFor="Build Amount Input">
          <NumericalInputTitle> Amount </NumericalInputTitle>
          <FlexRow ml="auto" mb="4px" width="auto">
            <TransparentUnderlineButton
              onClick={() => handleQuickInput(25, ovlBalance?.toFixed(2) ?? null)}
            >
              25%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              onClick={() => handleQuickInput(50, ovlBalance?.toFixed(2) ?? null)}
            >
              50%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              onClick={() => handleQuickInput(75, ovlBalance?.toFixed(2) ?? null)}
            >
              75%
            </TransparentUnderlineButton>
            <TransparentUnderlineButton
              onClick={() => handleQuickInput(100, ovlBalance?.toFixed(2) ?? null)}
            >
              Max
            </TransparentUnderlineButton>
          </FlexRow>
        </NumericalInputLabel>
        <NumericalInputContainer>
          <NumericalInputDescriptor> OVL </NumericalInputDescriptor>
          <NumericalInput
            align={'right'}
            onUserInput={handleUserInput}
            value={typedValue?.toString()}
          />
        </NumericalInputContainer>
        <NumericalInputBottomText>
          minimum:{' '}
          {minCollateral !== undefined ? minCollateral : <Loader stroke="white" size="12px" />}
        </NumericalInputBottomText>

        {showUnderwaterFlow ? (
          <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
            Position Underwater
          </TriggerBuildButton>
        ) : isSlippageTooHigh ? (
          <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
            Slippage Too High
          </TriggerBuildButton>
        ) : exceedOiCap ? (
          <TriggerBuildButton onClick={() => null} isDisabled={true} disabled={true}>
            Exceeds OI Cap
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
              })
            }}
            isDisabled={disableBuildButton}
            disabled={disableBuildButton}
          >
            Build
          </TriggerBuildButton>
        )}
      </ControlInterfaceContainer>

      <AdditionalDetails
        isInverseMarket={isInverseMarket}
        baseToken={baseToken === 'loading' ? null : baseToken}
        quoteToken={quoteToken === 'loading' ? null : quoteToken}
        quoteTokenDecimals={quoteTokenDecimals}
        typedValue={typedValue}
        isLong={isLong}
        estimatedBid={estimatedBid}
        estimatedAsk={estimatedAsk}
        bidPrice={prices.bid}
        askPrice={prices.ask}
        midPrice={prices.mid}
        fee={
          buildFee ? formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5)) : 'loading'
        }
        oiCap={capOi}
        capPayoff={capPayoff && formatWeiToParsedNumber(capPayoff, 18, 2)}
        oiLong={ois && formatWeiToParsedNumber(ois.oiLong_, 18, 5)}
        oiShort={ois && formatWeiToParsedNumber(ois.oiShort_, 18, 5)}
        slippageTolerance={setSlippageValue}
        fundingRate={fundingRate}
        expectedOi={expectedOi && typedValue !== '' ? expectedOi : null}
        estLiquidationPrice={
          estimatedLiquidationPrice && typedValue !== '' ? estimatedLiquidationPrice : '-'
        }
      />

      <ConfirmTxnModal
        baseToken={baseToken === 'loading' ? null : baseToken}
        quoteToken={quoteToken === 'loading' ? null : quoteToken}
        isOpen={showConfirm}
        attemptingTransaction={attemptingTransaction}
        isLong={isLong}
        buildFee={buildFee && formatDecimalToPercentage(formatWeiToParsedNumber(buildFee, 18, 5))}
        onConfirm={() => handleBuild()}
        onDismiss={handleDismiss}
        estimatedBid={estimatedBid}
        estimatedAsk={estimatedAsk}
        marketPrice={!isLong ? prices.bid : prices.ask}
        quoteTokenDecimals={quoteTokenDecimals}
        setSlippageValue={setSlippageValue}
        selectedLeverage={selectedLeverage}
        adjustedCollateral={adjustedCollateral}
        expectedOi={expectedOi && typedValue !== '' ? expectedOi : null}
        estimatedLiquidationPrice={
          estimatedLiquidationPrice && typedValue !== '' ? estimatedLiquidationPrice : '-'
        }
        transactionHash={transactionHash}
        transactionErrorMessage={transactionErrorMessage}
      />
    </MarketCard>
  )
}
