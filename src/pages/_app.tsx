import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const threeScript = document.createElement('script')
    threeScript.setAttribute('id', 'threeScript')
    threeScript.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js',
    )
    document.getElementsByTagName('head')[0].appendChild(threeScript)
    return () => {
      if (threeScript) {
        threeScript.remove()
      }
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
