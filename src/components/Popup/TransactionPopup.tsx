import {AlertTriangle, CheckCircle} from 'react-feather'
import styled from 'styled-components'
import {ExternalLink as ExternalLinkIcon} from 'react-feather'
import {Icon} from '../Icon/Icon'
import {TEXT} from '../../theme/theme'
import {useActiveWeb3React} from '../../hooks/web3'
import {getExplorerLink, ExplorerDataType} from '../../utils/getExplorerLink'
import {TransactionType} from '../../state/transactions/actions'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {FlexRow, FlexColumn} from '../Container/Container'

const PopupContentsContainer = styled(FlexRow)`
  z-index: 420;
`

const ExternalLinkContentsContainer = styled(FlexRow)`
  margin-top: 4px;
`

const PopupTextContainer = styled(FlexColumn)`
  align-items: start;
  margin: 0 16px 0 12px;
`

const IconContainer = styled(Icon)`
  margin: 1px 3px 0;
`

const ErrorMessage = styled(TEXT.Supplemental)`
  margin-top: 3px;
`

export default function TransactionPopup({
  hash,
  success,
  summary,
  info,
}: {
  hash: string
  success?: boolean
  summary?: string
  info?: any
}) {
  const {chainId} = useActiveWeb3React()

  console.log('info from TransactionPopup: ', info)

  return (
    <PopupContentsContainer>
      <Icon>
        {success ? (
          <CheckCircle width={22} height={22} color={'#10DCB1'} />
        ) : (
          <AlertTriangle width={22} height={22} color={'#FF648A'} />
        )}
      </Icon>
      <PopupTextContainer>
        <TEXT.BoldSmallBody>
          {info?.type === TransactionType.APPROVAL && 'Spending Limit Approved'}
          {info?.type === TransactionType.BUILD_OVL_POSITION && 'Position Successfully Built'}
          {info?.type === TransactionType.UNWIND_OVL_POSITION && 'Unwind Successful'}
          {info?.type === TransactionType.LIQUIDATE_OVL_POSITION && 'Liquidation Successful'}
          {/* {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)} */}
          {info?.code === 4001 && 'Transaction Rejected'}
          {info?.code === -32603 && 'Transaction Failed'}
        </TEXT.BoldSmallBody>

        {chainId && info?.message === 'execution reverted: OVLV1:shutdown' && (
          <ErrorMessage>Market has been shutdown.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:lev<min' && (
          <ErrorMessage>Leverage must be at least 1.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:lev>max' && (
          <ErrorMessage>Leverage is greater than max.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:fraction>max' && (
          <ErrorMessage>Fraction cannot equal greater than 1.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:fraction<min' && (
          <ErrorMessage>Fraction cannot equal less than 0.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:!position' && (
          <ErrorMessage>Position does not currently exist.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:collateral<min' && (
          <ErrorMessage>Input collateral is less than minimum required collateral.</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:oi>cap' && (
          <ErrorMessage>Attempting to build position that will exceed market oi cap!</ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:slippage>max' && (
          <ErrorMessage>
            User selected price limit is outside the range of the current market price.
          </ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:!data' && (
          <ErrorMessage>
            Market price volatility has exceeded risk tolerance in the last hour.
          </ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:oi==0' && (
          <ErrorMessage>
            Underlying price feed price points are too high. Unable to reliably estimate oi.
          </ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:liquidatable' && (
          <ErrorMessage>
            Cannot build/unwind due to being liquidatable at execution time.
          </ErrorMessage>
        )}

        {chainId && info?.message === 'execution reverted: OVLV1:!liquidatable' && (
          <ErrorMessage>Position is currently not liquidatable.</ErrorMessage>
        )}

        {/* {chainId && info?.message && (
          <ErrorMessage>
            { info?.message }
          </ErrorMessage>
        )} */}

        {chainId && hash && success && (
          <ExternalLink href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}>
            <ExternalLinkContentsContainer>
              <TEXT.SmallBody>View on explorer</TEXT.SmallBody>
              <IconContainer margin={'1px 3px 0'}>
                <ExternalLinkIcon width={13} height={13} />
              </IconContainer>
            </ExternalLinkContentsContainer>
          </ExternalLink>
        )}
      </PopupTextContainer>
    </PopupContentsContainer>
  )
}
