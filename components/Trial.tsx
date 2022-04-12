import { useState, useEffect } from 'react'
import Image from 'next/image'

const countriesPerPage = 4
let arrayForHoldingCountries: any[] = []

interface Props {
  countries: any[]
  heading: string
}

export default function Region(props: Props) {
  const { countries, heading } = props
  const [showMoreCountries, setShowMoreCountries] = useState(true)
  const [countriesToShow, setCountriesToShow] = useState(
    countries.slice(0, 4)
  )
  const [next, setNext] = useState(4)

  useEffect(() => {
    arrayForHoldingCountries = [...countriesToShow]
  }, [])

  const loopWithSlice = (start: number, end: number) => {
    const slicedCountries = countries.slice(start, end)
    arrayForHoldingCountries = [...arrayForHoldingCountries, ...slicedCountries]

    setCountriesToShow(arrayForHoldingCountries)
    slicedCountries.length < 4 && setShowMoreCountries(false)
  }

  const handleShowMoreCountries = () => {
    loopWithSlice(next, next + countriesPerPage)
    setNext(next + countriesPerPage)
  }

  return (
    <section
      style={{
        backgroundImage: "url('/images/americas.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      id="americas"
      className={`p-10 scroll-smooth h-screen bg-black overflow-scroll relative`}
    >
      <div className="sticky top-40 inset-0 text-8xl text-center tracking-wide mt-40 mb-20 flex gap-20 justify-center">
        <h1>{heading}</h1>
      </div>

      <div
        className={`relative grid sm:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4`}
      >
        {countriesToShow.map((country: any, index: number) => (
          <div className="bg-white rounded-3xl p-7 flex flex-col" key={index}>
            <Image
              className="flex-1 rounded-3xl p-1"
              src={country.flags.png}
              alt="Country Flags"
              height={200}
              width={300}
            />
            <h1 className="text-black text-3xl text-center mt-4">
              {country.name}, {country.subregion}
            </h1>
            <button className="button flex max-w-max mx-auto mt-10">
              Learn More
            </button>
          </div>
        ))}
      </div>
      {showMoreCountries && (
        <div className="flex justify-center my-10">
          <button onClick={handleShowMoreCountries} className="button">
            View More
          </button>
        </div>
      )}
    </section>
  )
}
