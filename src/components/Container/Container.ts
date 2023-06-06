import styled from 'styled-components'
import {Box} from 'rebass/styled-components'

export const PageContainer = styled.div<{maxWidth?: string}>`
  max-width: ${({maxWidth}) => (maxWidth ? maxWidth : '1200px')};
  margin: auto;
  margin-top: 0;
  margin-bottom: 48px;
  padding: 16px;

  > div {
    background: ${({theme}) => theme.dark.background} !important;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    margin: 0 auto 48px;
  `}
`

export const InterfaceWrapper = styled.div`
  display: flex !important;
  flex-direction: column;
  z-index: 0;
  color: white;
  position: static;
  max-width: 375px;
  padding: 0 16px;
  margin-bottom: 48px;

  ${({theme}) => theme.mediaWidth.minSmall`
    padding: 16px 0;
    max-width: 350px;
    margin: 0 auto 32px;
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    position: relative;
    margin: 0 auto 48px;
  `}
`

const FlexContainer = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
  borderTop?: string
  borderBottom?: string
}>`
  display: flex;
  position: relative;
  width: ${({width}) => width ?? '100%'};
  align-items: ${({align}) => align ?? 'center'};
  justify-content: ${({justify}) => justify ?? 'flex-start'};
  padding: ${({padding}) => padding};
  border: ${({border}) => border};
  border-radius: ${({borderRadius}) => borderRadius};
  border-top: ${({borderTop}) => borderTop ?? borderTop};
  border-bottom: ${({borderBottom}) => borderBottom ?? borderBottom};
`

export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`

export const FlexRow = styled(FlexContainer)`
  flex-direction: row;
`
