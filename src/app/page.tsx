"use client"

import Campaigns from "@/components/Campaigns"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
  return (
    <main className="space-y-20">
      <section className="flex justify-center items-center pt-48">
        <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-top-right -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 -z-10"></span>
        </div>

        <div className="container space-y-20 z-10">
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

      <Campaigns />

      <section className="container max-w-7xl px-4 xl:px-0 py-10  lg:pb-20">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            How to Launch Your Campaign on Fundr
          </h2>
          <p className="mt-1 text-neutral-400">
            Follow these straightforward steps to create and manage your campaign. From conceptualizing your idea to launching and tracking its success, Fundr makes it simple and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <Image
              width={100}
              height={100}
              className="w-full object-cover rounded-xl lg:h-[600px]"
              src="https://media.istockphoto.com/id/874231466/photo/young-adult-woman-walking-up-the-stairs-with-sun-sport-background.jpg?s=612x612&w=0&k=20&c=6d2vtrEvMhXNSh8TFR5hVhW_A2ZKjvOhWQhg-yLW_wk="
              alt="Campaign Creation"
            />
          </div>
          <div>
            <div className="mb-4">
              <h3 className="text-lime-400 text-xs font-medium uppercase">
                Steps
              </h3>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">Define Your Vision:</span>{" "}
                  Clearly outline your campaign goals and what you want to
                  achieve. Craft a compelling story that resonates with
                  potential backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-neutral-400">
                  <span className="text-white">Set Up Your Campaign:</span>{" "}
                  Create your campaign page on Fundr, including details like
                  funding goals, rewards, and timelines. Upload visuals and
                  provide compelling content to attract backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">Promote Your Campaign:</span>{" "}
                  Share your campaign across social media, engage with your
                  community, and use marketing strategies to drive traffic and
                  attract backers.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800 text-lime-400 font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-neutral-400">
                  <span className="text-white">Track and Engage:</span> Monitor
                  your campaign’s progress, interact with backers, and keep them
                  updated on milestones and achievements.
                </p>
              </div>
            </div>
            <div className="flex justify-start md:mt-5">
              <a
                className="group inline-flex items-center bg-lime-600 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none"
                href="/create-campaign"
              >
                <p className="me-2 text-white text-sm">Create Campaign</p>
                <span className="py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
                  <i className="bi  bi-arrow-up-right"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home