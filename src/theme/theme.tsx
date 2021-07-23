import React, { useMemo } from 'react';
import { Text, TextProps as TextPropsOriginal } from 'rebass';
import styled, { 
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider
} from 'styled-components';
import { useIsDarkMode } from "../state/user/hooks";
import { Colors } from "./styled";

export const MEDIA_WIDTHS = {
  minExtraSmall: 576,
  minSmall: 768,
  minMedium: 992,
  minLarge: 1400
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
    text3: '#0B0F1C',
    text4: '#12B4FF',

    // backgrounds
    bg1: darkMode ? '#0B0F1C' : '#F7F7F7',
    bg2: darkMode ? '#F7F7F7' : '#0B0F1C',
    bg3: darkMode ? '#565A69' : '#edeef2',

    //misc
    white1: '#f2f2f2',
    blue1: darkMode ? '#2172E5' : '#0068FC',
    blue2: '#56CCF2',
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    green1: darkMode ? '#27AE60' : '#007D35',  
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    mediaWidth: mediaWidthTemplates,
  }
};

export default function ThemeProvider({ children } : { children: React.ReactNode }) {
  const darkMode = useIsDarkMode();

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>;
};

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

export const TEXT = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  Body(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={12} {...props} />
  },
}