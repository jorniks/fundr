"use client"

import { Button } from "@/components/button";
import { CHAIN_INFO, defaultChainId } from "@/lib/services/chain-config";
import { ApprovalType, CampaignType } from '@/types'
import Image from "next/image"
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";


import { formatNumberScale, shortenAddress } from '@/functions/format'
import CountdownTimer from '@/components/ui/count-down-timer'
import { Progress } from '@/components/ui/progress'
import { convertToDecimalValue, retrievePreferredToken } from '@/functions/misc-functions'
import { useApprovalState } from '@/hooks/useApproveCallback'
import { useWeb3React } from '@web3-react/core'
import NotConnectedWalletButton from '@/components/WalletButtons/NotConnected'
import { useContractWrite } from '@/hooks/write/useContractWrite'
import LoadingCampaignDetails from "@/components/LoadingCampaignDetails";
import { usePathname } from "next/navigation";
import { useCampaignDetails } from "@/hooks/read/useContractInfo";
import moment from "moment";


const CampaignDetail = () => {
  const id = usePathname().replace('/campaigns/', '')
  const { account } = useWeb3React()
  const { contributeToCampaign } = useContractWrite()
  const campaignInfo: CampaignType = useCampaignDetails(Number(id));
  const tokenInfo = retrievePreferredToken(campaignInfo?.preferredToken)
  const targetAmount = convertToDecimalValue(String(campaignInfo?.goal), campaignInfo?.tokenDecimals)
  const amountRaised = convertToDecimalValue(String(campaignInfo?.totalRaised), campaignInfo?.tokenDecimals)
  const percentageGotten = Math.round((amountRaised * 100) / targetAmount)
  const [amountToContribute, setAmountToContribute] = useState<string>("")
  const [approvalState, approveSpend] = useApprovalState(amountToContribute, tokenInfo)
  const creationDate = moment.unix(Number(BigInt(campaignInfo?.createdAt))).format("MMM DD, YYYY")

  return (
    <main className="container space-y-14 py-40">
      {!campaignInfo?.creator ?
        <LoadingCampaignDetails />
      :
        <section className="grid lg:grid-cols-6 lg:gap-x-8 xl:gap-x-12 lg:items-start justify-center">
          <aside className="lg:col-span-4 mt-10 lg:mt-0 space-y-4">
            <h1 className="">{campaignInfo?.title}</h1>

            <Image width={100} height={30} className="w-full object-cover rounded-xl h-96" src={campaignInfo?.imageLink} alt="Hero Image" />

            <div className="space-y-6">
              <article className="mt-3 text-base text-gray-300">{campaignInfo?.description}</article>

              <div className="grid sm:grid-cols-2 gap-y-4">
                <div className="flex items-center gap-x-3">
                  <Image width={100} height={100} className="size-8 rounded-full" alt="User Avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=320&h=320" />

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
              <input type="number" className="text-box" value={amountToContribute} onChange={(e) => setAmountToContribute(e.target.value)} placeholder="Enter amount ..." />
              
              {!account ?
                <NotConnectedWalletButton />
                : approvalState === ApprovalType.UNKNOWN || approvalState === ApprovalType.NOT_APPROVED ?
                  <Button className="w-full rounded text-base py-3 btn spray font-medium" onClick={approveSpend}>Approve</Button>
                  :
                  <Button className="w-full rounded text-base py-3 btn lime font-medium" onClick={() => contributeToCampaign(1, amountToContribute, tokenInfo?.decimal)}>Donate</Button>
              }
            </div>
          </aside>
        </section>
      }
    </main>
  )
}

export default CampaignDetail