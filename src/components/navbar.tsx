"use client";

import { useState } from "react";
import Link from 'next/link'
import React from 'react'
import WalletButton from './WalletButtons'
import Image from 'next/image'
import { usePathname } from "next/navigation";

const NavbarLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
  },
  {
    name: "How it works",
    href: "/how-it-works",
  },
  {
    name: "About",
    href: "/about",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="flex items-center justify-between container px-1 md:px-3 py-3 sm:px-5 fixed top-3 inset-x-0 z-50 rounded-full backdrop-blur-md bg-white/20">
      <div className="ps-3 flex items-center gap-x-10">
        <Link href={"/"} className=""><Image width={1000} height={1000} src="/fundr.png" alt="fundr." className="w-auto h-6 md:h-8" /></Link>
        
        <div className="space-x-4 hidden sm:block">
          {NavbarLinks.map((link, index) => (
            <Link key={index} href={`${link.href}`} className={`hover:text-lime-400 transition-colors tracking-wide duration-300 ${location === link.href && "text-lime-400"}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <WalletButton />
    </nav>
  )
}

export default NavBar