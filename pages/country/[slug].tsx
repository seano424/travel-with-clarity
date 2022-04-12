import { useState, useEffect } from 'react'
interface Props {
  country: {
    names: {
      name: string
      iso3: string
    }
    advise: {
      UA: {
        advise: string
        url: string
      }
    }
    vaccinations: {
      message: string
      name: string
    }[]
    water: {
      full?: string
      short?: string
    }
    currency: {
      name: string
      symbol: string
    }
    language: {
      language: string
      official: string
    }[]
    telephone: {
      police: string
      calling_code: string
    }
    timezone: {
      name: string
    }
    maps: {
      lat: string
      long: string
      zoom: string
    }
  }
}

export default function Country(props: Props) {
  const { country } = props
  const [backgroundImage, setBackgroundImage] = useState(null)
  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?page=2&per_page=2&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&query=${country?.names?.name}&orientation=landscape`
    )
      .then((res) => res.json())
      .then((data) => setBackgroundImage(data.results[0].urls.full))
  }, [props.country])

  console.log(backgroundImage)

  return (
    <section className="px-10 pt-32 text-black">
      <div className="flex items-center gap-7 justify-center">
        {/* <img
          src={``}
          alt="background image..."
        /> */}
        <h1 className="header">{country?.names?.name}</h1>
        <img
          className="w-20 border object-cover rounded"
          src={`https://countryflagsapi.com/svg/${country?.names?.iso3}`}
          alt="Country Flag"
        />
      </div>
      <div>
        <div className="card">
          <p>Travel advice</p>
          <div className="p-2">
            <p>{country?.advise?.UA.advise}</p>
            <p>Australia - Department of foreign affairs</p>
            <a
              className="flex items-center gap-1"
              target="_blank"
              href={country?.advise?.UA.url}
            >
              View Full Report
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="card">
          <p>Vaccinations</p>
          {country?.vaccinations?.map(
            (v: { name: string; message: string }) => (
              <div key={v.name} className="p-2 shadow-sm mb-1">
                <p className="text-blue-900">{v.name}</p>
                <p className="text-gray-800">{v.message}</p>
              </div>
            )
          )}
        </div>

        <div className="card">
          <p>Languages Spoken:</p>
          {country?.language.map((lang) => (
            <div key={lang.language} className="p-2 shadow-sm mb-1">
              <p>
                {lang.official === 'Yes'
                  ? 'The official language is '
                  : 'Other languages spoken are: '}{' '}
                {lang.language}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://travelbriefing.org/countries.json')
  const json = await res.json()
  const paths = json.map((country: { name: string }) => ({
    params: { slug: country.name },
  }))
  return {
    paths,
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  console.log(params.slug)

  const res = await fetch(
    `https://travelbriefing.org/${params.slug}?format=json`
  )
  const data = await res.json()

  // Pass post data to the page via props
  return { props: { country: data } }
}