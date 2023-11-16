import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import StorePage from './pages/StorePage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'

function App() {
  return (
    <div>
      <Navbar />
      {/* <StorePage /> */}
      {/* <ProductCategoryPage /> */}
      <ProductDetailPage />
      {/* <HomePage /> */}
      <Footer />
    </div>
  )
}

export default App
