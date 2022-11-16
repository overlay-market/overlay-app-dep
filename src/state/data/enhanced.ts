import {api as generatedApi} from './generated'

export const CHAIN_TAG = 'Chain'

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [CHAIN_TAG],
  endpoints: {
    accountQuery: {
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
  },
})

export const {
  useMarketQuery,
  useMarketsQuery,
  useAccountQuery,
  usePositionsQuery,
  useActiveMarketsQueryQuery,
} = api
