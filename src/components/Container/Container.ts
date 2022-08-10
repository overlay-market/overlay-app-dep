import styled from 'styled-components'
import {Box} from 'rebass/styled-components'

export const PageContainer = styled.div<{maxWidth?: string}>`
  max-width: ${({maxWidth}) => (maxWidth ? maxWidth : '1200px')};
  margin: auto;
  margin-top: 48px;
  padding: 16px;

  > div {
    background: ${({theme}) => theme.bg1} !important;
  }

  ${({theme}) => theme.mediaWidth.minMedium`
    margin: 0 auto 48px;
  `}
`

export const InterfaceWrapper = styled.div`
  display: flex !important;
  flex-direction: column;
  z-index: 0;
  color: white;
  padding: 0 16px 16px;
  margin: 0 auto 32px;
  max-width: 350px;
  position: static;

  ${({theme}) => theme.mediaWidth.minMedium`
    padding: 16px 0;
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
`

export const FlexColumn = styled(FlexContainer)`
  flex-direction: column;
`

export const FlexRow = styled(FlexContainer)`
  flex-direction: row;
`
