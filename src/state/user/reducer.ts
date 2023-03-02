import {createReducer} from '@reduxjs/toolkit'
import {updateVersion} from '../global/actions'
import {SupportedLocale} from '../../constants/locales'
import {
  updateUserDarkMode,
  updateMatchesDarkMode,
  updateUserLocale,
  updateHideClosedPositions,
} from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  // the timestamp of the last updateVersion action
  readonly lastUpdateVersionTimestamp?: number
  readonly userDarkMode: boolean | null
  readonly userLocale: SupportedLocale | null
  readonly matchesDarkMode: boolean
  readonly timestamp: number
  readonly userHideClosedPositions: boolean
}

export const initialState: UserState = {
  userDarkMode: true,
  matchesDarkMode: false,
  userLocale: null,
  timestamp: currentTimestamp(),
  userHideClosedPositions: false,
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {
      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateUserDarkMode, (state, action) => {
      state.userDarkMode = action.payload.userDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateMatchesDarkMode, (state, action) => {
      state.matchesDarkMode = action.payload.matchesDarkMode
      state.timestamp = currentTimestamp()
    })
    .addCase(updateUserLocale, (state, action) => {
      state.userLocale = action.payload.userLocale
      state.timestamp = currentTimestamp()
    })
    .addCase(updateHideClosedPositions, (state, action) => {
      state.userHideClosedPositions = action.payload.userHideClosedPositions
    }),
)
