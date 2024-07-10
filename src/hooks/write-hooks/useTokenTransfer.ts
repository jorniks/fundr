import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { useWeb3React } from "@web3-react/core"
import { useLirioContract } from "../services/useContract";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/app/state/atoms/atom";
import useTokenRead from "../read-hooks/useTokenRead";
import { toast } from "@/components/ui/use-toast";
import { errorCode } from "@/lib/metamask-error-codes";
import { formatToBigInt } from "@/functions/format";
import useTokenDecimal from "../read-hooks/useTokenDecimal";
import { isAddress } from "@/functions/validate";
import { ZeroAddress } from "ethers";

export const useTokenTransfer = () => {
  const { account, chainId } = useWeb3React();
  const tokenAddress = (chainId && CHAIN_INFO.hasOwnProperty(chainId?.toString())) ? LIRIO_TOKEN[chainId] : LIRIO_TOKEN[defaultChainId]
  const { getBlacklistStatus } = useTokenRead()
  const contract = useLirioContract(tokenAddress);
  const setIsLoading = useSetRecoilState(loadingState)
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const explorerURL = (chainId && CHAIN_INFO.hasOwnProperty(chainId?.toString())) ? CHAIN_INFO[chainId].explorer : CHAIN_INFO[defaultChainId].explorer

  const transferToken = useCallback(async (recipientAddress: string, transferAmount: string) => {
    setIsLoading(true)
    const blacklistStatus = await getBlacklistStatus()
    
    if (!account) {
      toast({ variant: "error", description: "No connected wallet!" })
      setIsLoading(false)
      return
    }

    if (blacklistStatus) {
      toast({ variant: "error", description: "Wallet is blacklisted!" })
      setIsLoading(false)
      return
    }
    
    if (!recipientAddress) {
      toast({ variant: "error", description: "No recipient address entered!" })
      setIsLoading(false)
      return
    }

    if (!isAddress(recipientAddress) || recipientAddress === ZeroAddress) {
      toast({ variant: "error", description: "Invalid Recipient Address!" })
      setIsLoading(false)
      return
    }
    
    if (!transferAmount) {
      toast({ variant: "error", description: "No mint amount entered!" })
      setIsLoading(false)
      return
    }

    const mintAmount = formatToBigInt(transferAmount, tokenDecimal)

    try {
      const minted = await contract?.transfer(recipientAddress, mintAmount)
      const mintedReceipt = await minted.wait()

      toast({
        variant: "success",
        description: `Token successfully transferred!`,
        action: { url: `${explorerURL}/tx/${mintedReceipt?.hash || mintedReceipt?.transactionHash}`, label: "View in explorer" }
      })
      setIsLoading(false)

      return true;
    } catch (transferTokenError: {} | any) {
      toast({ variant: "error", description: errorCode[transferTokenError?.code as keyof typeof errorCode] })
      setIsLoading(false)
      return false;
    }
  }, [account, contract, explorerURL, getBlacklistStatus, setIsLoading, tokenDecimal])

  return transferToken;
}