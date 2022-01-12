import { useSnackbar } from "notistack";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";

export default function TransactionPending({
  attemptingTransaction,
  severity,
}: {
  attemptingTransaction: boolean;
  severity: PopupType;
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let key: any = undefined;

  const triggerPopup = ({ attemptingTransaction }: { attemptingTransaction: boolean }) => {
    if (attemptingTransaction) {
      key = enqueueSnackbar(`{"message": "Attempting Txn", "variant": "${severity}"}`, {
        variant: severity,
        preventDuplicate: true,
      });
    }
  };

  let TxnPendingAlert;

  if (attemptingTransaction) {
    TxnPendingAlert = triggerPopup({ attemptingTransaction });
  }

  if (!attemptingTransaction && key !== undefined) {
    closeSnackbar(key);
  }

  return <>{TxnPendingAlert}</>;
}
