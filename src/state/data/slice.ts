import {BaseQueryApi, BaseQueryFn} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {createApi} from '@reduxjs/toolkit/query/react'
import {ClientError, gql, GraphQLClient} from 'graphql-request'
import {AppState} from '../state'
import {DocumentNode} from 'graphql'
import {SupportedChainId} from '../../constants/chains'

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]:
    'https://api.thegraph.com/subgraphs/id/QmdpFb4G8w72age18nbAkKYPRtqR52g6qwBko9WKCcsJEY',
  [SupportedChainId.GÖRLI]:
    'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-goerli',
  [SupportedChainId.RINKEBY]:
    'https://api.thegraph.com/subgraphs/name/bigboydiamonds/overlay-v1-subgraph-rinkeby',
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
              }
              builds {
                id
              }
              unwinds {
                id
              }
              liquidates {
                id
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
              capNotional
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

      // if chainId in state is null, set default query to Kovan
      const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : CHAIN_SUBGRAPH_URL[42]

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
