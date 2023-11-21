import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import StorePage from './pages/StorePage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FarmerProfile from './pages/FarmerProfile'
import ConsumerProfile from './pages/ConsumerProfile'
import ShoppingCartPage from './pages/ShoppingCartPage'
import OrdersPage from './pages/OrdersPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
enum Status {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
}

const editable = false

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:category" element={<ProductCategoryPage />} />
        <Route
          path="/my-profile"
          element={
            editable ? (
              <FarmerProfile editable={true} />
            ) : (
              <ConsumerProfile status={Status.Delivered} />
            )
          }
        />
        <Route
          path="/farmer-profile"
          element={<FarmerProfile editable={false} />}
        />
        <Route path="/store/fruits/apples/1" element={<ProductDetailPage />} />
        {!editable && (
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        )}
        {editable && <Route path="/orders" element={<OrdersPage />} />}
        <Route
          path="/farmer-profile"
          element={<FarmerProfile editable={false} />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
