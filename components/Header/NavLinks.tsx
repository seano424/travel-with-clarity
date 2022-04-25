interface Props {
  regions: any[]
}

export default function NavLinks(props: Props) {
  const { regions } = props
  
  return (
    <div className="hidden lg:flex items-center gap-3">
      {regions.map((region, index) => (
        <a key={index} href={`/#${region.toLowerCase()}`}>
          {region}
        </a>
      ))}
    </div>
  )
}
