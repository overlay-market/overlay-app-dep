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
  marketName,
  isOpen,
  attemptingTransaction,
  isLong,
  buildFee,
  onConfirm,
  onDismiss,
  expectedOi,
  marketPrice,
  setSlippageValue,
  selectedLeverage,
  adjustedCollateral,
  estimatedLiquidationPrice,
  transactionHash,
  transactionErrorMessage,
}: {
  marketName: any
  isOpen: boolean
  attemptingTransaction: boolean
  isLong: boolean | undefined
  buildFee: number | string | undefined | null
  onConfirm?: () => void
  onDismiss?: () => void
  expectedOi?: number | string | null
  estimatedBid?: BigNumberish
  estimatedAsk?: BigNumberish
  marketPrice: string | undefined
  setSlippageValue: string
  selectedLeverage: string
  adjustedCollateral: number | string | undefined
  estimatedLiquidationPrice: any
  transactionHash?: any
  transactionErrorMessage?: any
}) {
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

              <TEXT.BoldHeader1 color={'white'}>{marketName}</TEXT.BoldHeader1>
            </FlexColumn>

            <FlexColumn mt={'16px'} color={'white'}>
              <AdditionalDetailRow detail={'Price'} detailColor={'#B9BABD'} value={marketPrice} />

              <AdditionalDetailRow
                detail={'Side'}
                detailColor={'#B9BABD'}
                valueColor={isLong ? '#10DCB1' : '#FF648A'}
                value={isLong ? 'Long' : 'Short'}
              />

              <AdditionalDetailRow detail={'Leverage'} detailColor={'#B9BABD'} value={`${selectedLeverage}x`} />
            </FlexColumn>

            <FlexColumn mt={'48px'} color={'white'}>
              <AdditionalDetailRow detail={'Fee'} detailColor={'#B9BABD'} value={`${buildFee}%`} />

              <AdditionalDetailRow detail={'Slippage Tolerance'} detailColor={'#B9BABD'} value={`${setSlippageValue}%`} />

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
              />

              <AdditionalDetailRow detail={'Estimated OI'} detailColor={'#B9BABD'} value={`${expectedOi}`} />
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
