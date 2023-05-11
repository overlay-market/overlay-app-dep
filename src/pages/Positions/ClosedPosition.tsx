import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumber} from 'ethers'
import {RouteComponentProps} from 'react-router'
import {TEXT} from '../../theme/theme'
import {InterfaceWrapper} from '../../components/Container/Container'
import {Back} from '../../components/Back/Back'
import {useActiveWeb3React} from '../../hooks/web3'
import {usePositionInfo} from '../../hooks/usePositionInfo'
import {PositionDataV2, Unwind, useCurrentWalletPositionsV2} from '../../state/build/hooks'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useToken} from '../../hooks/useToken'
import {useMarketName} from '../../hooks/useMarketName'
import {MARKET_NAME_FROM_DESCRIPTION} from '../../constants/markets'
import Loader from '../../components/Loaders/Loaders'

const ControlInterfaceContainer = styled(FlexColumn)`
  padding: 16px;
`

const ControlInterfaceHeadContainer = styled(FlexColumn)`
  padding: 16px 0 24px;
`

export const AdditionalDetailRow = ({
  detail,
  value,
  detailColor,
  valueColor,
}: {
  detail: string
  value?: string | number
  detailColor?: string
  valueColor?: string | number
}) => {
  return (
    <FlexRow m={'2px 0'}>
      <TEXT.StandardBody mr={'auto'} color={detailColor}>
        {detail}
      </TEXT.StandardBody>

      <TEXT.StandardBody fontWeight={700} color={valueColor}>
        {value === 'loading' ? <Loader stroke="white" size="12px" /> : value}
      </TEXT.StandardBody>
    </FlexRow>
  )
}

export function ClosedPosition({
  match: {
    params: {unwindId, positionId},
  },
}: RouteComponentProps<{unwindId: string; positionId: string}>) {
  const {account} = useActiveWeb3React()
  const {isLoading, positions, refetch} = useCurrentWalletPositionsV2(account)

  useEffect(() => {
    refetch()
  }, [account, refetch, isLoading])

  const {onSelectPositionId, onResetUnwindState} = useUnwindActionHandlers()

  let filteredUnwind: Unwind | undefined = undefined
  let filteredPosition: PositionDataV2 | undefined = undefined
  if (positions) {
    for (let position of positions) {
      let selectedUnwind = position.unwinds.filter((transaction) => transaction.id === unwindId)
      if (selectedUnwind.length > 0) {
        filteredUnwind = selectedUnwind[0]
        filteredPosition = position
      }
    }
  }

  const position = filteredPosition

  const {baseToken, quoteToken, quoteTokenAddress, decimals, description} = useMarketName(position?.market.feedAddress)

  const marketName = useMemo(() => {
    if (description) return MARKET_NAME_FROM_DESCRIPTION[description]
    if (baseToken === 'loading' && quoteToken === 'loading') return <Loader stroke="white" size="12px" />
    return `${baseToken}/${quoteToken}`
  }, [description, baseToken, quoteToken])

  const quoteTokenInfo = useToken(quoteTokenAddress)

  const quoteTokenDecimals = useMemo(() => {
    if (!quoteTokenInfo) return undefined
    return quoteTokenInfo.decimals
  }, [quoteTokenInfo])

  const positionIdConverted = BigNumber.from(positionId).toString() + '  -  UNWIND: #' + unwindId.split('-')[2]

  const positionInfo = usePositionInfo(position?.market.id, positionId)
  const isLong = positionInfo ? positionInfo.isLong : undefined

  const parsedPnL = filteredUnwind ? (+filteredUnwind.pnl / 10**18) : 0
  const entryPrice: number | string | null | undefined =
    position && formatBigNumberUsingDecimalsToString(position.entryPrice, decimals ? 18 : quoteTokenDecimals, 4)

  const exitPrice: number | string | null | undefined =
    filteredUnwind && formatBigNumberUsingDecimalsToString(filteredUnwind.price, decimals ? 18 : quoteTokenDecimals, 4)

  useEffect(() => {
    onResetUnwindState()
  }, [positionId, onResetUnwindState])

  const handleSelectPosition = useCallback(
    (positionId: number) => {
      onSelectPositionId(positionId)
    },
    [onSelectPositionId],
  )

  return (
    <InterfaceWrapper>
      {handleSelectPosition(Number(position?.positionId))}
      <Back arrowSize={16} textSize={16} margin="0 auto 64px 0" />
      <ControlInterfaceContainer onSubmit={(e: any) => e.preventDefault()} as={'form'}>
        <ControlInterfaceHeadContainer>
          <TEXT.StandardHeader1 fontWeight={700} m={'0 4px 4px 4px'}>
            ID: {positionIdConverted}
          </TEXT.StandardHeader1>
          <TEXT.StandardHeader1 fontWeight={500} m={'0 4px 4px 4px'}>
            {marketName}
          </TEXT.StandardHeader1>
        </ControlInterfaceHeadContainer>
      </ControlInterfaceContainer>
      <FlexColumn mt="48px">
        <AdditionalDetailRow
          detail={'Profit/Loss'}
          valueColor={parsedPnL !== undefined && parsedPnL !== 0 ? (parsedPnL < 0 ? '#FF648A' : '#10DCB1') : '#F2F2F2'}
          value={parsedPnL ? `${Math.abs(parsedPnL) < 1 ? parsedPnL.toFixed(6) : parsedPnL.toFixed(2) } OVL` : 'loading'}
        />
        <AdditionalDetailRow detail={'Side'} valueColor={'#F2F2F2'} value={isLong !== undefined ? (isLong ? 'Long' : 'Short') : 'loading'} />
      </FlexColumn>

      <FlexColumn mt="48px">
        <AdditionalDetailRow detail={'Entry Price'} value={entryPrice ? `${entryPrice}` : 'loading'} />
        <AdditionalDetailRow detail={'Exit Price'} value={exitPrice ? `${exitPrice}` : 'loading'} />
      </FlexColumn>
    </InterfaceWrapper>
  )
}
