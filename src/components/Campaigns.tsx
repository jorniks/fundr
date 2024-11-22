"use client"

import Image from "next/image"
import Link from "next/link"


const Campaigns = () => {
  return (
    <section className="container space-y-14">
      <aside className="max-w-3xl mx-auto text-center space-y-2 md:space-y-4">
        <h2 className="">Explore Live Campaigns</h2>

        <article className="">
          Find and Back Campaigns That Need Your Help Now—Explore a wide range of live projects where your contribution can make a real difference.
        </article>
      </aside>

      <aside className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <a key={i} href={`/campaign/${i}`}
            className="flex flex-col h-full border border-white/5 hover:border-transparent hover:shadow-lg transition duration-300 rounded-lg p-5 bg-white/10"
          >
            <Image width={100} height={100} className="w-full object-cover rounded-md" alt="Proposal Image" src="https://images.unsplash.com/photo-1665686376173-ada7a0031a85" />

            <div className="space-y-1 my-4">
              <h3 className="">Announcing a free plan for small teams</h3>

              <article className="text-sm">At Wake, our mission has always been focused on bringing openness.</article>
            </div>

            <div className="mt-auto flex items-center gap-x-3">
              <Image width={100} height={100} className="size-8 rounded-full" alt="User Avatar"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              />

              <h5 className="text-sm text-gray-300">0x23.....38df</h5>
            </div>
          </a>
        ))}
      </aside>

      <aside className="mt-12 text-center">
        <a href="#" className="inline-flex items-center bg-white/10 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none">
          <p className="me-2 text-white text-sm">Explore more live Campaigns</p>
          <span className="py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
            <i className="bi  bi-arrow-up-right"></i>
          </span>
        </a>
      </aside>
    </section>
  )
}

export default Campaigns