import React from 'react'
import { NavLink } from 'react-router-dom'
import ProductSlider from '../components/ProductSlider'
import StoreNavbar from '../components/StoreNavbar'
import CommentSection from '../components/CommentSection'
import LocationMap from '../components/LocationMap'
import RatingStats from '../components/RatingStats'
import SpaIcon from '@mui/icons-material/Spa'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SecurityIcon from '@mui/icons-material/Security'
import CachedIcon from '@mui/icons-material/Cached'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
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

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border p-2 rounded-full bg-opacity-80 bg-gray-300 hover:shadow-md absolute left-5 top-1/2 transform -translate-y-1/2 z-10"
      title="left"
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </button>
  )
}
const NextArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border bg-gray-300 bg-opacity-80 p-2 rounded-full hover:shadow-md absolute left-80 top-1/2 transform -translate-y-1/2"
      title="right"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}

function ProductDetailPage() {
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
      <div className="md:px-36 px-14 pt-10 pb-36">
        <div className="flex text-lg items-center">
          <NavLink to="/store/fruits">
            <h1 className="hover:underline">Fruits</h1>
          </NavLink>
          <KeyboardArrowRightIcon />
          <NavLink to="/store/fruits/apples">
            <h1 className="hover:underline">Apples</h1>
          </NavLink>
          <KeyboardArrowRightIcon />
          <h1>Apples, Silicon Oasiskm frkn kjjkey</h1>
        </div>
        <div className="py-6 flex gap-x-7">
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
          <div className="font-noto">
            <h1 className="text-3xl font-bold">
              Apples, Silicon Oasiskm frknmn klfkl fkljdfko;
            </h1>
            <NavLink to="/farmer-profile">
              <div className="flex items-center gap-1">
                <AccountCircleIcon />
                <div className="text-lg pt-1 hover:underline">
                  Mariam Khatoon
                </div>
              </div>
            </NavLink>
            <div className="flex items-center mt-3">
              <LocationOnIcon />
              Silicon Oasis, Dubai, United Arab Emirates
            </div>
            <div className="flex mt-6">
              <p className="text-sm md:text-base py-0.5 pr-1">AED</p>
              <p className="text-red-600">
                <span className="font-bold text-xl md:text-4xl">35.50</span>/kg
              </p>
            </div>
            <div className="flex text-xs gap-x-5 my-10">
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <LocalShippingIcon />
                Free Delivery
              </div>
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <SpaIcon />
                Organically Produced
              </div>
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <SecurityIcon />
                Secure Transaction
              </div>
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <PaymentsOutlinedIcon />
                Cash On Delivery
              </div>
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <CachedIcon />
                Returnable Choice
              </div>
              <div className="flex flex-col items-center w-14 text-center gap-2">
                <StorefrontIcon />
                On-Site Shopping
              </div>
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
              <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-pistachio3 bg-pistachio2">
                <AddShoppingCartIcon />
                <h1 className="text-lg">Add to cart</h1>
              </button>
            </div>
          </div>
          <div className="right-36">
            <div className="font-noto w-88">
              <div className="px-5 py-8 border border-1 border-zinc-300 rounded-2xl">
                <RatingStats />
                <div className="mt-6 border-t-1 border-gray-200">
                  <h1 className="text-lg font-bold">Farmer's Rating</h1>
                  <div className="flex items-center mt-1 gap-2">
                    <Rating defaultValue={3.5} precision={0.5} readOnly />
                    <h3>3.5 out of 5</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-16">
          <div className="w-1/2 font-noto pt-10">
            <CommentSection />
          </div>
          <div className="w-1/2 font-noto">
            <div className="px-8 py-10 border border-1 border-zinc-300 rounded-2xl">
              <h1 className="text-xl font-bold mb-4">Farmer Details</h1>
              <div className="flex items-center gap-3">
                <PhonelinkRingIcon />
                +971 50 243 0978
              </div>
              <div className="flex items-center gap-3 mt-3">
                <LocationOnIcon />
                Flat 503, Sapphire Building, Silicon Oasis, Dubai, United Arab
                Emirates
              </div>
              <div className="mt-3">
                <LocationMap />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <ProductSlider
            noOfSlides={6}
            height={48}
            heading="Similar Products"
            editable={false}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
