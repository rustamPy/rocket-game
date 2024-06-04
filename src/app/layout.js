import React from 'react'
import '@/assets/styles/globals.css'

import NavBar from '@/components/Navbar'

const HomeLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default HomeLayout