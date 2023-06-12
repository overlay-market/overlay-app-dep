import React, {useMemo} from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import {formatBigNumberUsingDecimalsToString} from '../../utils/formatWei'
import Loader from '../../components/Loaders/Loaders'
import {BigNumber} from 'ethers'

const ContentContainer = styled(FlexColumn)`
  padding: 0 16px;
  margin-bottom: 20px;
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

export const PositionDetailTypeDashed = styled.div`
  color: #b9babd;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline dashed;
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

export const MainDetails = ({
  isLong,
  quoteTokenDecimals,
  decimals,
  typedValue,
  estimatedBid,
  estimatedAsk,
  bidPrice,
  askPrice,
  minPrice,
}: {
  isLong?: boolean
  quoteTokenDecimals?: number
  decimals?: number
  typedValue?: string
  estimatedBid?: any
  estimatedAsk?: any
  bidPrice?: string | number | any
  askPrice?: string | number | any
  minPrice?: BigNumber
}) => {
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
    if (!typedValue || isLong === undefined || bidPrice === undefined || askPrice === undefined) return null
    if (!(+typedValue > 0)) return null
    if (bidPrice === 'loading' || askPrice === 'loading') return <Loader stroke="white" size="12px" />

    const priceImpactValue = isLong ? estimatedReceivedPrice - askPrice : bidPrice - estimatedReceivedPrice
    const priceImpactPercentage = isLong ? (priceImpactValue / askPrice) * 100 : (priceImpactValue / bidPrice) * 100

    return priceImpactPercentage.toFixed(2)
  }, [estimatedReceivedPrice, typedValue, isLong, bidPrice, askPrice])
  return (
    <ContentContainer>
      <AdditionalDetailRow>
        <PositionDetailType>Est. Received Price</PositionDetailType>
        <DetailValue>{estimatedReceivedPrice && minPrice ? estimatedReceivedPrice : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Worst Received Price</PositionDetailType>
        <DetailValue>{minPrice ? formatBigNumberUsingDecimalsToString(minPrice, 18, 4) : '-'}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Price Impact</PositionDetailType>
        <DetailValue>{priceImpact ? `${priceImpact}%` : `-`}</DetailValue>
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
