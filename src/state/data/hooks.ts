import { useAccountQuery, useLazyAccountQuery } from "./enhanced";
import { AccountQuery } from "./generated"
import { useMemo } from "react"


export function useCurrentOvlBalance(
  address: string 
) {

  const {
    isLoading,
    isError,
    error,
    isUninitialized,
    data
  } = useAccountQuery({ account: address })

  return useMemo(() => {
    return {
      isLoading,
      isError,
      error,
      isUninitialized,
      data
    } 
  }, [ isLoading, isError, error, isUninitialized, data ])

}