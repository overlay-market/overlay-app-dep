import {ThemedCssFunction} from 'styled-components'

export type Color = string

export interface Colors {
  dark: {
    background: string
    grey4: string
    grey3: string
    grey2: string
    grey1: string
    white: string
    tan1: string
    tan2: string
    purple1: string
    purple2: string
    blue1: string
    blue2: string
    green: string
    red: string
    black: string
  }
  light: {
    background: string
    FFFFFF: string
    purple: string
    blue: string
    green: string
    red: string
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    // media queries
    mediaWidth: {
      minExtraSmall: ThemedCssFunction<DefaultTheme>
      minSmall: ThemedCssFunction<DefaultTheme>
      minMedium: ThemedCssFunction<DefaultTheme>
      minLarge: ThemedCssFunction<DefaultTheme>
    }
  }
}
