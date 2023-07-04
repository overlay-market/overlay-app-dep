import {useState, useRef, useEffect} from 'react'
import styled from 'styled-components/macro'
import {FlexRow} from '../Container/Container'
import {TEXT, colors} from '../../theme/theme'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import EthereumLogo from '../../assets/images/ethereum-logo.png'
import ArbitrumTestnetLogo from '../../assets/images/arbitrum-testnet-logo.png'
import HeaderHamburger from '../HeaderHamburger/HeaderHamburger'
import {useActiveWeb3React} from '../../hooks/web3'
import {SupportedChainId} from '../../constants/chains'
import ExternalLinks from './ExternalLinks'

export const PlatformLogo = styled.div<{src: string; open?: boolean}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 17px;
  width: 17px;
  opacity: ${({open}) => (open ? '0' : '1')};
  transition: all 0.2s linear;
`

const RelativeContainer = styled.div`
  position: relative;
  display: none;

  ${({theme}) => theme.mediaWidth.minSmall`
    display: block;
  `};
`

const WalletMenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.dark.grey4};
  position: relative;
  outline: none;
  border: 0;
  cursor: pointer;
`

const MenuContent = styled.div<{open?: boolean}>`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 8px;
  background: ${({theme}) => theme.dark.grey4};
  overflow: hidden;
  transition: all 0.2s linear;
  padding-bottom: 16px;

  width: ${({open}) => (open ? '240px' : '0px')};
  max-height: ${({open}) => (open ? '500px' : '0px')};
  opacity: ${({open}) => (open ? '1' : '0')};
`

const MenuItem = styled.div<{background?: string; clickable?: boolean}>`
  padding: 8px 20px;
  cursor: ${({clickable}) => (clickable ? 'pointer' : '')};
  background: ${({background}) => background};

  :hover {
    background: ${({theme, clickable, background}) => (clickable ? theme.dark.grey3 : background)};
  }
`

const UnstyledAnchorTag = styled.a`
  color: unset;
  text-decoration: none;
`

export const MenuLink = ({background, link, onClick, children}: {background?: string; link?: string; onClick?: Function; children: any}) => {
  if (link) {
    return (
      <UnstyledAnchorTag href={link} target="_blank">
        <MenuItem clickable>{children}</MenuItem>
      </UnstyledAnchorTag>
    )
  }

  return (
    <MenuItem onClick={event => (onClick ? onClick(event) : null)} clickable={onClick ? true : false} background={background}>
      {children}
    </MenuItem>
  )
}

export const NETWORK_ICONS: {[chainId in SupportedChainId | number]: string} = {
  [SupportedChainId.MAINNET]: EthereumLogo,
  [SupportedChainId.ARBITRUM]: ArbitrumLogo,
  [SupportedChainId.ARBITRUM_GÖRLI]: ArbitrumTestnetLogo,
}

export const NETWORK_LABELS: {[chainId in SupportedChainId | number]: JSX.Element} = {
  [SupportedChainId.MAINNET]: <TEXT.SmallBody>Ethereum Mainnet</TEXT.SmallBody>,
  [SupportedChainId.ARBITRUM]: <TEXT.SmallBody>Arbitrum One</TEXT.SmallBody>,
  [SupportedChainId.ARBITRUM_GÖRLI]: (
    <FlexRow>
      <TEXT.SmallBody>Arbitrum Goerli -</TEXT.SmallBody>
      <TEXT.SmallBody color={colors(false).dark.red}>Testnet</TEXT.SmallBody>
    </FlexRow>
  ),
}

export default function WalletMenu() {
  const {account, chainId} = useActiveWeb3React()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement>(null)

  const showMenu = (val: boolean) => {
    setIsMenuOpen(val)
  }

  useEffect(() => {
    const closeMenu = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked element is outside the div
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && event.target !== document.getElementById('showButton')) {
        setIsMenuOpen(false)
        setIsSubMenuOpen(false)
      }
    }

    document.addEventListener('click', closeMenu)

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  const supportedChainId: boolean = Boolean(chainId && SupportedChainId[chainId])

  return (
    <>
      <RelativeContainer>
        <div onClick={() => showMenu(true)}>
          <WalletMenuButton
            id="showButton"
            onClick={event => {
              event.stopPropagation()
              showMenu(true)
            }}
          >
            {account && chainId && supportedChainId ? (
              <PlatformLogo open={isMenuOpen} src={NETWORK_ICONS[chainId]} />
            ) : (
              supportedChainId && <PlatformLogo open={isMenuOpen} src={ArbitrumLogo} />
            )}
            <HeaderHamburger
              open={isMenuOpen}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
                setIsSubMenuOpen(false)
              }}
            />
          </WalletMenuButton>
        </div>
        <MenuContent open={isMenuOpen} ref={menuRef}>
          <ExternalLinks isSubMenuOpen={isSubMenuOpen} setIsSubMenuOpen={setIsSubMenuOpen} />
        </MenuContent>
      </RelativeContainer>
    </>
  )
}
