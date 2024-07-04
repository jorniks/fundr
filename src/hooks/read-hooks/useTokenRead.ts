import { useWeb3React } from "@web3-react/core"
import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import { defaultChainId } from "@/lib/services/chain-config";
import useTokenBalance from "./useTokenBalance";
import useTokenSymbol from "./useTokenSymbol";
import useTokenDecimal from "./useTokenDecimal";
import useTokenTotalSupply from "./useTokenTotalSupply";
import useBlacklistStatus from "./useBlacklistStatus";
import useMintableBalance from "./useMintableBalance";


export default function useTokenRead() {
  const { chainId } = useWeb3React();
  const tokenAddress = LIRIO_TOKEN[chainId || defaultChainId]
  const walletBalance = useTokenBalance(tokenAddress);
  const tokenSymbol = useTokenSymbol(tokenAddress) || "LIR"
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const tokenTotalSupply = useTokenTotalSupply(tokenAddress)
  const blacklistStatus = useBlacklistStatus(tokenAddress)
  const mintableBalance = useMintableBalance(tokenAddress)
  
  return { walletBalance, tokenSymbol, tokenDecimal, tokenTotalSupply, mintableBalance, blacklistStatus }
}