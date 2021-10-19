import { api as generatedApi } from "./generated";

export const CHAIN_TAG = 'Chain';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [CHAIN_TAG],
  endpoints: {
    accountQuery: {
      providesTags: [CHAIN_TAG],
    },
  },
});

export const { useAccountQuery, useLazyAccountQuery } = api;