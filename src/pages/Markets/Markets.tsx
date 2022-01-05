import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { InfoTip } from "../../components/InfoTip/InfoTip";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Column } from "../../components/Column/Column";
import { Row } from "../../components/Row/Row";
import { TEXT } from "../../theme/theme";
import { PageContainer } from "../../components/Container/Container";
import { TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
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
import {
  formatWeiToParsedString,
  formatWeiToParsedNumber,
} from "../../utils/formatWei";
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

const Markets = () => {
  let history = useHistory();

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`);
  }

  const { isLoading, markets } = useAllMarkets();

  return (
    <PageContainer>
      <TableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableHeaderRow>
              <StyledHeaderCell>
                <Trans> Market </Trans>
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
                  {(
                    (Number(utils.formatUnits(market.currentPrice.bid, 18)) +
                      Number(utils.formatUnits(market.currentPrice.ask, 18))) /
                    2
                  ).toFixed(2)}

                  {}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <Column align={"left"}>
                    <TEXT.SubHeader>
                      {Number(utils.formatUnits(market.oiLong, 18)).toFixed(0)}/
                      {Number(utils.formatUnits(market.oiCap, 18)).toFixed(0)}
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
                      {Number(utils.formatUnits(market.oiShort, 18)).toFixed(0)}
                      /{Number(utils.formatUnits(market.oiCap, 18)).toFixed(0)}
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
    </PageContainer>
  );
};

export default Markets;
