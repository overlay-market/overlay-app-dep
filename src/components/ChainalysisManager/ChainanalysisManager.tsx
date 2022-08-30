import {useEffect, useState, useCallback} from 'react'
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
  const {userRiskLevel} = cookies

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

  const executeScreenAddressCallback = useCallback(() => {
    executeGetAddress()
      .then(response => {
        const {data} = response
        const unserializedObj = {risk: data.risk, address: account}
        setCookie(ClientCookies.userRiskLevel, JSON.stringify(unserializedObj))
      })
      .catch(error => {
        console.error('executeGetAddress error: ', error)
      })
  }, [account, executeGetAddress, setCookie])

  const executeRegisterAndScreenCallback = useCallback(() => {
    executeRegisterAddress()
      .then(response => {
        const {data} = response
        if (data.message === RegisterResponseMessage.CREATED) {
          executeScreenAddressCallback()
        }
      })
      .catch(error => {
        console.error('executeRegisterAddress error: ', error)
      })
  }, [executeRegisterAddress, executeScreenAddressCallback])

  useEffect(() => {
    if (account && !userRiskLevel) {
      executeRegisterAndScreenCallback()
    }
    if (account && userRiskLevel) {
      // if connected account updates and is different than screened address, screen again
      if (account !== undefined && userRiskLevel.address !== account) {
        executeRegisterAndScreenCallback()
      }
    }
  }, [account, userRiskLevel, executeRegisterAndScreenCallback])

  if (
    userRiskLevel &&
    account &&
    userRiskLevel.account === account &&
    userRiskLevel.risk === SecurityRiskLevels.LOW
  ) {
    return null
  }
  return <>{children}</>
}
