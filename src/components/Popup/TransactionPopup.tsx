import { AlertCircle, CheckCircle } from 'react-feather';
import { ExternalLink } from '../../components/ExternalLink/ExternalLink';
// import { getExplorerLink } from '../../functions/explorer'
import { useActiveWeb3React } from '../../hooks/web3';
import { ExternalLink as ExternalLinkIcon } from 'react-feather';
import { FlexRowContainer, FlexColumnContainer } from '../Container/Container';
import { TEXT } from '../../theme/theme';

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
    <FlexRowContainer style={{ zIndex: 1000 }}>
      <div>
        {success ? <CheckCircle /> : <AlertCircle />}
      </div>
      <FlexColumnContainer>
        <TEXT.BoldStandardBody>
          {summary ?? 'Hash: ' + hash.slice(0, 8) + '...' + hash.slice(58, 65)}
        </TEXT.BoldStandardBody>
        {chainId && hash && (
          <ExternalLink
            // href={getExplorerLink(chainId, hash, 'transaction')}
            href={"yes"}
          >
            <FlexRowContainer>
              View on explorer <ExternalLinkIcon width={20} height={20} />
            </FlexRowContainer>
          </ExternalLink>
        )}
      </FlexColumnContainer>
    </FlexRowContainer>
  )
}