import Link from 'next/link'
import React from 'react'
import WalletButton from './WalletButtons'

const NavBar = () => {
  return (
    <div className="border-b sm:px-8 px-2 py-4 flex items-center justify-between">
      <aside className="font-bold text-xl sm:text-2xl">
        <Link href="/">Lirio</Link>
      </aside>

      <aside className="">
        <WalletButton />
      </aside>
    </div>
  )
}

export default NavBar