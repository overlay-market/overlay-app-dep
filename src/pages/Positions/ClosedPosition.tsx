import {useEffect, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {BigNumber} from 'ethers'
import {RouteComponentProps} from 'react-router'
import {TEXT} from '../../theme/theme'
import {InterfaceWrapper} from '../../components/Container/Container'
import {Back} from '../../components/Back/Back'
import {useActiveWeb3React} from '../../hooks/web3'
import {usePositionInfo} from '../../hooks/usePositionInfo'
import {useCurrentWalletPositions} from '../../state/build/hooks'
import {useUnwindActionHandlers} from '../../state/unwind/hooks'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToString, formatBigNumberUsingDecimalsToNumber} from '../../utils/formatWei'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {useToken} from '../../hooks/useToken'
import {usePositionValue} from '../../hooks/usePositionValue'
import {usePositionCost} from '../../hooks/usePositionCost'
import {useMarketPrice} from '../../hooks/useMarketPrices'
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
    params: {marketPositionId, positionId},
  },
}: RouteComponentProps<{marketPositionId: string; positionId: string}>) {
  const {account} = useActiveWeb3React()
  const {isLoading, positions, refetch} = useCurrentWalletPositions(account)

  useEffect(() => {
    refetch()
  }, [account, refetch, isLoading])

  const {onSelectPositionId, onResetUnwindState} = useUnwindActionHandlers()

  const filtered = positions?.filter((index, key) => index.id === marketPositionId)

  const position = filtered ? filtered[0] : null

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

  const positionIdConverted = BigNumber.from(positionId).toString()

  const positionInfo = usePositionInfo(position?.market.id, positionId)
  const isLong = positionInfo ? positionInfo.isLong : undefined
  const cost = usePositionCost(position?.market.id, positionId)
  const value = usePositionValue(position?.market.id, positionId)

  const fetchPrices = useMarketPrice(position?.market.id)

  const bidPrice = fetchPrices ? formatBigNumberUsingDecimalsToNumber(fetchPrices.bid_, decimals ? 18 : quoteTokenDecimals, 2) : null
  const askPrice = fetchPrices ? formatBigNumberUsingDecimalsToNumber(fetchPrices.ask_, decimals ? 18 : quoteTokenDecimals, 2) : null

  const PnL = cost && value ? value.sub(cost) : null
  const parsedPnL = PnL ? formatWeiToParsedNumber(PnL, 18, 2) : 0
  const entryPrice: number | string | null | undefined =
    position && formatBigNumberUsingDecimalsToString(position.entryPrice, decimals ? 18 : quoteTokenDecimals, 2)

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
          <TEXT.StandardHeader1 minHeight={'30px'}>
            {isLong !== undefined ? isLong ? bidPrice : askPrice : <Loader stroke="white" size="12px" />}
          </TEXT.StandardHeader1>
        </ControlInterfaceHeadContainer>
      </ControlInterfaceContainer>
      <FlexColumn mt="48px">
        <AdditionalDetailRow
          detail={'Profit/Loss'}
          valueColor={parsedPnL !== undefined && parsedPnL !== 0 ? (parsedPnL < 0 ? '#FF648A' : '#10DCB1') : '#F2F2F2'}
          value={PnL ? `${formatWeiToParsedNumber(PnL, 18, 2)} OVL` : 'loading'}
        />
        <AdditionalDetailRow detail={'Side'} valueColor={'#F2F2F2'} value={isLong !== undefined ? (isLong ? 'Long' : 'Short') : 'loading'} />
      </FlexColumn>

      <FlexColumn mt="48px">
        <AdditionalDetailRow detail={'Entry Price'} value={entryPrice ? `${entryPrice}` : 'loading'} />
        <AdditionalDetailRow detail={'Exit Price'} value={bidPrice && askPrice ? (isLong ? bidPrice : askPrice) : 'loading'} />
      </FlexColumn>
    </InterfaceWrapper>
  )
}
