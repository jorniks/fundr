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
      <Link href={"/"} className="flex items-center gap-x-3 text-lg md:text-xl md:font-semibold text-gray-50 hover:text-lime-400 transition-colors duration-300">
        <Image width={100} height={100} src="/fundrLogo.png" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
        fundr
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {NavbarLinks.map((link, index) => (
          <Link key={index} href={`${link.href}`} className={`text-sm font-medium  hover:text-lime-400 transition-colors duration-300 ${location === link.href ? "text-lime-400" : "text-gray-50"}`}>
            {link.name}
          </Link>
        ))}

        <WalletButton />
      </div>
    </nav>
  )
}

export default NavBar