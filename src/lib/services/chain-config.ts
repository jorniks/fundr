import { ChainId } from '@swapsicledex/swapsicle-sdk'
import RPC from '@/lib/rpc-list'


export const defaultChainId = ChainId.TELOS_TESTNET
export const INPUT_CHAIN_URL = RPC[ChainId.TELOS_TESTNET][0]

export const CHAIN_TO_URL_MAP = {
  [ChainId.TELOS]: RPC[ChainId.TELOS_TESTNET][0],
}

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

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [ChainId.BSC_TESTNET]: {
    explorer: "https://testnet.bscscan.com",
    label: "Binance Smart Chain Testnet",
    nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
    rpcUrl: RPC[ChainId.BSC_TESTNET][0],
  },
  [ChainId.MANTLE_TESTNET]: {
    explorer: "N/A",
    label: "Mantle Testnet",
    nativeCurrency: { name: "Mantle Token", symbol: "MNT", decimals: 18 },
    rpcUrl: RPC[ChainId.MANTLE_TESTNET][0],
  },
  [ChainId.MATIC_TESTNET]: {
    explorer: "https://mumbai.polygonscan.com",
    label: "Polygon Testnet",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    rpcUrl: RPC[ChainId.MATIC_TESTNET][0],
  },
  [ChainId.TELOS_TESTNET]: {
    explorer: "https://testnet.teloscan.io",
    label: "Telos Testnet",
    nativeCurrency: { name: "Telos", symbol: "TLOS", decimals: 18 },
    rpcUrl: RPC[ChainId.TELOS_TESTNET][0],
  },
}

// URLs
export const METAMASK_URL = 'https://metamask.io/download/'