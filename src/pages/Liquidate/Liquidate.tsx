import {useMemo, useCallback} from 'react'
import {TableContainer, TableHead, Paper} from '@material-ui/core'
import {formatWeiToParsedNumber} from '../../utils/formatWei'
import {TransparentButton} from '../../components/Button/Button'
import {StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow} from '../../components/Table/Table'
import {useAllPositions} from '../../state/build/hooks'
import {useV1PeripheryContract} from '../../hooks/useContract'
import {useSingleContractMultipleData} from '../../state/multicall/hooks'
import {useBlockNumber} from '../../state/application/hooks'
import {useLiquidateCallback} from '../../hooks/useLiquidateCallback'
import {shortenAddress} from '../../utils/web3'
import {getExplorerLink, ExplorerDataType} from '../../utils/getExplorerLink'
import {useActiveWeb3React} from '../../hooks/web3'
import {ExternalLink} from '../../components/ExternalLink/ExternalLink'
import {MarketCard} from '../../components/Card/MarketCard'

const LiquidateButton = ({marketAddress, ownerAddress, positionId}: {marketAddress?: string; ownerAddress?: string; positionId?: string}) => {
  const {callback: liquidateCallback} = useLiquidateCallback(marketAddress, ownerAddress, positionId)

  const handleLiquidate = useCallback(() => {
    if (!marketAddress) throw new Error('missing market address')
    if (!ownerAddress) throw new Error('missing owner address')
    if (!positionId) throw new Error('missing position id')
    if (!liquidateCallback) return
    liquidateCallback()
      .then(hash => {
        console.log('liquidation txn hash: ', hash)
      })
      .catch(error => {
        console.log('liquidation txn error: ', error)
      })
  }, [liquidateCallback, marketAddress, ownerAddress, positionId])

  return (
    <TransparentButton color={'#12B4FF'} border={'none'} onClick={() => handleLiquidate()}>
      Liquidate
    </TransparentButton>
  )
}

const Liquidate = () => {
  const {positions} = useAllPositions()
  const {chainId} = useActiveWeb3React()
  const blockNumber = useBlockNumber()

  const positionsCallData = useMemo(() => {
    if (positions === undefined || !positions) return []
    return positions.map((position: any) => [position.market.id, position.owner.id, position.positionId])
  }, [positions])

  const isLiquidatedPositions = useMemo(() => {
    if (positions === undefined || !positions) return []
    return positions.map((position: any) => position.isLiquidated)
  }, [positions])

  const peripheryContract = useV1PeripheryContract()
  const fetchCheckLiquidatablePositions = useSingleContractMultipleData(peripheryContract, 'liquidatable', positionsCallData)
  const fetchPositionValues = useSingleContractMultipleData(peripheryContract, 'value', positionsCallData)
  const fetchLiquidationFees = useSingleContractMultipleData(peripheryContract, 'liquidationFee', positionsCallData)
  const fetchMaintenanceMargins = useSingleContractMultipleData(peripheryContract, 'maintenanceMargin', positionsCallData)

  const liquidatablePositions = useMemo(() => {
    return fetchCheckLiquidatablePositions.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined
      return position?.result?.liquidatable_
    })
  }, [fetchCheckLiquidatablePositions, blockNumber])

  const positionValues = useMemo(() => {
    return fetchPositionValues.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined
      return position?.result?.value_
    })
  }, [fetchPositionValues, blockNumber])

  const liquidationFees = useMemo(() => {
    return fetchLiquidationFees.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined
      return position?.result?.liquidationFee_
    })
  }, [fetchLiquidationFees, blockNumber])

  const maintenanceMargins = useMemo(() => {
    return fetchMaintenanceMargins.map((position, index) => {
      if (position.loading === true || position === undefined || !blockNumber) return undefined
      return position?.result?.maintenanceMargin_
    })
  }, [fetchMaintenanceMargins, blockNumber])

  return (
    <MarketCard>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell width={30}>Maintenance</StyledHeaderCell>

              <StyledHeaderCell width={30}>Value</StyledHeaderCell>

              <StyledHeaderCell width={30}>Reward (est.)</StyledHeaderCell>

              <StyledHeaderCell width={10}></StyledHeaderCell>
            </StyledTableHeaderRow>

            {liquidatablePositions?.map((position, key) => {
              const maintenanceMargin =
                maintenanceMargins !== undefined && maintenanceMargins ? formatWeiToParsedNumber(maintenanceMargins[key], 18, 2) : null
              const positionValue = positionValues !== undefined && positionValues ? formatWeiToParsedNumber(positionValues[key], 18, 2) : null
              const liquidationFee = liquidationFees !== undefined && liquidationFees ? formatWeiToParsedNumber(liquidationFees[key], 18, 2) : null
              const isLiquidated = isLiquidatedPositions[key]

              // if (key === 0 && liquidatablePositions && liquidatablePositions[0] === undefined) {
              //   return <LoadingStatusView>No liquidatable positions.</LoadingStatusView>
              // }
              if (position && maintenanceMargin && maintenanceMargin !== 0 && !isLiquidated) {
                return (
                  <StyledTableRow hover={false}>
                    <StyledTableCellThin component="th" scope="row">
                      {chainId && positionsCallData[key][0] && (
                        <ExternalLink href={getExplorerLink(chainId, positionsCallData[key][0], ExplorerDataType.ADDRESS)}>
                          {shortenAddress(positionsCallData[key][0])}
                        </ExternalLink>
                      )}
                    </StyledTableCellThin>

                    <StyledTableCellThin component="th" scope="row">
                      {positionsCallData[key][2]}
                    </StyledTableCellThin>

                    <StyledTableCellThin component="th" scope="row">
                      {maintenanceMargin} OVL
                    </StyledTableCellThin>

                    <StyledTableCellThin align="left">{positionValue} OVL</StyledTableCellThin>

                    <StyledTableCellThin align="left">{liquidationFee} OVL</StyledTableCellThin>

                    <StyledTableCellThin align="left">
                      <LiquidateButton
                        marketAddress={positionsCallData[key]?.[0]}
                        ownerAddress={positionsCallData[key]?.[1]}
                        positionId={positionsCallData[key]?.[2]}
                      />
                    </StyledTableCellThin>
                  </StyledTableRow>
                )
              } else return null
            })}
          </TableHead>
        </StyledTable>
      </TableContainer>
    </MarketCard>
  )
}

export default Liquidate
