import { useWeb3React } from "@web3-react/core"
import { useLirioContract } from "../services/useContract";
import { LIRIO_TOKEN } from "@/constants/addresses/lirio-token";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import useTokenBalance from "../read-hooks/useTokenBalance";
import useTokenSymbol from "../read-hooks/useTokenSymbol";
import useTokenDecimal from "../read-hooks/useTokenDecimal";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { loadingState } from "@/app/state/atoms/atom";
import { formatToBigInt } from "@/functions/format";
import { toast } from "@/components/ui/use-toast";
import useBlacklistStatus from "../read-hooks/useBlacklistStatus";
import { errorCode } from "@/lib/metamask-error-codes";

export default function useTokenWrite() {
  const { account, chainId } = useWeb3React();
  const tokenAddress = LIRIO_TOKEN[chainId || defaultChainId]
  const blacklistStatus = useBlacklistStatus(tokenAddress)
  const contract = useLirioContract(tokenAddress)
  const walletBalance = useTokenBalance(tokenAddress);
  const tokenSymbol = useTokenSymbol(tokenAddress) || "LIR"
  const tokenDecimal = useTokenDecimal(tokenAddress)
  const setIsLoading = useSetRecoilState(loadingState)
  const explorerURL = CHAIN_INFO[Number(chainId || defaultChainId) as keyof typeof CHAIN_INFO].explorer

  
  const toggleWalletBlacklist = useCallback(
    async () => {
      setIsLoading(true)

      if (!account) {
        toast({ variant: "error", description: "No connected wallet!" })
        setIsLoading(false)
        return
      }

      try {
        const blacklistWallet = await contract?.blacklistWallet(!blacklistStatus)
        const blacklistReciept = await blacklistWallet?.wait()

        toast({
          variant: "success",
          description: `Wallet successfully ${blacklistStatus ? 'whitelisted' : 'blacklisted'}!`,
          action: { url: `${explorerURL}/tx/${blacklistReciept?.hash || blacklistReciept?.transactionHash}`, label: "View in explorer" }
        })
        setIsLoading(false)
      } catch (toggleWalletBlacklistError: {} | any) {
        toast({ variant: "error", description: errorCode[toggleWalletBlacklistError?.code as keyof typeof errorCode] })
        setIsLoading(false)
      }
    },
    [setIsLoading, account, contract, blacklistStatus, explorerURL],
  )

  const mintSpecificAmount = useCallback(
    async (amountToMint: string) => {
      setIsLoading(true)

      if (!account) {
        toast({ variant: "error", description: "No connected wallet!" })
        setIsLoading(false)
        return
      }

      if (blacklistStatus) {
        toast({ variant: "info", description: "Wallet is blacklisted!" })
        setIsLoading(false)
        return
      }
      
      if (!amountToMint) {
        toast({ variant: "info", description: "No mint amount entered!" })
        setIsLoading(false)
        return
      }

      const mintAmount = formatToBigInt(amountToMint, tokenDecimal)

      try {
        const minted = await contract?.mint(mintAmount)
        const mintedReceipt = await minted.wait()

        toast({
          variant: "success",
          description: `Token successfully minted!`,
          action: { url: `${explorerURL}/tx/${mintedReceipt?.hash || mintedReceipt?.transactionHash}`, label: "View in explorer" }
        })
        setIsLoading(false)
      } catch (mintSpecificAmountError: {} | any) {
        toast({ variant: "error", description: errorCode[mintSpecificAmountError?.code as keyof typeof errorCode] })
        setIsLoading(false)
      }
    },
    [account, blacklistStatus, contract, explorerURL, setIsLoading, tokenDecimal],
  )

  const mintMaxAmount = useCallback(
    async () => {
      setIsLoading(true)

      if (!account) {
        toast({ variant: "error", description: "No connected wallet!" })
        setIsLoading(false)
        return
      }

      if (blacklistStatus) {
        toast({ variant: "info", description: "Wallet is blacklisted!" })
        setIsLoading(false)
        return
      }

      try {
        const minted = await contract?.mintMax()
        const mintedReceipt = await minted.wait()

        toast({
          variant: "success",
          description: `Token successfully minted!`,
          action: { url: `${explorerURL}/tx/${mintedReceipt?.hash || mintedReceipt?.transactionHash}`, label: "View in explorer" }
        })
        setIsLoading(false)
      } catch (mintMaxAmountError: {} | any) {
        toast({ variant: "error", description: errorCode[mintMaxAmountError?.code as keyof typeof errorCode] })
        setIsLoading(false)
      }
    },
    [account, blacklistStatus, contract, explorerURL, setIsLoading],
  )

  const burnToken = useCallback(
    async (percentageToBurn: number) => {
      setIsLoading(true)
      
      if (!account) {
        toast({ variant: "error", description: "No connected wallet!" })
        setIsLoading(false)
        return
      }

      if (blacklistStatus) {
        toast({ variant: "info", description: "Wallet is blacklisted!" })
        setIsLoading(false)
        return
      }

      const amountToBurn = walletBalance * percentageToBurn
      const burnAmount = formatToBigInt(amountToBurn?.toString(), tokenDecimal)

      try {
        const burnt = await contract?.burn(burnAmount)
        const burntReceipt = await burnt.wait()

        toast({
          variant: "success",
          description: `${amountToBurn} ${tokenSymbol} token successfully burnt!`,
          action: { url: `${explorerURL}/tx/${burntReceipt?.hash || burntReceipt?.transactionHash}`, label: "View in explorer" }
        })
        setIsLoading(false)
      } catch (burnTokenError: {} | any) {
        toast({ variant: "error", description: errorCode[burnTokenError?.code as keyof typeof errorCode] })
        setIsLoading(false)
      }
    },
    [account, contract, explorerURL, setIsLoading, tokenDecimal, tokenSymbol, walletBalance],
  )

  return { toggleWalletBlacklist, mintSpecificAmount, mintMaxAmount, burnToken }
}