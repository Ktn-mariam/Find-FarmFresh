import React from 'react'
import SpaIcon from '@mui/icons-material/Spa' // organic farming
import LocalShippingIcon from '@mui/icons-material/LocalShipping' // Free Delivery?
import SecurityIcon from '@mui/icons-material/Security' //secure transaction?
import CachedIcon from '@mui/icons-material/Cached' // returnable
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import StoreNavbar from '../components/StoreNavbar'
import Slider from 'react-slick'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'
import StorefrontIcon from '@mui/icons-material/Storefront'
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Pagination from '@mui/material/Pagination'
import { Progress } from '@material-tailwind/react'
import ProductSlider from '../components/ProductSlider'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border p-2 rounded-full bg-opacity-80 bg-gray-300 hover:shadow-md"
      title="left"
      onClick={onClick}
      style={{
        ...style,
        zIndex: 1000,
        position: 'absolute',
        left: '10px', // Adjust right positioning
        top: '50%', // Adjust top positioning
        transform: 'translateY(-50%)',
      }}
    >
      <KeyboardArrowLeftIcon />
    </button>
  )
}
const NextArrow: React.FC<ArrowProps> = ({ onClick, style }) => {
  return (
    <button
      className="border bg-gray-300 bg-opacity-80 p-2 rounded-full hover:shadow-md"
      title="right"
      onClick={onClick}
      style={{
        ...style,
        position: 'absolute',
        left: '330px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
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
          <h1>Fruits</h1>
          <KeyboardArrowRightIcon />
          <h1>Apples</h1>
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
            <div className="flex items-center gap-1">
              <AccountCircleIcon />
              <div className="text-lg pt-1">Mariam Khatoon</div>
            </div>
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
                <VolunteerActivismIcon />
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
            <div className="mt-5">
              <button className="flex items-center gap-2 py-2 px-10 rounded-2xl bg-yellow-600 hover:shadow-md">
                <AddShoppingCartIcon />
                <h1 className="text-sm">Add to cart</h1>
              </button>
            </div>
          </div>
          <div className="right-36">
            <div className="font-noto w-88">
              <div className="px-5 py-8 border border-1 border-zinc-300 rounded-2xl">
                <h1 className="text-lg font-bold">Product's Rating</h1>
                <div className="flex items-center mt-1 gap-2">
                  <Rating defaultValue={3.5} precision={0.5} readOnly />
                  <h3>3.5 out of 5</h3>
                </div>
                <p className="mt-3 text-sm text-gray-800">
                  3,44 ratings overall
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm whitespace-nowrap">5 stars</h1>
                    <Progress value={75} size="lg" color="amber" />
                    <h1 className="text-sm">75</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm whitespace-nowrap">4 stars</h1>
                    <Progress value={15} size="lg" color="amber" />
                    <h1 className="text-sm">15</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm whitespace-nowrap">3 stars</h1>
                    <Progress value={2} size="lg" color="amber" />
                    <h1 className="text-sm">02</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm whitespace-nowrap">2 stars</h1>
                    <Progress value={2} size="lg" color="amber" />
                    <h1 className="text-sm">02</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm whitespace-nowrap">1 stars</h1>
                    <Progress value={1} size="lg" color="amber" />
                    <h1 className="text-sm">01</h1>
                  </div>
                </div>
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
          <div className="w-1/2 font-noto">
            <h1 className="text-xl font-bold mb-4  pt-10">Reviews</h1>
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex items-center gap-1">
                  <AccountCircleIcon fontSize="medium" />
                  <h1>Mariam Khatoon</h1>
                </div>
                <div className="flex items-center mt-0.5 gap-2">
                  <Rating
                    defaultValue={3.5}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
                  <h1 className="text-gray-500 text-sm pt-0.5 ">
                    Reviewed on Nov 15, 2023
                  </h1>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Fresh and tasty</h1>
                  <h1 className="text-sm">
                    good as described. doubt the weight as very few
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <AccountCircleIcon fontSize="medium" />
                  <h1>Mariam Khatoon</h1>
                </div>
                <div className="flex items-center mt-0.5 gap-2">
                  <Rating
                    defaultValue={3.5}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
                  <h1 className="text-gray-500 text-sm pt-0.5 ">
                    Reviewed on Nov 15, 2023
                  </h1>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Fresh and tasty</h1>
                  <h1 className="text-sm">
                    good as described. doubt the weight as very few organges
                    arrived
                  </h1>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <AccountCircleIcon fontSize="medium" />
                  <h1>Mariam Khatoon</h1>
                </div>
                <div className="flex items-center mt-0.5 gap-2">
                  <Rating
                    defaultValue={3.5}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
                  <h1 className="text-gray-500 text-sm pt-0.5 ">
                    Reviewed on Nov 15, 2023
                  </h1>
                </div>
                <div className="mt-2">
                  <h1 className="font-bold">Fresh and tasty</h1>
                  <h1 className="text-sm">
                    good as described. doubt the weight as very few organges
                    arrived fjhjef fekjfk dkjdfshkl dfjnjf kjdfsjkl
                  </h1>
                </div>
              </div>
              <div className="mt-3">
                <Pagination count={4} />
              </div>
            </div>
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
              <div className="h-96 mt-3">
                <MapContainer
                  style={{ height: '100%', width: '100%' }}
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <ProductSlider />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
