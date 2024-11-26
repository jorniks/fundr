"use client"

import { Button } from "@/components/button";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { CampaignType } from '@/types'
import Image from "next/image"
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";


import { formatNumberScale, shortenAddress } from '@/functions/format'
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


const CampaignDetail = () => {
  const id = usePathname().replace('/campaigns/', '')
  const contract = useAppContract()
  const { account } = useWeb3React()
  const [tokenInfo, setTokenInfo ] = useRecoilState(tokenInfoObj)
  const [amountToContribute, setAmountToContribute] = useRecoilState(contributionAmount)
  const getCampaignDetails = useCampaignDetails()
  const contributeToCampaign = useContribute(tokenInfo)

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
  
    return () => {
      contract?.removeAllListeners()
    }
  }, [contract, loadData])

  return (
    <main className="container space-y-14 py-40">
      {!campaignInfo?.creator ?
        <LoadingCampaignDetails />
      :
        <section className="grid lg:grid-cols-6 lg:gap-x-8 xl:gap-x-12 lg:items-start justify-center">
          <aside className="lg:col-span-4 mt-10 lg:mt-0 space-y-4">
            <h1 className="">{campaignInfo?.title}</h1>

            <Image width={1000} height={1000} className="w-full object-cover object-center rounded-xl h-[32rem]" src={campaignInfo?.imageLink} alt={`${campaignInfo?.title} image`} />

            <div className="space-y-6">
              <article className="mt-3 text-base text-gray-300">{campaignInfo?.description}</article>

              <div className="grid sm:grid-cols-2 gap-y-4">
                <div className="flex items-center gap-x-3">
                  <Image width={500} height={500} className="size-8 rounded-full" alt="User Avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=320&h=320" />

                  <Link href={`${CHAIN_INFO[defaultChainId].explorer}/${campaignInfo?.creator}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-3 border-b border-dotted">Created by {shortenAddress(campaignInfo?.creator)}</Link>
                </div>

                <div className="flex items-center gap-2">
                  <i className="bi bi-calendar text-xl"></i>
                  <article><span className="font-semibold text-white">Start date:</span> {creationDate}</article>
                </div>
              </div>
            </div>
          </aside>

          <aside className="lg:col-span-2 pt-5 lg:pt-0 space-y-12">
            <div className="pt-8 space-y-10">
              <div className="space-y-2">
                <h3 className="">Funds Donated to this campaign</h3>

                <div className="flex items-center gap-2">
                  <h2> {formatNumberScale(amountRaised)}</h2>
                  <h2>/</h2>
                  <h2> {formatNumberScale(targetAmount)}</h2> {tokenInfo?.name}
                </div>

                <Progress value={percentageGotten} />
              </div>

              <CountdownTimer timestamp={Number(BigInt(campaignInfo?.endDate))} clockOnly={false} />
            </div>

            <div className="space-y-4">
              <input type="number" min={0} className="text-box" value={amountToContribute} onChange={(e) => setAmountToContribute(e.target.value)} placeholder="Enter amount to contribute" />
              
              {!account ?
                <NotConnectedWalletButton />
              :
                !amountToContribute ?
                  <Button className="w-full rounded text-base py-3 btn lime font-medium pointer-events-none opacity-50">Enter Amount</Button>
                :
                  <Button className="w-full rounded text-base py-3 btn lime font-medium" onClick={() => {contributeToCampaign(campaignInfo?.id,   tokenInfo?.decimal)}}>Donate</Button>
              }
            </div>
          </aside>
        </section>
      }
    </main>
  )
}

export default CampaignDetail