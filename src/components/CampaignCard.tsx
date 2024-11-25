import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/button'
import { ApprovalType, CampaignType } from '@/types'
import { formatNumberScale, shortenAddress } from '@/functions/format'
import CountdownTimer from './ui/count-down-timer'
import { convertToDecimalValue, retrievePreferredToken } from '@/functions/misc-functions'
import LoadingCard from './LoadingCard'
import { Progress } from './ui/progress'
import { useApprovalState } from '@/hooks/useApproveCallback'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import NotConnectedWalletButton from './WalletButtons/NotConnected'
import { useContractWrite } from '@/hooks/write/useContractWrite'

const CampaignCard = ({ campaign }: { campaign: CampaignType }) => {
  const { account } = useWeb3React()
  const { contributeToCampaign } = useContractWrite()
  const tokenInfo = retrievePreferredToken(campaign?.preferredToken)
  const targetAmount = convertToDecimalValue(String(campaign?.goal), tokenInfo?.decimal)
  const amountRaised = convertToDecimalValue(String(campaign?.totalRaised), tokenInfo?.decimal)
  const percentageGotten = Math.round((amountRaised * 100) / targetAmount)
  const [amountToContribute, setAmountToContribute] = useState<string>("")
  const [approvalState, approveSpend] = useApprovalState(amountToContribute, tokenInfo)


  if (!campaign?.creator) return <LoadingCard />

  return (
    <Dialog>
      <DialogTrigger className="">
        <div className="flex flex-col h-full border border-white/5 hover:border-transparent hover:shadow-lg transition duration-300 rounded-lg p-5 bg-white/10 text-justify">
          <Image width={100} height={55} className="w-full object-cover rounded-md h-56" alt={`${campaign?.title} campaign image`} src={campaign?.imageLink} />

          <div className="mt-2 flex items-center gap-x-3">
            <Image width={100} height={100} className="size-8 rounded-full" alt="User Avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=facearea&facepad=2&w=320&h=320" />
            <h5 className="text-sm text-gray-300">{shortenAddress(campaign?.creator)}</h5>
          </div>
          
          <div className="space-y-1 my-4 flex-1">
            <h3 className="">{campaign?.title}</h3>

            <article className="text-sm">{`${(campaign?.description).substring(0, 90).trim()}...`}</article>
          </div>

          <CountdownTimer timestamp={Number(BigInt(campaign?.endDate))} clockOnly={false} />

          <div className="flex justify-between items-center font-medium mt-3">
            <h6 className="">Goal: {formatNumberScale(targetAmount)} <span className="text-xs">{tokenInfo?.name}</span></h6>
            <h6 className="">{percentageGotten}%</h6>
          </div>

          <Progress value={percentageGotten} />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{campaign?.title}</DialogTitle>
          <DialogDescription>{campaign?.description}</DialogDescription>
        </DialogHeader>
        
        <Image width={100} height={55} className="w-full object-cover rounded-md" alt={`${campaign?.title} campaign image`} src={campaign?.imageLink} />

        <div className="pb-6 gap-x-2 space-y-6 mt-8">
          <input type="number" className="text-box" placeholder='Donation amount' value={amountToContribute} onChange={(e) => setAmountToContribute(e.target.value)} />

          {!account ?
            <NotConnectedWalletButton />
          : approvalState === ApprovalType.UNKNOWN || approvalState === ApprovalType.NOT_APPROVED ?
              <Button className="w-full max-w-[50%] py-4 btn spray font-medium" onClick={approveSpend}>Approve</Button>
          :
            <Button className="w-full max-w-[50%] py-4 btn lime font-medium" onClick={() => contributeToCampaign(campaign?.id, amountToContribute, tokenInfo?.decimal)}>Donate</Button>
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CampaignCard