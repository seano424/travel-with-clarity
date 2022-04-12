import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html className='scroll-smooth' lang='en'>
        <Head />
        <body className={process.env.NEXT_PUBLIC_DEVMODE && 'debug-screens'}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
