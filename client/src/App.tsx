import React from 'react'
import Navbar from './components/Navbar.tsx'
import HomePage from './pages/HomePage.tsx'
import Footer from './components/Footer.tsx'
import StorePage from './pages/StorePage.tsx'

function App() {
  return (
    <div>
      <Navbar />
      <StorePage />
      <Footer />
    </div>
  )
}

export default App
