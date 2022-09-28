import {useMemo} from 'react'
import {X} from 'react-feather'
import Modal from '../Modal/Modal'
import {TEXT} from '../../theme/theme'
import {
  TriggerActionButton as TriggerConfirmBuildButton,
  PendingActionButton as PendingConfirmationButton,
} from '../Button/Button'
import {AdditionalDetailRow} from '../../pages/Positions/Unwind'
import {FlexColumn} from '../Container/Container'
import {ModalContent, WalletHeader, CloseIcon} from '../ConnectWalletModal/ConnectWalletModal'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import {BigNumberish} from 'ethers'
import Loader from '../Loaders/Loaders'

export default function ConfirmTxnModal({
  baseToken,
  quoteToken,
  isOpen,
  attemptingTransaction,
  isLong,
  buildFee,
  onConfirm,
  onDismiss,
  expectedOi,
  estimatedBid,
  estimatedAsk,
  marketPrice,
  quoteTokenDecimals,
  setSlippageValue,
  selectedLeverage,
  adjustedCollateral,
  estimatedLiquidationPrice,
  transactionHash,
  transactionErrorMessage,
}: {
  baseToken?: string
  quoteToken?: string
  isOpen: boolean
  attemptingTransaction: boolean
  isLong: boolean | undefined
  buildFee: number | undefined | null
  onConfirm?: () => void
  onDismiss?: () => void
  expectedOi?: number | string | null
  estimatedBid?: BigNumberish
  estimatedAsk?: BigNumberish
  marketPrice: string | undefined
  quoteTokenDecimals: number | undefined
  setSlippageValue: string
  selectedLeverage: string
  adjustedCollateral: number | string | undefined
  estimatedLiquidationPrice: any
  transactionHash?: any
  transactionErrorMessage?: any
}) {
  const price = useMemo(() => {
    if (isLong === undefined) return null
    if (quoteTokenDecimals === undefined) return null
    if (estimatedBid === undefined || estimatedAsk === undefined) return null
    return isLong
      ? formatBigNumberUsingDecimalsToString(estimatedAsk, quoteTokenDecimals, 2)
      : formatBigNumberUsingDecimalsToString(estimatedBid, quoteTokenDecimals, 2)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals])

  return (
    <Modal isOpen={isOpen} onDismiss={() => null} width={'350px'}>
      <ModalContent>
        <WalletHeader>
          <TEXT.StandardBody color={'white'} fontWeight={600} m={'auto 0'}>
            Confirm Transaction
          </TEXT.StandardBody>
          <CloseIcon onClick={onDismiss}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
        </WalletHeader>
        {transactionHash ? (
          <TriggerConfirmBuildButton>Transaction Sent!</TriggerConfirmBuildButton>
        ) : (
          <>
            <FlexColumn mt={'24px'} mr={'auto'} width={'auto'} align={'start'}>
              <TEXT.StandardBody color={'white'} fontWeight={400}>
                Market
              </TEXT.StandardBody>

              <TEXT.BoldHeader1 color={'white'}>
                {baseToken ? baseToken : <Loader stroke="white" size="12px" />}/
                {quoteToken ? quoteToken : <Loader stroke="white" size="12px" />}
              </TEXT.BoldHeader1>
            </FlexColumn>

            <FlexColumn mt={'16px'} color={'white'}>
              <AdditionalDetailRow
                detail={'Price'}
                detailColor={'#B9BABD'}
                value={price ? price : 'loading...'}
              />

              <AdditionalDetailRow
                detail={'Side'}
                detailColor={'#B9BABD'}
                valueColor={isLong ? '#10DCB1' : '#FF648A'}
                value={isLong ? 'Long' : 'Short'}
              />

              <AdditionalDetailRow
                detail={'Leverage'}
                detailColor={'#B9BABD'}
                value={`${selectedLeverage}x`}
              />
            </FlexColumn>

            <FlexColumn mt={'48px'} color={'white'}>
              <AdditionalDetailRow detail={'Fee'} detailColor={'#B9BABD'} value={`${buildFee}%`} />

              <AdditionalDetailRow
                detail={'Slippage Tolerance'}
                detailColor={'#B9BABD'}
                value={`${setSlippageValue}%`}
              />

              <AdditionalDetailRow
                detail={'Est. Liquidation Price'}
                detailColor={'#B9BABD'}
                value={estimatedLiquidationPrice}
              />
            </FlexColumn>

            <FlexColumn mt={'48px'} color={'white'}>
              <AdditionalDetailRow
                detail={'Estimated Collateral'}
                detailColor={'#B9BABD'}
                value={`${adjustedCollateral} OVL`}
                // value={'-'}
              />

              <AdditionalDetailRow
                detail={'Estimated OI'}
                detailColor={'#B9BABD'}
                value={`${expectedOi}`}
                // value={'-'}
              />
            </FlexColumn>

            <TEXT.Supplemental color={'#B9BABD'} mt={'24px'} mb={'24px'}>
              The received price will be at least - or the transaction will revert.
            </TEXT.Supplemental>

            {attemptingTransaction ? (
              <PendingConfirmationButton>Pending confirmation...</PendingConfirmationButton>
            ) : (
              <TriggerConfirmBuildButton onClick={onConfirm} active={true}>
                Confirm Build
              </TriggerConfirmBuildButton>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
