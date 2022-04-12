import { useState } from 'react'
import Form from './Form'
import Link from 'next/link'

export default function Header() {
  const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  const [open, setOpen] = useState(false)

  const closeIcon =
    'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'

  const openIcon =
    'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'

  return (
    <nav className="fixed z-50 flex items-center justify-between lg:justify-center w-screen h-28 p-6 lg:py-4 lg:px-0 bg-black/90 uppercase tracking-tighter italic">
      <Link href="/">
        <a className="lg:absolute left-4 xl:left-4 flex gap-3 items-center xl:pl-20">
          <img
            src="/images/blue-globe.png"
            alt="Blue Globe Icon"
            className="w-16 h-16 animate-spin-slow"
          />
          <span className="flex flex-col text-xl">
            Travel
            <span>with Clarity</span>
          </span>
        </a>
      </Link>
      <ul className="hidden xl:flex items-center space-x-6 bg-black/40 text-white rounded-full p-4 text-xl filter backdrop-blur">
        {REGIONS.map((region, index) => (
          <a key={index} href={`/#${region.toLowerCase()}`}>
            {region}
          </a>
        ))}
        <Form />
      </ul>

      {/* Mobile Nav */}
      <div className="lg:hidden flex items-center gap-3">
        <Form />
        <div className="flex flex-col">
          <svg
            onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 cursor-pointer transition-all duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d={!open ? openIcon : closeIcon}
              clipRule="evenodd"
            />
          </svg>
          <ul
            className={`flex flex-col absolute items-center py-10 pr-10 right-0 bg-black/90 w-1/3 top-28 translate-x-full transition-all duration-500 ${
              open && 'opacity-100 translate-x-0'
            }`}
          >
            {REGIONS.map((region, index) => (
              <a
                className="my-2 text-lg not-italic"
                key={index}
                href={`/#${region.toLowerCase()}`}
              >
                {region}
              </a>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
