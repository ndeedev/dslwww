"use client"

import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose, AiOutlineInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai'
import { useState } from 'react'

const Navbar = () => {
    const [menuOpen, menuSetMenuOpen] = useState(false)

    const handleNav = () => {
        menuSetMenuOpen(!menuOpen)
    }

  return (
    <>
    <nav className="w-full shadow-xl h-24">
        <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16'>
            <Link href="/">
                <Image
                src={'/images/dsl-logo-full.jpg'}
                alt="Logo"
                height="53"
                width="275"
                className="cursor-pointer"
                priority
                />
            </Link>
            <div className='hidden sm:flex print:hidden'>
                <ul className="hidden sm:flex">
                    <Link href="/about">
                        <li className="ml-7 uppercase hover:border-b hover:border-b-gray-400 text-l text-black">Why us</li>
                    </Link>
                    <Link href="/services">
                        <li className="ml-7 uppercase hover:border-b hover:border-b-gray-400 text-l text-black">Services</li>
                    </Link>
                    <Link href="/quotebuilder">
                        <li className="ml-7 uppercase hover:border-b hover:border-b-gray-400 text-l text-black">Quote gen</li>
                    </Link>
                    <Link href="/contact">
                        <li className="ml-7 uppercase hover:border-b hover:border-b-gray-400 text-l text-black">Contact us</li>
                    </Link>
                </ul>
            </div>
            <div onClick={handleNav} className='md:hidden cursor-pointer pl-24 print:hidden'>
                <AiOutlineMenu size={25} />
            </div>
        </div>
        <div className={
            menuOpen ? "fixed left-0 top-0 w-[65%] ms:hidden h-screen bg-[#ecf0f3] ease-in duration-500" : "fixed left-[-100%] top-0 ease-in duration-500"
        }>
            <div className='flex w-full items-center justify-between'>
            <Link href="/">
                <Image
                src={'/images/dsl-logo-small.jpg'}
                alt="Logo"
                height="53"
                width="124"
                className="cursor-pointer pt-6"
                priority
                />                
            </Link>
                <div onClick={handleNav} className='cursor-pointer'>
                    <AiOutlineClose size={25} />
                </div>
            </div>
            <div className='flex-col py-4'>
                <ul className="">
                    <Link href="/about">
                        <li className="py-4 cursor-pointer text-black" onClick={() => menuSetMenuOpen(false)}>...Why us</li>
                    </Link>
                    <Link href="/services">
                        <li className="py-4 cursor-pointer text-black" onClick={() => menuSetMenuOpen(false)}>...Services</li>
                    </Link>
                    <Link href="/quote">
                        <li className="py-4 cursor-pointer text-black" onClick={() => menuSetMenuOpen(false)}>...Quote gen</li>
                    </Link>
                    <Link href="/contact">
                        <li className="py-4 cursor-pointer text-black" onClick={() => menuSetMenuOpen(false)}>...Contact us</li>
                    </Link>
                </ul>
            </div>
            <div className='flex flex-row justify-around pt-10 items-center'>
                <AiOutlineInstagram size={30} className='cursor-pointer' />
                <AiOutlineFacebook size={30} className='cursor-pointer' />
                <AiOutlineTwitter size={30} className='cursor-pointer' />
            </div>
            
        </div>
    </nav>
    </>
  )
}

export default Navbar