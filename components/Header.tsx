import { useState } from 'react'
import SearchForm from './SearchForm'
import Link from 'next/link'

interface Props {
  countries: string[]
}

export default function Header(props: Props) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const [open, setOpen] = useState(false)

  const closeIcon =
    'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'

  const openIcon =
    'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'

  return (
    <nav className="fixed z-50 w-full">
      <ul className="flex items-center justify-between lg:space-x-6 text-white text-xl p-5 bg-black/90">
        {/* Left */}
        <Link href="/">
          <a className="flex gap-3 items-center uppercase tracking-tighter italic">
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
            className="h-8 w-8 cursor-pointer transition-all duration-300 lg:hidden flex-1"
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
        className={`flex flex-col gap-12 text-lg absolute right-0 w-1/3 h-screen lg:hidden p-10 bg-black/90 translate-x-full transition-all duration-500 ${
          open && 'opacity-100 translate-x-0'
        }`}
      >
        {regions.map((region, index) => (
          <a
            key={index}
            href={`/#${region.toLowerCase()}`}
          >
            {region}
          </a>
        ))}
      </div>
    </nav>
  )
}
