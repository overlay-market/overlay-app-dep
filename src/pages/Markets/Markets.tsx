import { useMemo } from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";
import { TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
import { Interface } from "@ethersproject/abi";
import { Trans } from "@lingui/macro";
import { TEXT } from "../../theme/theme";
import { shortenAddress } from "../../utils/web3";
import { useAllMarkets } from "../../state/markets/hooks";
import { formatWeiToParsedNumber, formatWeiToParsedString, formatFundingRateToDaily, formatFundingRateToAnnual } from "../../utils/formatWei";
import { PageContainer } from "../../components/Container/Container";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumn, FlexRow } from "../../components/Container/Container";
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from "../../components/Table/Table";
import { useMultipleContractSingleData, useSingleContractMultipleData } from "../../state/multicall/hooks";
import { useUniswapV3Feed, useV1PeripheryContract } from "../../hooks/useContract";
import { useBlockNumber } from "../../state/application/hooks";
import UNISWAP_V3_FEED_ABI from '../../constants/abis/OverlayV1UniswapV3Feed.json';
import Loader from "../../components/Loaders/Loaders";
import { useMarketNames } from "../../hooks/useMarketName";
import { useMarketPrices } from "../../hooks/useMarketPrices";
import { useFundingRates } from "../../hooks/useFundingRates";

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

const UNI_V3_FEED_INTERFACE = new Interface(UNISWAP_V3_FEED_ABI);

const Markets = () => {
  const history = useHistory();
  const blockNumber = useBlockNumber();
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

  const peripheryContract = useV1PeripheryContract();
  const ois = useSingleContractMultipleData(peripheryContract, 'ois', marketAddresses);
  const capOis = useSingleContractMultipleData(peripheryContract, 'capOi', marketAddresses);

  const { baseTokens, quoteTokens } = useMarketNames(feedAddresses);
  const marketPrices = useMarketPrices(marketAddresses);
  const marketFundingRates = useFundingRates(marketAddresses);

  const marketOis = useMemo(() => {
    return ois.map((market, index) => {
      if (market.loading === true || market === undefined || blockNumber === undefined) return undefined;

      return market?.result;
    })
  }, [ois, blockNumber])

  const marketCapOis = useMemo(() => {
    return capOis.map((market, index) => {
      if (market.loading === true || market === undefined || blockNumber === undefined) return undefined;

      return market?.result?.capOi_;
    })
  }, [capOis, blockNumber])

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
                  {
                    marketPrices[index] ? (
                      formatWeiToParsedNumber(marketPrices[index], 18, 2)
                    ):(
                      <Loader stroke="white" size="12px" />
                    )
                  }
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={"left"}>
                    <TEXT.SmallBody>
                      {
                        marketOis[index] ? (
                          formatWeiToParsedNumber(marketOis[index]?.oiLong_, 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                      /
                      {
                        marketCapOis[index] ? (
                          formatWeiToParsedNumber(marketCapOis[index], 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={formatWeiToParsedNumber(marketOis[index]?.oiLong_, 18, 5)}
                      max={formatWeiToParsedNumber(marketCapOis[index], 18, 5)}
                      color={"#10DCB1"}
                      width={"88px"}
                      margin={"0"}
                    />
                  </FlexColumn>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumn align={"left"}>
                    <TEXT.SmallBody>
                      {
                        marketOis[index] ? (
                          formatWeiToParsedNumber(marketOis[index]?.oiShort_, 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                      /
                      {
                        marketCapOis[index] ? (
                          formatWeiToParsedNumber(marketCapOis[index], 18, 5)
                        ) : <Loader stroke="white" size="12px" />
                      }
                    </TEXT.SmallBody>
                    <ProgressBar
                      value={formatWeiToParsedNumber(marketOis[index]?.oiShort_, 18, 5)}
                      max={formatWeiToParsedNumber(marketCapOis[index], 18, 5)}
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
                        marketFundingRates[index] ? (
                          `${formatFundingRateToDaily(marketFundingRates[index], 18, 2)}% (${formatFundingRateToAnnual(marketFundingRates[index], 18, 2)}%)`
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
