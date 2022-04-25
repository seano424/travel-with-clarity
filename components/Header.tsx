import { useState } from 'react'
import SearchForm from './SearchForm'
import Logo from './Logo'
import Hamburger from './Hamburger'
import MobileDropdown from './MobileDropdown'
import NavLinks from './NavLinks'

interface Props {
  countries: string[]
}

export default function Header(props: Props) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full">
      <ul className="flex items-center justify-between lg:space-x-6 text-white text-xl p-5 bg-black/90">
        <li>
          <Logo />
        </li>
        <li className="flex items-center gap-3">
          <NavLinks regions={regions} />
          <SearchForm countries={props.countries} />
          <Hamburger setOpen={setOpen} open={open} />
        </li>
      </ul>
      <MobileDropdown regions={regions} open={open} />
    </nav>
  )
}
