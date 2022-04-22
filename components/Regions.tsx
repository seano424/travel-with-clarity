import Region from './Region'

interface Props {
  regions: []
}

export default function Regions(props: Props) {
  const { regions } = props
  return (
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
  )
}
