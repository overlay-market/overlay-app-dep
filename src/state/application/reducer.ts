import { createReducer, nanoid } from '@reduxjs/toolkit'
import { 
  updateChainId,
  updateBlockNumber,
  ApplicationModal,
  setOpenModal
} from './actions'

export interface ApplicationState {
  readonly chainId: number | null
  readonly blockNumber: { readonly [chainId: number]: number };
  readonly openModal: ApplicationModal | null
};

const initialState: ApplicationState = {
  chainId: null,
  blockNumber: {},
  openModal: null,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateChainId, (state, action) => {
      const { chainId } = action.payload;
      state.chainId = chainId;
    })
    .addCase(updateBlockNumber, (state, action) => {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    })
    .addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
);