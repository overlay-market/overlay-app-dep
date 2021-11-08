import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";

export default function TransactionPending({
  attemptingTxn,
  severity,
}:{
  attemptingTxn: boolean
  severity: PopupType,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!attemptingTxn) {
      closeSnackbar();
    }
  }, [attemptingTxn, closeSnackbar]);

  const triggerPopup = ({
    attemptingTxn
  }:{
    attemptingTxn: boolean
  }) => {
    if (attemptingTxn) {
      enqueueSnackbar('Attempting Txn', {
        variant: severity,
        preventDuplicate: true
      })
    }
  }

  let TxnPendingAlert;

  if (attemptingTxn) {
    TxnPendingAlert = triggerPopup({ attemptingTxn })
  }

  return (
    <>
      {TxnPendingAlert}
    </>
  )
};