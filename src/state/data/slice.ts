import {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {createApi} from '@reduxjs/toolkit/query/react'
import {ClientError, gql, GraphQLClient} from 'graphql-request'
import {AppState} from '../state'
import {DocumentNode} from 'graphql'
import {SupportedChainId} from '../../constants/chains'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  // [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph',
  [SupportedChainId.MAINNET]: 'https://api.studio.thegraph.com/query/46086/overlay-subgraph-eth/v2.0.2',
  [SupportedChainId.GÖRLI]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-goerli',
  [SupportedChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-rinkeby',
  // [SupportedChainId.ARBITRUM]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-arbitrum',
  // [SupportedChainId.ARBITRUM]: 'https://api.studio.thegraph.com/proxy/46086/overlay-subgraph-arbitrum/v2.0.12',
  [SupportedChainId.ARBITRUM]: 'https://api.studio.thegraph.com/query/46086/overlay-subgraph-arbitrum/v2.2.1',
  [SupportedChainId.ARBITRUM_GÖRLI]: 'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-arb-goerli',
}

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: graphqlRequestBaseQuery(),
  endpoints: builder => ({
    accountQuery: builder.query({
      query: ({account}) => ({
        document: gql`
          query account($account: ID!) {
            account(id: $account) {
              positions {
                id
                positionId
                market {
                  id
                  feedAddress
                }
                initialOi
                initialDebt
                initialCollateral
                initialNotional
                leverage
                isLong
                entryPrice
                isLiquidated
                currentOi
                currentDebt
                mint
                createdAtTimestamp
                createdAtBlockNumber
                numberOfUniwnds
              }
              builds {
                id
                isLong
                price
                timestamp
                value
                collateral
              }
              unwinds {
                id
                value
                unwindNumber
                timestamp
                price
                mint
                fraction
                currentOi
                currentDebt
                collateral
                position {
                  id
                }
              }
              liquidates {
                id
                value
                timestamp
                price
                mint
              }
            }
          }
        `,
        variables: {
          account,
        },
      }),
    }),
    accountV2Query: builder.query({
      query: ({account}) => ({
        document: gql`
          query accountV2($account: ID!) {
            account(id: $account) {
              positions(orderBy: createdAtTimestamp, orderDirection: desc) {
                id
                positionId
                market {
                  id
                  feedAddress
                }
                initialOi
                initialDebt
                initialCollateral
                initialNotional
                leverage
                isLong
                entryPrice
                isLiquidated
                currentOi
                currentDebt
                mint
                createdAtTimestamp
                createdAtBlockNumber
                numberOfUniwnds
                fractionUnwound
                builds {
                  collateral
                  currentDebt
                  currentOi
                  id
                  price
                  timestamp
                  value
                }
                liquidates {
                  collateral
                  currentDebt
                  id
                  currentOi
                  isLong
                  mint
                  price
                  timestamp
                  value
                }
                unwinds(orderBy: unwindNumber, orderDirection: asc) {
                  collateral
                  currentDebt
                  currentOi
                  fraction
                  id
                  isLong
                  mint
                  timestamp
                  price
                  unwindNumber
                  value
                  transferAmount
                  pnl
                  size
                }
              }
            }
          }
        `,
        variables: {
          account,
        },
      }),
    }),
    marketQuery: builder.query({
      query: ({market}) => ({
        document: gql`
          query market($market: ID!) {
            market(id: $market) {
              id
              feedAddress
              factory {
                id
              }
              k
              lmbda
              delta
              capPayoff
              capNotional
              capLeverage
              circuitBreakerWindow
              circuitBreakerMintTarget
              maintenanceMarginFraction
              maintenanceMarginBurnRate
              liquidationFeeRate
              tradingFeeRate
              minCollateral
              priceDriftUpperLimit
              averageBlockTime
              isShutdown
            }
          }
        `,
        variables: {
          market,
        },
      }),
    }),
    activeMarketsQuery: builder.query({
      query: () => ({
        document: gql`
          query markets {
            markets(where: {isShutdown: false}) {
              id
              feedAddress
              factory {
                id
              }
              k
              lmbda
              delta
              capPayoff
              capNotional
              capLeverage
              circuitBreakerWindow
              circuitBreakerMintTarget
              maintenanceMarginFraction
              maintenanceMarginBurnRate
              liquidationFeeRate
              tradingFeeRate
              minCollateral
              priceDriftUpperLimit
              averageBlockTime
              isShutdown
              positions {
                id
              }
            }
          }
        `,
      }),
    }),
    positionsQuery: builder.query({
      query: () => ({
        document: gql`
          query positions {
            positions {
              id
              positionId
              owner {
                id
              }
              market {
                id
              }
              isLiquidated
            }
          }
        `,
      }),
    }),
    numberOfPositionsQuery: builder.query({
      query: ({account}) => ({
        document: gql`
          query numberOfPositions($account: ID!) {
            account(id: $account) {
              numberOfLiquidatedPositions
              numberOfOpenPositions
              numberOfUnwinds
              realizedPnl
            }
          }
        `,
        variables: {
          account,
        },
      }),
    }),
    openPositionsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
          query openPositions($account: ID!, $first: Int, $skip: Int) {
            account(id: $account) {
              positions(
                where: {isLiquidated: false, currentOi_gt: "0"}
                orderBy: createdAtTimestamp
                orderDirection: desc
                first: $first
                skip: $skip
              ) {
                id
                createdAtTimestamp
                currentOi
                entryPrice
                initialCollateral
                isLiquidated
                isLong
                leverage
                numberOfUniwnds
                positionId
                market {
                  feedAddress
                  id
                }
              }
            }
          }
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
    openPositionsOverviewQuery: builder.query({
      query: ({account}) => ({
        document: gql`
          query openPositionsOverview($account: ID!) {
            account(id: $account) {
              positions(where: {isLiquidated: false, currentOi_gt: "0"}, orderBy: createdAtTimestamp, orderDirection: desc) {
                id
                positionId
                market {
                  feedAddress
                  id
                }
              }
            }
          }
        `,
        variables: {
          account,
        },
      }),
    }),
    unwindsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
          query unwinds($account: ID!, $first: Int, $skip: Int) {
            account(id: $account) {
              unwinds(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
                collateral
                currentDebt
                currentOi
                fraction
                id
                isLong
                mint
                pnl
                price
                size
                timestamp
                transferAmount
                unwindNumber
                value
                position {
                  createdAtTimestamp
                  currentOi
                  entryPrice
                  id
                  initialCollateral
                  isLong
                  leverage
                  numberOfUniwnds
                  positionId
                  market {
                    feedAddress
                    id
                  }
                }
              }
            }
          }
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
    liquidatedPositionsQuery: builder.query({
      query: ({account, first, skip}) => ({
        document: gql`
          query liquidatedPositions($account: ID!, $first: Int, $skip: Int) {
            account(id: $account) {
              liquidates(orderBy: timestamp, orderDirection: desc, first: $first, skip: $skip) {
                collateral
                currentDebt
                currentOi
                id
                isLong
                mint
                price
                timestamp
                value
                position {
                  createdAtTimestamp
                  currentOi
                  entryPrice
                  fractionUnwound
                  id
                  initialCollateral
                  isLong
                  leverage
                  market {
                    feedAddress
                    id
                  }
                }
              }
            }
          }
        `,
        variables: {
          account,
          first,
          skip,
        },
      }),
    }),
  }),
})

// Graphql query client wrapper that builds a dynamic url based on chain id
function graphqlRequestBaseQuery(): BaseQueryFn<
  {document: string | DocumentNode; variables?: any},
  unknown,
  Pick<ClientError, 'name' | 'message' | 'stack'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> {
  return async ({document, variables}, {getState}: BaseQueryApi) => {
    try {
      const chainId = (getState() as AppState).application.chainId

      // if chainId in state is null, set default query to Arbitrum One
      const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : CHAIN_SUBGRAPH_URL[42161]

      if (!subgraphUrl) {
        return {
          error: {
            name: 'UnsupportedChainId',
            message: `Subgraph queries against ChainId ${chainId} are not supported.`,
            stack: '',
          },
        }
      }

      return {
        data: await new GraphQLClient(subgraphUrl).request(document, variables),
        meta: {},
      }
    } catch (error) {
      if (error instanceof ClientError) {
        const {name, message, stack, request, response} = error
        return {error: {name, message, stack}, meta: {request, response}}
      }
      throw error
    }
  }
}
