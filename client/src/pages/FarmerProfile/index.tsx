import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductSlider from '../../components/ProductSlider'
import CommentSection from '../../components/CommentSection'
import LocationMap from '../../components/LocationMap'
import ProfileSideBar from '../../components/ProfileSideBar'
import StoreNavbar from '../../components/StoreNavbar'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LineChart from './LineChart'
import { ProductDetailType, ProductType } from '../../types/Product'
import { FarmerType } from '../../types/Farmer'
import { Comment } from '../../types/Comment'
import Pagination from '@mui/material/Pagination'
import AuthenticationContext from '../../context/authentication'

interface FarmerProfileProps {
  editable: boolean
}

const FarmerProfile: React.FC<FarmerProfileProps> = ({ editable }) => {
  const { farmerID } = useParams()
  const navigate = useNavigate()
  const { logInData, loadingLogInData, setLogInData, logInError } = useContext(
    AuthenticationContext,
  )
  const [farmerDetails, setFarmerDetails] = useState<FarmerType | null>(null)
  const [refetchProducts, setRefetchProducts] = useState(false)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [comments, setComments] = useState<Comment[] | undefined>(undefined)
  const [productsOfFarmer, setProductsOfFarmer] = useState<
    ProductDetailType[] | null
  >(null)

  const fetchProductData = async (farmerID: string) => {
    const productsResponse = await fetch(
      `http://localhost:5000/api/v1/farmers/${farmerID}/products`,
    )

    const productData = await productsResponse.json()
    setProductsOfFarmer(productData.products)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const farmerResponse = await fetch(
        `http://localhost:5000/api/v1/farmers/${farmerID}`,
      )
      const farmerData = await farmerResponse.json()
      setFarmerDetails(farmerData.farmer[0])
    }

    const fetchCommentData = async (farmerID: string) => {
      let noOfCommentsInFarmer = farmerDetails?.comments.length
      console.log(noOfCommentsInFarmer)
      const noOfCommentResponse = await fetch(
        `http://localhost:5000/api/v1/comments/farmer/${farmerID}/count`,
      )

      const noOfCommentsData = await noOfCommentResponse.json()
      let noOfMoreComments = noOfCommentsData.count
      let totalNoOfComments = noOfCommentsInFarmer + noOfMoreComments
      let totalNoOfPages = Math.ceil(totalNoOfComments / 3)

      setPageCount(totalNoOfPages)
    }

    if (!editable) {
      fetchProfileData()
      fetchProductData(farmerID!)
      fetchCommentData(farmerID!)
    } else {
      const farmerInfo = {
        name: logInData.name!,
        _id: logInData.userID!,
        location: logInData.location!,
        locationCoordinates: logInData.locationCoordinates!,
        comments: logInData.comments || [],
        description: logInData.description!,
        mobileNo: logInData.mobileNo!,
        farmerRating: logInData.farmerRating!,
        image: logInData.image!,
      }
      setFarmerDetails(farmerInfo)
      fetchProductData(logInData.userID!)
      fetchCommentData(logInData.userID!)
    }
  }, [farmerID, farmerDetails?.comments.length, editable, logInData])

  useEffect(() => {
    if (editable && refetchProducts) {
      fetchProductData(logInData.userID!)
      setRefetchProducts(false)
    }
  }, [refetchProducts, setRefetchProducts, editable, logInData.userID])

  useEffect(() => {
    const fetchComments = async () => {
      if (page === 1) {
        setComments(farmerDetails?.comments.slice(0, 3))
        return
      }
      if (page === 2) {
        setComments(farmerDetails?.comments.slice(3, 6))
        return
      }
      const commentResponse = await fetch(
        `http://localhost:5000/api/v1/comments/farmer/${farmerID}?page=${page}`,
      )
      const commentData = await commentResponse.json()
      console.log(commentData)

      setComments(commentData.comments)
    }

    fetchComments()
  }, [page, farmerDetails?.comments, farmerID])

  const BackPageExists = window.history.state && window.history.state.idx > 0

  if ((!farmerDetails && !editable) || (editable && loadingLogInData)) {
    return <div>Loading</div>
  }

  const profileInformation = {
    name: farmerDetails?.name!,
    locationCoordinates: farmerDetails?.locationCoordinates!,
    image: farmerDetails?.image!,
    location: farmerDetails?.location!,
    mobileNo: farmerDetails?.mobileNo!,
    rating: farmerDetails?.farmerRating!,
    description: farmerDetails?.description!,
  }

  if (editable && !logInData.loggedIn && !loadingLogInData) {
    return <div>You cannot view profile without logging in</div>
  }

  if (editable && logInError) {
    return <div>Error in loading data. Please refresh again after sometime</div>
  }

  return (
    <div>
      {!editable && <StoreNavbar />}
      <div className="md:px-36 px-14 pt-10 mb-32 font-noto">
        <div className="flex items-center justify-between mx-10 mb-5">
          {BackPageExists && !editable ? (
            <button
              onClick={() => {
                navigate(-1)
              }}
              className="flex items-center gap-2 hover:cursor-pointer"
            >
              <ArrowBackIcon />
              <h3 className="text-xl">Back</h3>
            </button>
          ) : (
            <div className="text-2xl font-bold">My Profile</div>
          )}
          {editable && (
            <button
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token')
                setLogInData({ loggedIn: false })
                navigate('/sign-in')
              }}
            >
              <LogoutIcon />
              <h3 className="text-xl">Logout</h3>
            </button>
          )}
        </div>
        <div className="flex">
          <div className="grid grid-cols-3 gap-10">
            {farmerDetails ? (
              <ProfileSideBar
                editable={editable}
                isFarmer={true}
                profileInformation={profileInformation}
              />
            ) : (
              <div>Loading</div>
            )}
            <div className="ml-10 col-span-2">
              <div className="mt-7">
                {productsOfFarmer ? (
                  <ProductSlider
                    noOfSlides={3}
                    height={64}
                    heading={'Products sold by Mariam'}
                    editable={editable}
                    products={productsOfFarmer}
                    setRefetchProducts={setRefetchProducts}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="mt-5">
                <h1 className="font-noto font-bold w-full text-xl mb-5">
                  Your Sales Last 30 Days
                </h1>
                <LineChart />
              </div>
              <div className="mt-5">
                <h1 className="font-noto font-bold text-xl mb-5">
                  Location on Map
                </h1>
                {farmerDetails && (
                  <div className="h-96">
                    <LocationMap
                      locationCoordinates={farmerDetails.locationCoordinates}
                      location={farmerDetails.location}
                    />
                  </div>
                )}
              </div>
              <div>
                <CommentSection comments={comments} />
                {farmerDetails && farmerDetails.comments.length > 0 && (
                  <div className="mt-3">
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={(event, value) => {
                        setPage(value)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerProfile
