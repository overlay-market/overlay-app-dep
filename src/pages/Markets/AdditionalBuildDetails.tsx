import {useMemo} from 'react'
import styled from 'styled-components'
import {ProgressBar} from '../../components/ProgressBar/ProgressBar'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {formatWeiToParsedNumber, formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import Loader from '../../components/Loaders/Loaders'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {TEXT} from '../../theme/theme'
import {getExplorerLink, ExplorerDataType} from '../../utils/getExplorerLink'
import {shortenAddress} from '../../utils/web3'
import {ExternalLinkIcon} from '../../components/ExternalLink/ExternalLink'
import {Icon} from '../../components/Icon/Icon'
import {ExternalLink as LinkIconFeather} from 'react-feather'
import {useActiveWeb3React} from '../../hooks/web3'

const ContentContainer = styled(FlexColumn)`
  padding: 0 16px;
  margin-top: 64px;
`

const AdditionalDetailRow = styled(FlexRow)`
  width: 100%;
  display: flex;
  margin: 12px 0;
`

export const PositionDetailType = styled.div`
  color: #b9babd;
  font-size: 14px;
  font-weight: 700;
`

export const DetailValue = styled.div<{color?: string}>`
  color: ${({color}) => (color ? color : '#B9BABD')};
  display: flex;
  font-size: 14px;
  margin-left: auto;
  flex-direction: row;
`

export const HoverableDetailValue = styled(DetailValue)`
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
export const OpenInterestValue = styled.div`
  color: #b9babd;
  font-size: 14px;
  min-width: 130px;
  text-align: right;
  margin-bottom: 3px;
`

const StyledLinkIcon = styled(LinkIconFeather)`
  margin: auto;
  height: 16px;
  width: 16px;
  margin-left: 4px;
`
export const AdditionalDetails = ({
  isInverseMarket,
  isLong,
  baseToken,
  quoteToken,
  quoteTokenDecimals,
  decimals,
  typedValue,
  estimatedBid,
  estimatedAsk,
  bidPrice,
  askPrice,
  midPrice,
  fee,
  oiCap,
  capPayoff,
  oiLong,
  oiShort,
  slippageTolerance,
  expectedOi,
  fundingRate,
  estLiquidationPrice,
  marketAddress,
  feedAddress,
}: {
  isInverseMarket?: boolean | null
  isLong?: boolean
  baseToken?: string
  quoteToken?: string
  quoteTokenDecimals?: number
  decimals?: number
  typedValue?: string
  estimatedBid?: any
  estimatedAsk?: any
  bidPrice?: string | number | any
  askPrice?: string | number | any
  midPrice?: string | number
  fee?: string | number
  oiCap?: number | null
  capPayoff?: number
  oiLong?: number
  oiShort?: number
  priceImpact?: string
  slippageTolerance?: string | number
  expectedOi?: string | number | null
  fundingRate?: string | number
  estLiquidationPrice?: string | number
  marketAddress?: string
  feedAddress?: string
}) => {
  const {chainId} = useActiveWeb3React()

  const estimatedReceivedPrice: any = useMemo(() => {
    if (isLong === undefined || estimatedBid === undefined || estimatedAsk === undefined) {
      return null
    }
    // if (estimatedBid === undefined || estimatedAsk === undefined) return prices.mid;
    if (decimals) {
      return isLong
        ? formatBigNumberUsingDecimalsToString(estimatedAsk, decimals, 4)
        : formatBigNumberUsingDecimalsToString(estimatedBid, decimals, 4)
    }
    return isLong
      ? formatBigNumberUsingDecimalsToString(estimatedAsk, quoteTokenDecimals, 4)
      : formatBigNumberUsingDecimalsToString(estimatedBid, quoteTokenDecimals, 4)
  }, [isLong, estimatedBid, estimatedAsk, quoteTokenDecimals, decimals])

  const priceImpact = useMemo(() => {
    if (!estimatedReceivedPrice) return null
    if (!typedValue || isLong === undefined || bidPrice === undefined || askPrice === undefined)
      return null
    if (bidPrice === 'loading' || askPrice === 'loading')
      return <Loader stroke="white" size="12px" />

    const priceImpactValue = isLong
      ? estimatedReceivedPrice - askPrice
      : bidPrice - estimatedReceivedPrice
    const priceImpactPercentage = isLong
      ? (priceImpactValue / askPrice) * 100
      : (priceImpactValue / bidPrice) * 100

    return priceImpactPercentage.toFixed(2)
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice])

  const ShortenedAddresses = useMemo(() => {
    if (!marketAddress || !feedAddress)
      return {
        marketContract: '',
        feedContract: '',
      }
    return {
      marketContract: shortenAddress(marketAddress),
      feedContract: shortenAddress(feedAddress),
    }
  }, [marketAddress, feedAddress])

  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <PositionDetailType>Fee</PositionDetailType>
        <DetailValue>
          {fee === 'loading' ? <Loader stroke="white" size="12px" /> : `${fee}%`}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Bid</PositionDetailType>
        <DetailValue>
          {bidPrice === 'loading' ? <Loader stroke="white" size="12px" /> : bidPrice}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Ask</PositionDetailType>
        <DetailValue>
          {askPrice === 'loading' ? <Loader stroke="white" size="12px" /> : askPrice}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Est. Received Price</PositionDetailType>
        <DetailValue>{estimatedReceivedPrice ? estimatedReceivedPrice : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Price Impact</PositionDetailType>
        <DetailValue>{priceImpact ? `${priceImpact}%` : `-`}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Slippage Tolerance</PositionDetailType>
        <DetailValue>{slippageTolerance}%</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Est. Liquidation Price</PositionDetailType>
        <DetailValue>{estLiquidationPrice}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Expected OI</PositionDetailType>
        <DetailValue>{expectedOi ? expectedOi : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>OI Long</PositionDetailType>
        <FlexColumn width={'auto'} ml={'auto'} alignContent={'end'}>
          <OpenInterestValue>
            {oiLong || oiLong === 0 ? oiLong + ' ' : <Loader stroke="white" size="12px" />}/
            {oiCap || oiCap === 0 ? ' ' + oiCap : <Loader stroke="white" size="12px" />}
          </OpenInterestValue>
          <ProgressBar
            value={oiLong}
            max={oiCap}
            width={'130px'}
            color={'#10DCB1'}
            margin={'0 0 0 auto'}
          />
        </FlexColumn>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>OI Short</PositionDetailType>
        <FlexColumn width={'auto'} ml={'auto'} alignContent={'end'}>
          <OpenInterestValue>
            {oiShort || oiShort === 0 ? oiShort + ' ' : <Loader stroke="white" size="12px" />}/
            {oiCap || oiCap === 0 ? ' ' + oiCap : <Loader stroke="white" size="12px" />}
          </OpenInterestValue>
          <ProgressBar
            value={oiShort}
            max={oiCap}
            width={'130px'}
            color={'#DC1F4E'}
            margin={'0 0 0 auto'}
          />
        </FlexColumn>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Funding Rate</PositionDetailType>
        <DetailValue color={'#10DCB1'}>
          {fundingRate === 'loading' ? <Loader stroke="white" size="12px" /> : fundingRate}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Market Contract</PositionDetailType>
        {chainId && marketAddress && (
          <HoverableDetailValue>
            <ExternalLink href={getExplorerLink(chainId, marketAddress, ExplorerDataType.ADDRESS)}>
              {ShortenedAddresses.marketContract}
            </ExternalLink>
            <Icon size={16} margin={'auto'}>
              <StyledLinkIcon href={''} />
            </Icon>
          </HoverableDetailValue>
        )}
      </AdditionalDetailRow>
      <AdditionalDetailRow>
        <PositionDetailType>Feed Contract</PositionDetailType>
        {chainId && feedAddress && (
          <HoverableDetailValue>
            <ExternalLink href={getExplorerLink(chainId, feedAddress, ExplorerDataType.ADDRESS)}>
              {ShortenedAddresses.feedContract}
            </ExternalLink>
            <Icon size={16} margin={'auto'}>
              <StyledLinkIcon href={''} />
            </Icon>
          </HoverableDetailValue>
        )}
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
