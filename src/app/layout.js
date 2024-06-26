import React from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'

const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default HomeLayout