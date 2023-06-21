import {useState, useCallback, useRef, useEffect} from 'react'
import styled from 'styled-components/macro'
import {FlexRow} from '../Container/Container'
import {TEXT, colors} from '../../theme/theme'
import ArbitrumLogo from '../../assets/images/arbitrum-logo.png'
import {ChevronLeft, ChevronRight, Settings, X} from 'react-feather'
import HeaderHamburger from '../HeaderHamburger/HeaderHamburger'
import {LINKS} from '../../constants/links'
import Modal from '../Modal/Modal'
import {MINIMUM_SLIPPAGE_VALUE, NumericalInputContainer, NumericalInputDescriptor} from '../../pages/Markets/Build'
import {NumericalInput} from '../NumericalInput/NumericalInput'
import {useBuildActionHandlers, useBuildState} from '../../state/build/hooks'
import {DefaultTxnSettings} from '../../state/build/actions'
import {useActiveWeb3React} from '../../hooks/web3'

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
`

const WalletMenuButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.dark.grey4};
  position: relative;
  z-index: 100;
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

const MenuItem = styled.div<{background?: string}>`
  padding: 8px 16px;
  cursor: pointer;
  background: ${({background}) => background};
`

const SlippageItem = styled.div`
  display: flex;
  padding: 8px 16px;
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

const MenuLink = ({background, link, onClick, children}: {background?: string; link?: string; onClick?: Function; children: any}) => {
  if (link) {
    return (
      <UnstyledAnchorTag href={link} target="_blank">
        <MenuItem>{children}</MenuItem>
      </UnstyledAnchorTag>
    )
  }
  return (
    <MenuItem onClick={() => (onClick ? onClick() : null)} background={background}>
      {children}
    </MenuItem>
  )
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  padding-bottom: 60px;
  flex: 1;
  position: relative;
  gap: 4px;
  background: ${({theme}) => theme.dark.background};
`

const CloseIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const StyledNumericalInputContainer = styled(NumericalInputContainer)`
  border: 0;
  background: #10131d;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0px;
  width: 100px;
  height: 40px;
`

export default function WalletMenu() {
  const {deactivate, account} = useActiveWeb3React()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState<boolean>(false)
  const {setSlippageValue} = useBuildState()
  const {onSetSlippage} = useBuildActionHandlers()

  const menuRef = useRef<HTMLDivElement>(null)

  const disconnectWallet = () => {
    deactivate()
    localStorage.setItem('disconnected', 'true')
    window.location.reload()
  }

  const showMenu = (val: boolean) => {
    setIsMenuOpen(val)
  }

  // Reset slippage value to default value
  const handleResetSlippage = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE)
    },
    [onSetSlippage],
  )

  const addTokenToMM = async () => {
    const {ethereum} = window
    if (ethereum && ethereum.request) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xa4b1', // Arbitrum One chain ID
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
      } catch (ex) {
        // We don't handle that error for now
        // Might be a different wallet than Metmask
        // or user declined
        console.error(ex)
      }
    }
  }

  useEffect(() => {
    const closeMenu = (event: MouseEvent | TouchEvent) => {
      // Check if the clicked element is outside the div
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && event.target !== document.getElementById('showButton')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', closeMenu)

    return () => {
      document.removeEventListener('click', closeMenu)
    }
  }, [])

  useEffect(() => {
    const fetchSlippage = async () => {
      const storedSlippage = localStorage.getItem(`slippage`)
      // When value is edited or not a valid number, set to default slippage value
      if (storedSlippage && !isNaN(Number(storedSlippage))) {
        onSetSlippage(storedSlippage || DefaultTxnSettings.DEFAULT_SLIPPAGE)
      } else {
        localStorage.setItem(`slippage`, setSlippageValue ?? DefaultTxnSettings.DEFAULT_SLIPPAGE)
      }
    }

    fetchSlippage()
  }, [account, onSetSlippage, setSlippageValue])

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
            <PlatformLogo open={isMenuOpen} src={ArbitrumLogo} />
            <HeaderHamburger
              open={isMenuOpen}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation()
                setIsMenuOpen(!isMenuOpen)
              }}
            />
          </WalletMenuButton>
        </div>
        <MenuContent open={isMenuOpen} ref={menuRef}>
          <MenuTitle open={isSubMenuOpen} onClick={() => (isSubMenuOpen ? setIsSubMenuOpen(false) : null)}>
            <ChevronLeft size={16} />
            <TEXT.SmallBody>Menu</TEXT.SmallBody>
          </MenuTitle>
          {isSubMenuOpen ? (
            <>
              <MenuItem background={colors(false).dark.grey3}>
                <TEXT.SmallBody>Community</TEXT.SmallBody>
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
              <MenuLink link={LINKS.ARBISCAN} background={colors(false).dark.grey3}>
                <FlexRow style={{gap: '8px'}}>
                  <PlatformLogo open={false} src={ArbitrumLogo} />
                  <TEXT.SmallBody>Arbitrum One</TEXT.SmallBody>
                </FlexRow>
              </MenuLink>
              <MenuLink link={LINKS.RISKS}>
                <TEXT.SmallBody>Risks of Overlay</TEXT.SmallBody>
              </MenuLink>
              <MenuLink>
                <FlexRow justify="space-between" onClick={() => setIsSubMenuOpen(true)}>
                  <TEXT.SmallBody>Community</TEXT.SmallBody>
                  <ChevronRight size={16} />
                </FlexRow>
              </MenuLink>
              <MenuLink link={LINKS.GOVERNANCE}>
                <TEXT.SmallBody>Governance</TEXT.SmallBody>
              </MenuLink>
              <MenuLink onClick={addTokenToMM}>
                <TEXT.SmallBody color={colors(false).dark.tan2}>Add OVL to Wallet</TEXT.SmallBody>
              </MenuLink>

              <SlippageItem onClick={() => setIsSlippageModalOpen(true)}>
                <SlippageContainer>
                  <Settings size={16} />
                  <TEXT.SmallBody>Slippage</TEXT.SmallBody>

                  <TEXT.SmallBody marginLeft="8px">{setSlippageValue}%</TEXT.SmallBody>
                </SlippageContainer>
              </SlippageItem>
              {account && (
                <MenuLink onClick={disconnectWallet}>
                  <TEXT.SmallBody>Disconnect Wallet</TEXT.SmallBody>
                </MenuLink>
              )}
            </>
          )}
        </MenuContent>
      </RelativeContainer>
      <Modal
        boxShadow={`0px 0px 12px 6px rgba(91, 96, 164, 0.25)`}
        borderColor={`${colors(false).dark.blue2}80`}
        isOpen={isSlippageModalOpen}
        onDismiss={() => setIsSlippageModalOpen(false)}
      >
        <ModalContainer>
          <CloseIcon onClick={() => setIsSlippageModalOpen(false)}>
            <X color={'white'} height={24} width={24} />
          </CloseIcon>
          <TEXT.BoldHeader1>Slippage</TEXT.BoldHeader1>

          <FlexRow justify="space-between" marginTop="40px">
            <FlexRow style={{gap: 8}}>
              <Settings size={16} color={colors(false).dark.white} />
              <TEXT.StandardBody>Slippage</TEXT.StandardBody>
            </FlexRow>

            <FlexRow style={{gap: 8}} justify="flex-end">
              <TEXT.StandardBody
                onClick={handleResetSlippage}
                color={setSlippageValue === DefaultTxnSettings.DEFAULT_SLIPPAGE ? colors(false).dark.blue2 : colors(false).dark.grey1}
                style={{textDecoration: 'underline', cursor: 'pointer'}}
              >
                Auto
              </TEXT.StandardBody>
              <StyledNumericalInputContainer>
                <NumericalInput value={setSlippageValue} onUserInput={onSetSlippage} align={'right'} />
                <NumericalInputDescriptor> % </NumericalInputDescriptor>
              </StyledNumericalInputContainer>
            </FlexRow>
          </FlexRow>
          {Number(setSlippageValue) > 5 && (
            <FlexRow>
              <TEXT.Supplemental color={colors(false).dark.red}>
                Caution: High slippage. Your position may result in an unfavorable trade.
              </TEXT.Supplemental>
            </FlexRow>
          )}
          {Number(setSlippageValue) < MINIMUM_SLIPPAGE_VALUE && (
            <FlexRow>
              <TEXT.Supplemental color={colors(false).dark.red}>
                Caution: Slippage too low. Slippage should be set to protocol minimum of 0.05%.
              </TEXT.Supplemental>
            </FlexRow>
          )}
        </ModalContainer>
      </Modal>
    </>
  )
}
