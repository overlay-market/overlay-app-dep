import React from 'react'
import styled from 'styled-components/macro'
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { TEXT } from '../../theme/theme';

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

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
  margin-top: 0;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    border: ${({ clickable, theme }) => (clickable ? `1px solid ${theme.primary1}` : ``)};
    background: #2e3348;
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`

const GreenCircle = styled.div`
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SubHeader = styled.div`
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
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
          {active ?? (
            <CircleWrapper>
              <GreenCircle>
                <div />
              </GreenCircle>
            </CircleWrapper>
          )}
          <TEXT.Body fontWeight={600} autoCapitalize={'true'}>
            {header}
          </TEXT.Body>
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
