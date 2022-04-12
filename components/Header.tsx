import React, { useState } from 'react'

export default function Header() {
  const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  const [value, setValue] = useState('')

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    console.log(value)
  }

  return (
    <nav className="fixed z-50 flex items-center justify-center w-screen mt-12 xl:my-10">
      <a
        className="absolute left-4 xl:left-4 flex gap-3 items-center xl:pl-20"
        href="/"
      >
        <img
          src="/images/blue-globe.png"
          alt="Blue Globe Icon"
          className="w-16 h-16"
        />
        <span className="flex flex-col text-xl">
          Travel
          <span>with Clarity</span>
        </span>
      </a>
      <ul className="hidden xl:flex items-center space-x-6 bg-black/70 text-white rounded-full px-16 py-2 text-xl filter backdrop-blur">
        {REGIONS.map((region, index) => (
          <a key={index} href={`#${region.toLowerCase()}`}>
            {region}
          </a>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setValue(e.target.value)}
            type="text"
            value={value}
            placeholder="Choose a country"
            className="rounded-full px-3 py-2 focus:outline-none text-black tracking-tighter"
          />
        </form>
      </ul>
    </nav>
  )
}
