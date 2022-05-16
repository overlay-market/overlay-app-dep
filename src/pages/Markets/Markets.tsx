import { useMemo } from "react";
import styled from "styled-components/macro";
import { NavLink, useHistory } from "react-router-dom";
import { TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
import { utils, BigNumber } from "ethers";
import { Interface } from "@ethersproject/abi";
import { Trans } from "@lingui/macro";
import { TEXT } from "../../theme/theme";
import { shortenAddress } from "../../utils/web3";
import { useAllMarkets } from "../../state/markets/hooks";
import { formatWeiToParsedNumber, formatWeiToParsedString, formatFundingRateToDaily, formatFundingRateToAnnual } from "../../utils/formatWei";
import { PageContainer } from "../../components/Container/Container";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { FlexColumnContainer, FlexRowContainer } from "../../components/Container/Container";
import { StyledTable, StyledHeaderCell, StyledTableCellThin, StyledTableRow, StyledTableHeaderRow } from "../../components/Table/Table";
import { useMultipleContractSingleData, useSingleContractMultipleData } from "../../state/multicall/hooks";
import { useUniswapV3Feed, useV1PeripheryContract } from "../../hooks/useContract";
import { useBlockNumber } from "../../state/application/hooks";
import UNISWAP_V3_FEED_ABI from '../../constants/abis/OverlayV1UniswapV3Feed.json';
import ERC20_INTERFACE from "../../constants/abis/erc20";
import Loader from "../../components/Loaders/Loaders";

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
  
  console.log('markets: ', markets);
  
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

  const prices = useSingleContractMultipleData(peripheryContract, 'mid', marketAddresses);
  const fundingRates = useSingleContractMultipleData(peripheryContract, 'fundingRate', marketAddresses);
  const ois = useSingleContractMultipleData(peripheryContract, 'ois', marketAddresses);
  const capOis = useSingleContractMultipleData(peripheryContract, 'capOi', marketAddresses);

  const baseTokens = useMultipleContractSingleData(feedAddresses, UNI_V3_FEED_INTERFACE, 'marketBaseToken');
  const quoteTokens = useMultipleContractSingleData(feedAddresses, UNI_V3_FEED_INTERFACE, 'marketQuoteToken');

  const baseTokenAddresses = useMemo(() => {
    if (baseTokens === []) return [];

    return baseTokens.map((token) => {
      let address = token?.result && token.result[0]
      return address;
    });
  }, [baseTokens]);

  const quoteTokenAddresses = useMemo(() => {
    if (quoteTokens === []) return [];

    return quoteTokens.map((token) => {
      let address = token?.result && token.result[0]
      return address;
    });
  }, [quoteTokens]);

  const baseTokenSymbols = useMultipleContractSingleData(baseTokenAddresses, ERC20_INTERFACE, 'symbol');
  const quoteTokenSymbols = useMultipleContractSingleData(quoteTokenAddresses, ERC20_INTERFACE, 'symbol');
  
  const marketBaseTokenSymbols = useMemo(() => {
    return baseTokenSymbols.map((token, index) => {
      if (token.loading === true || token === undefined || blockNumber === undefined) return 'loading';
      if (token?.result === undefined) return 'loading';
      return token?.result;
    })
  }, [baseTokenSymbols, blockNumber]);
  
  const marketQuoteTokenSymbols = useMemo(() => {
    return quoteTokenSymbols.map((token, index) => {
      if (token.loading === true || token === undefined || blockNumber === undefined) return 'loading';
      if (token?.result === undefined) return 'loading';
      return token?.result;
    })
  }, [quoteTokenSymbols, blockNumber]);

  const marketPrices = useMemo(() => {
    return prices.map((market, index) => {
      if (market.loading === true || market === undefined || blockNumber === undefined) return undefined;

      return market?.result?.mid_;
    })
  }, [prices, blockNumber]);

  const marketFundingRates = useMemo(() => {
    return fundingRates.map((market, index) => {
      if (market.loading === true || market === undefined || blockNumber === undefined) return undefined;

      return market?.result?.fundingRate_;
    })
  }, [fundingRates, blockNumber]);

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

  // console.log('marketOis: ', marketOis);

  console.log('marketCapOis: ', marketCapOis);

  // console.log('marketPrices: ', marketPrices);

  // console.log('marketFundingRates: ', marketFundingRates);


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
                <Trans> Funding Rate [APR%] </Trans>
              </StyledHeaderCell>
            </StyledTableHeaderRow>
          </TableHead>

          <TableBody>

          {/* <StyledTableRow
            onClick={() => redirectToMarket('test-market')}
            hover={true}
            key={1}
          >
            <StyledTableCellThin component="th" scope="row">
              RETH / RUSDC
            </StyledTableCellThin>

            <StyledTableCellThin align="left">
              {(
                (Number(utils.formatUnits(BigNumber.from("42"), 18)) +
                  Number(utils.formatUnits(BigNumber.from("42"), 18))) /
                2
              ).toFixed(2)}
            </StyledTableCellThin>

            <StyledTableCellThin align="left">
              <FlexColumnContainer align={"left"}>
                <TEXT.SmallBody>
                  2500/5000
                </TEXT.SmallBody>
                <ProgressBar
                  value={5000}
                  max={10000}
                  color={"#10DCB1"}
                  width={"88px"}
                  margin={"0"}
                />
              </FlexColumnContainer>
            </StyledTableCellThin>

            <StyledTableCellThin align="left">
              <FlexColumnContainer align={"left"}>
                <TEXT.SmallBody>
                  3750/5000
                </TEXT.SmallBody>
                <ProgressBar
                  value={3750}
                  max={5000}
                  color={"#DC1F4E"}
                  width={"88px"}
                  margin={"0"}
                />
              </FlexColumnContainer>
            </StyledTableCellThin>

            <StyledTableCellThin align="left">
              <FlexRowContainer>
                <TEXT.AdjustableSize color={"#10DCB1"} mr={"3px"}>
                 4%
                </TEXT.AdjustableSize>
                /
                <TEXT.AdjustableSize color={"#FF648A"} ml={"3px"}>
                 2.3%
                </TEXT.AdjustableSize>
              </FlexRowContainer>
            </StyledTableCellThin>
          </StyledTableRow> */}

            
            {markets?.markets.map((market, index) => (
              <StyledTableRow
                onClick={() => redirectToMarket(market.id)}
                hover={true}
                key={index.toString()}
              >
                <StyledTableCellThin component="th" scope="row">
                  {/* {market.baseName} / {market.quoteName} */}
                  {marketBaseTokenSymbols && marketQuoteTokenSymbols ? 
                      (`${marketBaseTokenSymbols[index]}/${marketQuoteTokenSymbols[index]}`)
                      : 
                      <Loader stroke="white" size="12px" />}
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
                  <FlexColumnContainer align={"left"}>
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
                  </FlexColumnContainer>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexColumnContainer align={"left"}>
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
                  </FlexColumnContainer>
                </StyledTableCellThin>

                <StyledTableCellThin align="left">
                  <FlexRowContainer>
                    <TEXT.AdjustableSize color={"#f2f2f2"} mr={"3px"}>
                      {
                        marketFundingRates[index] ? (
                          `${formatFundingRateToDaily(marketFundingRates[index], 18, 2)}% [${formatFundingRateToAnnual(marketFundingRates[index], 18, 2)}%]`
                        ):(
                          <Loader stroke="white" size="12px" />
                        )
                      }
                    </TEXT.AdjustableSize>
                  </FlexRowContainer>
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
