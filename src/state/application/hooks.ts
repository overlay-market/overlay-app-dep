import { useAppSelector, useAppDispatch } from '../hooks';
import { useActiveWeb3React } from '../../hooks/web3';
import { AppState } from '../state';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { addPopup, PopupContent, setOpenModal } from './actions';
import { ApplicationModal } from './actions';

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1]);
};

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }))
    },
    [dispatch]
  )
};

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal);
  return openModal === modal;
};

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
};

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
};