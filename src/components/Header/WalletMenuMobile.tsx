import {useState, useEffect} from 'react'
import styled from 'styled-components/macro'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import HeaderHamburger from '../HeaderHamburger/HeaderHamburger'
import {useActiveWeb3React} from '../../hooks/web3'
import {SupportedChainId} from '../../constants/chains'
import {NETWORK_ICONS} from './WalletMenu'

const PlatformLogo = styled.div<{src: string; open?: boolean}>`
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
  display: block;

  ${({theme}) => theme.mediaWidth.minSmall`
    display: none;
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

export default function MobileWalletMenu({open, setOpen}: {open: boolean; setOpen: Function}) {
  const {account, chainId} = useActiveWeb3React()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const showMenu = (val: boolean) => {
    setIsMenuOpen(val)
  }

  useEffect(() => {
    setIsMenuOpen(open)
  }, [open])

  const supportedChainId: boolean = Boolean(chainId && SupportedChainId[chainId])

  return (
    <>
      <RelativeContainer>
        <div onClick={() => showMenu(true)}>
          <WalletMenuButton
            id="showButton"
            onClick={event => {
              event.stopPropagation()
              setOpen(!open)
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
                setOpen(!open)
              }}
            />
          </WalletMenuButton>
        </div>
      </RelativeContainer>
    </>
  )
}
