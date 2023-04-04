import React from 'react'
import styled from 'styled-components'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Trans} from '@lingui/macro'

interface PositionsTableProps {
  title: string
  children?: React.ReactNode
}
const PositionsTable = ({title, children}: PositionsTableProps) => {
  return (
    <TableContainer>
      <TEXT.BoldStandardBody>{title}</TEXT.BoldStandardBody>
      <TableHead>
        <StyledTableHeaderRow>
          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>Market</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>

          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>Size</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>

          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>Position</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>

          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>Entry Price</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>

          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>Liq. Price</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>

          <StyledHeaderCell>
            <TEXT.Supplemental>
              <Trans>PnL</Trans>
            </TEXT.Supplemental>
          </StyledHeaderCell>
        </StyledTableHeaderRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableContainer>
  )
}
const Positions = () => {
  const {account, active} = useActiveWeb3React()

  return (
    <PageContainer>
      <PositionsTable title="Open Positions"></PositionsTable>
      <PositionsTable title="Closed Positions"></PositionsTable>
    </PageContainer>
  )
}

export default Positions
