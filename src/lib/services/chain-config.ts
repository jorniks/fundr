
export const defaultChainId = 59141

type ChainInfo = {
  explorer: string
  label: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: 18
  }
  rpcUrl: string
}

export const CHAIN_INFO: { [key: number]: ChainInfo } = {
  59141: {
    explorer: "https://sepolia.lineascan.build",
    label: "Linea Sepolia",
    nativeCurrency: { name: "LineaETH", symbol: "LineaETH", decimals: 18 },
    rpcUrl: "https://rpc.sepolia.linea.build",
  },
}

// URLs
export const METAMASK_URL = 'https://metamask.io/download/'