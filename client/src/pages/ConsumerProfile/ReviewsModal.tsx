import React, { useContext, useEffect, useState } from 'react'
import ReviewProduct from './ReviewProduct'
import GratitudeModal from './GratitudeModal'
import Modal from '@mui/material/Modal'
import CelebrationIcon from '@mui/icons-material/Celebration'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { OrderType, ProductInCartItem } from '../../types/Order'
import AuthenticationContext from '../../context/authentication'
import { APIURL } from '../../App'

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

interface CommentType {
  title: string
  description: string
  rating: number
  productID?: string
  farmerID?: string
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({
  openReviewModal,
  setOpenReviewModal,
}) => {
  const { token } = useContext(AuthenticationContext)
  const [openGratitudeModal, setOpenGratitudeModal] = useState(false)
  const [reviewOrders, setReviewOrders] = useState<OrderType | null>(null)
  const [comments, setComments] = useState<CommentType[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchReviewOrders = async () => {
      try {
        const orderResponse = await fetch(
          `${APIURL}/api/v1/orders/reviewOrders`,
          {
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        const orderData = await orderResponse.json()

        if (orderData.orders.length === 0) {
          setReviewOrders(null)
          setOpenReviewModal(false)
        } else {
          setReviewOrders(orderData.orders[0])

          let commentsArray: CommentType[] = []
          commentsArray = orderData.orders[0].products.map(
            (product: ProductInCartItem) => ({
              title: '',
              description: '',
              rating: 4,
              productID: product.productID,
            }),
          )

          commentsArray.unshift({
            title: '',
            description: '',
            rating: 4,
            farmerID: orderData.orders[0].farmerID,
          })

          setComments(commentsArray)
        }
      } catch (error) {
        console.log('Failed to fetch review Orders: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviewOrders()
  }, [])

  const handleInputChange = (
    index: number,
    field: 'title' | 'description' | 'rating' | 'productID' | 'farmerID',
    value: string | number,
  ) => {
    setComments((prevComments) => {
      const updatedComments = [...(prevComments ?? [])]
      if (field === 'description')
        updatedComments[index].description = value as string
      if (field === 'title') updatedComments[index].title = value as string
      if (field === 'rating') updatedComments[index].rating = value as number
      if (field === 'productID') {
        console.log('value ', value)
        console.log(updatedComments[index])

        updatedComments[index].productID = value as string
      }
      if (field === 'farmerID')
        updatedComments[index].farmerID = value as string
      return updatedComments
    })
  }

  const addCommentToFarmer = async () => {
    if (!comments) return
    try {
      const comment = {
        rating: comments[0].rating,
        title: comments[0].title,
        description: comments[0].description,
      }

      await fetch(`${APIURL}/api/v1/farmers/${comments[0].farmerID}/comments`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: comment }),
      })
    } catch (error) {
      console.log(`Failed to add comment: ${error}`)
    }
  }

  const addCommentToProducts = async () => {
    if (!comments) return
    try {
      await Promise.all(
        comments.map(async (comment, index) => {
          if (index === 0) return
          const commentJSON = {
            title: comment.title,
            description: comment.description,
            rating: comment.rating,
          }
          await fetch(`${APIURL}/api/v1/products/${comment.productID}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: commentJSON }),
          })
        }),
      )
    } catch (error) {
      console.log('Failed to add comments: ', error)
    }
  }

  const updateOrderToReview = async () => {
    if (!reviewOrders) return

    try {
      const updateOrderResponse = await fetch(
        `${APIURL}/api/v1/orders/${reviewOrders._id}`,
        {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notifyConsumer: false }),
        },
      )

      const responseData = await updateOrderResponse.json()
    } catch (error) {
      console.log('Failed to update Order: ', error)
    }
  }

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
          {!isLoading && reviewOrders && (
            <div className="font-noto px-12 py-10 w-98 bg-white rounded-md flex flex-col items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <CelebrationIcon fontSize="large" />
                <div className="text-center">
                  Great! Your products from {reviewOrders.farmerName} have been
                  delivered. Please take a moment to review the farmer and their
                  products — your feedback makes a difference!
                </div>
              </div>
              <div className="w-72">
                <Slider {...settings}>
                  <ReviewProduct
                    isProduct={false}
                    key={0}
                    index={0}
                    ID={reviewOrders.farmerID!}
                    handleInputChange={handleInputChange}
                  />
                  {reviewOrders.products.map((product, index) => {
                    return (
                      <ReviewProduct
                        key={index + 1}
                        index={index + 1}
                        isProduct={true}
                        ID={product.productID}
                        handleInputChange={handleInputChange}
                      />
                    )
                  })}
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
                  className="bg-night text-white rounded-md px-3 text-sm py-2"
                  onClick={() => {
                    addCommentToFarmer()
                    addCommentToProducts()
                    updateOrderToReview()
                    setOpenReviewModal(false)
                    setOpenGratitudeModal(true)
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ReviewsModal
