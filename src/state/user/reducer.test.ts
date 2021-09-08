import { createStore, Store } from 'redux';
import { updateVersion } from '../global/actions';
import reducer, { initialState, UserState } from './reducer';

describe('user reducer', () => {
  let store: Store<UserState>;

  beforeEach(() => {
    store = createStore(reducer, initialState);
  })

  describe('update', () => {
    it('has no timestamp by default', () => {
      expect(store.getState().lastUpdateVersionTimestamp).toBeUndefined();
    });

    it('sets the lastUpdateVersionTimestamp', () => {
      const time = new Date().getTime();
      store.dispatch(updateVersion());
      expect(store.getState().lastUpdateVersionTimestamp).toBeGreaterThanOrEqual(time);
    });
    
    it('starts off in darkmode by default', () => {
      expect(store.getState().userDarkMode).toBe(true);
    });
  })
});