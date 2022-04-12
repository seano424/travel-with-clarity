import '../styles/globals.css'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'
import { SearchContextProvider } from 'contexts/SearchContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchContextProvider>
  )
}

export default MyApp
