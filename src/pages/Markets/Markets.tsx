import { useMemo } from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";
import { TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
import { Trans } from "@lingui/macro";
import { TEXT } from "../../theme/theme";
import { shortenAddress } from "../../utils/web3";
import { useAllMarkets } from "../../state/markets/hooks";
import { formatWeiToParsedNumber, formatWeiToParsedString, formatFundingRateToDaily, formatFundingRateToAnnual } from "../../utils/formatWei";
import { PageContainer } from "../../components/Container/Container";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from "../../components/Table/Table";
import Loader from "../../components/Loaders/Loaders";
import { useMarketNames } from "../../hooks/useMarketName";
import { useMarketMidPrices } from "../../hooks/useMarketPrices";
import { useFundingRates } from "../../hooks/useFundingRates";
import { useMarketOis } from "../../hooks/useMarketOis";
import { useMarketCapOis } from "../../hooks/useMarketCapOi";

const activeClassName = "INACTIVE";

export const StyledNavLink = styled(NavLink).attrs({activeClassName})`
  color: ${({ theme }) => theme.text1};
  font-weight: 500;
  text-decoration: none;
  
  :hover {
    font-weight: 700;
  }
  :focus {
    font-weight: 700;
  }
`;

const Markets = () => {
  const history = useHistory();
  const { markets } = useAllMarkets();

  function redirectToMarket(marketId: string) {
    history.push(`/markets/${marketId}`);
  }

  // @TO-DO: use marketAddresses to initiate multicall 
  // to fetch per market values from periphery
  const marketAddresses = useMemo(() => {
    if (markets === undefined) return [];
    return markets.markets.map((market) => [market.id])
  }, [markets])

  const feedAddresses = useMemo(() => {
    if (markets === undefined) return [];
    return markets.markets.map((market) => market.feedAddress)
  }, [markets]);

  const { baseTokens, quoteTokens } = useMarketNames(feedAddresses);
  const prices = useMarketMidPrices(marketAddresses);
  const fundingRates = useFundingRates(marketAddresses);
  const ois = useMarketOis(marketAddresses);
  const capOis = useMarketCapOis(marketAddresses);

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
            {markets?.markets.map((market, index) => (
              <StyledTableRow
                onClick={() => redirectToMarket(market.id)}
                hover={true}
                key={index.toString()}
              >
                <StyledTableCellThin component="th" scope="row">
                  {baseTokens[index] === 'loading' ? (
                    <Loader stroke="white" size="12px" />
                  ):(
                    baseTokens[index]
                  )}
                  /
                  {quoteTokens[index] === 'loading' ? (
                    <Loader stroke="white" size="12px" />
                  ):(
                    quoteTokens[index]
                  )}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  {prices[index] ? prices[index] : <Loader stroke="white" size="12px" />}
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={"left"}>
                    <TEXT.SmallBody>
                      {ois[index]?.oiLong ? ois[index]?.oiLong : <Loader stroke="white" size="12px" />}
                      /
                      {
                        capOis[index] ? (
                          formatWeiToParsedNumber(capOis[index], 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={ois[index]?.oiLong}
                      max={formatWeiToParsedNumber(capOis[index], 18, 5)}
                      color={"#10DCB1"}
                      width={"88px"}
                      margin={"0"}
                    />
                  </FlexColumn>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={"left"}>
                    <TEXT.SmallBody>
                      {ois[index]?.oiShort ? ois[index]?.oiShort : <Loader stroke="white" size="12px" />}
                      /
                      {
                        capOis[index] ? (
                          formatWeiToParsedNumber(capOis[index], 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={ois[index]?.oiShort}
                      max={formatWeiToParsedNumber(capOis[index], 18, 5)}
                      color={"#DC1F4E"}
                      width={"88px"}
                      margin={"0"}
                    />
                  </FlexColumn>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexRow>
                    <TEXT.AdjustableSize color={"#f2f2f2"} mr={"3px"}>
                      {
                        fundingRates[index] ? (
                          `${formatFundingRateToDaily(fundingRates[index], 18, 2)}% (${formatFundingRateToAnnual(fundingRates[index], 18, 2)}%)`
                        ):(
                          <Loader stroke="white" size="12px" />
                        )
                      }
                    </TEXT.AdjustableSize>
                  </FlexRow>
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
