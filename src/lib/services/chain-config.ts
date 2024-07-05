import { ChainId } from '@swapsicledex/swapsicle-sdk'
import RPC from '@/lib/rpc-list'


export const defaultChainId = ChainId.BSC_TESTNET

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
  [ChainId.BSC_TESTNET]: {
    explorer: "https://testnet.bscscan.com",
    label: "BNB Smart Chain Testnet",
    nativeCurrency: { name: "Binance Coin", symbol: "tBNB", decimals: 18 },
    rpcUrl: RPC[ChainId.BSC_TESTNET],
  },
  [ChainId.TELOS_TESTNET]: {
    explorer: "https://testnet.teloscan.io",
    label: "Telos Testnet",
    nativeCurrency: { name: "Telos", symbol: "TLOS", decimals: 18 },
    rpcUrl: RPC[ChainId.TELOS_TESTNET],
  },
}

// URLs
export const METAMASK_URL = 'https://metamask.io/download/'