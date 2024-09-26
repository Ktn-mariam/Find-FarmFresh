import React, { useContext, useEffect, useState } from 'react'
import ProductSlider from '../../components/ProductSlider'
import CategoryNavbar from '../../components/CategoryNavbar'
import { ProductDetailTypeForDisplay } from '../../types/Product'
import AuthenticationContext from '../../context/authentication'
import { APIURL } from '../../App'

const StorePage = () => {
  const [topRatedProducts, setTopRatedProducts] = useState<
    ProductDetailTypeForDisplay[] | null
  >(null)
  const [discountedProducts, setDiscountedProducts] = useState<
    ProductDetailTypeForDisplay[] | null
  >(null)
  const { logInData } = useContext(AuthenticationContext)
  const [followingProducts, setFollowingProducts] = useState<
    ProductDetailTypeForDisplay[] | null
  >([])

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const topRatedProductsResponse = await fetch(
          `${APIURL}/api/v1/products/topRatedProducts`,
        )

        const topRatedProductData = await topRatedProductsResponse.json()
        setTopRatedProducts(topRatedProductData.products)
      } catch (error) {
        console.log('Failed to fetch top rated products: ', error)
      }
    }

    const fetchDiscountedProducts = async () => {
      try {
        const discountedProductsResponse = await fetch(
          `${APIURL}/api/v1/products/discountedProducts`,
        )

        const discountedProductsData = await discountedProductsResponse.json()
        setDiscountedProducts(discountedProductsData.products)
      } catch (error) {
        console.log('Failed to fetch discounted products: ', error)
      }
    }

    const fetchFollowingFarmerProducts = async () => {
      if (logInData && logInData.following) {
        try {
          const products = await Promise.all(
            logInData.following.map(async (farmer) => {
              const orderResponse = await fetch(
                `${APIURL}/api/v1/products/lastThirtyDayProducts/${farmer.farmerID}`,
              )

              const productsData = await orderResponse.json()
              return productsData.products
            }),
          )
          const allProducts = [].concat(...products)
          setFollowingProducts(allProducts)
        } catch (error) {
          console.log(
            'Failed to fetch products of farmers that the customer is following: ',
            error,
          )
        }
      } else {
        setFollowingProducts(null)
      }
    }

    fetchTopRatedProducts()
    fetchDiscountedProducts()
    fetchFollowingFarmerProducts()
  }, [logInData])
  return (
    <div>
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm font-serif">
        <CategoryNavbar />
      </div>
      <div className="flex flex-col gap-4 mb-32 md:px-36 px-14 pt-20">
        {followingProducts && followingProducts.length > 0 && (
          <ProductSlider
            noOfSlides={6}
            height={48}
            heading="Recent Products From My Following"
            editable={false}
            products={followingProducts}
          />
        )}
        {logInData.following && logInData.following.length === 0 && (
          <div>
            <h1 className="font-bold text-xl  font-noto">
              Recent Products From My Following
            </h1>
            <p className="py-3 mb-5">
              No products to display yet. Follow farmers to view their recent
              products here.
            </p>
          </div>
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
