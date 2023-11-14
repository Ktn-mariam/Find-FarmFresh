import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import StorePage from './pages/StorePage'

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
