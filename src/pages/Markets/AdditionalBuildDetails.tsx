import React, {useMemo} from 'react'
import styled from 'styled-components'
import {FlexColumn, FlexRow} from '../../components/Container/Container'
import Loader from '../../components/Loaders/Loaders'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {getExplorerLink, ExplorerDataType} from '../../utils/getExplorerLink'
import {shortenAddress} from '../../utils/web3'
import {Icon} from '../../components/Icon/Icon'
import {ExternalLink as LinkIconFeather} from 'react-feather'
import {useActiveWeb3React} from '../../hooks/web3'
import ReactTooltip from 'react-tooltip'

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

const StyledLinkIcon = styled(LinkIconFeather)`
  margin: auto;
  height: 16px;
  width: 16px;
  margin-left: 4px;
`
export const AdditionalDetails = ({
  bidPrice,
  askPrice,
  fee,
  oiCap,
  oiLong,
  oiShort,
  slippageTolerance,
  expectedOi,
  fundingRate,
  estLiquidationPrice,
  marketAddress,
  feedAddress,
}: {
  bidPrice?: string | number | any
  askPrice?: string | number | any
  fee?: string | number
  oiCap?: number | null
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
        <DetailValue>{fee === 'loading' ? <Loader stroke="white" size="12px" /> : `${fee}%`}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Bid</PositionDetailType>
        <DetailValue>{bidPrice === 'loading' ? <Loader stroke="white" size="12px" /> : bidPrice}</DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Ask</PositionDetailType>
        <DetailValue>{askPrice === 'loading' ? <Loader stroke="white" size="12px" /> : askPrice}</DetailValue>
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

      <AdditionalDetailRow data-for={'long info'} data-tip={'long info'}>
        <PositionDetailTypeDashed>OI Long / OI Cap</PositionDetailTypeDashed>
        <FlexColumn width={'auto'} ml={'auto'} alignContent={'end'}>
          <OpenInterestValue>
            {oiLong || oiLong === 0 ? oiLong + ' ' : <Loader stroke="white" size="12px" />}/
            {oiCap || oiCap === 0 ? ' ' + oiCap : <Loader stroke="white" size="12px" />}
          </OpenInterestValue>
        </FlexColumn>
      </AdditionalDetailRow>

      <ReactTooltip place="top" type="info" effect="solid" textColor={'#FFFFFF'} backgroundColor="#000000" id={'long info'}>
        <React.Fragment>
          <div>The OI Cap is the maximum open interest</div>
          <div>that the protocol allows at a given time.</div>
        </React.Fragment>
      </ReactTooltip>

      <AdditionalDetailRow data-for={'long info'} data-tip={'long info'}>
        <PositionDetailTypeDashed>OI Short / OI Cap</PositionDetailTypeDashed>
        <FlexColumn width={'auto'} ml={'auto'} alignContent={'end'}>
          <OpenInterestValue>
            {oiShort || oiShort === 0 ? oiShort + ' ' : <Loader stroke="white" size="12px" />}/
            {oiCap || oiCap === 0 ? ' ' + oiCap : <Loader stroke="white" size="12px" />}
          </OpenInterestValue>
        </FlexColumn>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Funding Rate</PositionDetailType>
        <DetailValue color={!(fundingRate?.toString()[0] === '-') ? '#FF648A' : '#5FD0AB'}>
          {!fundingRate || fundingRate === 'loading' ? <Loader stroke="white" size="12px" /> : fundingRate}
        </DetailValue>
      </AdditionalDetailRow>

      <AdditionalDetailRow>
        <PositionDetailType>Market Contract</PositionDetailType>
        {chainId && marketAddress && (
          <HoverableDetailValue>
            <ExternalLink href={getExplorerLink(chainId, marketAddress, ExplorerDataType.ADDRESS)}>{ShortenedAddresses.marketContract}</ExternalLink>
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
            <ExternalLink href={getExplorerLink(chainId, feedAddress, ExplorerDataType.ADDRESS)}>{ShortenedAddresses.feedContract}</ExternalLink>
            <Icon size={16} margin={'auto'}>
              <StyledLinkIcon href={''} />
            </Icon>
          </HoverableDetailValue>
        )}
      </AdditionalDetailRow>
    </ContentContainer>
  )
}
