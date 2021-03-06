import Image from 'next/image'

interface Props {
  countries: any[]
  heading: string
  name: string
}

export default function Region(props: Props) {
  const { countries, heading, name } = props

  return (
    <section
      className="border-b border-gray-100 pb-20 shadow-lg pt-16 -mt-16"
      id={name.toLowerCase()}
    >
      <div className="text-7xl text-black text-center mt-20 mb-10">
        <h1>{heading}</h1>
      </div>

      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6">
        {countries.slice(0, 12).map((country: any, index: number) => (
          <a
            href={`/country/${country.name}`}
            key={index}
            className="flex bg-white items-center border border-gray-100 shadow-xl rounded-3xl my-4 p-4 justify-between"
          >
            <Image
              className="object-cover"
              src={country.flags.png}
              alt="Country Flags"
              height={100}
              width={200}
            />
            <h1 className="text-black text-sm px-4 flex-1">
              {country.name}
            </h1>
          </a>
        ))}
      </div>
    </section>
  )
}
