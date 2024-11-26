import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useCallback } from "react"
import { useSetRecoilState } from "recoil"
import { loadingState } from "@/app/state/atoms/atom"
import { extractErrorMessage } from "@/functions/misc-functions"
import { toast } from "react-toastify"
import { toast as customToast } from "@/components/ui/use-toast"
import { CHAIN_INFO } from "@/lib/services/chain-config"


export const useWithdrawContribution = () => {
  const { account, chainId } = useWeb3React()
  const contract = useAppContract()
  const setIsLoading = useSetRecoilState(loadingState)
  const explorerURL = chainId && CHAIN_INFO[chainId].explorer

  const withdrawContribution = useCallback(
    async (proposalId: number) => {
      if (!account) {
        toast.error("No wallet connected")
        setIsLoading(false)
        return false
      }
      
      setIsLoading(true)

      try {
        const withdrawFund = await contract?.withdrawContribution(proposalId);
        const withdrawalReceipt = await withdrawFund?.wait();

        customToast({
          variant: "success",
          description: "Funds successfully withdrawn",
          action: {url: `${explorerURL}/tx/${withdrawalReceipt?.hash || withdrawalReceipt?.transactionHash}`, label: "View in explorer"}
        })
        setIsLoading(false)
        return true
      } catch (withdrawContributionError: {} | any) {
        const errorMessage = extractErrorMessage(withdrawContributionError);
        toast.error(errorMessage)
        setIsLoading(false)
        return false
      }
    }, [account, contract, explorerURL, setIsLoading]
  )

  return withdrawContribution
}