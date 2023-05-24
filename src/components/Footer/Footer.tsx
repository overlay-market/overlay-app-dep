import styled from 'styled-components/macro'
import {Box, IconButton} from '@material-ui/core'
import {Image} from 'rebass'
import OverlayLogoDark from '../../assets/images/overlay-logo-dark.png'
import OverlayLogoOnlyDark from '../../assets/images/overlay-logo-only-no-background.png'

export const StyledFooter = styled.footer`
  margin-top: 200px;
  min-height: 140px;
  border-top: 1px solid ${({theme}) => theme.dark.grey3};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`

const Footer = () => {
  return (
    <StyledFooter>
      <LogoContainer>
        {/* Overlay */}
        <Image src={OverlayLogoDark} alt={'Overlay Logo'} height={'auto'} width={'138px'} marginRight={'40px'} />

        {/* Discord */}
        <IconButton href="http://discord.gg/ovl" target="_blank" style={{marginRight: '32px'}}>
          <Image src={OverlayLogoOnlyDark} alt={'Discord Logo'} height={'24px'} width={'24px'} />
        </IconButton>

        {/* Twitter */}
        <IconButton href="https://twitter.com/OverlayProtocol" target="_blank" style={{marginRight: '32px'}}>
          <Image src={OverlayLogoOnlyDark} alt={'Discord Logo'} height={'24px'} width={'24px'} />
        </IconButton>

        {/* Telegram */}
        <IconButton href="https://t.me/overlay_protocol" target="_blank" style={{marginRight: '32px'}}>
          <Image src={OverlayLogoOnlyDark} alt={'Discord Logo'} height={'24px'} width={'24px'} />
        </IconButton>

        {/* Mirror */}
        <IconButton href="https://mirror.xyz/0x7999C7f0b9f2259434b7aD130bBe36723a49E14e" target="_blank" style={{marginRight: '32px'}}>
          <Image src={OverlayLogoOnlyDark} alt={'Discord Logo'} height={'24px'} width={'24px'} />
        </IconButton>

        {/* Arbiscan */}
        <IconButton href="https://arbiscan.io/token/0x4305c4bc521b052f17d389c2fe9d37cabeb70d54" target="_blank">
          <Image src={OverlayLogoOnlyDark} alt={'Discord Logo'} height={'24px'} width={'24px'} />
        </IconButton>
      </LogoContainer>
    </StyledFooter>
  )
}

export default Footer
