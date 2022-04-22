import { useState } from 'react'
import Link from 'next/link'
import { closeIcon, openIcon } from '../lib/icons'
import SearchForm from './SearchForm'

interface Props {
  countries: string[]
}

export default function Header(props: Props) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full">
      <ul className="flex items-center justify-between lg:space-x-6 text-white text-xl p-5 bg-black/90">
        {/* Left */}
        <Link href="/">
          <a className="flex gap-3 items-center uppercase tracking-tighter italic">
            <img
              src="/images/blue-globe.png"
              alt="Blue Globe Icon"
              className="w-10 h-10 lg:w-16 max-w-min lg:h-16 animate-spin-slow"
            />
            <span className="hidden lg:flex flex-col text-xl">
              Travel
              <span>with Clarity</span>
            </span>
          </a>
        </Link>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3">
            {regions.map((region, index) => (
              <a key={index} href={`/#${region.toLowerCase()}`}>
                {region}
              </a>
            ))}
          </div>
          <SearchForm countries={props.countries} />
          {/* Mobile Hamburger */}
          <svg
            onClick={() => setOpen(!open)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 cursor-pointer transition-all duration-300 lg:hidden flex-1 min-w-max"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d={!open ? openIcon : closeIcon}
              clipRule="evenodd"
            />
          </svg>
        </div>
      </ul>

      {/* Mobile Dropdownd */}
      <div
        className={`flex flex-col gap-12 text-lg absolute -mt-1 right-0 w-1/2 h-screen lg:hidden p-10 bg-black/90 ${!open && 'hidden'}`}
      >
        {regions.map((region, index) => (
          <a key={index} href={`/#${region.toLowerCase()}`}>
            {region}
          </a>
        ))}
      </div>
    </nav>
  )
}
