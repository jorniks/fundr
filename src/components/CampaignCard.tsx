import Image from 'next/image'
import { CampaignType } from '@/types'
import { formatNumberScale, shortenAddress } from '@/functions/format'
import CountdownTimer from './ui/count-down-timer'
import { convertToDecimalValue, retrievePreferredToken } from '@/functions/misc-functions'
import LoadingCard from './LoadingCard'
import { Progress } from './ui/progress'
import Link from 'next/link'

const CampaignCard = ({ campaign }: { campaign: CampaignType }) => {
  const tokenInfo = retrievePreferredToken(campaign?.preferredToken)
  const targetAmount = convertToDecimalValue(String(campaign?.goal), tokenInfo?.decimal)
  const amountRaised = Number(BigInt(campaign?.totalRaised))
  const percentageGotten = Math.round((amountRaised * 100) / targetAmount)


  if (!campaign?.creator) return <LoadingCard />

  return (
    <Link href={`/campaigns/${campaign?.id}`}>
      <div className="flex flex-col h-full border border-white/5 hover:border-transparent hover:shadow-lg transition duration-300 rounded-lg p-5 bg-white/10 text-justify">
        <Image width={1000} height={55} className="w-full object-cover rounded-md h-56" alt={`${campaign?.title} campaign image`} src={campaign?.imageLink} />

        <div className="mt-2 flex items-center gap-x-3">
          <div className="bg-spray-700 shadow-white shadow-inner rounded-full flex items-center justify-center size-7">
            <i className="bi bi-person-bounding-box"></i>
          </div>
          <h5 className="text-sm text-gray-300">{shortenAddress(campaign?.creator)}</h5>
        </div>

        <div className="space-y-1 my-4 flex-1">
          <h3 className="">{campaign?.title}</h3>

          <article className="text-sm">{`${(campaign?.description).substring(0, 90).trim()}...`}</article>
        </div>

        <CountdownTimer timestamp={Number(BigInt(campaign?.endDate))} clockOnly={false} />

        <div className="flex justify-between items-center font-medium mt-3">
          <h6 className="">{formatNumberScale(amountRaised)} / {formatNumberScale(targetAmount)} <span className="text-xs">{tokenInfo?.name}</span></h6>
          <h6 className="">{percentageGotten}%</h6>
        </div>

        <Progress value={percentageGotten} />
      </div>
    </Link>
  )
}

export default CampaignCard