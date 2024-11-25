"use client"

import CampaignCard from '@/components/CampaignCard';
import { useMyCampaigns } from '@/hooks/read/useContractInfo'
import Link from 'next/link'

const MyCampaigns = () => {
  const myCampaigns = useMyCampaigns()

  
  return (
    <main className="container py-40 min-h-screen space-y-14">
      <div className="md:flex justify-between items-start">
        <div className='space-y-1.5'>
          <h2 className="text-2xl">My Campaigns</h2>
          <article className="">Here you can manage and track your campaigns.</article>
        </div>

        <Link href={"/create-campaign"} className="inline-flex items-center gap-x-3 btn lime p-1.5 ps-4">
          Create new campaign
          <span className="py-2 px-3 flex justify-center items-center gap-x-2 rounded-full bg-white/30 font-semibold text-white text-sm">
            <i className="bi bi-arrow-up-right"></i>
          </span>
        </Link>
      </div>

      <div>
        {myCampaigns?.length === 0 && (
          <div className="text-center space-y-3">
            <i className="bi bi-emoji-frown-fill text-3xl"></i>
            <h2 className="text-xl">No Campaigns Available</h2>
            <article className="">You haven&apos;t created any campaigns yet. Start by creating your first campaign to see it listed here!</article>
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-x-6">
        {myCampaigns?.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </main>
  )
}

export default MyCampaigns