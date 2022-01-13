import { AlertCircle, CheckCircle } from 'react-feather';
import styled from 'styled-components';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink';
// import { getExplorerLink } from '../../functions/explorer'
import { useActiveWeb3React } from '../../hooks/web3';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FlexRowContainer, FlexColumnContainer } from '../Container/Container';
import { TEXT } from '../../theme/theme';
import { Icon } from '../Icon/Icon';

const PopupContentsContainer = styled(FlexRowContainer)`
  z-index: 420;
`;

const PopupTextContainer = styled(FlexColumnContainer)`
  align-items: start;
  margin: 0 16px 0 12px;
`;

export default function TransactionPopup({
  hash,
  success,
  summary,
}: {
  hash: string
  success?: boolean
  summary?: string
}) {
  const { chainId } = useActiveWeb3React()

  return (
    <PopupContentsContainer>
      <Icon>
        {success ? (
          <CheckCircle width={22} height={22} color={"#10DCB1"} />
        ):(
          <AlertCircle width={22} height={22} />
        )}
      </Icon>
      <PopupTextContainer>
        <TEXT.BoldSmallBody>
          {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
        </TEXT.BoldSmallBody>
        {chainId && hash && (
          <ExternalLink
            // href={getExplorerLink(chainId, hash, 'transaction')}
            href={"yes"}
           >
            <FlexRowContainer mt={'4px'}>
              <TEXT.SmallBody>
                View on explorer 
              </TEXT.SmallBody>
              <Icon margin={"1px 3px 0"}>
                <ExternalLinkIcon width={13} height={13} />
              </Icon>
            </FlexRowContainer>
          </ExternalLink>
        )}
      </PopupTextContainer>
    </PopupContentsContainer>
  )
}