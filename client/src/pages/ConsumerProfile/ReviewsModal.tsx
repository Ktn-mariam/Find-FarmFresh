import React, { useState } from 'react'
import ReviewProduct from './ReviewProduct'
import GratitudeModal from '../../components/GratitudeModal'
import Modal from '@mui/material/Modal'
import CelebrationIcon from '@mui/icons-material/Celebration'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
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
      className="border p-2 rounded-full bg-opacity-80 hover:bg-gray-100 absolute -left-10 top-1/2 transform -translate-y-1/2 z-10"
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
      className="border hover:bg-gray-100 bg-opacity-80 p-2 rounded-full absolute left-72 top-1/2 transform -translate-y-1/2"
      title="right"
      onClick={onClick}
    >
      <KeyboardArrowRightIcon />
    </button>
  )
}
interface ReviewsModalProps {
  openReviewModal: boolean
  setOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  openReviewModal,
  setOpenReviewModal,
}) => {
  const [openGratitudeModal, setOpenGratitudeModal] = useState(false)
  const settings = {
    dots: true,
    fade: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div>
      <GratitudeModal
        openGratitudeModal={openGratitudeModal}
        setOpenGratitudeModal={setOpenGratitudeModal}
      />
      <Modal
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEnforceFocus
      >
        <div className="flex items-center mt-10 justify-center">
          <div className="font-noto px-12 py-10 w-98 bg-white rounded-md flex flex-col items-center gap-5">
            <div className="flex flex-col items-center gap-2">
              <CelebrationIcon fontSize="large" />
              <div className="text-center">
                Great! Your products from Mariam Khatoon have been delivered.
                Please take a moment to review the farmer and their products —
                your feedback makes a difference!
              </div>
            </div>
            <div className="w-72">
              <Slider {...settings}>
                <ReviewProduct />
                <ReviewProduct />
                <ReviewProduct />
                <ReviewProduct />
                <ReviewProduct />
              </Slider>
            </div>
            <div className="flex gap-2 mt-7">
              <button
                className="bg-gray-300 rounded-md px-3 py-2 text-sm"
                onClick={() => {
                  setOpenReviewModal(false)
                }}
              >
                Next Time, Sorry!
              </button>
              <button
                className="bg-black text-white rounded-md px-3 text-sm py-2"
                onClick={() => {
                  setOpenReviewModal(false)
                  setOpenGratitudeModal(true)
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ReviewsModal
