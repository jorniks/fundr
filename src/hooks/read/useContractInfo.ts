import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useCallback, useEffect, useState } from "react"
import { CampaignType } from "@/types"

export const useContractInfo = () => {
  const { account } = useWeb3React()
  const contract = useAppContract()
  

  const getAllCampaigns = useCallback(
    async () => {
      try {
        const proposals = await contract?.getAllProposals();
        console.log('campaign', proposals);
        return proposals;
      } catch (getAllCampaignsError) {
        console.log('getAllCampaignsError', getAllCampaignsError);
      }
    }, [contract]
  )

  const getCampaignDetails = useCallback(
    async (proposalId: number) => {
      try {
        const campaignInfo = await contract?.getProposalDetails(proposalId)
        return campaignInfo;
      } catch (getCampaignDetailsError) {
        console.log('getCampaignDetailsError', getCampaignDetailsError);
      }
    }, [contract]
  )

  const getCampaignsByUser = useCallback(
    async () => {
      try {
        const campaignInfo = await contract?.getProposalsByUser(account)
        return campaignInfo;
      } catch (getMyCampaignsError) {
        console.log('getMyCampaignsError', getMyCampaignsError);
      }
    }, [account, contract]
  )

  const getSuccessfulCampaignsCount = useCallback(
    async () => {
      try {
        const campaignInfo = await contract?.getSuccessfulProposalsCount()
        return campaignInfo;
      } catch (getSuccessfulCampaignsCountError) {
        console.log('getSuccessfulCampaignsCountError', getSuccessfulCampaignsCountError);
      }
    }, [contract]
  )

  const getTotalFundsRaised = useCallback(
    async () => {
      try {
        const campaignInfo = await contract?.getTotalFundsRaised()
        return campaignInfo;
      } catch (getTotalFundsRaisedError) {
        console.log('getTotalFundsRaisedError', getTotalFundsRaisedError);
      }
    }, [contract]
  )

  const getUserContribution = useCallback(
    async (proposalId: number) => {
      try {
        const campaignInfo = await contract?.getUserContribution(proposalId, account)
        return campaignInfo;
      } catch (getUserContributionError) {
        console.log('getUserContributionError', getUserContributionError);
      }
    }, [account, contract]
  )

  return {
    getAllCampaigns,
    getCampaignDetails,
    getCampaignsByUser,
    getSuccessfulCampaignsCount,
    getTotalFundsRaised,
    getUserContribution
  }
}

export const useGetAllCampaigns = () => {
  const contract = useAppContract()
  const [activeCampaigns, setActiveCampaigns] = useState<CampaignType[]>([])
  const [loadingEvent, setLoadingEvent] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => ({
    id: index + 1,
    creator: "",
    description: "",
    endDate: 0,
    goal: 0,
    imageLink: "",
    isCancelled: false,
    isClaimed: false,
    preferredToken: "",
    title: "",
    totalRaised: 0,
  })))

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        const proposals = await contract?.getAllProposals()
        const filteredActiveEvents = proposals.filter((proposal: { endDate: number }) => proposal?.endDate * 1000 > Date.now());

        if (filteredActiveEvents.length === 0) {
          setLoadingEvent(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredActiveEvents].sort(
          (currentEvent, nextEvent) => currentEvent?.endDate - nextEvent?.endDate
        );

        setActiveCampaigns(sortedArrayOfEvents);
      } catch (getAllCampaignsError) {
        console.log('getAllCampaignsError', getAllCampaignsError);
      }
    }

    fetchActiveCampaigns()
  }, [contract])
  
  return !activeCampaigns?.length ? loadingEvent : activeCampaigns;
}