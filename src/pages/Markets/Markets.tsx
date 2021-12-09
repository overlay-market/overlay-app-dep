import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";
import { TEXT } from "../../theme/theme";
import { useBlockNumber } from "../../state/application/hooks";
import { StyledContainer } from "../../components/Container/Container";
import { TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
import {
  useTotalMarkets,
  useActiveMarkets,
  useMarketData,
} from "../../state/markets/hooks";
import {
  StyledTable,
  StyledTableCell,
  StyledHeaderCell,
  StyledTableCellThin,
  StyledTableRow,
  StyledTableHeaderRow,
} from "../../components/Table/Table";
import { useAllMarkets } from "../../state/markets/hooks";
import { utils } from "ethers";
import { formatWeiToParsedString, formatWeiToParsedNumber } from "../../utils/formatWei";
import { shortenAddress } from "../../utils/web3";

const activeClassName = "INACTIVE";

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
  font-weight: 500;

  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`;

function createData(
  market: string,
  price: string,
  oiLong: number,
  oiShort: number,
  oiTotal: number,
  longFundingRate: string,
  shortFundingRate: string,
  marketId: string
) {
  return {
    market,
    price,
    oiLong,
    oiShort,
    oiTotal,
    longFundingRate,
    shortFundingRate,
    marketId,
  };
}

// replace with fetched data
const mockData = [
  createData("ETH/DAI", "N/A", 500, 690, 1000, "-.00012", "+0.0001", "1"),
  createData("OVL/DAI", "N/A", 1000, 0, 1000, "-.00012", "+0.0001", "2"),
  createData("OVL/ETH", "N/A", 230, 420, 1000, "-.00012", "+0.0001", "3"),
];

const Markets = () => {
  let history = useHistory();

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`);
  }

  const { isLoading, markets } = useAllMarkets();

  console.log('isLoading: ', isLoading, ', markets: ', markets);

  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <StyledTable>

          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans> Market </Trans>
                <InfoTip tipFor={"Market"}>
                  <div> mega meow </div>
                </InfoTip>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> Price </Trans>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> OI Long </Trans>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> OI Short </Trans>
              </StyledHeaderCell>

              <StyledHeaderCell>
                <Trans> Funding Rate </Trans>
                <InfoTip tipFor={"Positions"}>
                  <div> meow meow </div>
                </InfoTip>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          <TableBody>
            {markets?.map((market, key) => (
              <StyledTableRow
                onClick={() => redirectToMarket(market.id)}
                hover={true}
                key={key.toString()}
              >
                <StyledTableCellThin component="th" scope="row">
                  {/* {market.baseName} / {market.quoteName} */}
                  {shortenAddress(market.id)}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  { 
                    (
                      (Number(utils.formatUnits(market.currentPrice.bid, 18)) +
                       Number(utils.formatUnits(market.currentPrice.ask, 18))) / 2
                    )
                    .toFixed(2)
                  }
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <Column align={"left"}>
                    <TEXT.SubHeader>
                      { Number(utils.formatUnits(market.oiLong, 18)).toFixed(0) }/
                      { Number(utils.formatUnits(market.oiCap, 18)).toFixed(0) }
                    </TEXT.SubHeader>
                    <ProgressBar
                      value={formatWeiToParsedNumber(market?.oiLong, 18, 0)}
                      max={formatWeiToParsedNumber(market?.oiCap, 18, 0)}
                      color={"#10DCB1"}
                      width={"88px"}
                      margin={"0"}
                    />
                  </Column>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <Column align={"left"}>
                    <TEXT.SubHeader>
                      {Number(utils.formatUnits(market.oiShort, 18)).toFixed(0)}/ 
                      {Number(utils.formatUnits(market.oiCap, 18)).toFixed(0)}
                    </TEXT.SubHeader>
                    <ProgressBar
                      value={formatWeiToParsedNumber(market.oiShort, 18, 0)}
                      max={formatWeiToParsedNumber(market.oiCap, 18, 0)}
                      color={"#DC1F4E"}
                      width={"88px"}
                      margin={"0"}
                    />
                  </Column>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <Row>
                    <TEXT.Main color={"#10DCB1"} mr={"3px"}>
                      n/a%
                    </TEXT.Main>
                    /
                    <TEXT.Main color={"#FF648A"} ml={"3px"}>
                      n/a%
                    </TEXT.Main>
                  </Row>
                </StyledTableCellThin>
              </StyledTableRow>
            ))}
          </TableBody>
          
        </StyledTable>
      </TableContainer>
    </StyledContainer>
  );
};

export default Markets;
