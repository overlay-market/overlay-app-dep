import { createStore, Store } from 'redux';
import reducer, { initialState, PositionState } from './reducer';

describe('position reducer', () => {
  let store: Store<PositionState>;

  beforeEach(() => {
    store = createStore(reducer, initialState);
  })

    describe('initialState', () => {
      it('inputValue initially undefined', () => {
        expect(store.getState().inputValue).toBeUndefined();
      })

      it('positionSide initially undefined', () => {
        expect(store.getState().positionSide).toBeUndefined();
      })
  })
})