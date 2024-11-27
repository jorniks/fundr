"use client"

import MyActiveCampaigns from '@/components/pages/MyActiveCampaigns';
import MyEndedCampaigns from '@/components/pages/MyEndedCampaigns';
import MyFundedCampaigns from '@/components/pages/MyFundedCampaigns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link'
import { Suspense } from 'react';

const MyCampaigns = () => {

  
  return (
    <main className="container py-36 min-h-screen space-y-14">
      <Tabs defaultValue='active'>
        <div className="md:flex justify-between items-start mb-4">
          <div className='space-y-2'>
            <h2 className="text-3xl">My Campaigns</h2>
            <article className="">Here you can manage and track your campaigns.</article>
          </div>

          <Link href={"/create-campaign"} className="inline-flex items-center gap-x-3 btn lime p-1.5 ps-4">
            Create new campaign
            <span className="py-2 px-3 flex justify-center items-center gap-x-2 rounded-full bg-white/30 font-semibold text-white text-sm">
              <i className="bi bi-arrow-up-right"></i>
            </span>
          </Link>
        </div>

        <TabsList className="shadow rounded-md divide-x border border-white overflow-hidden mb-10">
          <TabsTrigger className="px-8" value="active">Active</TabsTrigger>
          <TabsTrigger className="px-8" value="ended">Ended</TabsTrigger>
          <TabsTrigger className="px-8" value="funded">Funded</TabsTrigger>
        </TabsList>

        <TabsContent value='active' className='px-0'>
          <Suspense>
            <MyActiveCampaigns />
          </Suspense>
        </TabsContent>

        <TabsContent value='ended' className='px-0'>
          <Suspense>
            <MyEndedCampaigns />
          </Suspense>
        </TabsContent>

        <TabsContent value='funded' className='px-0'>
          <Suspense>
            <MyFundedCampaigns />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default MyCampaigns