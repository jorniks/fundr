"use client"

import CampaignsSection from "@/components/CampaignsSection"
import HowItWorksComponent from "@/components/HowItWorks"
import Link from "next/link"

const Home = () => {
  return (
    <main className="space-y-20">
      <section className="container space-y-20 z-10 pt-48">
        <div className="space-y-8 text-center max-w-3xl mx-auto">
          <h1 className="">Join Hands, Share the Load, Create Change</h1>

          <article className="text-sm md:text-base font-light">
            Fundr empowers collective success, harness the power of community to fund your vision, contribute to others, and track progress transparently on the blockchain.
          </article>
        </div>

        <div className="text-center">
          <Link href={"/create-campaign"} className="inline-flex justify-center items-center gap-x-3 btn lime py-4 px-6">
            Start Your Campaign <i className="bi  bi-arrow-right"></i>
          </Link>
        </div>
      </section>

      <section className="container grid lg:grid-cols-3 gap-8 lg:gap-12">
        <aside className="lg:col-span-1 text-center md:text-start space-y-2 md:space-y-4">
          <h2 className="">Features of Fundr</h2>
          
          <article className="">
            Fundr offers a powerful platform to bring your projects to life with ease. Discover the core features designed to support your campaign from start to finish.
          </article>
        </aside>

        <aside className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-x-5">
              <i className="bi bi-display text-2xl text-lime-500"> </i>
              
              <div className="space-y-2">
                <h3 className="">Transparent Tracking</h3>

                <article className="">
                  Monitor your campaign&apos;s progress with real-time updates and blockchain transparency, ensuring full visibility and accountability.
                </article>
              </div>
            </div>

            <div className="flex gap-x-5">
              <i className="bi bi-currency-dollar text-2xl text-lime-500"> </i>
              
              <div className="space-y-2">
                <h3 className="">Secure Transactions</h3>

                <article className="">
                  Enjoy secure and seamless financial transactions, thanks to blockchain technology that protects your funds and personal information.
                </article>
              </div>
            </div>

            <div className="flex gap-x-5">
              <i className="bi bi-shield text-2xl text-lime-500"> </i>
              
              <div className="space-y-2">
                <h3 className="">Comprehensive Support</h3>

                <article className="">
                  Access extensive resources and support throughout your campaign, ensuring you have the tools and guidance needed for success.
                </article>
              </div>
            </div>

            <div className="flex gap-x-5">
              <i className="bi bi-people text-2xl text-lime-500"> </i>
              
              <div className="space-y-2">
                <h3 className="">Community Engagement</h3>

                <article className="">
                  Build and engage with a community of backers who are passionate about your project, fostering collaboration and support.
                </article>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <CampaignsSection />

      <HowItWorksComponent />
    </main>
  )
}

export default Home