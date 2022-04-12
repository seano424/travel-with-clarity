import type { NextComponentType } from 'next'
import Head from 'next/head'
import Header from './Header'

const Layout: NextComponentType = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen text-white">
      <Head>
        <title>Travel With Clarity</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌏</text></svg>"
        />
      </Head>
      <Header />
      <main className="flex-1 w-full h-full">{children}</main>
    </div>
  )
}

export default Layout