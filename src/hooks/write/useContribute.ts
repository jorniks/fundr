import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useCallback } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { contributionAmount, loadingState } from "@/app/state/atoms/atom"
import { extractErrorMessage } from "@/functions/misc-functions"
import { toast } from "react-toastify"
import { toast as customToast } from "@/components/ui/use-toast"
import { CHAIN_INFO } from "@/lib/services/chain-config"
import { formatToBigInt } from "@/functions/format"
import { useApprovalState } from "../useApproveCallback"
import { ApprovalType } from "@/types"


export const useContribute = (tokenInfo: any) => {
  const { account, chainId } = useWeb3React()
  const contribution = useRecoilValue(contributionAmount)
  const [approvalState, approveSpend] = useApprovalState(tokenInfo)
  const contract = useAppContract()
  const setIsLoading = useSetRecoilState(loadingState)
  const explorerURL = chainId && CHAIN_INFO[chainId].explorer

  const contributeToCampaign = useCallback(
    async (proposalId: number, decimal: number) => {
      if (!account) {
        toast.error("No wallet connected")
        setIsLoading(false)
        return false
      }

      if (!contribution) {
        toast.info("Contribution amount is required")
        setIsLoading(false)
        return false
      }
      
      if (approvalState === ApprovalType.UNKNOWN || approvalState === ApprovalType.NOT_APPROVED) {
        await approveSpend()
      }
      
      setIsLoading(true)

      try {
        const contributionAmount = formatToBigInt(contribution, decimal)
        const createdCampaign = await contract?.contribute(proposalId, contributionAmount);
        const creationReceipt = await createdCampaign?.wait();

        customToast({
          variant: "success",
          description: "Contribution successfully sent",
          action: {url: `${explorerURL}/tx/${creationReceipt?.hash || creationReceipt?.transactionHash}`, label: "View in explorer"}
        })
        setIsLoading(false)
        return true
      } catch (contributeToCampaignError: {} | any) {
        const errorMessage = extractErrorMessage(contributeToCampaignError);
        toast.error(errorMessage)
        setIsLoading(false)
        return false
      }
    }, [account, approvalState, approveSpend, contract, contribution, explorerURL, setIsLoading]
  )

  return contributeToCampaign
}