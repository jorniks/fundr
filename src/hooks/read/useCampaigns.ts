import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useEffect, useState } from "react"
import { CampaignType } from "@/types"
import { placeholderCampaign } from "@/lib/utils"

export const useActiveCampaigns = () => {
  const contract = useAppContract()
  const [activeCampaigns, setActiveCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        const campaigns = await contract?.getAllCampaigns()
        const filteredActiveEvents = campaigns?.filter((proposal: { endDate: number }) => proposal?.endDate * 1000 > Date.now());

        if (filteredActiveEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredActiveEvents]?.sort(
          (currentEvent, nextEvent) => currentEvent?.endDate - nextEvent?.endDate
        );

        setActiveCampaigns(sortedArrayOfEvents);
      } catch (getActiveCampaignsError) {
        console.log('getActiveCampaignsError', getActiveCampaignsError);
      }
    }

    fetchActiveCampaigns()
  }, [contract])
  
  return !activeCampaigns?.length ? loadingCampaigns : activeCampaigns;
}

export const useEndedCampaigns = () => {
  const contract = useAppContract()
  const [endedCampaigns, setEndedCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchEndedCampaigns = async () => {
      try {
        const campaigns = await contract?.getAllCampaigns()
        const filteredEndedEvents = campaigns?.filter((proposal: { endDate: number }) => proposal?.endDate * 1000 < Date.now());

        if (filteredEndedEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredEndedEvents]?.sort(
          (currentEvent, nextEvent) => currentEvent?.endDate - nextEvent?.endDate
        );

        setEndedCampaigns(sortedArrayOfEvents);
      } catch (getEndedCampaignsError) {
        console.log('getEndedCampaignsError', getEndedCampaignsError);
      }
    }

    fetchEndedCampaigns()
  }, [contract])
  
  return !endedCampaigns?.length ? loadingCampaigns : endedCampaigns;
}

export const useMyCampaigns = () => {
  const { account } = useWeb3React()
  const contract = useAppContract()
  const [myCampaigns, setMyCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const campaigns = await contract?.getCampaignsByUser(account)
        const filteredMyEvents = campaigns?.filter((proposal: { endDate: number }) => proposal?.endDate * 1000 > Date.now());

        if (filteredMyEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredMyEvents]?.sort(
          (currentEvent, nextEvent) => currentEvent?.endDate - nextEvent?.endDate
        );

        setMyCampaigns(sortedArrayOfEvents);
      } catch (getMyCampaignsError) {
        console.log('getMyCampaignsError', getMyCampaignsError);
      }
    }

    fetchMyCampaigns()
  }, [account, contract])
  
  return !myCampaigns?.length ? loadingCampaigns : myCampaigns;
}