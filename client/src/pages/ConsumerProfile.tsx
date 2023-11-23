import React, { useEffect, useState } from 'react'
import StoreNavbar from '../components/StoreNavbar'
import ProfileSideBar from '../components/ProfileSideBar'
import ProductCart from '../components/ProductCart'
import ReviewsModal from '../components/ReviewsModal'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

enum Status {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
}

interface ConsumerProfileProps {
  status: Status
}

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
const ConsumerProfile: React.FC<ConsumerProfileProps> = ({ status }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false)

  useEffect(() => {
    setOpenReviewModal(true)
  }, [])
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
      <ReviewsModal
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
      />
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex">
          <div className="grid grid-cols-3 gap-10">
            <ProfileSideBar isFarmer={false} editable={true} />
            <div className="col-span-2">
              <h1 className="text-lg font-bold mb-5">My Orders</h1>
              <div className="flex flex-col gap-10">
                {orders.map((order) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-md font-bold">Mariam Khatoon</div>
                        <div className="flex items-center gap-1">
                          <div className="text-md font-bold">{status}</div>
                          {status === Status.Waiting && (
                            <TimelapseIcon style={{ color: '#ffb703' }} />
                          )}
                          {status === Status.Transported && (
                            <LocalShippingIcon style={{ color: '#dc2f02' }} />
                          )}
                          {status === Status.Delivered && (
                            <TaskAltIcon style={{ color: '#29bf12' }} />
                          )}
                        </div>
                      </div>
                      <div className="py-3 px-5 bg-gray-100 flex gap-5">
                        <div className="w-3/4">
                          <Slider {...settings}>
                            <ProductCart isShoppingCart={false} />
                            <ProductCart isShoppingCart={false} />
                            <ProductCart isShoppingCart={false} />
                            <ProductCart isShoppingCart={false} />
                            <ProductCart isShoppingCart={false} />
                            <ProductCart isShoppingCart={false} />
                          </Slider>
                        </div>
                        <div className="w-1/4 pr-2 pb-3 flex my-3 items-end justify-between flex-col">
                          <div className="flex flex-col items-end">
                            <div className="text-lg font-bold">Order date:</div>
                            <div>Nov 13th, 2023</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <h1 className="text-lg font-bold">Total:</h1>
                            <div className="flex items-center">
                              <p className="text-md pr-1">AED</p>
                              <p className="font-bold text-4xl text-red-700">
                                35.50
                              </p>
                            </div>
                          </div>
                          <button
                            disabled
                            className="px-3 py-1 bg-yellow-400 rounded-lg"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsumerProfile
