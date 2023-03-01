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
}

const ClaimData: Array<ClaimDataProps> = [
  {
    platform: 'Beacon holders',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.BEACON_HOLDERS}`,
    logoSrc: `${BeaconLogo}`,
    startDate: '3/1',
    endDate: '3/4',
  },
  {
    platform: 'Overlay users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.OVERLAY}`,
    logoSrc: `${OverlayLogo}`,
    startDate: '3/2',
    endDate: '3/5',
  },
  {
    platform: 'Gearbox users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.GEARBOX}`,
    logoSrc: `${GearboxLogo}`,
    startDate: '3/6',
    endDate: '3/7',
  },
  {
    platform: 'Sense Finance users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.SENSE_FINANCE}`,
    logoSrc: `${SenseFinanceLogo}`,
    startDate: '3/7',
    endDate: '3/8',
  },
  {
    platform: 'NFTPerp users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.NFT_PERP}`,
    logoSrc: `${NFTPerpLogo}`,
    startDate: '3/8',
    endDate: '3/9',
  },
  {
    platform: 'Ambire Wallet users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.AMBIRE_WALLET}`,
    logoSrc: `${AmbireLogo}`,
    startDate: '3/9',
    endDate: '3/10',
  },
  {
    platform: 'Element Finance users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.ELEMENT_FINANCE}`,
    logoSrc: `${ElementFinanceLogo}`,
    startDate: '3/13',
    endDate: '3/14',
  },
  {
    platform: 'GMX users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.GMX}`,
    logoSrc: `${GMXLogo}`,
    startDate: '3/14',
    endDate: '3/15',
  },
  {
    platform: 'coW Swap users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.COW_SWAP}`,
    logoSrc: `${CowSwapLogo}`,
    startDate: '3/15',
    endDate: '3/16',
  },
  {
    platform: 'Arbitrum users',
    seatsAvailable: 222,
    claimLink: `/claim/${ClaimId.ARBITRUM}`,
    logoSrc: `${GMXLogo}`,
    startDate: '3/16',
    endDate: '3/17',
  },
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

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
`

const ClaimPage = () => {
  return (
    <Container>
      {ClaimData.map((claim, index) => (
        <InterfaceContainer>
          <StyledLink to={claim.claimLink}>
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
