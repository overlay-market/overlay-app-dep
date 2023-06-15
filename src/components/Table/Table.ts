import styled from 'styled-components/macro'
import {Table, TableCell, TableRow} from '@material-ui/core'

export const StyledTable = styled(Table)<{smWidth?: string}>`
  white-space: nowrap !important;
  table-layout: fixed !important;
  width: ${({smWidth}) => (smWidth ? `${smWidth}` : 'auto')} !important;

  ${({theme}) => theme.mediaWidth.minSmall`
    table-layout: fixed !important;
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    min-width: 1200px !important;
  `}
`

export const StyledTableCell = styled(TableCell)<{width?: number; smWidth?: number}>`
  font-size: 14px;
  color: ${({theme}) => theme.dark.white} !important;
  width: ${({smWidth}) => (smWidth ? `${smWidth}%` : 'auto')};

  ${({theme, width}) => theme.mediaWidth.minSmall`
    width: ${width ? `${width}%` : 'auto'};
  `}
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
  background: ${({theme}) => theme.dark.background};
  height: 69px;

  ${({theme}) => theme.mediaWidth.minMedium`
    height: auto;

    :hover { 
      background: #262626 !important;
    }
  `}
`

export const StyledTableRowNoPointer = styled(TableRow)`
  background: ${({theme}) => theme.dark.background};
  height: 69px;

  ${({theme}) => theme.mediaWidth.minMedium`
    height: auto;

    :hover { 
      background: #262626 !important;
    }
  `}
`

export const StyledTableHeaderRow = styled(TableRow)`
  background: ${({theme}) => theme.dark.background};
  cursor: default;

  th {
    padding: 8px;
  }
`
