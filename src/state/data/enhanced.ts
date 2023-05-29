import {api as generatedApi} from './generated'

export const CHAIN_TAG = 'Chain'

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [CHAIN_TAG],
  endpoints: {
    accountQuery: {
      providesTags: [CHAIN_TAG],
    },
    accountV2Query: {
      providesTags: [CHAIN_TAG],
    },
    marketQuery: {
      providesTags: [CHAIN_TAG],
    },
    activeMarketsQuery: {
      providesTags: [CHAIN_TAG],
    },
    positionsQuery: {
      providesTags: [CHAIN_TAG],
    },
    nfts7dQuery: {},
  },
})

export const {useMarketQuery, useMarketsQuery, useAccountQuery, useAccountV2Query, usePositionsQuery, useActiveMarketsQueryQuery, useNfts7dQueryQuery} = api
