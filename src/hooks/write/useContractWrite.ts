import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useCallback } from "react"
import { useSetRecoilState } from "recoil"
import { loadingState } from "@/app/state/atoms/atom"
import { extractErrorMessage } from "@/functions/misc-functions"
import { toast } from "react-toastify"
import { toast as customToast } from "@/components/ui/use-toast"
import { CHAIN_INFO } from "@/lib/services/chain-config"
import { formatToBigInt } from "@/functions/format"

/*
cancelProposal
claimFunds
contribute
createProposal
withdrawContribution
*/

export const useContractWrite = () => {
  const { account, chainId } = useWeb3React()
  const contract = useAppContract()
  const setIsLoading = useSetRecoilState(loadingState)
  const explorerURL = chainId && CHAIN_INFO[chainId].explorer

  const createNewCampaign = useCallback(
    async (formValues: any) => {
      const { title, description, imageLink, goal, deadline, token, decimal } = formValues;
      setIsLoading(true)

      if (!account) {
        toast.error("No wallet connected")
        setIsLoading(false)
        return
      }

      if (!title) {
        toast.info("Campaign title is required")
        setIsLoading(false)
        return
      }

      if (!description) {
        toast.info("Campaign desription is required")
        setIsLoading(false)
        return
      }

      if (!imageLink) {
        toast.info("Campaign image is required")
        setIsLoading(false)
        return
      }

      if (!goal) {
        toast.info("Campaign goal is required")
        setIsLoading(false)
        return
      }

      if (!deadline) {
        toast.info("Campaign deadline is required")
        setIsLoading(false)
        return
      }

      if (!token) {
        toast.info("Campaign preferred token is required")
        setIsLoading(false)
        return
      }
      
      try {
        const amountGoal = formatToBigInt(goal, decimal)
        const createdCampaign = await contract?.createProposal(title, description, imageLink, amountGoal, (new Date(deadline).getTime() / 1000), token);
        const creationReceipt = await createdCampaign?.wait();

        customToast({
          variant: "success",
          description: "Campaign successfully created",
          action: {url: `${explorerURL}/tx/${creationReceipt?.hash || creationReceipt?.transactionHash}`, label: "View in explorer"}
        })
        setIsLoading(false)
        return true
      } catch (createCampaignError: {} | any) {
        const errorMessage = extractErrorMessage(createCampaignError);
        toast.error(errorMessage)
        setIsLoading(false)
        return false
      }
    }, [account, contract, explorerURL, setIsLoading]
  )

  const contributeToCampaign = useCallback(
    async (proposalId: number, contribution: string, decimal: number) => {
      setIsLoading(true)

      if (!account) {
        toast.error("No wallet connected")
        setIsLoading(false)
        return
      }

      if (!contribution) {
        toast.info("Contribution amount is required")
        setIsLoading(false)
        return
      }
      
      try {
        const amountGoal = formatToBigInt(contribution, decimal)
        const createdCampaign = await contract?.contribute(proposalId, amountGoal);
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
    }, [account, contract, explorerURL, setIsLoading]
  )

  return {
    createNewCampaign,
    contributeToCampaign
  }
}