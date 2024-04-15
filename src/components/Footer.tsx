"use client"

import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="w-full shadow-xl h-24">
          <div className='border-t-2 border-gray-400 p-1 flex justify-between items-center h-full w-full px-4 2xl:px-16'>
            <div className="h-full w-full flex items-center">
              <h1 className="pr-4 text-xl">Contact Us:</h1>
                <Image
                      src={'/images/mobile-24.png'}
                      alt="Logo"
                      height="24"
                      width="24"
                      className="cursor-pointer"
                      priority
                    />
                <h1 className="pr-4 pl-2">1-236-777-4615</h1>                    
                <Image
                      src={'/images/mail-24.png'}
                      alt="Logo"
                      height="24"
                      width="24"
                      className="cursor-pointer"
                      priority
                    />                
                <h1 className="pr-4 pl-2">sales@dearbornsales.ca</h1>
            </div>
            <div className="h-full w-1/3 flex justify-end items-center">
            <Link href="https://www.roth-america.com/" className="px-2" target="_blank">
                <Image
                  src={'/images/rothlogo.png'}
                  alt="Logo"
                  height="51"
                  width="117"
                  className="cursor-pointer"
                  priority
                />
              </Link>
              <Link href="http://raasmusa.com" className="px-2" target="_blank">
                <Image
                  src={'/images/raasmlogo.png'}
                  alt="Logo"
                  height="60"
                  width="60"
                  className="cursor-pointer"
                  priority
                />
              </Link>
            </div>
          </div>
        </footer>
    )
}