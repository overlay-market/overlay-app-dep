import {useCallback, useEffect} from 'react'
import styled from 'styled-components'
import {X as XIcon} from 'react-feather'
import {Icon} from '../Icon/Icon'
import {animated, useSpring} from 'react-spring'
import TransactionPopup from './TransactionPopup'
import {FlexRow} from '../Container/Container'
import {PopupContent} from '../../state/application/actions'
import {useRemovePopup} from '../../state/application/hooks'

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
  background: #3a3d48;
  overflow: hidden;
`

const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background-color: #12b4ff;
`

const AnimatedFader = animated(Fader)

type PopupProps = {
  removeAfterMs: number | null
  content: PopupContent
  popKey: string
  title?: string
  children?: React.ReactNode
}
export default function Popup({removeAfterMs, content, popKey, title, children}: PopupProps) {
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
      txn: {hash, success, summary, info},
    } = content
    popupContent = <TransactionPopup hash={hash} info={info} success={success} summary={summary} />
  }

  if ('info' in content) {
    const {
      txn: {hash, failed, summary, info},
    } = content
    popupContent = <TransactionPopup hash={hash} info={info} success={failed} summary={summary} />
  }

  const faderStyle = useSpring({
    from: {width: '100%'},
    to: {width: '0%'},
    config: {duration: removeAfterMs ?? undefined},
  })

  const POPUP_CONSTANTS = {
    iconColor: '#0B0F1C',
    iconSize: 16,
  }

  return (
    <PopupContainer>
      <FlexRow>
        {popupContent}
        <Icon clickable={true} color={POPUP_CONSTANTS.iconColor}>
          <XIcon width={POPUP_CONSTANTS.iconSize} height={POPUP_CONSTANTS.iconSize} onClick={removeThisPopup} />
        </Icon>
      </FlexRow>
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </PopupContainer>
  )
}
