import { useEffect, useState } from "react";
import { useWeb3React } from '@web3-react/core'
import { convertToDecimalValue } from "@/functions/misc-functions";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import useTokenSymbol from "./useTokenSymbol";

export default function useNetworkTokenBalance() {
  const { account, provider, chainId } = useWeb3React();
  const tokenAddress = (chainId && CHAIN_INFO.hasOwnProperty(chainId?.toString())) ? LIRIO_TOKEN[chainId] : LIRIO_TOKEN[defaultChainId]
  const [networkTokenBalance, setNetworkTokenBalance] = useState<number>(0)
  const tokenSymbol = useTokenSymbol(tokenAddress) || 'LIR'

  useEffect(() => {
    async function getTokenSymbol() {
      if (account) {
        try {
          const userBalance = await provider?.getBalance(account)
          let convertedBalance = convertToDecimalValue(userBalance?.toString(), 18) || 0
          setNetworkTokenBalance(convertedBalance)
        } catch (error) {
        }
      }
    }

    getTokenSymbol()
  }, [account, provider])

  return {tokenSymbol, networkTokenBalance};
}