import React, { useContext } from 'react'
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
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import AuthenticationContext from './context/authentication'
import { FormikContextProvider } from './context/formik-context'
import { Role } from './types/Auth'

enum Status {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
}

function App() {
  const { logInData } = useContext(AuthenticationContext)
  return (
    <FormikContextProvider>
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route
            path="/store/:parentCategory/:category"
            element={<ProductCategoryPage />}
          />
          <Route
            path="/store/:parentCategory"
            element={<ProductCategoryPage />}
          />
          <Route
            path="/my-profile"
            element={
              logInData.role === Role.Farmer ? (
                <FarmerProfile editable={true} />
              ) : (
                <ConsumerProfile status={Status.Delivered} />
              )
            }
          />
          <Route
            path="/farmer-profile/:farmerID"
            element={<FarmerProfile editable={false} />}
          />
          <Route
            path="/store/:parentCategory/:category/:productID"
            element={<ProductDetailPage />}
          />
          {logInData.role === Role.Consumer && (
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          )}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          {logInData.role === Role.Farmer && (
            <Route path="/orders" element={<OrdersPage />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </FormikContextProvider>
  )
}

export default App
