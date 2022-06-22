import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import user from './user/reducer';
import application from './application/reducer';
import multicall from './multicall/reducer';
import position from './positions/reducer';
import unwind from './unwind/reducer';
import transactions from './transactions/reducer';
import markets from './markets/reducer';
import stake from './stake/reducer';
import { updateVersion } from './global/actions';
import { api as dataApi } from './data/slice'

const PERSISTED_KEYS: string[] = ['user', 'transactions'];

const store = configureStore({
  reducer: {
    application,
    user,
    multicall,
    position,
    unwind,
    transactions,
    markets,
    stake,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: true })
      .concat(dataApi.middleware)
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS }),
});

store.dispatch(updateVersion())

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;