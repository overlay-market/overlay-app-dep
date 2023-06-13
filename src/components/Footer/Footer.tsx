import styled from 'styled-components/macro'
import {IconButton} from '@material-ui/core'
import {Image} from 'rebass'
import OverlayLogoDark from '../../assets/images/overlay-logo-dark.png'
import DiscordIcon from '../../assets/images/footer/discord.png'
import TwitterIcon from '../../assets/images/footer/twitter.png'
import TelegramIcon from '../../assets/images/footer/telegram.png'
import MirrorIcon from '../../assets/images/footer/mirror.png'
import ArbiscanIcon from '../../assets/images/footer/arbiscan.png'
import {LINKS} from '../../constants/links'

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  min-height: 140px;
  border-top: 1px solid ${({theme}) => theme.dark.grey3};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({theme}) => theme.mediaWidth.minSmall`
    flex-direction: row;
  `}
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
  margin-bottom: 24px;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-right: 40px;
    margin-bottom: 0px;
  `}
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`

interface IconButtonProps {
  href: string
  target: string
  marginRight?: number
}

const StyledIconButton = styled(IconButton)<IconButtonProps>(props => ({
  marginRight: props.marginRight ? `${props.marginRight}px !important` : 0,
  padding: '0px !important',
}))

const Footer = () => {
  return (
    <StyledFooter>
      <LogoContainer>
        {/* Overlay */}
        <StyledIconButton href={LINKS.LANDING} target="_blank">
          <Image src={OverlayLogoDark} alt="Overlay Logo" height={'auto'} width={138} />
        </StyledIconButton>
      </LogoContainer>

      <IconContainer>
        {/* Discord */}
        <StyledIconButton href={LINKS.DISCORD} target="_blank" marginRight={32}>
          <Image src={DiscordIcon} alt="Discord Icon" height={24} width={24} />
        </StyledIconButton>

        {/* Twitter */}
        <StyledIconButton href={LINKS.TWITTER} target="_blank" marginRight={32}>
          <Image src={TwitterIcon} alt="Twitter Icon" height={24} width={24} />
        </StyledIconButton>

        {/* Telegram */}
        <StyledIconButton href={LINKS.TELEGRAM} target="_blank" marginRight={32}>
          <Image src={TelegramIcon} alt="Telegram Icon" height={24} width={24} />
        </StyledIconButton>

        {/* Mirror */}
        <StyledIconButton href={LINKS.MIRROR} target="_blank" marginRight={32}>
          <Image src={MirrorIcon} alt="Mirror Icon" height={24} width={24} />
        </StyledIconButton>

        {/* Arbiscan */}
        <StyledIconButton href={LINKS.ARBISCAN} target="_blank">
          <Image src={ArbiscanIcon} alt="Arbiscan Icon" height={24} width={24} />
        </StyledIconButton>
      </IconContainer>
    </StyledFooter>
  )
}

export default Footer
