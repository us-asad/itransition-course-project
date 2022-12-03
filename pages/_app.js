import { Header } from 'components'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <main className='bg-purple-100 min-h-screen'>
      <Header />
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
