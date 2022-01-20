import { useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { X as XIcon } from "react-feather";
import { Icon } from "../Icon/Icon";
import { animated, useSpring } from "react-spring";
import TransactionPopup from "./TransactionPopup";
import { FlexRowContainer } from "../Container/Container";
import { PopupType } from "../SnackbarAlert/SnackbarAlert";
import { PopupContent } from "../../state/application/actions";
import { useRemovePopup } from "../../state/application/hooks";

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  right: 16px;
  bottom: 40px;
  padding: 16px;
  z-index: 69420;
  margin-top: 4px;
  border-radius: 8px;
  background: #3A3D48;
  overflow: hidden;
`;

const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: #12B4FF;
`;

const AnimatedFader = animated(Fader);

export default function Popup({
  removeAfterMs,
  content,
  popKey,
  title,
  children,
}:{
  removeAfterMs: number | null;
  content: PopupContent;
  popKey: string;
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

  let popupContent;

  console.log('content: ', content);

  if ('txn' in content) {
    const {
      txn: { hash, success, summary, info },
    } = content
    popupContent = <TransactionPopup hash={hash} info={info} success={success} summary={summary} />
  }

  if ('info' in content) {
    const {
      txn: { hash, failed, summary, info },
    } = content
    popupContent = <TransactionPopup hash={hash} info={info} success={failed} summary={summary} />
  }

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined },
  })

  return (
    <PopupContainer>
      <FlexRowContainer>
        {popupContent}
        <Icon 
          clickable={true}
          color={'#0B0F1C'}
          >
          <XIcon width={16} height={16} onClick={removeThisPopup} />
        </Icon>
      </FlexRowContainer>
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </PopupContainer>
  )
}
