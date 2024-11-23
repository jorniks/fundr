import CampaignCard from '@/components/CampaignCard'
import LoadingCard from '@/components/LoadingCard'

const Campaigns = () => {
  return (
    <main className="container space-y-14 py-40">
      <aside className="max-w-3xl mx-auto text-center space-y-2 md:space-y-4">
        <h2 className="">Explore Live Campaigns</h2>

        <article className="">
          Find and Back Campaigns That Need Your Help Now—Explore a wide range of live projects where your contribution can make a real difference.
        </article>
      </aside>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-x-6">
        <CampaignCard />

        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </main>
  )
}

export default Campaigns