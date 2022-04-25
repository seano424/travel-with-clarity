import Link from 'next/link'
interface Props {
  regions: any[]
}

export default function NavLinks(props: Props) {
  const { regions } = props

  return (
    <div className="hidden lg:flex items-center gap-3">
      {regions.map((region, index) => (
        <Link key={index} href={`/#${region.toLowerCase()}`}>
          <a>{region}</a>
        </Link>
      ))}
    </div>
  )
}
