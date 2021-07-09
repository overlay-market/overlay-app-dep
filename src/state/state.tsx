import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import user from './user/reducer';
import application from './application/reducer';
import multicall from './multicall/reducer';
import { updateVersion } from './global/actions'

const PERSISTED_KEYS: string[] = ['user']

const store = configureStore({
  reducer: {
    application,
    user,
    multicall,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS, debounce: 1000 })],
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion())

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;