import { X } from "react-feather";
import Modal from "../Modal/Modal";
import { TEXT } from "../../theme/theme";
import { TriggerActionButton as TriggerConfirmBuildButton } from "../Button/Button";
import { AdditionalDetailRow } from "../../pages/Positions/Unwind";
import { FlexColumnContainer } from "../Container/Container";
import { ModalContent, WalletHeader, CloseIcon } from "../ConnectWalletModal/ConnectWalletModal";

export default function ConfirmTxnModal({
  isOpen,
  attemptingTransaction,
  isLong,
  buildFee,
  onConfirm,
  onDismiss,
  adjustedOi,
  marketPrice,
  setSlippageValue,
  selectedLeverage,
  adjustedCollateral,
  estimatedLiquidationPrice,
}: {
  isOpen: boolean;
  attemptingTransaction: boolean;
  isLong: boolean | undefined;
  buildFee: number | undefined | null;
  onConfirm?: () => void;
  onDismiss?: () => void;
  adjustedOi: number | undefined;
  marketPrice: string | undefined;
  setSlippageValue: string;
  selectedLeverage: number;
  adjustedCollateral: number | undefined;
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
            ETH/USDC
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
            detail={"Slippage"}
            detailColor={"#B9BABD"}
            value={`${setSlippageValue}%`}
          />

          <AdditionalDetailRow
            detail={"Est. Liquidation"}
            detailColor={"#B9BABD"}
            value={estimatedLiquidationPrice}
          />
        </FlexColumnContainer>

        <FlexColumnContainer mt={"48px"} color={"white"}>
          <AdditionalDetailRow
            detail={"Collateral"}
            detailColor={"#B9BABD"}
            value={`${adjustedCollateral} OVL`}
          />

          <AdditionalDetailRow
            detail={"Expected OI"}
            detailColor={"#B9BABD"}
            value={`${adjustedOi} OVL`}
          />
        </FlexColumnContainer>

        <TEXT.Supplemental color={"#B9BABD"} mt={"24px"} mb={"24px"}>
          The unwind price will be at least 2989.99 USDC or the transaction will
          revert.
        </TEXT.Supplemental>

        <TriggerConfirmBuildButton 
          onClick={onConfirm}
          active={true}
          >
          Confirm Build
        </TriggerConfirmBuildButton>
      </ModalContent>
    </Modal>
  );
}
