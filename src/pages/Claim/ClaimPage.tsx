import styled from 'styled-components'
import {FlexRow, FlexColumn} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import BeaconLogo from '../../assets/images/beacon-logo.png'
import OverlayLogo from '../../assets/images/overlay-logo-only-no-background.png'
import GearboxLogo from '../../assets/images/gearbox-logo.png'
import SenseFinanceLogo from '../../assets/images/sensefinance-logo.png'
import NFTPerpLogo from '../../assets/images/nftperp-logo.jpg'
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
  logoSrc: string
  startDate: string
  endDate: string
  disabled: boolean
}

const ClaimData: Array<ClaimDataProps> = [
  {
    platform: 'Beacon holders',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.BEACON_HOLDERS}`,
    logoSrc: `${BeaconLogo}`,
    startDate: '3/1',
    endDate: '3/3',
    disabled: false,
  },
  {
    platform: 'Overlay users',
    seatsAvailable: 200,
    claimLink: `/claim/${ClaimId.OVERLAY}`,
    logoSrc: `${OverlayLogo}`,
    startDate: '3/2',
    endDate: '3/4',
    disabled: true,
  },
  {
    platform: 'Gearbox users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.GEARBOX}`,
    logoSrc: `${GearboxLogo}`,
    startDate: '3/6',
    endDate: '3/7',
    disabled: true,
  },
  {
    platform: 'Sense Finance users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.SENSE_FINANCE}`,
    logoSrc: `${SenseFinanceLogo}`,
    startDate: '3/7',
    endDate: '3/8',
    disabled: true,
  },
  {
    platform: 'NFTPerp users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.NFT_PERP}`,
    logoSrc: `${NFTPerpLogo}`,
    startDate: '3/8',
    endDate: '3/9',
    disabled: true,
  },
  {
    platform: 'Ambire Wallet users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.AMBIRE_WALLET}`,
    logoSrc: `${AmbireLogo}`,
    startDate: '3/9',
    endDate: '3/10',
    disabled: true,
  },
  // {
  //   platform: 'Element Finance users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.ELEMENT_FINANCE}`,
  //   logoSrc: `${ElementFinanceLogo}`,
  //   startDate: '3/13',
  //   endDate: '3/14',
  //   disabled: true,
  // },
  {
    platform: 'GMX users',
    seatsAvailable: 100,
    claimLink: `/claim/${ClaimId.GMX}`,
    logoSrc: `${GMXLogo}`,
    startDate: '3/14',
    endDate: '3/15',
    disabled: true,
  },
  // {
  //   platform: 'coW Swap users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.COW_SWAP}`,
  //   logoSrc: `${CowSwapLogo}`,
  //   startDate: '3/15',
  //   endDate: '3/16',
  //   disabled: true,
  // },
  // {
  //   platform: 'Arbitrum users',
  //   seatsAvailable: 100,
  //   claimLink: `/claim/${ClaimId.ARBITRUM}`,
  //   logoSrc: `${GMXLogo}`,
  //   startDate: '3/16',
  //   endDate: '3/17',
  //   disabled: true,
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

const InterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #71ceff;
  border-radius: 8px;
  box-shadow: 0 0 12px #5b60a4;
  padding: 12px;
  background: #1b2131;
  width: 300px;
  text-decoration: none;
`

const PlatformLogo = styled.div<{src: string}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 70px;
  width: 100%;
  margin: 16px 0;
`

const StyledLink = styled(Link)<{disabled?: boolean}>`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  pointer-events: ${({disabled}) => (disabled ? 'none' : 'auto')};
`

const ClaimPage = () => {
  return (
    <Container>
      {ClaimData.map((claim, index) => (
        <InterfaceContainer>
          <StyledLink to={claim.claimLink} disabled={claim.disabled}>
            <TEXT.Supplemental>Claim OVL for {claim.platform}</TEXT.Supplemental>
            <TEXT.Supplemental>{claim.seatsAvailable} seats available</TEXT.Supplemental>
            <PlatformLogo src={claim.logoSrc} />
            <TEXT.BoldSupplemental textAlign="center">
              Open {claim.startDate} - {claim.endDate}
            </TEXT.BoldSupplemental>
          </StyledLink>
        </InterfaceContainer>
      ))}
    </Container>
  )
}

export default ClaimPage
