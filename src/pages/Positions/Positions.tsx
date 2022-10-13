import {useMemo, useEffect} from 'react'
import styled from 'styled-components/macro'
import Loader from 'react-loader-spinner'
import {Button} from 'rebass'
import {Switch as SwitchToggle} from '@rebass/forms'
import {useActiveWeb3React} from '../../hooks/web3'
import {MarketCard} from '../../components/Card/MarketCard'
import {useQuerySubgraphAccountPositions} from '../../state/build/hooks'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {PositionCard, PositionTableHeader} from './PositionCard'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useUserHideClosedPositions} from '../../state/user/hooks'
import {useBlockNumber} from '../../state/application/hooks'
import {useMarketNames} from '../../hooks/useMarketName'
import {usePositionValues} from '../../hooks/usePositionValue'
import {usePositionCosts} from '../../hooks/usePositionCost'
import {useLiquidationPrices} from '../../hooks/useLiquidationPrice'
import {usePositionOis} from '../../hooks/usePositionOi'
import {useMarketQuoteAmounts} from '../../hooks/useMarketQuoteAmounts'
import {useMarketBaseAmounts} from '../../hooks/useMarketBaseAmount'
import {useToken} from '../../hooks/useToken'
import {TEXT} from '../../theme/theme'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto 32px;
  position: static;
  z-index: 0;
`

export const RouteHeader = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 48px;
  font-weight: 700;
  color: white;
  padding-top: 16px;

  ${({theme}) => theme.mediaWidth.minSmall`
    padding-top: 0px;
  `}
`

export const LoadingStatusView = styled(FlexColumn)`
  margin: 44px auto auto auto;
`

const ConnectWalletButton = styled(Button)`
  cursor: pointer;
  font-weight: 700;
  background: none;
  border: 1px solid #12b4ff !important;
  border-radius: 8px !important;
  padding: 16px 60px !important;
  color: white;

  :hover {
    color: #12b4ff;
    box-shadow: 0 0px 5px #12b4ff;
  }
`

const ShowClosedPositionsToggleContainer = styled(FlexRow)`
  margin-bottom: 16px;
`
export const Positions = () => {
  const {onResetUnwindState} = useUnwindActionHandlers()
  const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()

  return (
    <MarketCard>
      {onResetUnwindState()}
      <Container>
        <RouteHeader>Positions</RouteHeader>
        <ShowClosedPositionsToggleContainer>
          <TEXT.BoldSmallBody ml="auto">Show closed positions</TEXT.BoldSmallBody>
          <SwitchToggle
            checked={userHideClosedPositions}
            onClick={() => setUserHideClosedPositions(!userHideClosedPositions)}
          />
        </ShowClosedPositionsToggleContainer>
        <PositionTableHeader />
        <FlexColumn>
          <PositionsInner />
        </FlexColumn>
      </Container>
    </MarketCard>
  )
}

export const PositionsInner = () => {
  const toggleWalletModal = useWalletModalToggle()
  const blockNumber = useBlockNumber()
  const {account, active} = useActiveWeb3React()
  const {isLoading, isFetching, positions} = useQuerySubgraphAccountPositions(account)

  const feedAddresses = useMemo(
    () => (!positions ? [] : positions.map(position => position.market.feedAddress)),
    [positions],
  )
  const {baseTokens, quoteTokens} = useMarketNames(feedAddresses)
  const baseAmounts = useMarketBaseAmounts(feedAddresses)
  const quoteAmounts = useMarketQuoteAmounts(feedAddresses)

  const tokenPairDecimals = useMemo(
    () => ({
      baseTokens:
        baseAmounts.length === 0 ? null : baseAmounts.map((tokenDecimals: any) => tokenDecimals),
      quoteTokens:
        quoteAmounts.length === 0 ? null : quoteAmounts.map((tokenDecimals: any) => tokenDecimals),
    }),
    [baseAmounts, quoteAmounts],
  )

  const calldata = useMemo(() => {
    if (!positions || !account || !blockNumber) return []
    return positions.map(position => [position.market.id, account, position.positionId])
  }, [positions, account, blockNumber])

  const ois = usePositionOis(calldata, tokenPairDecimals.baseTokens, tokenPairDecimals.quoteTokens)
  const costs = usePositionCosts(calldata)
  const values = usePositionValues(calldata)
  const liquidationPrices = useLiquidationPrices(calldata)

  // initial load where we cannot distinguish if no account
  // connected since web3status is still updating
  if (isLoading && isFetching) {
    return (
      <LoadingStatusView>
        <Loader type="TailSpin" color="#f2f2f2" height={33} width={33} />
      </LoadingStatusView>
    )
  }
  // web3status has loaded and no account connected
  // prompt user to connect to a wallet
  else if (active && !account) {
    return (
      <LoadingStatusView>
        <ConnectWalletButton onClick={toggleWalletModal}>Connect to a wallet</ConnectWalletButton>
      </LoadingStatusView>
    )
  }
  // web3status loaded and account connected
  // notify user when no positions tied to account
  else if (active && account && !positions) {
    return (
      <LoadingStatusView>
        <TEXT.BoldStandardBody>Connected account has no positions.</TEXT.BoldStandardBody>
      </LoadingStatusView>
    )
  }
  // web3status loaded and account connected
  // render positions on page
  else if (active && account && positions) {
    return (
      <>
        {positions?.map((position, key) => (
          <PositionCard
            key={key.toString()}
            id={position.id}
            positionId={position.positionId}
            marketId={position.market.id}
            baseToken={`${baseTokens[key]}`}
            quoteToken={`${quoteTokens[key]}`}
            quoteTokenDecimals={quoteAmounts[key]}
            isLong={position.isLong}
            leverage={position.leverage}
            value={values[key]}
            cost={costs[key]}
            oi={ois[key]}
            collateralToken={'OVL'}
            estLiquidationPrice={liquidationPrices[key]}
            isLiquidated={position.isLiquidated}
            navigate={true}
          />
        ))}
      </>
    )
  }
  // error occuring when else statement is reached
  // user to refresh page to reload web3status
  else {
    return (
      <LoadingStatusView>
        <TEXT.BoldStandardBody>Error - please refresh page.</TEXT.BoldStandardBody>
      </LoadingStatusView>
    )
  }
}

export default Positions
