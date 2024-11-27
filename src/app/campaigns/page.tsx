'use client'

import ActiveCampaigns from '@/components/pages/ActiveCampaigns'
import EndedCampaigns from '@/components/pages/EndedCampaigns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Suspense } from 'react'

const Campaigns = () => {
  
  return (
    <main className="container py-36 min-h-screen space-y-14">
      <Tabs defaultValue='active'>
        <aside className="space-y-2 mb-4">
          <h2 className="text-3xl">Explore Live Campaigns</h2>
          <article className="">Explore a wide range of live projects where your contribution can make a real difference.</article>
        </aside>

        <TabsList className="shadow rounded-md divide-x border border-white overflow-hidden mb-10">
          <TabsTrigger className="px-8" value="active">Active</TabsTrigger>
          <TabsTrigger className="px-8" value="ended">Ended</TabsTrigger>
        </TabsList>

        <TabsContent value='active' className='px-0'>
          <Suspense>
            <ActiveCampaigns />
          </Suspense>
        </TabsContent>

        <TabsContent value='ended' className='px-0'>
          <Suspense>
            <EndedCampaigns />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}

export default Campaigns