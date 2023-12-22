import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import ProductSlider from '../../components/ProductSlider'
import StoreNavbar from '../../components/StoreNavbar'
import CommentSection from '../../components/CommentSection'
import LocationMap from '../../components/LocationMap'
import RatingStats from '../../components/RatingStats'
import SpaIcon from '@mui/icons-material/Spa'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import CachedIcon from '@mui/icons-material/Cached'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import CircularProgress from '@mui/material/CircularProgress'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Pagination from '@mui/material/Pagination'
import getParentCategoryRoute from '../../utils/getParentCategoryRoute'
import getCategory from '../../utils/getCategory'
import { ProductDetailType, ProductType } from '../../types/Product'
import { FarmerType } from '../../types/Farmer'
import { Comment } from '../../types/Comment'

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="p-2 rounded-full bg-opacity-70 bg-gray-100 hover:shadow-md absolute left-3 top-1/2 transform -translate-y-1/2 z-10"
      title="left"
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </button>
  )
}
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      className="bg-gray-100 bg-opacity-70 p-2 rounded-full hover:shadow-md absolute right-3 top-1/2 transform -translate-y-1/2"
      title="right"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}

function ProductDetailPage() {
  const { parentCategory, category, productID } = useParams()
  const [product, setProduct] = useState<ProductDetailType | undefined>(
    undefined,
  )
  const [farmer, setFarmer] = useState<FarmerType | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [comments, setComments] = useState<Comment[] | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(3)
  const [similarProducts, setSimilarProducts] = useState<ProductType[] | null>(
    null,
  )

  const parentCategoryDisplay = getCategory(parentCategory || 'Fruits')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch(
          `http://localhost:5000/api/v1/products/${productID}`,
        )
        const productData = await productResponse.json()
        setProduct(productData.product)

        let noOfCommentsInProduct = productData.product.comments.length
        const noOfCommentResponse = await fetch(
          `http://localhost:5000/api/v1/comments/product/${productID}/count`,
        )

        const noOfCommentsData = await noOfCommentResponse.json()
        let noOfMoreComments = noOfCommentsData.count
        let totalNoOfComments = noOfCommentsInProduct + noOfMoreComments
        let totalNoOfPages = Math.ceil(totalNoOfComments / 3)

        setPageCount(totalNoOfPages)
        setIsLoading(false)

        const farmerResponse = await fetch(
          `http://localhost:5000/api/v1/farmers/${product?.farmerID}`,
        )

        const farmerData = await farmerResponse.json()
        setFarmer(farmerData.farmer[0])

        const parentCategoryRoute = getParentCategoryRoute(parentCategory)

        const similarProductsResponse = await fetch(
          `http://localhost:5000/api/v1/products/category/${parentCategoryRoute}?category=${category}`,
        )

        const similarProductsData = await similarProductsResponse.json()
        setSimilarProducts(similarProductsData.products)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [productID, product, category, parentCategory])

  useEffect(() => {
    const fetchComments = async () => {
      if (page === 1) {
        setComments(product?.comments.slice(0, 3))
        return
      }
      if (page === 2) {
        setComments(product?.comments.slice(3, 6))
        return
      }
      const commentResponse = await fetch(
        `http://localhost:5000/api/v1/comments/product/${productID}?page=${page}`,
      )
      const commentData = await commentResponse.json()
      console.log(commentData)

      setComments(commentData.comments)
    }
    fetchComments()
  }, [page, product?.comments, productID])

  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }
  const quantityOptions = [1, 2, 3, 4, 5]
  const imageLocation = ['/apple.png', '/vegetable-1.png', '/vegetable-2.png']

  return (
    <div>
      <StoreNavbar />
      {!isLoading ? (
        <div className="md:px-36 px-14 pt-10 pb-36">
          <div className="flex text-lg items-center">
            <NavLink to={`/store/${parentCategory}`}>
              <h1 className="hover:underline">{parentCategoryDisplay}</h1>
            </NavLink>
            <KeyboardArrowRightIcon />
            <NavLink to={`/store/${parentCategory}/${category}`}>
              <h1 className="hover:underline">{category}</h1>
            </NavLink>
            <KeyboardArrowRightIcon />
            <h1>{product?.title}</h1>
          </div>
          <div className="py-6 w-full flex gap-x-7">
            <div className="w-40 md:w-96">
              <Slider {...settings}>
                {imageLocation.map((location) => {
                  return (
                    <div>
                      <div className="w-40 h-40 md:w-96 md:h-110 flex items-center justify-center overflow-hidden">
                        <img
                          className="object-cover w-full h-full"
                          src={location}
                          alt=""
                        />
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold">{product?.title}</h1>
              <div className="flex w-full justify-between mt-4">
                <div className="font-noto">
                  <NavLink to={`/farmer-profile/${product?.farmerID}`}>
                    <div className="flex items-center gap-1">
                      <AccountCircleIcon />
                      <div className="text-lg pt-1 hover:underline">
                        {product?.farmerName}
                      </div>
                    </div>
                  </NavLink>
                  <div className="flex items-center mt-3">
                    <LocationOnIcon />
                    {farmer?.location}
                  </div>
                  <div className="flex mt-6">
                    <p className="text-sm md:text-base py-0.5 pr-1">AED</p>
                    <p className="text-red-600">
                      <span className="font-bold text-xl md:text-4xl">
                        {product?.price}
                      </span>
                      /kg
                    </p>
                  </div>
                  <div className="flex text-xs gap-x-5 my-10">
                    {product?.delivery && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <LocalShippingIcon />
                        Free Delivery
                      </div>
                    )}
                    {product?.organic && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <SpaIcon />
                        Organically Produced
                      </div>
                    )}
                    {product?.transaction && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <SecurityIcon />
                        Secure Transaction
                      </div>
                    )}
                    {product?.cashOnDelivery && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <PaymentsOutlinedIcon />
                        Cash On Delivery
                      </div>
                    )}
                    {product?.returnableChoice && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <CachedIcon />
                        Returnable Choice
                      </div>
                    )}
                    {product?.onSiteShopping && (
                      <div className="flex flex-col items-center w-14 text-center gap-2">
                        <StorefrontIcon />
                        On-Site Shopping
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <label htmlFor="quantity">Qty in kg:</label>
                    <select
                      className="px-3 ml-3 py-1 border border-1 border-gray-500 rounded-md"
                      title="quantity"
                      name="quantity"
                      id=""
                    >
                      {quantityOptions.map((option) => {
                        return <option value={option}>{option}</option>
                      })}
                    </select>
                  </div>
                  <div className="mt-7">
                    <button className="flex items-center gap-2 py-2 px-3 rounded-lg bg-night text-white">
                      <AddShoppingCartIcon style={{ color: '#fff' }} />
                      <h1 className="text-md">Add to cart</h1>
                    </button>
                  </div>
                </div>
                <div className="font-noto w-88 px-5 py-8 border border-1 border-zinc-300 rounded-2xl">
                  <RatingStats productRating={product?.productRating} />
                  {farmer && (
                    <div className="mt-6 border-t-1 border-gray-200">
                      <h1 className="text-lg font-bold">Farmer's Rating</h1>
                      <div className="flex items-center mt-1 gap-2">
                        <Rating
                          defaultValue={farmer?.farmerRating.rating}
                          precision={0.5}
                          readOnly
                        />
                        <h3>{farmer.farmerRating.rating} out of 5</h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-16">
            <div className="w-1/2 font-noto pt-10">
              <CommentSection comments={comments} />
              <div className="mt-3">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(event, value) => {
                    setPage(value)
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 px-8 py-10 border border-1 border-zinc-300 rounded-2xl">
              <div className="font-noto">
                <h1 className="text-xl font-bold mb-4">Farmer Details</h1>
                <div className="flex items-center gap-3">
                  <PhonelinkRingIcon />
                  {farmer?.mobileNo}
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <LocationOnIcon />
                  {farmer?.location}
                </div>
                {farmer && (
                  <div className="mt-3">
                    <LocationMap
                      locationCoordinates={farmer.locationCoordinates}
                      location={farmer.location}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {similarProducts ? (
            <div className="mt-20">
              <ProductSlider
                noOfSlides={6}
                height={48}
                heading="Similar Products"
                editable={false}
                products={similarProducts}
              />
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div className="px-36 pt-60 pb-96 flex justify-center">
          <div className="flex gap-6 items-center">
            <CircularProgress />
            <div className="text-xl">Please Wait....</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage
