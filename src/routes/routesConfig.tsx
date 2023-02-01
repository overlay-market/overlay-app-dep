import Markets from '../pages/Markets/Markets'
import Positions from '../pages/Positions/Positions'
import Liquidate from '../pages/Liquidate/Liquidate'
import {Market} from '../pages/Markets/Market'
import {Unwind} from '../pages/Positions/Unwind'

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
    path: '/liquidate',
    component: () => Liquidate,
  },
]

export default routesConfig
