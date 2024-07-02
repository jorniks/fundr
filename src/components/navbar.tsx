import Link from 'next/link'
import React from 'react'
import WalletButton from './WalletButtons'

const NavBar = () => {
  return (
    <section className="border-b">
      <div className="container py-2 flex items-center justify-between">
        <aside className="font-bold text-xl sm:text-2xl">
          <Link href="/">Lirio</Link>
        </aside>

        <aside className="">
          <WalletButton />
        </aside>
      </div>
    </section>
  )
}

export default NavBar