import styled from 'styled-components'
import {FlexRow, FlexColumn} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import BeaconLogo from '../../assets/images/beacon-logo.png'
import OverlayLogo from '../../assets/images/overlay-logo-only-no-background.png'
import GearboxLogo from '../../assets/images/gearbox-logo.png'
import SenseFinanceLogo from '../../assets/images/sensefinance-logo.png'
import NFTPerpLogo from '../../assets/images/nft-perp-logo.png'
import AmbireLogo from '../../assets/images/ambire-logo.png'
import ElementFinanceLogo from '../../assets/images/elementfinance-logo.png'
import GMXLogo from '../../assets/images/gmx-logo.png'
import CowSwapLogo from '../../assets/images/coWswap-logo.png'
import {Link} from 'react-router-dom'
import {ClaimId} from '../../constants/claims'

interface ClaimDataProps {
  platform: string
  seatsAvailable: number
  claimLink: string
  claimText: string
  logoSrc: string
  isDisabled: boolean
  isClosed: boolean
}

const ClaimData: Array<ClaimDataProps> = [
  {
    platform: 'Beacon holders',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.BEACON_HOLDERS}`,
    claimText: 'Closed',
    logoSrc: `${BeaconLogo}`,
    isDisabled: true,
    isClosed: true,
  },
  {
    platform: 'Overlay users',
    seatsAvailable: 200,
    claimLink: `/claim/${ClaimId.OVERLAY}`,
    claimText: 'Closed',
    logoSrc: `${OverlayLogo}`,
    isDisabled: true,
    isClosed: true,
  },
  {
    platform: 'Gearbox users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.GEARBOX}`,
    claimText: 'Coming soon',
    logoSrc: `${GearboxLogo}`,
    isDisabled: true,
    isClosed: false,
  },
  {
    platform: 'Sense Finance users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.SENSE_FINANCE}`,
    claimText: 'Coming soon',
    logoSrc: `${SenseFinanceLogo}`,
    isDisabled: true,
    isClosed: false,
  },
  {
    platform: 'NFTPerp users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.NFT_PERP}`,
    claimText: 'Coming soon',
    logoSrc: `${NFTPerpLogo}`,
    isDisabled: true,
    isClosed: false,
  },
  {
    platform: 'Ambire Wallet users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.AMBIRE_WALLET}`,
    claimText: 'Coming soon',
    logoSrc: `${AmbireLogo}`,
    isDisabled: true,
    isClosed: false,
  },
  // {
  //   platform: 'Element Finance users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.ELEMENT_FINANCE}`,
  //   logoSrc: `${ElementFinanceLogo}`,
  //   isDisabled: true,
  //   isClosed: false,
  // },
  // {
  //   platform: 'GMX users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.GMX}`,
  //   logoSrc: `${GMXLogo}`,
  //   isDisabled: true,
  // },
  // {
  //   platform: 'coW Swap users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.COW_SWAP}`,
  //   logoSrc: `${CowSwapLogo}`,
  //   isDisabled: true,
  // },
  // {
  //   platform: 'Arbitrum users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.ARBITRUM}`,
  //   logoSrc: `${GMXLogo}`,
  //   isDisabled: true,
  // },
]

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px;
  justify-content: center;
  margin: 64px auto;
  gap: 30px;
`

const InterfaceContainer = styled.div<{isClosed?: boolean}>`
  display: flex;
  flex-direction: column;
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 12px;
  background: #1b2131;
  width: 300px;
  text-decoration: none;
  filter: ${({isClosed}) => (isClosed ? 'grayscale(100%)' : '')};
`

const PlatformLogo = styled.div<{src: string}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 70px;
  width: 100%;
  margin: 16px 0;
`

const StyledLink = styled(Link)<{isDisabled?: boolean}>`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  pointer-events: ${({isDisabled}) => (isDisabled ? 'none' : 'auto')};
`

const ClaimPage = () => {
  return (
    <Container>
      {ClaimData.map((claim, index) => (
        <InterfaceContainer isClosed={claim.isClosed}>
          <StyledLink to={claim.claimLink} isDisabled={claim.isDisabled}>
            <TEXT.Supplemental>Claim OVL for {claim.platform}</TEXT.Supplemental>
            <TEXT.Supplemental>{claim.seatsAvailable} seats available</TEXT.Supplemental>
            <PlatformLogo src={claim.logoSrc} />
            <TEXT.BoldSupplemental textAlign="center">{claim.claimText}</TEXT.BoldSupplemental>
          </StyledLink>
        </InterfaceContainer>
      ))}
    </Container>
  )
}

export default ClaimPage
