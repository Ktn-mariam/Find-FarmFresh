import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import StorePage from './pages/StorePage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import FarmerProfile from './pages/FarmerProfile'
import ShoppingCartPage from './pages/ShoppingCartPage'
import OrdersPage from './pages/OrdersPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import AuthenticationContext from './context/authentication'
import { FormikContextProvider } from './context/formik-context'
import { Role } from './types/Auth'
import { ShoppingCartContextProvider } from './context/shoppingCart'
import MyProfilePage from './pages/MyProfilePage'

export const APIURL = 'https://findfarmfreshbackend.vercel.app'

function App() {
  const { logInData } = useContext(AuthenticationContext)
  return (
    <ShoppingCartContextProvider>
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
            path="/store/:parentCategory/:category/:productID"
            element={<ProductDetailPage />}
          />
          <Route
            path="/farmer-profile/:farmerID"
            element={<FarmerProfile editable={false} />}
          />
          <Route
            path="/sign-up"
            element={
              <FormikContextProvider>
                <SignUpPage />
              </FormikContextProvider>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          {logInData.role === Role.Consumer && (
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          )}
          {logInData.role === Role.Farmer && (
            <Route path="/orders" element={<OrdersPage />} />
          )}
        </Routes>
        <Footer />
      </Router>
    </ShoppingCartContextProvider>
  )
}

export default App
