import {ethers} from 'ethers'
import {SupportedChainId} from '../constants/chains'

// returns the checksummed address if the address is valid, otherwise returns false
export function switchNetworkToArbitrum() {
  if (window.ethereum && window.ethereum.request) {
    try {
      // check if the chain to connect to is installed
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: ethers.utils.hexlify(SupportedChainId.ARBITRUM)}], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexlify(SupportedChainId.ARBITRUM),
                rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
              },
            ],
          })
        } catch (addError) {
          console.error(addError)
        }
      }
      console.error(error)
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html')
  }
}
