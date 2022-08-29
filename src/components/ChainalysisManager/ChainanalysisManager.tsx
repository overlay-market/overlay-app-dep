import {useEffect, useState} from 'react'
import {useCookies} from 'react-cookie'
import {useActiveWeb3React} from '../../hooks/web3'
import {ClientCookies} from '../TermsOfServiceModal/TermsOfServiceModal'
import useAxios from 'axios-hooks'

export enum SecurityRiskLevels {
  SEVERE = 'Severe',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

enum LambdaEndpoint {
  REGISTER_ADDRESS = '/api/register/',
  SCREEN_ADDRESS = '/api/user/',
}

enum RegisterResponseMessage {
  CREATED = 'Address register successful',
}

const mockSevereWalletAddress = '0x8576acc5c05d6ce88f4e49bf65bdf0c62f91353c'

export default function ChainalysisManager({children}: {children: JSX.Element | JSX.Element[]}) {
  const {account} = useActiveWeb3React()
  const [cookies, setCookie] = useCookies([ClientCookies.userRiskLevel])
  const [connectedAccount, setConnectedAccount] = useState('')
  const {userRiskLevel} = cookies

  // @TO-DO: use axios-hooks to manually trigger "GET" / "POST" requests to not perform unnecessary API calls
  // https://www.npmjs.com/package/axios-hooks
  const [
    {data: getRegisterData, loading: getRegisterLoading, error: getRegisterError},
    executeRegisterAddress,
  ] = useAxios(
    {
      url: LambdaEndpoint.REGISTER_ADDRESS + account,
      method: 'POST',
    },
    {manual: true},
  )

  const [
    {data: getAddressData, loading: getAddressLoading, error: getAddressError},
    executeGetAddress,
  ] = useAxios(
    {
      url: LambdaEndpoint.SCREEN_ADDRESS + account,
      method: 'GET',
    },
    {manual: true},
  )

  useEffect(() => {
    if (account && !userRiskLevel) {
      executeRegisterAddress()
        .then(response => {
          const {data} = response
          if (data.message === RegisterResponseMessage.CREATED) {
            executeGetAddress().then(response => {
              const {data} = response
              const unserializedObj = {risk: data.risk, address: account}
              setCookie(ClientCookies.userRiskLevel, JSON.stringify(unserializedObj))
            })
          }
        })
        .catch(error => {
          console.log('executeRegisterAddress.catch error: ', error)
        })
    }
  }, [account])

  useEffect(() => {
    console.log('cookies: ', cookies)
    console.log('userRiskLevel: ', userRiskLevel)
  }, [cookies, userRiskLevel])

  // useEffect(() => {
  //   console.log('getRegisterData: ', getRegisterData)
  //   console.log('getAddressData: ', getAddressData)
  // }, [getRegisterData, getAddressData])

  // @TO-DO: useEffect to perform side effects on Chainanalysis "GET" request responses
  // if address has not been registered, perform "POST" request
  // if address returns response.risk value, set cookie with returned risk value

  // @TO-DO: check cookie on app initializing for any prior risk assessments
  useEffect(() => {
    if (!account) {
      console.log('Chainalysis Manager: no account currently connected')
    }
    // if (account && !userRiskLevel) {
    //   // perform "GET" request to check if registered
    //   console.log('Chainalysis Manager: no userRiskLevel cookie detected')
    // }
    if (userRiskLevel) {
      console.log('Chainanalysis Manager: current userRiskLevel cookie: ', userRiskLevel)
    }
  }, [account, setCookie, userRiskLevel])

  // @TO-DO: if cookie undefined, "GET" request chainanalysis API to check if address is registered
  // if response message property value is 'Entity not found. Please be sure to register the Entity',
  // we must register the account using a "POST" request to chainanalysis API.
  if (userRiskLevel && userRiskLevel.risk === SecurityRiskLevels.SEVERE) return null

  return <>{children}</>
}
