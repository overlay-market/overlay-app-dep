import React, { useMemo } from 'react';
import { 
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components';
import { useIsDarkMode } from "../state/user/hooks";
import { Colors } from "./styled";

export const MEDIA_WIDTHS = {
  upToExtraSmall: 576,
  upToSmall: 768,
  upToMedium: 992,
  upToLarge: 1400
};

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
      @media (min-width: ${(MEDIA_WIDTHS as any)[size]}px) {
        ${css(a, b, c)}
      }
    `
    return accumulator
  },
  {}
) as any;

export function colors(darkMode: boolean): Colors {
  return {
    // base
    white: '#FFFFFF',
    black: '#000000',

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: '10DCB1',
    text3: '#12B4FF',
    text4: '#12B4FF',

    // backgrounds
    bg1: darkMode ? '#0B0F1C' : '#F7F7F7',
    bg2: darkMode ? '#F7F7F7' : '#0B0F1C',
    bg3: darkMode ? '#565A69' : '#edeef2'
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    mediaWidth: mediaWidthTemplates,
  }
}

export default function ThemeProvider({ children } : { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}