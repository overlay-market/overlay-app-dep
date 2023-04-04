import React from 'react'
import styled from 'styled-components'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow, StyledTableRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'
import {TEXT} from '../../theme/theme'
import {Trans} from '@lingui/macro'
import {FlexRow} from '../../components/Container/Container'
import Loader from '../../components/Loaders/Loaders'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
interface PositionsTableProps {
  title: string
  children?: React.ReactNode
  marginTop?: string
}

const PositionsTable = ({title, children, marginTop}: PositionsTableProps) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <TEXT.BoldStandardBody mt={marginTop} mb="16px">
          {title}
        </TEXT.BoldStandardBody>
        <StyledTable>
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
        </StyledTable>
      </TableContainer>
      {!children && (
        <FlexRow marginTop="32px" justifyContent="center !important" width="100%">
          <Loader stroke="white" size="21px" />
        </FlexRow>
      )}
    </Container>
  )
}
const Positions = () => {
  const {account, active} = useActiveWeb3React()

  return (
    <PageContainer>
      <PositionsTable title="Open Positions" marginTop="50px"></PositionsTable>
      <PositionsTable title="Closed Positions" marginTop="200px"></PositionsTable>
    </PageContainer>
  )
}

export default Positions
