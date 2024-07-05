import { ChainId } from "@swapsicledex/swapsicle-sdk";

export const NETWORK_LABEL: { [chainId: number]: string } = {
  [ChainId.TELOS_TESTNET]: 'TELOS Testnet',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
}