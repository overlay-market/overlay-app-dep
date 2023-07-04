import styled from 'styled-components/macro'
import {FlexRow} from '../Container/Container'
import {TEXT, colors} from '../../theme/theme'
import {ChevronLeft, ChevronRight, Settings} from 'react-feather'
import {LINKS} from '../../constants/links'
import {useBuildState} from '../../state/build/hooks'
import {useActiveWeb3React} from '../../hooks/web3'
import {useSetSlippageModalToggle, useWalletModalToggle} from '../../state/application/hooks'
import {NETWORK_ICONS, NETWORK_LABELS} from './WalletMenu'

export const PlatformLogo = styled.div<{src: string; open?: boolean}>`
  background: no-repeat center/contain url(${({src}) => src});
  background-size: contain;
  background-repeat: no-repeat;
  height: 17px;
  width: 17px;
  opacity: ${({open}) => (open ? '0' : '1')};
  transition: all 0.2s linear;
`

const MenuTitle = styled.div<{open?: boolean}>`
  opacity: ${({open}) => (open ? '1' : '0')};
  cursor: ${({open}) => (open ? 'pointer' : 'default')};
  font-family: Inter;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 8px 16px 8px;
  display: flex;
  align-items: center;
`

const MenuItem = styled.div<{background?: string; mobile?: boolean; clickable?: boolean}>`
  padding: ${({mobile}) => (mobile ? '12px 0' : '12px 20px')};
  cursor: ${({clickable}) => (clickable ? 'pointer' : '')};
  background: ${({background}) => background};

  :hover {
    background: ${({theme, clickable, background}) => (clickable ? theme.dark.grey3 : background)};
  }
`

const SlippageItem = styled.div<{mobile?: boolean}>`
  display: flex;
  padding: ${({mobile}) => (mobile ? '12px 0' : '12px 20px')};
`
const SlippageContainer = styled.div`
  cursor: pointer;
  display: flex;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  align-items: center;
  background: ${({theme}) => theme.dark.grey3};
`
const SubMenuContainer = styled.div`
  & > a > div {
    padding-left: 42px;
  }
`

const UnstyledAnchorTag = styled.a`
  color: unset;
  text-decoration: none;
`

export const MenuLink = ({
  background,
  link,
  onClick,
  mobile,
  children,
}: {
  background?: string
  link?: string
  onClick?: Function
  mobile?: boolean
  children: any
}) => {
  if (link) {
    return (
      <UnstyledAnchorTag href={link} target="_blank">
        <MenuItem mobile={mobile} clickable>
          {children}
        </MenuItem>
      </UnstyledAnchorTag>
    )
  }

  return (
    <MenuItem mobile={mobile} onClick={event => (onClick ? onClick(event) : null)} clickable={onClick ? true : false} background={background}>
      {children}
    </MenuItem>
  )
}

interface ExternalLinksProps {
  isSubMenuOpen?: boolean
  setIsSubMenuOpen?: any
  mobile?: boolean
}

export default function ExternalLinks({isSubMenuOpen, setIsSubMenuOpen, mobile}: ExternalLinksProps) {
  const {deactivate, account, chainId} = useActiveWeb3React()
  const {setSlippageValue} = useBuildState()
  const toggleWalletModal = useWalletModalToggle()
  const toggleSetSlippageModal = useSetSlippageModalToggle()

  const disconnectWallet = () => {
    deactivate()
    localStorage.setItem('disconnected', 'true')
    window.location.reload()
  }

  const addTokenToMM = async () => {
    const {ethereum} = window
    if (ethereum && ethereum.request) {
      let networkSwitched = false

      const chainId = '0xa4b1' // Arbitrum One chain ID
      const networkAdded = await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId,
            chainName: 'Arbitrum One', // Arbitrum One network name
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://arb1.arbitrum.io/rpc'], // Arbitrum One RPC endpoint
            blockExplorerUrls: ['https://explorer.arbitrum.io/'], // Arbitrum One block explorer URL
          },
        ],
      })

      if (!networkAdded) {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{chainId: '0xa4b1'}], // Arbitrum One chain ID
          })
          networkSwitched = true
        } catch (error) {
          if ((error as any).code === 4902) {
            console.error('User rejected network switch.')
          } else {
            console.error(error)
          }
        }

        if (networkSwitched) {
          try {
            await ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                // params is expecting an array, even though the correct type is an object.
                // @ts-ignore
                type: 'ERC20',
                options: {
                  address: '0x4305C4Bc521B052F17d389c2Fe9d37caBeB70d54',
                  symbol: 'OVL',
                  decimals: 18,
                  image: 'https://raw.githubusercontent.com/overlay-market/overlay-interface/staging/public/overlay-logo-white.png',
                },
              },
            })
          } catch (error) {
            console.error(error)
          }
        }
      }
    }
  }

  return (
    <>
      {(!mobile || isSubMenuOpen) && (
        <MenuTitle open={isSubMenuOpen} onClick={() => (isSubMenuOpen ? setIsSubMenuOpen(false) : null)}>
          <ChevronLeft size={16} />
          <TEXT.SmallBody ml="4px">Menu</TEXT.SmallBody>
        </MenuTitle>
      )}
      {isSubMenuOpen ? (
        <>
          <MenuItem background={colors(false).dark.grey5}>
            <TEXT.BoldSmallBody>Community</TEXT.BoldSmallBody>
          </MenuItem>
          <SubMenuContainer>
            <MenuLink link={LINKS.DISCORD}>
              <TEXT.SmallBody>Discord</TEXT.SmallBody>
            </MenuLink>
            <MenuLink link={LINKS.TWITTER}>
              <TEXT.SmallBody>Twitter</TEXT.SmallBody>
            </MenuLink>
            <MenuLink link={LINKS.TELEGRAM}>
              <TEXT.SmallBody>Telegram</TEXT.SmallBody>
            </MenuLink>
            <MenuLink link={LINKS.MIRROR}>
              <TEXT.SmallBody>Mirror</TEXT.SmallBody>
            </MenuLink>
          </SubMenuContainer>
        </>
      ) : (
        <>
          {!mobile && (
            <>
              {account && chainId ? (
                <MenuLink background={colors(false).dark.grey5}>
                  <FlexRow style={{gap: '8px'}}>
                    <PlatformLogo open={false} src={NETWORK_ICONS[chainId]} />
                    <TEXT.SmallBody>{NETWORK_LABELS[chainId]}</TEXT.SmallBody>
                  </FlexRow>
                </MenuLink>
              ) : (
                <MenuLink
                  background={colors(false).dark.grey5}
                  onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    event.stopPropagation()
                    toggleWalletModal()
                  }}
                >
                  <TEXT.BoldSmallBody style={{textDecoration: 'underline'}}>Connect Wallet</TEXT.BoldSmallBody>
                </MenuLink>
              )}
            </>
          )}
          <MenuLink mobile={mobile} link={LINKS.RISKS}>
            <TEXT.SmallBody>Risks of Overlay</TEXT.SmallBody>
          </MenuLink>
          <MenuLink
            mobile={mobile}
            onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              event.stopPropagation()
              setIsSubMenuOpen(true)
            }}
          >
            <FlexRow justify="space-between">
              <TEXT.SmallBody>Community</TEXT.SmallBody>
              <ChevronRight size={16} />
            </FlexRow>
          </MenuLink>
          <MenuLink mobile={mobile} link={LINKS.GOVERNANCE}>
            <TEXT.SmallBody>Governance</TEXT.SmallBody>
          </MenuLink>
          <MenuLink mobile={mobile} onClick={addTokenToMM}>
            <TEXT.SmallBody color={colors(false).dark.tan2}>Add OVL to Wallet</TEXT.SmallBody>
          </MenuLink>

          <SlippageItem mobile={mobile} onClick={toggleSetSlippageModal}>
            <SlippageContainer>
              <Settings size={16} />
              <TEXT.SmallBody>Slippage</TEXT.SmallBody>

              <TEXT.SmallBody marginLeft="8px">{setSlippageValue}%</TEXT.SmallBody>
            </SlippageContainer>
          </SlippageItem>
          {account && (
            <MenuLink mobile={mobile} onClick={disconnectWallet}>
              <TEXT.SmallBody>Disconnect Wallet</TEXT.SmallBody>
            </MenuLink>
          )}
        </>
      )}
    </>
  )
}
