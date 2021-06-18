import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../hooks';

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useAppSelector(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )
  
  return userDarkMode === null ? matchesDarkMode : userDarkMode;
}