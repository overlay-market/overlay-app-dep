import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { createApi } from '@reduxjs/toolkit/query/react';
import { SupportedChainId } from '../../constants/chains';
import { DocumentNode } from 'graphql';
import { ClientError, gql, GraphQLClient } from 'graphql-request';
import { AppState } from '../state';

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]: 'http://127.0.0.1:8000/subgraphs/name/overlay-market/overlay-v1',
  [SupportedChainId.KOVAN]: 'http://127.0.0.1:8000/subgraphs/name/overlay-market/overlay-v1'
}

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: graphqlRequestBaseQuery(),
  endpoints: (builder) => ({
    accountQuery: builder.query({
      query: ({ account }) => ({ 
          document: gql`
            query account($account: ID!) {
                account(id: $account) {
                  id
                  balanceOVL {
                    balance
                    locked
                  }
                  balances{
                    id
                    shares
                  }
                }
            }
          `,
          variables: {
            account
          },
       }),
    }),
    appQuery: builder.query({
      query: ({account}) => ({
        document: gql`
          query app($account: ID!) {
            markets {
              id
              oiLong
              oiLongShares
              oiLongQueued
              oiShort
              oiShortShares
              oiShortQueued
              oiCap
            }
            account (id: $account) {
              balanceOVL {
                balance
              }
              balances {
                id
                shares
              }
            }
          }
        `,
        variables: {
          account
        }
      })
    })
  })
});


// Graphql query client wrapper that builds a dynamic url based on chain id
function graphqlRequestBaseQuery(): BaseQueryFn<
  { document: string | DocumentNode; variables?: any },
  unknown,
  Pick<ClientError, 'name' | 'message' | 'stack'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> {
  return async ({ document, variables }, { getState }: BaseQueryApi) => {
    try {
      const chainId = (getState() as AppState).application.chainId

      const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : undefined

      console.log('subgraphUrl: ', subgraphUrl);
      console.log('chainId: ', chainId);

      if (!subgraphUrl) {
        return {
          error: {
            name: 'UnsupportedChainId',
            message: `Subgraph queries against ChainId ${chainId} are not supported.`,
            stack: '',
          },
        }
      }

      return { data: await new GraphQLClient(subgraphUrl).request(document, variables), meta: {} }
    } catch (error) {
      if (error instanceof ClientError) {
        const { name, message, stack, request, response } = error
        return { error: { name, message, stack }, meta: { request, response } }
      }
      throw error
    }
  }
}
