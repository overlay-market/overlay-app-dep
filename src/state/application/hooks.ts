import {useCallback, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {AppState} from '../state'
import {ApplicationModal} from './actions'
import {useActiveWeb3React} from '../../hooks/web3'
import {useAppSelector, useAppDispatch} from '../hooks'
import {addPopup, PopupContent, setOpenModal, removePopup} from './actions'

export function useBlockNumber(): number | undefined {
  const {chainId} = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch()

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({content, key}))
    },
    [dispatch],
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({key}))
    },
    [dispatch],
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter(item => item.show), [list])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useTermsOfServiceModalToggle(): () => void {
  return useToggleModal(ApplicationModal.TERMS_OF_SERVICE)
}
