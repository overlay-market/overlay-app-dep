import React, {useMemo} from 'react'
import {Text, TextProps as TextPropsOriginal} from 'rebass'
import styled, {css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider} from 'styled-components'
import {useIsDarkMode} from '../state/user/hooks'
import {Colors} from './styled'
import {createTheme} from '@material-ui/core/styles'

export const muiTheme = createTheme({
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: 'transparent',
      },
    },
  },
})

export const MEDIA_WIDTHS = {
  minExtraSmall: 576,
  minSmall: 768,
  minMedium: 992,
  minLarge: 1400,
}

const mediaWidthTemplates: {[width in keyof typeof MEDIA_WIDTHS]: typeof css} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (min-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {}) as any

export function colors(darkMode: boolean): Colors {
  return {
    primary: '#12B4FF',
    // base
    white: '#FFFFFF',
    black: '#000000',

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: '10DCB1',
    text3: '#0B0F1C',
    text4: '#12B4FF',

    // backgrounds
    bg1: darkMode ? '#202431' : '#F7F7F7',
    bg2: darkMode ? '#F7F7F7' : '#0B0F1C',
    bg3: darkMode ? '#565A69' : '#edeef2',

    //misc
    white1: '#f2f2f2',
    blue1: darkMode ? '#2172E5' : '#0068FC',
    blue2: '#56CCF2',
    blue3: '#12B4FF',
    red1: darkMode ? '#FF4343' : '#DA2D2B',
    green1: darkMode ? '#27AE60' : '#007D35',
    grey2: darkMode ? '#A8A6A6' : '#A8A6A6'
  }
}

export function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    mediaWidth: mediaWidthTemplates,
  }
}

export default function ThemeProvider({children}: {children: React.ReactNode}) {
  const darkMode = useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{color: keyof Colors}>`
  color: ${({color, theme}) => (theme as any)[color]};
`

type TextProps = Omit<TextPropsOriginal, 'css'>

export const TEXT = {
  AdjustableSize(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontWeight={500} color={'text2'} {...props} />
  },
  Menu(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontWeight={700} fontSize={14} {...props} />
  },
  StandardHeader1(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={20} fontWeight={400} color={colors(false).white1} {...props} />
  },
  BoldHeader1(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={20} fontWeight={700} color={colors(false).white1} {...props} />
  },
  StandardBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={16} fontWeight={400} color={colors(false).white1} {...props} />
  },
  BoldStandardBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={16} fontWeight={700} color={colors(false).white1} {...props} />
  },
  SmallBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={14} fontWeight={400} color={colors(false).white1} {...props} />
  },
  BoldSmallBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={14} fontWeight={700} color={colors(false).white1} {...props} />
  },
  Supplemental(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={400} color={colors(false).white1} {...props} />
  },
  SupplementalHeader(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={400} color={colors(true).grey2} {...props} />
  },
  BoldSupplemental(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={700} color={colors(false).white1} {...props} />
  },
  BoldNumber(props: TextProps) {
    return <TextWrapper fontFamily="Roboto Mono, monospace" fontSize={14} fontWeight={700} {...props} />
  },
  Number(props: TextProps) {
    return <TextWrapper fontFamily="Roboto Mono, monospace" fontSize={14} fontWeight={400} {...props} />
  },
}
