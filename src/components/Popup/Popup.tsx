import { useCallback, useEffect } from 'react';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import { SnackbarAlert } from '../SnackbarAlert/SnackbarAlert';
import { PopupType } from '../SnackbarAlert/SnackbarAlert';
import { useSnackbar } from 'notistack';

export default function Popup({
  removeAfterMs,
  content,
  popKey,
  severity,
  title,
  children
}: {
  removeAfterMs: number | null
  content: PopupContent
  popKey: string
  severity: PopupType
  title?: string
  children?: React.ReactNode
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);

  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
      closeSnackbar(popKey);
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup]);
  
  
  const triggerPopup = ({ 
    hash
  }:{
    hash: string
  }) => {
    enqueueSnackbar(hash, {
      key: popKey,
      autoHideDuration: removeAfterMs,
      variant: severity,
      preventDuplicate: true
    })
  }


  let popupContent;

  if ('txn' in content) {
    const {
      txn: { hash, success, summary },
    } = content;

    popupContent = triggerPopup({ hash: hash });
  }

  return (
    <>
         {popupContent}
    </>
  )
};
