import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { CountriesContextProvider } from 'contexts/CountriesContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountriesContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CountriesContextProvider>
  )
}

export default MyApp
