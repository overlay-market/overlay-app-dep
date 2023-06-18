import {useState, useCallback} from 'react'
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

const WalletMenuContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background: ${({theme}) => theme.dark.grey4};
  position: relative;
  z-index: 100;
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

const MenuLink = ({background, link, children}: {background?: string; link?: string; children: any}) => {
  if (link) {
    return (
      <UnstyledAnchorTag href={link} target="_blank">
        <MenuItem>{children}</MenuItem>
      </UnstyledAnchorTag>
    )
  }
  return <MenuItem background={background}>{children}</MenuItem>
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
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
`

export default function WalletMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)
  const [isSlippageModalOpen, setIsSlippageModalOpen] = useState<boolean>(false)
  const {setSlippageValue} = useBuildState()
  const {onSetSlippage} = useBuildActionHandlers()

  const handleResetTxnSettings = useCallback(
    (e: any) => {
      onSetSlippage(DefaultTxnSettings.DEFAULT_SLIPPAGE)
    },
    [onSetSlippage],
  )

  return (
    <>
      <RelativeContainer>
        <WalletMenuContainer>
          <PlatformLogo open={isMenuOpen} src={ArbitrumLogo} />
          {/* <TEXT.Menu>Earn</TEXT.Menu> */}
          <HeaderHamburger open={isMenuOpen} setOpen={setIsMenuOpen} />
        </WalletMenuContainer>
        <MenuContent open={isMenuOpen}>
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
              <MenuLink>
                <TEXT.SmallBody color={colors(false).dark.tan2}>Add OVL to Wallet</TEXT.SmallBody>
              </MenuLink>

              <SlippageItem onClick={() => setIsSlippageModalOpen(true)}>
                <SlippageContainer>
                  <Settings size={16} />
                  <TEXT.SmallBody>Slippage</TEXT.SmallBody>

                  <TEXT.SmallBody marginLeft="8px">{setSlippageValue}%</TEXT.SmallBody>
                </SlippageContainer>
              </SlippageItem>
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
                onClick={handleResetTxnSettings}
                color={colors(false).dark.grey1}
                style={{textDecoration: 'underline', cursor: 'pointer'}}
              >
                Auto
              </TEXT.StandardBody>
              <StyledNumericalInputContainer width={'100px'} height={'40px'}>
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
