import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '@/components/Header/Header'
interface Props {
  countries: string[]
  backgroundImage: string
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
      CA: {
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
  const { country, backgroundImage, countries } = props
  const { query } = useRouter()
  const slug = query.slug
  // https://countryflagsapi.com/svg/${country?.names?.iso3}
  return (
    <>
      <Header countries={countries} />
      {slug?.toLocaleString().toLowerCase() ===
      country.names.name.toLowerCase() ? (
        <section className="text-black bg-black">
          <div className="relative">
            <img
              className="w-full h-[500px] object-cover"
              src={backgroundImage}
              alt="Country Unplash Image"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h1 className=" text-white text-3xl lg:text-9xl max-w-5xl">
                {country?.names?.name}
              </h1>
            </div>
          </div>

          <div className="bg-white">
            <div>
              <div className="card flex justify-between items-center bg-black text-white">
                <p>Travel advice</p>
                <img
                  className="h-20 w-40 object-cover object-center"
                  src={`https://countryflagsapi.com/svg/${country?.names?.iso3}`}
                  alt="Country Flag"
                />
              </div>
              <div className="p-6">
                {/* Aussie */}
                {country?.advise?.UA && (
                  <div className="mb-3">
                    <p>{country?.advise?.UA?.advise}</p>
                    <p>Australia - Department of foreign affairs</p>
                    <a
                      className="flex items-center gap-1 not-italic capitalize"
                      target="_blank"
                      href={country?.advise?.UA?.url}
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
                )}

                {/* Canada */}
                {country?.advise?.CA && (
                  <div>
                    <p>Canada</p>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: country?.advise?.CA?.advise,
                      }}
                    ></p>
                    <a
                      className="flex items-center gap-1 not-italic capitalize"
                      target="_blank"
                      href={country?.advise?.CA?.url}
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
                )}
              </div>
            </div>

            <div className="card">
              <p>Vaccinations</p>
              {!country?.vaccinations.length && (
                <div className="shadow-sm p-6">
                  <p>None necessary</p>
                </div>
              )}
              {country?.vaccinations?.map(
                (v: { name: string; message: string }) => (
                  <div key={v.name} className="p-6 shadow-sm mb-1">
                    <p className="text-blue-900">{v.name}</p>
                    <p className="text-gray-800">{v.message}</p>
                  </div>
                )
              )}
            </div>

            {country?.language.length > 0 && (
              <div className="card">
                <p>Languages Spoken:</p>
                {country?.language.map((lang) => (
                  <div key={lang.language} className="p-6 shadow-sm mb-1">
                    <p>
                      {lang.official === 'Yes'
                        ? 'The official language is '
                        : 'Other languages spoken are: '}{' '}
                      {lang.language}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {country?.currency?.name && (
              <div className="card">
                <p>Currency Used:</p>
                <div className="p-6 shadow-sm mb-1">
                  <p>{country?.currency?.name}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="px-10 py-32">
          <h1 className="text-black mb-10 text-3xl">
            Country with the name{' '}
            <span className="text-purple-500 capitalize">{slug}</span> not found
          </h1>
          <Link href="/">
            <a className="button bg-red-400 hover:text-white">Go back</a>
          </Link>
        </section>
      )}
    </>
  )
}

// This also gets called at build time
export async function getServerSideProps({ params }: any) {
  // Country Data
  const res = await fetch(
    `https://travelbriefing.org/${params.slug}?format=json`
  )
  const data = await res.json()

  // Unsplash Background Image
  const unsplash = await fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=10&client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${data.names.name}&orientation=landscape`
  )
  const unsplashData = await unsplash.json()
  const randomPic = Math.floor(Math.random() * unsplashData.results.length)
  const backgroundImage = unsplashData?.results[randomPic].urls.full ?? ''

  // All Countries for Filter
  const countriesRes = await fetch(`https://travelbriefing.org/countries.json`)
  const countriesJson = await countriesRes.json()
  const countries = countriesJson.map((countries: { name: string }) => ({
    name: countries.name,
  }))

  // Pass post data to the page via props
  return { props: { country: data, backgroundImage, countries } }
}
