import { closeIcon, openIcon } from '../../lib/icons'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>;
}
export default function Hamburger(props: Props) {
  const { open, setOpen } = props

  return (
    <svg
      onClick={() => setOpen(!open)}
      xmlns="http://www.w3.org/2000/svg"
      className="h-9 w-9 cursor-pointer transition-all duration-300 lg:hidden flex-1 min-w-max"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d={!open ? openIcon : closeIcon}
        clipRule="evenodd"
      />
    </svg>
  )
}
