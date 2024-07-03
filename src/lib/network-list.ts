import { ChainId } from "@swapsicledex/swapsicle-sdk";

export const NETWORK_LABEL: { [chainId: number]: string } = {
  [ChainId.TELOS_TESTNET]: 'TELOS Testnet',
  [ChainId.MANTLE_TESTNET]: 'MANTLE Testnet',
  [ChainId.MATIC_TESTNET]: 'MATIC Testnet',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
}