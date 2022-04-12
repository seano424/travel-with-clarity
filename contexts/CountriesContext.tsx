import type { NextComponentType } from 'next'
import { createContext, useState } from 'react'

interface CountriesContext {
  countriesList: {
    name: string
  }[]
  setCountriesList: (arg: {}[]) => void
}

export const CountriesContext = createContext<CountriesContext | null>(null)

export const CountriesContextProvider: NextComponentType = ({ children }) => {
  const [countriesList, setCountriesList] = useState([])

  const value = {
    countriesList,
    setCountriesList,
  }

  return (
    <CountriesContext.Provider value={value}>
      {children}
    </CountriesContext.Provider>
  )
}
