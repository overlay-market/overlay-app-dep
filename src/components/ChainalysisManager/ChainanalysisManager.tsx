import {useEffect, useState, useCallback} from 'react'
import {useCookies} from 'react-cookie'
import {useActiveWeb3React} from '../../hooks/web3'
import {ClientCookies} from '../TermsOfServiceModal/TermsOfServiceModal'
import {AccessDenied, AccessDeniedType} from '../AccessDenied/AccessDenied'
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

export default function ChainalysisManager({children}: {children: JSX.Element | JSX.Element[]}) {
  const {account: connectedAccount} = useActiveWeb3React()
  const [cookies, setCookie] = useCookies([ClientCookies.userRiskLevel])
  const {userRiskLevel} = cookies

  const [
    {data: getRegisterData, loading: getRegisterLoading, error: getRegisterError},
    executeRegisterAddress,
  ] = useAxios(
    {
      url: LambdaEndpoint.REGISTER_ADDRESS + connectedAccount,
      method: 'POST',
    },
    {manual: true},
  )

  const [
    {data: getAddressData, loading: getAddressLoading, error: getAddressError},
    executeGetAddress,
  ] = useAxios(
    {
      url: LambdaEndpoint.SCREEN_ADDRESS + connectedAccount,
      method: 'GET',
    },
    {manual: true},
  )

  const executeScreenAddressCallback = useCallback(() => {
    executeGetAddress()
      .then(response => {
        const {data} = response
        const unserializedObj = {risk: data.risk, address: connectedAccount}
        setCookie(ClientCookies.userRiskLevel, JSON.stringify(unserializedObj))
      })
      .catch(error => {
        console.error('executeGetAddress: ', error)
      })
  }, [connectedAccount, executeGetAddress, setCookie])

  const executeRegisterAndScreenCallback = useCallback(() => {
    executeRegisterAddress()
      .then(response => {
        const {data} = response
        if (data.message === RegisterResponseMessage.CREATED) {
          executeScreenAddressCallback()
        }
      })
      .catch(error => {
        console.error('executeRegisterAddress: ', error)
      })
  }, [executeRegisterAddress, executeScreenAddressCallback])

  useEffect(() => {
    if (connectedAccount && !userRiskLevel) {
      executeRegisterAndScreenCallback()
    }
    if (connectedAccount && userRiskLevel) {
      // if connected account updates and is different than screened address, screen again
      if (connectedAccount !== undefined && userRiskLevel.address !== connectedAccount) {
        executeRegisterAndScreenCallback()
      }
    }
  }, [connectedAccount, userRiskLevel, executeRegisterAndScreenCallback])

  if (
    userRiskLevel &&
    connectedAccount &&
    userRiskLevel.address === connectedAccount &&
    userRiskLevel.risk === SecurityRiskLevels.SEVERE
  ) {
    return <AccessDenied message={AccessDeniedType.EXCEED_RISK_TOLERANCE} />
  }
  return <>{children}</>
}
