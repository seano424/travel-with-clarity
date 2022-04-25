import groupBy from 'lodash/groupBy'
import Hero from '@/components/Hero'
import Regions from '@/components/Regions'
import Header from '@/components/Header/Header'

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
  // 1.  Fetching the More "Accurate" Travel Briefing Countries List. Necessary for our search.
  const travelBriefingResponse = await fetch(
    `https://travelbriefing.org/countries.json`
  )
  const travelBriefingJson = await travelBriefingResponse.json()
  const travelBriefing = travelBriefingJson.map(
    (countries: { name: string }) => ({
      name: countries.name,
    })
  )

  // 2. Fetching the Rest Countries API in order to group by Regions
  const restCountriesResponse = await fetch(
    'https://restcountries.com/v2/all?fields=name,flags,region,subregion,alpha3Code'
  )
  const restCountriesJson = await restCountriesResponse.json()

  // 3. Comparing the two API countries lists and returning only those countries that match with the Travel Briefing API
  const countriesDifference = restCountriesJson.filter((o1: any) =>
    travelBriefing.some((o2: any) => o1.name === o2.name)
  )

  // 4. Grouping the refined countries array by regions
  const groupedByRegions = groupBy(countriesDifference, (item: any) => item.region)

  return {
    props: {
      regions: groupedByRegions,
      countries: travelBriefing,
    },
  }
}
