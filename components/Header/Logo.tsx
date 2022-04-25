import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex gap-3 items-center uppercase tracking-tighter italic">
        <img
          src="/images/blue-globe.png"
          alt="Blue Globe Icon"
          className="w-10 h-10 lg:w-16 max-w-min lg:h-16 animate-spin-slow"
        />
        <span className="hidden lg:flex flex-col text-xl">
          Travel
          <span>with Clarity</span>
        </span>
      </a>
    </Link>
  )
}
