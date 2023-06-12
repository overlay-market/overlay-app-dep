/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    on?: any
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
    request?: ((request: {method: string; params?: Array<any>}) => Promise<any>) | undefined
  }
  web3?: Record<string, unknown>
}
