import React, { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Fuse from 'fuse.js'

interface Props {
  countries: string[]
}

export default function SearchForm(props: Props) {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchResults, setSearchResults] = useState<string[]>([])

  const sortedSearchResults = searchResults.sort(
    (resultA: any, resultB: any) => {
      return resultA.score - resultB.score
    }
  )

  const fuse = new Fuse(props.countries, {
    keys: ['name'],
    includeScore: true,
    threshold: 0.1,
  })

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    const match = fuse
      .search(value)
      .slice(0, 10)
      .map((result: { item: {} }) => result.item.name.toLowerCase())
      .includes(value.toLowerCase().trim())
    match && router.push(`/country/${value}`)
    setValue('')
    setSearchResults([])
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const results: any[] = fuse.search(value).slice(0, 10)
    setValue(value)
    setSearchResults(results)
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
          onChange={handleChange}
          type="text"
          value={value}
          placeholder="Choose a country"
          className={`rounded-full ml-2 px-3 py-1 lg:px-6 lg:py-2 focus:outline-none text-black tracking-tighter ${
            isExpanded
              ? 'w-full h-full scale-x-full'
              : 'w-0 h-0 scale-x-0 lg:w-full lg:h-full lg:scale-100'
          }`}
        />
        <svg
          onClick={() => setIsExpanded(!isExpanded)}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-9 w-9 text-gray-900 bg-white p-2 transition-all duration-300 rounded-full ${
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
      {sortedSearchResults?.length > 0 && (
        <ul className="flex flex-col text-center bg-white gap-3 right-0 top-20 w-full absolute">
          {sortedSearchResults.map((country, i) => (
            <a
              className="text-black p-3 border-b"
              href={`/country/${country.item.name}`}
              key={i}
            >
              {country.item.name}
            </a>
          ))}
        </ul>
      )}
    </>
  )
}
