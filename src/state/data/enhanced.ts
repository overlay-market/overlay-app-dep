import { api as generatedApi } from "./slice";

export const CHAIN_TAG = 'Chain';

export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [CHAIN_TAG],
  endpoints: {
    ovlBalance: {
      providesTags: [CHAIN_TAG],
    },
  },
})
