import Markets from '../pages/Markets/Markets'
import Positions from '../pages/Positions/PositionsPage'
import Liquidate from '../pages/Liquidate/Liquidate'
import {Market} from '../pages/Markets/Market'
import {Unwind} from '../pages/Positions/Unwind'
import { ClosedPosition } from '../pages/Positions/ClosedPosition'

const routesConfig = [
  {
    path: '/',
    breadcrumb: null,
  },
  {
    path: '/markets',
    component: () => Markets,
    exact: true,
    breadcrumb: 'Markets',
  },
  {
    path: '/markets/:marketId',
    component: () => Market,
    exact: true,
  },
  {
    path: '/positions',
    component: () => Positions,
  },
  {
    path: '/positions/:marketPositionId/:positionId',
    component: () => Unwind,
  },
  {
    path: '/closed-positions/:marketPositionId/:positionId',
    component: () => ClosedPosition,
  },
  {
    path: '/liquidate',
    component: () => Liquidate,
  },
]

export default routesConfig
