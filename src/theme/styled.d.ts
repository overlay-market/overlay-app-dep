import { ThemedCssFunction } from 'styled-components';

export type Color = string;

export interface Colors {
  // base
  white: Color
  black: Color

  // text
  text1: Color
  text2: Color
  text3: Color
  text4: Color

  // backgrounds
  bg1: Color
  bg2: Color
  bg3: Color

  // misc
  white1: Color
  blue1: Color
  blue2: Color
  blue3: Color
  red1: Color
  green1: Color
};

declare module 'styled-components' {

  export interface DefaultTheme extends Colors { 
    // media queries
    mediaWidth: {
      minExtraSmall: ThemedCssFunction<DefaultTheme>
      minSmall: ThemedCssFunction<DefaultTheme>
      minMedium: ThemedCssFunction<DefaultTheme>
      minLarge: ThemedCssFunction<DefaultTheme>
    }
  };
};
