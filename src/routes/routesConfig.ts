import Markets from "../pages/Markets/Markets";
import Positions from "../pages/Positions/Positions";
import Magic from "../pages/Magic/Magic";
import { Market } from "../pages/Markets/Market/Market";

const routesConfig = [
  {
    path: "/markets",
    component: () => Markets,
    exact: true
  },
  {
    path: "/markets/market/:marketId",
    component: () => Market,
    exact: true
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
