import './styles.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RouteLoader from './components/RouteLoader'

export const metadata = {
  description: 'A Archery Club Website',
  title: 'Ørvur Archery',
  icon: '/favicon.ico',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/abf6uhe.css"></link>
      </head>
      <body className="bg-white relative">
        <RouteLoader>
          <Navbar />

          <main className="relative z-20 bg-white min-h-[1500px] mb-[350px]">{children}</main>

          <Footer />
        </RouteLoader>
      </body>
    </html>
  )
}
