import {createAction} from '@reduxjs/toolkit'
import {TokenList} from '@uniswap/token-lists'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
        info?: object
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

export enum ApplicationModal {
  WALLET,
  TERMS_OF_SERVICE,
}

export enum UserTermsOfServiceStatus {
  NEW_USER = 'NEW_USER',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export const updateChainId = createAction<{chainId: number | null}>('application/updateChainId')
export const updateBlockNumber = createAction<{chainId: number; blockNumber: number}>('application/updateBlockNumber')
export const addPopup = createAction<{
  key?: string
  removeAfterMs?: number | null
  content: PopupContent
}>('application/addPopup')
export const removePopup = createAction<{key: string}>('application/removePopup')
export const setOpenModal = createAction<ApplicationModal | null>('application/setOpenModal')
export const updateTermsOfServiceStatus = createAction<{
  termsOfServiceStatus: UserTermsOfServiceStatus
}>('application/updateTermsOfServiceStatus')
