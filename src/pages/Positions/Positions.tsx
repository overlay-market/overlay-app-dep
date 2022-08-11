import {useMemo, useEffect} from 'react'
import styled from 'styled-components/macro'
import Loader from 'react-loader-spinner'
import {Button} from 'rebass'
import {useActiveWeb3React} from '../../hooks/web3'
import {MarketCard} from '../../components/Card/MarketCard'
import {useQuerySubgraphAccountPositions} from '../../state/build/hooks'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {PositionCard, PositionTableHeader} from './PositionCard'
import {FlexColumn} from '../../components/Container/Container'
import {useWalletModalToggle} from '../../state/application/hooks'
import {useBlockNumber} from '../../state/application/hooks'
import {useMarketNames} from '../../hooks/useMarketName'
import {usePositionValues} from '../../hooks/usePositionValue'
import {usePositionCosts} from '../../hooks/usePositionCost'
import {useLiquidationPrices} from '../../hooks/useLiquidationPrice'
import {usePositionOis} from '../../hooks/usePositionOi'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  margin: 0 auto 32px;
  position: static;
  z-index: 0;
`

const PageHeader = styled.div`
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

const PositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LoadingContainer = styled.div`
  display: flex;
  margin: 8px auto auto auto;

  ${({theme}) => theme.mediaWidth.minSmall`
    margin-top: 44px;
  `}
`

const ConnectWalletToggleText = styled(Button)`
  cursor: pointer;
  font-weight: 700;
  background: none;
  border: 1px solid #12b4ff !important;
  border-radius: 8px !important;
  padding: 16px 60px !important;
  color: white;
  margin-top: 16px !important;

  :hover {
    color: #12b4ff;
    box-shadow: 0 0px 5px #12b4ff;
  }
`

export const Positions = () => {
  const {onResetUnwindState} = useUnwindActionHandlers()
  return (
    <MarketCard>
      {onResetUnwindState()}
      <Container>
        <PageHeader>Positions</PageHeader>
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
  const {isLoading, positions, isFetching} = useQuerySubgraphAccountPositions(account)

  console.log('isLoading: ', isLoading)
  console.log('isFetching: ', isFetching)
  console.log('account: ', account)
  console.log('active: ', active)

  const feedAddresses = useMemo(() => {
    if (positions === undefined) return []
    return positions.map(position => position.market.feedAddress)
  }, [positions])

  const {baseTokens, quoteTokens} = useMarketNames(feedAddresses)

  const positionsCallData = useMemo(() => {
    if (!positions || positions === undefined || !account || !blockNumber) return []
    return positions.map(position => [position.market.id, account, position.positionId])
  }, [positions, account, blockNumber])

  const values = usePositionValues(positionsCallData)
  const costs = usePositionCosts(positionsCallData)
  const liquidationPrices = useLiquidationPrices(positionsCallData)
  const ois = usePositionOis(positionsCallData)

  if (isLoading && isFetching) {
    return <>Loading...</>
  }
  return (
    <>
      {account ? (
        <>
          {isLoading ? (
            <LoadingContainer>
              <Loader type="TailSpin" color="#f2f2f2" height={33} width={33} />
            </LoadingContainer>
          ) : (
            positions?.map((index, key) => {
              let position = index
              return (
                <PositionCard
                  key={key.toString()}
                  id={position.id}
                  positionId={position.positionId}
                  marketId={position.market.id}
                  baseToken={`${baseTokens[key]}`}
                  quoteToken={`${quoteTokens[key]}`}
                  isLong={position.isLong}
                  leverage={position.leverage}
                  positionValue={values[key] !== undefined ? values[key] : null}
                  positionCost={costs[key] !== undefined ? costs[key] : null}
                  positionOi={ois[key] !== undefined ? ois[key] : null}
                  collateralToken={'OVL'}
                  quotePrice={'-'}
                  quoteCurrency={'-'}
                  estLiquidationPrice={
                    liquidationPrices[key] !== undefined ? liquidationPrices[key] : 'loading...'
                  }
                  navigate={true}
                  hasBorder={true}
                />
              )
            })
          )}
        </>
      ) : (
        <LoadingContainer>
          <ConnectWalletToggleText onClick={toggleWalletModal}>
            Connect to a wallet
          </ConnectWalletToggleText>
        </LoadingContainer>
      )}
    </>
  )
}

export default Positions
