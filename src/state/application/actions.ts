import { createAction } from '@reduxjs/toolkit';
import { TokenList } from '@uniswap/token-lists';

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
      }
    }

    
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('application/updateBlockNumber');
export const addPopup = createAction<{
  key?: string
  removeAfterMs?: number | null
  content: PopupContent
}>('application/addPopup');


