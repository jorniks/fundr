import { ChainId } from "@swapsicledex/swapsicle-sdk"

const RPC = {
  [ChainId.MANTLE_TESTNET]: [
    "https://testnet.mantlenet.com/rpc",
  ],
  [ChainId.TELOS_TESTNET]: [
    "https://testnet.telos.net/evm",
  ],
  [ChainId.MATIC_TESTNET]: [
    "https://rpc-mumbai.matic.today",
  ],
  [ChainId.BSC_TESTNET]: [
    "https://data-seed-prebsc-1-s1.binance.org:8545/",
  ],
}

export default RPC