import Markets from "../pages/Markets/Markets";
import Positions from "../pages/Positions/Positions";
import Magic from "../pages/Magic/Magic";
import { Market } from "../pages/Markets/Market/Market";
import { TOKEN_LABELS } from "../constants/tokens";

const DynamicMarketBreadcrumbs = ({ match }: any) => (
  <span>{TOKEN_LABELS[match.params.marketId]}</span>
);

const routesConfig = [
  {
    path: "/",
    breadcrumb: null
  },
  {
    path: "/markets",
    component: () => Markets,
    exact: true,
    breadcrumb: "Markets"
  },
  {
    path: "/markets/:marketId",
    component: () => Market,
    exact: true,
    breadcrumb: DynamicMarketBreadcrumbs
  },
  {
    path: "/positions",
    component: () => Positions
  },
  {
    path: "/magic",
    component: () => Magic
  }
];

export default routesConfig;
