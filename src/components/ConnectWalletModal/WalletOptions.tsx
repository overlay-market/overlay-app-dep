import React from 'react'
import styled from 'styled-components/macro'
import { TEXT } from '../../theme/theme';
import { ExternalLink } from '../ExternalLink/ExternalLink';

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: transparent;
  padding: 1rem;
  outline: none;
  border-radius: 12px;
  width: 100% !important;
`

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px !important;
  padding: 1rem;
  background: #1f222d;
  border: none;
`

const CardHeader = styled.div`
  justify-content: center;
  text-align: left;
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean}>`
  margin-top: 0;
  border: ${({active}) => (active ? '1px solid green !important' : '')};
  background: ${({active}) => (active ? '#154015 !important' : '')};

  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
    background: #2e3348;
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`

const CardText = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubHeader = styled.div`
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`

const Connected = styled.div`
  font-size: 10px;
  border: 1px solid green;
  color: green;
  border-radius: 15px;
  margin: auto 4px;
  padding: 2px 4px;
`

const IconWrapper = styled.div<{ size?: number | null }>`
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
`

export default function WalletOption({
  link = null,
  clickable = true,
  size,
  onClick = null,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}) {

  const content = (
    <OptionCardClickable id={id} onClick={onClick} clickable={clickable && !active} active={active}>
      <CardHeader>
        <CardText>
          <TEXT.StandardBody fontWeight={600} autoCapitalize={'true'}>
            {header}
          </TEXT.StandardBody>

          {active ? (
            <Connected>
              Connected
            </Connected>
          ):(null)}
          
        </CardText>
        
        {subheader && (
          <SubHeader>
            {subheader}
          </SubHeader>
        )}
      </CardHeader>
      <IconWrapper size={size}>
        <img src={icon} alt={'Icon'} />
      </IconWrapper>
    </OptionCardClickable>
  )
  if (link) {
    return <ExternalLink href={link}>{content}</ExternalLink>
  }

  return content;
};
