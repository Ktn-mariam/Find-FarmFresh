import React, { useContext, useEffect, useState } from 'react'
import StoreNavbar from '../../components/StoreNavbar'
import ProfileSideBar from '../../components/ProfileSideBar'
import ReviewsModal from './ReviewsModal'
import AuthenticationContext from '../../context/authentication'
import { OrderType } from '../../types/Order'
import Order from './Order'

const ConsumerProfile = () => {
  const [openReviewModal, setOpenReviewModal] = useState(false)
  const { logInData, loadingLogInData } = useContext(AuthenticationContext)
  const [orders, setOrders] = useState<OrderType[] | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token')
      const parsedToken = JSON.parse(token!)

      const orderResponse = await fetch(`http://localhost:5000/api/v1/orders`, {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })

      const orderData = await orderResponse.json()
      setOrders(orderData.orders)
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    setOpenReviewModal(true)
  }, [logInData])

  if (loadingLogInData) {
    return <div>Loading</div>
  }

  if (!loadingLogInData && !logInData.loggedIn) {
    return <div>Please log In to view your profile</div>
  }

  const profileInformation = {
    name: logInData.name!,
    locationCoordinates: logInData.locationCoordinates!,
    image: logInData.image!,
    location: logInData.location!,
    mobileNo: logInData.mobileNo!,
  }

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
            <ProfileSideBar
              isFarmer={false}
              editable={true}
              profileInformation={profileInformation}
            />
            <div className="col-span-2">
              <h1 className="text-lg font-bold mb-5">My Orders</h1>
              {orders ? (
                <div className="flex flex-col gap-10">
                  {orders.map((order) => {
                    return <Order order={order} />
                  })}
                </div>
              ) : (
                <div>No Orders to Display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsumerProfile
