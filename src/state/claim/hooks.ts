import {TransactionType} from './../transactions/actions'
import {useState, useEffect, useMemo} from 'react'
import {TransactionResponse} from '@ethersproject/providers'
import {useActiveWeb3React} from '../../hooks/web3'
import {isAddress} from '../../utils/web3'
import {useContract} from '../../hooks/useContract'
import {calculateGasMargin} from '../../utils/calculateGasMargin'
import {useTransactionAdder} from '../transactions/hooks'
import MERKLE_DISTRIBUTOR_ABI from '../../constants/abis/MerkleDistributor.json'
import {BigNumberish, BigNumber} from 'ethers'
import {ClaimId, MERKLE_DISTIBUTOR_ADDRESSES, MERKLE_PROOFS} from '../../constants/claims'

function useMerkleDistributorContract(claimId: string) {
  return useContract(MERKLE_DISTIBUTOR_ADDRESSES[claimId], MERKLE_DISTRIBUTOR_ABI, true)
}

interface UserClaimData {
  index: number
  address: string
  proof: string[]
  amount: BigNumberish
}

let FETCH_CLAIM_FILE_PROMISE: any
export function fetchClaimFile(claimId: string) {
  const fetchUrl = MERKLE_PROOFS[claimId]
  return (
    FETCH_CLAIM_FILE_PROMISE ??
    (FETCH_CLAIM_FILE_PROMISE = fetch(fetchUrl)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        console.error('Failed to get claim file', error)
        FETCH_CLAIM_FILE_PROMISE = null
      }))
  )
}

const FETCH_CLAIM_PROMISES: {[key: string]: UserClaimData} = {}
export function fetchClaim(account: string, claimId: string): any {
  const formattedAddress = isAddress(account)
  if (!formattedAddress) return Promise.reject(new Error('Invalid address'))

  return (
    // FETCH_CLAIM_PROMISES[account] ??
    (FETCH_CLAIM_PROMISES[account] = fetchClaimFile(claimId)
      .then((claimData: any) => {
        const keys = Object.keys(claimData)

        const filtered = keys.filter(address => {
          return isAddress(address) === formattedAddress
        })

        if (filtered.length > 0) {
          return claimData[filtered[0]]
        }
        throw new Error(`Claim for ${formattedAddress} was not found after searching all mappings`)
      })
      .catch((error: any) => {
        console.debug('Claim fetch failed', error)
        throw error
      }))
  )
}

export function useUserClaimData(
  account: string | null | undefined,
  claimId: string,
): UserClaimData | null {
  const {chainId} = useActiveWeb3React()
  const [claimInfo, setClaimInfo] = useState<{[account: string]: UserClaimData | null}>({})

  useEffect(() => {
    if (!account) return

    fetchClaim(account, claimId)
      .then((accountClaimInfo: any) => {
        setClaimInfo(claimInfo => {
          return {
            ...claimInfo,
            [account]: accountClaimInfo,
          }
        })
      })
      .catch(() => {
        setClaimInfo(claimInfo => {
          return {
            ...claimInfo,
            [account]: null,
          }
        })
      })
  }, [account, chainId, claimId])

  return account ? claimInfo[account] : null
}

export function useUserHasAvailableClaim(
  account: string | null | undefined,
  claimId: string,
): boolean | undefined {
  const {chainId} = useActiveWeb3React()
  const userClaimData = useUserClaimData(account, claimId)
  const distributorContract = useMerkleDistributorContract(claimId)

  const userClaimIndex = userClaimData?.index && BigNumber.from(userClaimData.index)
  const [claim, setClaim] = useState()

  useEffect(() => {
    if (!distributorContract || !account || userClaimIndex === undefined) return
    ;(async () => {
      // console.log('this got hit')
      console.log('userClaimIndex: ', userClaimIndex)
      console.log('distributorContract: ', distributorContract)
      try {
        setClaim(await distributorContract.isClaimed(userClaimIndex))
      } catch (error) {
        console.error('claim error inside useUserHasAvailableClaim: ', error)
      }
    })()
  }, [distributorContract, account, userClaimIndex, chainId])

  return useMemo(() => {
    if (claim === undefined) return undefined
    console.log('claim from useMemo: ', Boolean(userClaimData && claim === false))
    return Boolean(userClaimData && claim === false)
  }, [userClaimData, claim])
}

export function useClaimCallback(
  account: string | null | undefined,
  claimId: string,
): {
  claimCallback: () => Promise<string>
} {
  // get claim data for this account
  const {library, chainId} = useActiveWeb3React()
  const claimData = useUserClaimData(account, claimId)

  // used for popup summary
  // const unclaimedAmount: CurrencyAmount<Token> | undefined = useUserUnclaimedAmount(account)
  const addTransaction = useTransactionAdder()
  const distributorContract = useMerkleDistributorContract(claimId)

  const claimCallback = async function () {
    if (!claimData || !account || !library || !chainId || !distributorContract) return

    const args = [claimData.index, claimData.address, claimData.amount, claimData.proof]

    return distributorContract.estimateGas['claim'](...args, {}).then(estimatedGasLimit => {
      return distributorContract
        .claim(...args, {value: null, gasLimit: calculateGasMargin(estimatedGasLimit)})
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            type: TransactionType.CLAIM_OVL,
            recipient: account,
            amount: claimData.amount,
          })
          return response.hash
        })
    })
  }

  return {claimCallback}
}
