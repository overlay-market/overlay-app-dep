import styled from 'styled-components/macro'
import {Table, TableCell, TableRow} from '@material-ui/core'

export const StyledTable = styled(Table)`
  white-space: nowrap !important;
  table-layout: fixed !important;
  min-width: 1200px !important;
  width: 100%;

  ${({theme}) => theme.mediaWidth.minSmall`
    table-layout: fixed !important;
  `}
`

export const StyledTableCell = styled(TableCell)<{width?: number}>`
  font-size: 14px;
  color: ${({theme}) => theme.text1} !important;
  width: ${({width}) => (width ? width : 'auto')};
`

export const StyledHeaderCell = styled(StyledTableCell)`
  padding-bottom: 8px !important;
  font-weight: 700 !important;
`

export const StyledTableCellThin = styled(StyledTableCell)`
  font-weight: 400;
  min-width: 250px;
`

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  background: ${({theme}) => theme.bg1};
  height: 69px;

  ${({theme}) => theme.mediaWidth.minMedium`
    height: auto;

    :hover { 
      background: #262626 !important;
    }
  `}
`

export const StyledTableHeaderRow = styled(TableRow)`
  background: ${({theme}) => theme.bg1};
  cursor: default;
`
