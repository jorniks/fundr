import { useWeb3React } from "@web3-react/core"
import { useAppContract } from "../services/useContract"
import { useEffect, useState } from "react"
import { CampaignStatus, CampaignType } from "@/types"
import { placeholderCampaign } from "@/lib/utils"
import { convertToDecimalValue } from "@/functions/misc-functions"

export const useActiveCampaigns = () => {
  const contract = useAppContract()
  const [activeCampaigns, setActiveCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchActiveCampaigns = async () => {
      try {
        const campaigns: CampaignType[] = await contract?.getAllCampaigns()
        const filteredActiveEvents = campaigns?.filter(({ endDate, status, goal, totalRaised, tokenDecimals }) => (Number(BigInt(endDate)) * 1000 > Date.now() && CampaignStatus[status] === 'Active' && Number(BigInt(totalRaised)) < convertToDecimalValue(String(goal), tokenDecimals)));
        
        if (filteredActiveEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }
        
        const sortedArrayOfEvents = [...filteredActiveEvents]?.sort(
          (currentEvent, nextEvent) => Number(BigInt(currentEvent?.endDate)) - Number(BigInt(nextEvent?.endDate))
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
        const campaigns: CampaignType[] = await contract?.getAllCampaigns()
        const filteredEndedEvents = campaigns?.filter(({ endDate, status, goal, totalRaised, tokenDecimals }) => (Number(BigInt(endDate)) * 1000 < Date.now() || CampaignStatus[status] !== 'Active' || Number(BigInt(totalRaised)) >= convertToDecimalValue(String(goal), tokenDecimals)));

        if (filteredEndedEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredEndedEvents]?.sort(
          (currentEvent, nextEvent) => Number(BigInt(nextEvent?.endDate)) - Number(BigInt(currentEvent?.endDate))
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

export const useMyActiveCampaigns = () => {
  const { account } = useWeb3React()
  const contract = useAppContract()
  const [myCampaigns, setMyCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const campaigns: CampaignType[] = await contract?.getCampaignsByUser(account)
        const myFilteredEvents = campaigns?.filter(({ endDate, status, goal, totalRaised, tokenDecimals }) => (Number(BigInt(endDate)) * 1000 > Date.now() && CampaignStatus[status] === 'Active' && Number(BigInt(totalRaised)) < convertToDecimalValue(String(goal), tokenDecimals)));

        if (myFilteredEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...myFilteredEvents]?.sort(
          (currentEvent, nextEvent) => Number(BigInt(currentEvent?.endDate)) - Number(BigInt(nextEvent?.endDate))
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

export const useMyEndedCampaigns = () => {
  const { account } = useWeb3React()
  const contract = useAppContract()
  const [myCampaigns, setMyCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const campaigns: CampaignType[] = await contract?.getCampaignsByUser(account)
        const myFilteredEvents = campaigns?.filter(({ endDate, status, goal, totalRaised, tokenDecimals }) => (Number(BigInt(endDate)) * 1000 < Date.now() || CampaignStatus[status] !== 'Active' || Number(BigInt(totalRaised)) >= convertToDecimalValue(String(goal), tokenDecimals)));

        if (myFilteredEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...myFilteredEvents]?.sort(
          (currentEvent, nextEvent) => Number(BigInt(nextEvent?.endDate)) - Number(BigInt(currentEvent?.endDate))
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

export const useMyFundedCampaigns = () => {
  const { account } = useWeb3React()
  const contract = useAppContract()
  const [myCampaigns, setMyCampaigns] = useState<CampaignType[]>([])
  const [loadingCampaigns, setLoadingCampaigns] = useState<CampaignType[]>(Array.from({ length: 6 }, (_, index): CampaignType => (placeholderCampaign)))

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const campaigns: CampaignType[] = await contract?.getCampaignsByUser(account)
        const filteredMyEvents = campaigns?.filter(({ goal, totalRaised, tokenDecimals }) => Number(BigInt(totalRaised)) >= convertToDecimalValue(String(goal), tokenDecimals));

        if (filteredMyEvents?.length === 0) {
          setLoadingCampaigns(prev => (prev.length > 0 ? [] : prev));
        }

        const sortedArrayOfEvents = [...filteredMyEvents]?.sort(
          (currentEvent, nextEvent) => Number(BigInt(currentEvent?.endDate)) - Number(BigInt(nextEvent?.endDate))
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