import { createReducer } from '@reduxjs/toolkit';
import {
  updateUserDarkMode,
  updateMatchesDarkMode,
  updateUserLocale
} from './actions';
import { updateVersion } from '../global/actions';
import { SupportedLocale } from '../../constants/locales';

const currentTimestamp = () => new Date().getTime();

export interface UserState {
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  userDarkMode: boolean | null

  userLocale: SupportedLocale | null

  matchesDarkMode: boolean

  timestamp: number

};

export const initialState: UserState = {
  userDarkMode: true,
  matchesDarkMode: false,
  userLocale: null,
  timestamp: currentTimestamp()
}

export default createReducer(initialState, (builder) =>
    builder
      .addCase(updateVersion, (state) => {
        state.lastUpdateVersionTimestamp = currentTimestamp()
      })
      .addCase(updateUserDarkMode, (state, action) => {
        state.userDarkMode = action.payload.userDarkMode;
        state.timestamp = currentTimestamp();
      })
      .addCase(updateMatchesDarkMode, (state, action) => {
        state.matchesDarkMode = action.payload.matchesDarkMode;
        state.timestamp = currentTimestamp();
      })
      .addCase(updateUserLocale, (state, action) => {
        state.userLocale = action.payload.userLocale
        state.timestamp = currentTimestamp();
      })
);