import React from 'react'
import StoreNavbar from '../components/StoreNavbar'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ProductCart from '../components/ProductCart'
import DeleteIcon from '@mui/icons-material/Delete'
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
      className="absolute -left-3 top-1/2 transform -translate-y-1/2 z-10"
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
      className="absolute -right-4 top-1/2 transform -translate-y-1/2"
      title="right"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}
const ShoppingCartPage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  const orders = [1, 2, 3, 4, 5]
  return (
    <div>
      <StoreNavbar />
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm font-noto mb-40">
        <h1 className="text-2xl font-bold mb-6 mt-3">Shopping Cart</h1>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 w-2/3">
            {orders.map((order) => {
              return (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold">Mariam Khatoon</div>
                    <div className="flex items-center gap-1 hover:cursor-pointer">
                      <DeleteIcon fontSize="small" />
                      <div className="text-md font-bold">Delete Order</div>
                    </div>
                  </div>
                  <div className="py-3 px-5 bg-gray-100 flex gap-5">
                    <div className="w-3/4">
                      <Slider {...settings}>
                        <ProductCart isShoppingCart={true} />
                        <ProductCart isShoppingCart={true} />
                        <ProductCart isShoppingCart={true} />
                        <ProductCart isShoppingCart={true} />
                        <ProductCart isShoppingCart={true} />
                        <ProductCart isShoppingCart={true} />
                      </Slider>
                    </div>
                    <div className="w-1/4 pr-2 pb-3 flex my-3 items-end justify-between flex-col">
                      <div className="flex flex-col items-end">
                        <h1 className="text-lg font-bold">Total:</h1>
                        <div className="flex items-center text-xl">
                          <p className="text-md pr-1">AED</p>
                          <p className="font-bold text-red-700">35.50</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-yellow-400 rounded-lg">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-1/3">
            <div className="px-10 py-10 border border-1 border-zinc-300 rounded-2xl">
              <div className="text-lg font-bold mb-5">Order Summary</div>
              <div className="flex items-center justify-between">
                <div>Total Item(s):</div>
                <div className="font-bold">9 Items</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Total Product(s) Price:</div>
                <div className="font-bold">AED 87.34</div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>Total Delivery Price:</div>
                <div className="font-bold">AED 5.45</div>
              </div>
              <div className="border-t border-gray-300 flex items-center b justify-between mt-4">
                <div className="mt-4">Total:</div>
                <div className="font-bold mt-4 text-xl">AED 90.45</div>
              </div>
              <button className="w-full py-2 mt-8 bg-yellow-400 rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage
