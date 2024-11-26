import { useAppContract } from "../services/useContract"
import { useCallback } from "react"

export const useCampaignDetails = () => {
  const contract = useAppContract()

  const getCampaignDetails = useCallback(
    async (proposalId: number) => {
      try {
        const campaignInfo = await contract?.getCampaignDetails(proposalId)
        return campaignInfo;
      } catch (getCampaignDetailsError) {
        console.log('getCampaignDetailsError', getCampaignDetailsError);
      }
    }, [contract]
  )

  return getCampaignDetails
}