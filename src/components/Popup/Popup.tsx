import { useCallback, useEffect } from 'react';
import { PopupContent } from '../../state/application/actions';
import { useRemovePopup } from '../../state/application/hooks';
import { SnackbarAlert } from '../SnackbarAlert/SnackbarAlert';

export enum PopupType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success"
};

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
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup]);

  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)
  }, [removeAfterMs, removeThisPopup]);

  return (
    <>
      <SnackbarAlert 
        onClick={removeThisPopup} 
        severity={severity} 
        title={title}
        message={content}

      >
        {children}
      </SnackbarAlert>
    </>
  )
};