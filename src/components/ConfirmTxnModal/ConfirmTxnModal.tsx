import { X } from "react-feather";
import Modal from "../Modal/Modal";
import { TEXT } from "../../theme/theme";
import { TriggerActionButton as TriggerConfirmBuildButton, PendingActionButton as PendingConfirmationButton } from "../Button/Button";
import { AdditionalDetailRow } from "../../pages/Positions/Unwind";
import { FlexColumnContainer } from "../Container/Container";
import { ModalContent, WalletHeader, CloseIcon } from "../ConnectWalletModal/ConnectWalletModal";
import Loader from "../Loaders/Loaders";

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
  marketPrice,
  setSlippageValue,
  selectedLeverage,
  adjustedCollateral,
  estimatedLiquidationPrice,
}: {
  baseToken?: string;
  quoteToken?: string;
  isOpen: boolean;
  attemptingTransaction: boolean;
  isLong: boolean | undefined;
  buildFee: number | undefined | null;
  onConfirm?: () => void;
  onDismiss?: () => void;
  expectedOi?: number | string | null;
  marketPrice: string | undefined;
  setSlippageValue: string;
  selectedLeverage: string;
  adjustedCollateral: number | string | undefined;
  estimatedLiquidationPrice: any
}) {
  return (
    <Modal isOpen={isOpen} onDismiss={() => null} width={"350px"}>
      <ModalContent>
        <WalletHeader>
          <TEXT.StandardBody color={"white"} fontWeight={600} m={"auto 0"}>
            Confirm Transaction
          </TEXT.StandardBody>
          <CloseIcon onClick={onDismiss}>
            <X color={"white"} height={24} width={24} />
          </CloseIcon>
        </WalletHeader>
        <FlexColumnContainer mt={"24px"} mr={"auto"} width={"auto"} align={"start"}>
          <TEXT.StandardBody color={"white"} fontWeight={400}>
            Market
          </TEXT.StandardBody>

          <TEXT.BoldHeader1 color={"white"}>
            {baseToken ? baseToken : <Loader stroke="white" size="12px" />}/{quoteToken ? quoteToken : <Loader stroke="white" size="12px" />}
          </TEXT.BoldHeader1>
        </FlexColumnContainer>

        <FlexColumnContainer mt={"16px"} color={"white"}>
          <AdditionalDetailRow
            detail={"Price"}
            detailColor={"#B9BABD"}
            value={marketPrice ? marketPrice : "loading..."}
          />

          <AdditionalDetailRow
            detail={"Side"}
            detailColor={"#B9BABD"}
            valueColor={isLong ? "#10DCB1" : "#FF648A"}
            value={isLong ? "Long" : "Short"}
          />

          <AdditionalDetailRow
            detail={"Leverage"}
            detailColor={"#B9BABD"}
            value={`${selectedLeverage}x`}
          />
        </FlexColumnContainer>

        <FlexColumnContainer mt={"48px"} color={"white"}>
          <AdditionalDetailRow detail={"Fee"} detailColor={"#B9BABD"} value={`${buildFee}%`} />

          <AdditionalDetailRow
            detail={"Slippage Tolerance"}
            detailColor={"#B9BABD"}
            value={`${setSlippageValue}%`}
          />

          <AdditionalDetailRow
            detail={"Est. Liquidation Price"}
            detailColor={"#B9BABD"}
            value={estimatedLiquidationPrice}
          />
        </FlexColumnContainer>

        <FlexColumnContainer mt={"48px"} color={"white"}>
          <AdditionalDetailRow
            detail={"Estimated Collateral"}
            detailColor={"#B9BABD"}
            value={`${adjustedCollateral} OVL`}
            // value={'-'}
          />

          <AdditionalDetailRow
            detail={"Estimated OI"}
            detailColor={"#B9BABD"}
            value={`${expectedOi}`}
            // value={'-'}
          />
        </FlexColumnContainer>

        <TEXT.Supplemental color={"#B9BABD"} mt={"24px"} mb={"24px"}>
          The received price will be at least - or the transaction will
          revert.
        </TEXT.Supplemental>

        {attemptingTransaction ? (
          <PendingConfirmationButton>
            Pending confirmation...
          </PendingConfirmationButton>
        ):(
          <TriggerConfirmBuildButton 
            onClick={onConfirm}
            active={true}
            >
            Confirm Build
          </TriggerConfirmBuildButton>
        )}
      </ModalContent>
    </Modal>
  );
}
