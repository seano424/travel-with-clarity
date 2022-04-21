import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'

interface Props {
  countries: string[]
}

export default function SearchForm(props: Props) {  
  const [value, setValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)

  const fuse = new Fuse(props.countries || [], {
    keys: ['name'],
  })

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const match = fuse.search(value).slice(0, 10).map(result => result.item.name.toLowerCase()).includes(value.toLowerCase().trim())
    match && router.push(`/country/${value}`)
    setValue('')
    setFilteredCountries([])
  }
  
  const handleFilter = (event: React.FormEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value
    setValue(value)
    setFilteredCountries(fuse.search(value).slice(0, 10))
  }

  return (
    <>
      <form
        className={`relative flex items-center justify-center ${
          isExpanded ? 'w-full' : 'w-20 lg:w-full'
        }`}
        onSubmit={handleSubmit}
      >
        <input
          autoFocus
          onChange={handleFilter}
          type="text"
          value={value}
          placeholder="Choose a country"
          className={`rounded-full px-6 py-2 focus:outline-none text-black tracking-tighter ${
            isExpanded
              ? 'w-full h-full scale-x-full'
              : 'w-0 h-0 scale-x-0 lg:w-full lg:h-full lg:scale-100'
          }`}
        />
        <svg
          onClick={() => setIsExpanded(!isExpanded)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 text-gray-900 bg-white p-2 transition-all duration-300 rounded-full ${
            isExpanded ? 'absolute right-3' : 'lg:absolute lg:right-3'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </form>

      {/* Filter Dropdown */}
      {filteredCountries?.length > 0 && (
        <ul className="absolute flex flex-col gap-2 top-28 bg-white w-1/2 right-0 p-4 text-black">
          {filteredCountries.map((country, i) => (
            <a className='bg-purple-50 p-3 rounded' href={`/country/${country.item.name}`} key={i}>
              {country.item.name}
            </a>
          ))}
        </ul>
      )}
    </>
  )
}
