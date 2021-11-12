import { useSnackbar } from "notistack";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";

export default function TransactionPending({
  attemptingTxn,
  severity,
}: {
  attemptingTxn: boolean;
  severity: PopupType;
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  let key: any = undefined;

  const triggerPopup = ({ attemptingTxn }: { attemptingTxn: boolean }) => {
    if (attemptingTxn) {
      key = enqueueSnackbar("Attempting Txn", {
        variant: severity,
        preventDuplicate: true,
      });
    }
  };

  let TxnPendingAlert;

  if (attemptingTxn) {
    TxnPendingAlert = triggerPopup({ attemptingTxn });
  }

  if (!attemptingTxn && key !== undefined) {
    closeSnackbar(key);
  }

  return <>{TxnPendingAlert}</>;
}
