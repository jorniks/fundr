import { useWeb3React } from "@web3-react/core"
import { useLirioContract } from "../services/useContract";
import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import { defaultChainId } from "@/lib/services/chain-config";
import useTokenBalance from "../services/useTokenBalance";
import useTokenSymbol from "../services/useTokenSymbol";
import useTokenDecimal from "../services/useTokenDecimal";
import useTokenTotalSupply from "../services/useTokenTotalSupply";
import { useCallback } from "react";
import { convertToDecimalValue } from "@/functions/misc-functions";


export default function useTokenRead() {
  const { chainId } = useWeb3React();
  const tokenAddress = LIRIO_TOKEN[chainId || defaultChainId]
  const contract = useLirioContract(tokenAddress)
  const walletBalance = useTokenBalance(tokenAddress);
  const tokenSymbol = useTokenSymbol(tokenAddress) || "LIR"
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const tokenTotalSupply = useTokenTotalSupply(tokenAddress)

  const getMintableBalance = useCallback(
    async () => {
      const mintableBalance = await contract?.mintableBalance();
      const convertedMintableBalance = convertToDecimalValue(mintableBalance, tokenDecimal)
      
      return convertedMintableBalance;
    },
    [contract, tokenDecimal],
  )

  const getBlacklistStatus = useCallback(
    async () => {
      const blacklistStatus = await contract?.isWalletBlacklisted();
      
      console.log(blacklistStatus);
      
      return blacklistStatus;
    },
    [contract],
  )

  return { walletBalance, tokenSymbol, tokenDecimal, tokenTotalSupply, getMintableBalance, getBlacklistStatus }
}