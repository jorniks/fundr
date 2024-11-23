"use client"

import CampaignCard from '@/components/CampaignCard';
import LoadingCard from '@/components/LoadingCard';
import Link from 'next/link'
import { useState } from 'react'

const MyCampaigns = () => {
  const [campaignList, setCampaignList] = useState([]);
  
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
        {campaignList.length === 0 && (
          <div className="text-center space-y-3">
            <i className="bi bi-emoji-frown-fill text-3xl"></i>
            <h2 className="text-xl">No Campaigns Available</h2>
            <article className="">You haven't created any campaigns yet. Start by creating your first campaign to see it listed here!</article>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {false ? (
          Array.from({ length: 2 }).map((_, index) => (
            <LoadingCard key={index} />
          ))
        ) : (
          <>
            {campaignList.map((campaign, index) => (
              <CampaignCard key={index} />
            ))}
          </>
        )}
      </div>
    </main>
  )
}

export default MyCampaigns