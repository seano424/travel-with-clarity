import type { NextComponentType } from 'next'
import { createContext, useState } from 'react'

interface SearchContext {
  countriesList: {
    name: string
  }[]
  setCountriesList: (arg: {}[]) => void
  filteredCountries: {
    item: {
      name: string
    }
  }[]
  setFilteredCountries: (arg: {}[]) => void
}

export const SearchContext = createContext<SearchContext | null>(null)

export const SearchContextProvider: NextComponentType = ({ children }) => {
  const [countriesList, setCountriesList] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  const value = {
    countriesList,
    setCountriesList,
    filteredCountries,
    setFilteredCountries
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
