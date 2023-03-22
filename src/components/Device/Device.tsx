import styled from 'styled-components'

const MobileContainer = styled.div<{display?: string}>`
  display: ${({display}) => (display ? display : 'block')};

  ${({theme}) => theme.mediaWidth.minMedium`
    display: none;
  `}
`

const DesktopContainer = styled.div<{display?: string}>`
  display: none;
  --displayVar: ${({display}) => (display ? display : 'block')};
  ${({theme}) => theme.mediaWidth.minMedium`
    display: var(--displayVar);
  `}
`

export const Device = {
  OnlyMobile: function Mobile({children, display}: {children: React.ReactNode; display?: string}) {
    return <MobileContainer display={display}>{children}</MobileContainer>
  },

  OnlyDesktop: function Desktop({children, display}: {children: React.ReactNode; display?: string}) {
    return <DesktopContainer display={display}>{children}</DesktopContainer>
  },
}
