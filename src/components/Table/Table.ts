import styled from 'styled-components/macro'
import {Table, TableCell, TableRow} from '@material-ui/core'

export const StyledTable = styled(Table)`
  white-space: nowrap !important;
  table-layout: fixed !important;
  width: 100%;

  ${({theme}) => theme.mediaWidth.minSmall`
    table-layout: fixed !important;
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    min-width: 1200px !important;
  `}
`

export const StyledTableCell = styled(TableCell)<{width?: number}>`
  font-size: 14px;
  color: ${({theme}) => theme.dark.white} !important;
  width: ${({width}) => (width ? `${width * 2}%` : 'auto')};

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

  #marketFundingRate,
  #marketOi,
  #marketFeedLogo,
  #market7dChart {
    display: none;
  }

  th {
    padding: 24px 8px;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    height: 69px;
    
    #marketFundingRate,
    #market7dChart {
      display: table-cell;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    #marketOi,
    #marketFeedLogo {
      display: table-cell;
    }
  `}

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

  #marketFundingRate,
  #marketOi,
  #marketFeedLogo,
  #market7dChart {
    display: none;
  }

  th {
    padding: 8px;
  }

  ${({theme}) => theme.mediaWidth.minSmall`
    #marketFundingRate,
    #market7dChart {
      display: table-cell;
    }
  `}

  ${({theme}) => theme.mediaWidth.minMedium`
    #marketOi,
    #marketFeedLogo {
      display: table-cell;
    }
  `}
`
