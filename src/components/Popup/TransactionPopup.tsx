import { AlertTriangle, CheckCircle } from 'react-feather';
import styled from 'styled-components';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { Icon } from '../Icon/Icon';
import { TEXT } from '../../theme/theme';
import { useActiveWeb3React } from '../../hooks/web3';
// import { getExplorerLink } from '../../functions/explorer'
import { TransactionType } from '../../state/transactions/actions';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink';
import { FlexRowContainer, FlexColumnContainer } from '../Container/Container';

const PopupContentsContainer = styled(FlexRowContainer)`
  z-index: 420;
`;

const ExternalLinkContentsContainer = styled(FlexRowContainer)`
  margin-top: 4px;
`

const PopupTextContainer = styled(FlexColumnContainer)`
  align-items: start;
  margin: 0 16px 0 12px;
`;

const IconContainer = styled(Icon)`
  margin: 1px 3px 0;
`;

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
  const { chainId } = useActiveWeb3React()

  return (
    <PopupContentsContainer>
      <Icon>
        {success ? (
          <CheckCircle width={22} height={22} color={"#10DCB1"} />
        ):(
          <AlertTriangle width={22} height={22} color={"#FF648A"} />
        )}
      </Icon>
      <PopupTextContainer>
        <TEXT.BoldSmallBody>
          { info?.type === TransactionType.APPROVAL && 'Spending Limit Approved' }
          { info?.type === TransactionType.BUILD_OVL_POSITION && 'Position Successfully Built'}
          {/* {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)} */}

          { info?.code === 4001 && 'Transaction Rejected'}
        </TEXT.BoldSmallBody>
        {chainId && hash && success && (
          <ExternalLink
            // href={getExplorerLink(chainId, hash, 'transaction')}
            href={"yes"}
           >
            <ExternalLinkContentsContainer>
              <TEXT.SmallBody>
                View on explorer 
              </TEXT.SmallBody>
              <IconContainer margin={"1px 3px 0"}>
                <ExternalLinkIcon width={13} height={13} />
              </IconContainer>
            </ExternalLinkContentsContainer>
          </ExternalLink>
        )}
      </PopupTextContainer>
    </PopupContentsContainer>
  )
}