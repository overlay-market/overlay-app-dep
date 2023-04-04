import React from 'react'
import styled from 'styled-components'
import {TableBody, TableContainer, TableHead, Paper} from '@material-ui/core'
import {StyledTable, StyledHeaderCell, StyledTableHeaderRow} from '../../components/Table/Table'
import {useActiveWeb3React} from '../../hooks/web3'
import {PageContainer} from '../../components/Container/Container'

const Positions = () => {
  const {account, active} = useActiveWeb3React()

  return <PageContainer>lorem ipsum</PageContainer>
}

export default Positions
