import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'simplebar/dist/simplebar.min.css' // clean scrollbar, used on MainTerminal
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

// reduces flicker https://github.com/rnosov/react-reveal#server-side-rendering
import config from 'react-reveal/globals'
config({ ssrFadeout: true })

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  if (router.asPath === '/' || router.asPath.includes('/projects/')) { // landing page & redirect
    return (
      <>
        <Head>
          <title>Coda Bool</title>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.gif" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.gif" />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }

  return (
    <div className="site">
      <Head>
        <title>Coda Bool</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.gif" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.gif" />
      </Head>
      <Navigation />
      <main className="site-content">
        <Container>
          <Component {...pageProps} />
        </Container>
      </main>
      <Footer />
    </div>
  )
}