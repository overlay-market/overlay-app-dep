/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    // on?: (...args: any[]) => void
    on?: any
    // removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
  }
  web3?: Record<string, unknown>
}