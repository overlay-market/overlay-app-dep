import {createStore, Store} from 'redux'
import {ApplicationModal, updateChainId, updateBlockNumber, addPopup, setOpenModal} from './actions'
import reducer, {ApplicationState} from './reducer'

describe('application reducer', () => {
  let store: Store<ApplicationState>

  beforeEach(() => {
    store = createStore(reducer, {
      chainId: null,
      blockNumber: {
        [1]: 69,
      },
      openModal: null,
    })
  })

  describe('updateChainId', () => {
    it('updates chain id', () => {
      expect(store.getState().chainId).toEqual(null)
      store.dispatch(updateChainId({chainId: 1}))
      expect(store.getState().chainId).toEqual(1)
    })
  })

  describe('setOpenModal', () => {
    it('set wallet modal', () => {
      store.dispatch(setOpenModal(ApplicationModal.WALLET))
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET)
      store.dispatch(setOpenModal(ApplicationModal.WALLET))
      expect(store.getState().openModal).toEqual(ApplicationModal.WALLET)
      store.dispatch(setOpenModal(null))
      expect(store.getState().openModal).toEqual(null)
    })
  })

  describe('updateBlockNumber', () => {
    it('updates block number', () => {
      store.dispatch(updateBlockNumber({chainId: 1, blockNumber: 420}))
      expect(store.getState().blockNumber[1]).toEqual(420)
    })

    it('doesnt update if block number provided is less than current', () => {
      store.dispatch(updateBlockNumber({chainId: 1, blockNumber: 68}))
      expect(store.getState().blockNumber[1]).toEqual(69)
    })

    it('doesnt update if block number provided is same as current', () => {
      store.dispatch(updateBlockNumber({chainId: 1, blockNumber: 69}))
      expect(store.getState().blockNumber[1]).toEqual(69)
    })
  })
})
