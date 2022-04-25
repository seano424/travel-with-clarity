interface Props {
  regions: any[]
  open: boolean
}

export default function MobileDropdown(props: Props) {
  const { regions, open } = props
  return (
    <div
      className={`flex flex-col gap-12 text-lg absolute -mt-1 right-0 w-1/2 h-screen lg:hidden p-10 bg-black/90 ${
        !open && 'hidden'
      }`}
    >
      {regions.map((region: string, index) => (
        <a key={index} href={`/#${region.toLowerCase()}`}>
          {region}
        </a>
      ))}
    </div>
  )
}
