import type { NextPage } from 'next'
import Hero from '@/components/Hero'
import Region from '@/components/Region'
import groupBy from 'lodash/groupBy'

const Home: NextPage = ({ regions }: any) => {
  console.log(regions);
  
  return (
    <>
      <Hero />
      <section>
        {Object.entries(regions)
          .sort()
          .map(
            (region) =>
              region[0] !== 'Antarctic' &&
              region[0] !== 'Antarctic Ocean' &&
              region[0] !== 'Polar' && (
                <Region
                  key={region[0]}
                  name={region[0]}
                  heading={region[0]}
                  countries={region[1]}
                />
              )
          )}
      </section>
    </>
  )
}

export default Home

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://restcountries.com/v2/all?fields=name,flags,region,subregion,alpha3Code'
  )
  const json = await res.json()
  const grouped = groupBy(json, (item: any) => item.region)

  return {
    props: {
      regions: grouped,
    },
  }
}
