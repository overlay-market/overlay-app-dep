import { ThemedCssFunction } from 'styled-components'

export type Color = string;

export interface Colors {
  // base
  white: Color
  black: Color

  // text
  text1: Color
  text2: Color
  text3: Color

  // backgrounds
  bg1: Color
  bg2: Color
  bg3: Color
}

declare module 'styled-components' {

  export interface DefaultTheme extends Colors { 
    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>
      upToSmall: ThemedCssFunction<DefaultTheme>
      upToMedium: ThemedCssFunction<DefaultTheme>
      upToLarge: ThemedCssFunction<DefaultTheme>
    }
  }
}
