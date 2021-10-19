import { useAccountQuery, useLazyAccountQuery } from "./enhanced";


export function useCurrentOvlBalance(
  account: string 
) {

    const response = useAccountQuery({ account })


    return response;
}