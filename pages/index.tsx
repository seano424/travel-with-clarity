import Hero from '@/components/Hero'
import Regions from '@/components/Regions'
import groupBy from 'lodash/groupBy'
import Header from '@/components/Header'

interface Props {
  regions: []
  countries: string[]
}

export default function Home(props: Props) {
  const { regions, countries } = props

  return (
    <>
      <Header countries={countries} />
      <Hero />
      <Regions regions={regions} />
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://restcountries.com/v2/all?fields=name,flags,region,subregion,alpha3Code'
  )
  const json = await res.json()
  const grouped = groupBy(json, (item: any) => item.region)

  const countriesRes = await fetch(`https://travelbriefing.org/countries.json`)
  const countriesJson = await countriesRes.json()
  const countries = countriesJson.map((countries: { name: string }) => ({
    name: countries.name,
  }))

  return {
    props: {
      regions: grouped,
      countries,
    },
  }
}
