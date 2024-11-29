"use client"

import { Button } from "@/components/button";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { CampaignStatus, CampaignType } from '@/types'
import Image from "next/image"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


import { formatNumber, formatNumberScale, shortenAddress } from '@/functions/format'
import CountdownTimer from '@/components/ui/count-down-timer'
import { Progress } from '@/components/ui/progress'
import { convertToDecimalValue, retrievePreferredToken } from '@/functions/misc-functions'
import { useWeb3React } from '@web3-react/core'
import NotConnectedWalletButton from '@/components/WalletButtons/NotConnected'
import LoadingCampaignDetails from "@/components/LoadingCampaignDetails";
import { usePathname } from "next/navigation";
import { useCampaignDetails } from "@/hooks/read/useCampaignDetails";
import moment from "moment";
import { useContribute } from "@/hooks/write/useContribute";
import { useRecoilState } from "recoil";
import { contributionAmount, tokenInfoObj } from "@/app/state/atoms/atom";
import { useAppContract } from "@/hooks/services/useContract";
import { useClaimFunds } from "@/hooks/write/useClaimFunds";
import { useWithdrawContribution } from "@/hooks/write/useWithdrawContribution";
import { useCancelCampaign } from "@/hooks/write/useCancelCampaign";
import { ScrollArea } from "@/components/ui/scroll-area";


const CampaignDetail = () => {
  const id = usePathname().replace('/campaigns/', '')
  const contract = useAppContract()
  const { account } = useWeb3React()
  const [tokenInfo, setTokenInfo ] = useRecoilState(tokenInfoObj)
  const [amountToContribute, setAmountToContribute] = useRecoilState(contributionAmount)
  const getCampaignDetails = useCampaignDetails()
  const contributeToCampaign = useContribute(tokenInfo)
  const claimFunds = useClaimFunds()
  const withdrawContribution = useWithdrawContribution()
  const cancelCampaign = useCancelCampaign()

  const [targetAmount, setTargetAmount] = useState<number>(0)
  const [amountRaised, setAmountRaised] = useState<number>(0)
  const [percentageGotten, setPercentageGotten] = useState<number>(0)
  const [creationDate, setCreationDate] = useState<string>('')
  const [campaignInfo, setCampaignInfo] = useState<CampaignType>()

  const loadData = useCallback(
    () => {
      getCampaignDetails(Number(id)).then(response => {
        if (response?.title) {
          setTokenInfo(retrievePreferredToken(response.preferredToken))
          const goal = convertToDecimalValue(String(response?.goal), response?.tokenDecimals)
          const raised = Number(BigInt(response?.totalRaised))
          setTargetAmount(goal)
          setAmountRaised(raised)
          setPercentageGotten(Math.round((raised * 100) / goal))
          setCreationDate(moment.unix(Number(BigInt(response?.createdAt))).format("MMM DD, YYYY"))
          setCampaignInfo(response)
          setAmountToContribute('')
        }
      })
    }, [getCampaignDetails, id, setAmountToContribute, setTokenInfo]
  )

  useEffect(() => {
    loadData()

    contract?.on("ContributionMade", loadData)
    contract?.on("CampaignCancelled", loadData)
    contract?.on("FundsClaimed", loadData)
  
    return () => {
      contract?.removeAllListeners()
    }
  }, [contract, loadData])

  return (
    <main className="container space-y-14 py-40">
      {!campaignInfo?.creator ?
        <LoadingCampaignDetails />
      :
        <section className="grid lg:grid-cols-6 lg:gap-8 xl:gap-12 lg:items-start justify-center">
          <aside className="lg:col-span-4 mt-10 lg:mt-0 space-y-4">
            <h1 className="">{campaignInfo?.title}</h1>

            <Image width={1000} height={1000} className="w-full object-cover object-center rounded-xl h-[32rem]" src={campaignInfo?.imageLink} alt={`${campaignInfo?.title} image`} />

            <div className="space-y-6">
              <article className="mt-3 text-base text-gray-300">{campaignInfo?.description}</article>

              <div className="grid sm:grid-cols-2 gap-y-4">
                <div className="flex items-center gap-x-3">
                  <div className="bg-spray-700 shadow-white shadow-inner rounded-full flex items-center justify-center size-8">
                    <i className="bi bi-person-bounding-box"></i>
                  </div>

                  <Link href={`${CHAIN_INFO[defaultChainId].explorer}/address/${campaignInfo?.creator}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-3 border-b border-dotted">Created by {shortenAddress(campaignInfo?.creator)}</Link>
                </div>

                <div className="flex items-center gap-2">
                  <i className="bi bi-calendar text-xl"></i>
                  <article><span className="font-semibold text-white">Start date:</span> {creationDate}</article>
                </div>
              </div>
            </div>
          </aside>

          <aside className="lg:col-span-2 pt-5 lg:pt-0 space-y-12">
            <div className="pt-8">
              <div className="space-y-2 mb-10">
                <h3 className="">Funds Donated to this campaign</h3>

                <div className="flex items-end justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2> {formatNumberScale(amountRaised)}</h2>
                    <h2>/</h2>
                    <h2> {formatNumberScale(targetAmount)}</h2> {tokenInfo?.name}
                  </div>

                  <span className="font-medium text-sm"> {percentageGotten}%</span>
                </div>

                <Progress value={percentageGotten < 100 ? percentageGotten : 100} />
              </div>

              {(CampaignStatus[campaignInfo?.status] === 'Active' && amountRaised < targetAmount) ?
                <CountdownTimer timestamp={Number(BigInt(campaignInfo?.endDate))} clockOnly={false} />
              :
                <article className="sm:text-xl">
                  {CampaignStatus[campaignInfo?.status] === 'Cancelled' ?
                    <span className="">This campaign was cancelled by the creator. Donated funds have been returned to the donors.</span>
                  : CampaignStatus[campaignInfo?.status] === 'Claimed' ?
                    <span className="">Donated campaign funds have been claimed by the campaign creator.</span>
                  :
                    <span className="">The donation period for this campaign has ended.</span>
                  }
                </article>
              }
            </div>

            {(campaignInfo?.creator !== account) ?
              <div className="">
                {(CampaignStatus[campaignInfo?.status] === "Active" && amountRaised < targetAmount) &&
                  <div className="space-y-4">
                    <input type="number" min={0} className="text-box" value={amountToContribute} onChange={(e) => setAmountToContribute(e.target.value)} placeholder="Enter amount to contribute" />
                    
                    {!account ?
                      <NotConnectedWalletButton buttonClass="rounded-sm w-full" />
                    :
                      <Button className={`w-full text-base py-3 btn lime font-medium ${!amountToContribute && "pointer-events-none opacity-50"}`}
                        onClick={() => amountToContribute && contributeToCampaign(campaignInfo?.id, tokenInfo?.decimal)}
                      >{!amountToContribute ? "Enter Donation" : "Send Donation"}</Button>
                    }
                  </div>
                }
              </div>
            :
              <div className="">
                {(CampaignStatus[campaignInfo?.status] !== "Claimed" && amountRaised >= targetAmount) || (CampaignStatus[campaignInfo?.status] !== "Claimed" && Number(BigInt(campaignInfo?.endDate)) * 1000 < Date.now())?
                  <Button className="btn lime w-full py-3" onClick={() => claimFunds(campaignInfo?.id)}>Claim Funds</Button>
                : (CampaignStatus[campaignInfo?.status] === 'Active' && amountRaised < targetAmount && Number(BigInt(campaignInfo?.endDate)) * 1000 > Date.now()) &&
                  <Button className="btn lime w-full py-3" onClick={() => cancelCampaign(campaignInfo?.id)}>Cancel Campaign</Button>
                }
              </div>
            }
          </aside>

          <aside className="lg:col-span-4 p-4 ring-2 ring-gray-700 rounded-lg">
            <h2 className="pb-6">Contributors</h2>

            <ScrollArea className="h-96">
              {campaignInfo?.contributions?.length ?
                campaignInfo?.contributions?.map((contributor, index) => (
                  <article key={index} className="flex items-start justify-between py-3.5">
                    <aside className="flex items-start gap-x-4">
                      <h6 className="bg-lime-700 shadow-white shadow-inner rounded-full flex items-center justify-center size-8">
                        <i className="bi bi-person-bounding-box"></i>
                      </h6>

                      <div className="font-semibold">
                        {shortenAddress(contributor?.contributor)}
                        <span className="block text-xs font-normal">{moment.unix(Number(BigInt(contributor?.timestamp))).format("MMM DD, YYYY | H:m")}</span>
                      </div>
                    </aside>

                    <aside className="text-sm">
                      <span className="text-xl">{formatNumber(Number(BigInt(contributor?.amount)))}</span> {tokenInfo?.name}
                    </aside>
                  </article>
                ))
              :
                <article className="py-3 font-medium text-lg">No contributions have been made yet</article>
              }
            </ScrollArea>
          </aside>
        </section>
      }
    </main>
  )
}

export default CampaignDetail