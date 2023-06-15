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
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 992,
      lg: 1200,
      xl: 1400,
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
  return darkMode
    ? {
        dark: {
          background: '#202431',
          grey4: '#2E3343',
          grey3: '#474747',
          grey2: '#A8A6A6',
          grey1: '#BBBBBB',
          white: '#FFFFFF',
          tan1: '#FFDBB0',
          tan2: '#FFCC8F',
          purple1: '#F5EEFE',
          purple2: '#D5B4FF',
          blue1: '#E5F6FF',
          blue2: '#71CEFF',
          green: '#5FD0AB',
          red: '#FF648A',
          black: '#000000',
        },
        light: {
          background: '#F8F8F8',
          FFFFFF: '#FFFFFF',
          purple: '#E8D7FF',
          blue: '#B4E5FF',
          green: '#83E2C3',
          red: '#FFA1B9',
        },
      }
    : {
        dark: {
          background: '#202431',
          grey4: '#2E3343',
          grey3: '#474747',
          grey2: '#A8A6A6',
          grey1: '#BBBBBB',
          white: '#F0F0F0',
          tan1: '#FFDBB0',
          tan2: '#FFCC8F',
          purple1: '#F5EEFE',
          purple2: '#D5B4FF',
          blue1: '#E5F6FF',
          blue2: '#71CEFF',
          green: '#5FD0AB',
          red: '#FF648A',
          black: '#000000',
        },
        light: {
          background: '#F8F8F8',
          FFFFFF: '#FFFFFF',
          purple: '#E8D7FF',
          blue: '#B4E5FF',
          green: '#83E2C3',
          red: '#FFA1B9',
        },
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

const TextWrapperUnderlined = styled(Text)<{color: keyof Colors}>`
  color: ${({color, theme}) => (theme as any)[color]};
  text-decoration: underline dashed;
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
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={20} fontWeight={400} color={colors(false).dark.white} {...props} />
  },
  BoldHeader1(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={20} fontWeight={700} color={colors(false).dark.white} {...props} />
  },
  StandardBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={16} fontWeight={400} color={colors(false).dark.white} {...props} />
  },
  BoldStandardBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={16} fontWeight={700} color={colors(false).dark.white} {...props} />
  },
  SmallBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={14} fontWeight={400} color={colors(false).dark.white} {...props} />
  },
  BoldSmallBody(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={14} fontWeight={700} color={colors(false).dark.white} {...props} />
  },
  Supplemental(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={400} color={colors(false).dark.white} {...props} />
  },
  SupplementalUnderlinedDashes(props: TextProps) {
    return <TextWrapperUnderlined fontFamily="Inter, sans-serif" fontSize={12} fontWeight={400} color={colors(false).dark.white} {...props} />
  },
  SupplementalHeader(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={400} color={colors(true).dark.grey2} {...props} />
  },
  BoldSupplemental(props: TextProps) {
    return <TextWrapper fontFamily="Inter, sans-serif" fontSize={12} fontWeight={700} color={colors(false).dark.white} {...props} />
  },
  BoldNumber(props: TextProps) {
    return <TextWrapper fontFamily="Roboto Mono, monospace" fontSize={14} fontWeight={700} {...props} />
  },
  Number(props: TextProps) {
    return <TextWrapper fontFamily="Roboto Mono, monospace" fontSize={14} fontWeight={400} {...props} />
  },
}
