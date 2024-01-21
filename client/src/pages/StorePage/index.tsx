import React, { useContext, useEffect, useState } from 'react'
import ProductSlider from '../../components/ProductSlider'
import CategoryNavbar from '../../components/CategoryNavbar'
import { ProductDetailType } from '../../types/Product'
import AuthenticationContext from '../../context/authentication'

const StorePage = () => {
  const [topRatedProducts, setTopRatedProducts] = useState<
    ProductDetailType[] | null
  >(null)
  const [discountedProducts, setDiscountedProducts] = useState<
    ProductDetailType[] | null
  >(null)
  const { logInData } = useContext(AuthenticationContext)
  const [followingProducts, setFollowingProducts] = useState<
    ProductDetailType[] | null
  >(null)

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      const topRatedProductsResponse = await fetch(
        `http://localhost:5000/api/v1/products/topRatedProducts`,
      )

      const topRatedProductData = await topRatedProductsResponse.json()
      setTopRatedProducts(topRatedProductData.products)
    }

    const fetchDiscountedProducts = async () => {
      const discountedProductsResponse = await fetch(
        `http://localhost:5000/api/v1/products/discountedProducts`,
      )

      const discountedProductsData = await discountedProductsResponse.json()
      setDiscountedProducts(discountedProductsData.products)
    }

    const fetchFollowingFarmerProducts = async () => {
      if (logInData && logInData.following) {
        const products = await Promise.all(
          logInData.following.map(async (farmer) => {
            const orderResponse = await fetch(
              `http://localhost:5000/api/v1/products/lastThirtyDayProducts/${farmer.farmerID}`,
            )

            const productsData = await orderResponse.json()
            return productsData.products
          }),
        )
        const allProducts = [].concat(...products)
        setFollowingProducts(allProducts)
      } else {
        setFollowingProducts(null)
      }
    }

    fetchTopRatedProducts()
    fetchDiscountedProducts()
    fetchFollowingFarmerProducts()
  })
  return (
    <div>
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm font-serif">
        <CategoryNavbar />
      </div>
      <div className="flex flex-col gap-4 mb-32 md:px-36 px-14 pt-20">
        {followingProducts && (
          <ProductSlider
            noOfSlides={6}
            height={48}
            heading="Recent Products From My Following"
            editable={false}
            products={followingProducts}
          />
        )}
        {topRatedProducts && (
          <ProductSlider
            noOfSlides={6}
            height={48}
            heading="Top Rated Products"
            editable={false}
            products={topRatedProducts}
          />
        )}
        {discountedProducts && (
          <ProductSlider
            noOfSlides={6}
            height={48}
            heading="Products With Time Limited Discounts"
            editable={false}
            products={discountedProducts}
          />
        )}
      </div>
    </div>
  )
}

export default StorePage
