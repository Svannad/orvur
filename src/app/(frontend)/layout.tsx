import React from 'react'
import './styles.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/abf6uhe.css"></link>
      </head>
      <body className="bg-white relative">
        <Navbar />

        <main className="relative z-20 bg-white min-h-[1500px] mb-[350px]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
