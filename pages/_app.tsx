import "../styles/globals.css"
import type { AppProps } from "next/app"
import Navbar from "../components/Navbar/Navbar"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
