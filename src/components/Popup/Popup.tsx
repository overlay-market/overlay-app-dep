import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";
import { PopupContent } from "../../state/application/actions";
import { useRemovePopup } from "../../state/application/hooks";
import { FlexRowContainer } from "../Container/Container";
import { X as XIcon } from "react-feather";
import TransactionPopup from "./TransactionPopup";
import { Icon } from "../Icon/Icon";

const PopupContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  background: hsla(0,0%,100%,.85);
  z-index: 69420;
  top: 70px;
  right: 25px;
`;

const AnimatedFader = ({ duration }:{duration: number}) => (
  <div className="h-[3px] bg-dark-800 w-full">
    <style>{`
      .animation {
        animation-duration: ${duration}ms;
        animation-name: fader;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
      }
      @keyframes fader {
        from {
          width: 100%;
        }

        to {
          width: 0%;
        }
      }
    `}</style>
    <div className="animation h-[3px] bg-gradient-to-r from-blue to-pink" />
  </div>
)

export default function Popup({
  removeAfterMs,
  content,
  popKey,
  severity,
  title,
  children,
}:{
  removeAfterMs: number | null;
  content: PopupContent;
  popKey: string;
  severity: PopupType;
  title?: string;
  children?: React.ReactNode;
}) {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    if (removeAfterMs === null) return undefined

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup])

  let popupContent
  if ('txn' in content) {
    const {
      txn: { hash, success, summary },
    } = content
    popupContent = <TransactionPopup hash={hash} success={success} summary={summary} />
  }

  return (
    <PopupContainer>
      <div className="relative w-full overflow-hidden rounded bg-dark-700">
        <FlexRowContainer>
          {popupContent}
          <Icon 
            clickable={true}
            color={'#0B0F1C'}
            >
            <XIcon width={24} height={24} onClick={removeThisPopup} />
          </Icon>
        </FlexRowContainer>
        {removeAfterMs !== null ? <AnimatedFader duration={removeAfterMs} /> : null}
      </div>
    </PopupContainer>
  )
}
